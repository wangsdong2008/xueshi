<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				全部优惠券
			</view>	
		</view>
		<view class="line"></view>
		<view class="content">
				<view class="searchlist">
					<ul>
						<li v-for="(item,index) in dataList" :index="index" :key="item.uid" :class="{
											'slist':true
											}">
							<view :class="{
								'fz35':true,
								'css_tname':true,
								'css_discount':true,
								}">{{item.d_guid}}</view>
							
							<view class="clear"></view>
						</li>
					</ul>					
				</view>			
				<view class="example-body">
					<uni-pagination @change="handlePage" :show-icon="true" :total="total" :current="page" :pageSize="pagesize" title="优惠券" />
				</view>	
				<view class="btn-row">			
				<button type="primary" class="btn" @tap="studentsadd">创建优惠券</button>
				</view>
		</view>
		<view class="footer">
			<footerNav :msg="footer"></footerNav>
		</view>
	</view>
</template>

<script>
	import service from '@/service.js';
	import mInput from '@/components/m-input.vue'
	import headerNav from "@/components/header/company_header.vue"	
	import footerNav from "@/components/footer/footer_nav.vue"
	import uniPagination from '@/components/uni-pagination/uni-pagination.vue'
	var _self;
	export default {
	    components: {
			headerNav,footerNav,
			uniPagination,mInput
		},
		data(){
			return{
				dataList:[],				
				headermsg:'全部优惠券,Discount Manage',
				page:1,
				current: 1,
				total: 0,
				pagesize: 10,				
				com_id:0,
				cList:[],
				cIDList:[],
				cindex:0,
				btntxt:'',
				footer:''
			}
		},
		onLoad(options){
			_self = this;
			_self.page = options['page'];
			if(_self.page == undefined){
				_self.page = 1;
			}
			_self.checkLogin(2);
		},
		onReady(){
			_self.show();
		},
		
		methods:{
			handlePage(params){
				//debugger;
				_self.page = params.current;
				_self.show();
			},
			searchstudents(){
				//查询功能
				let ret = _self.getUserInfo();
				if(!ret){
					return false;
				}
				const data = {
				    guid: ret.guid,
				    token: ret.token,
					"page":_self.page,
					"pagesize":_self.pagesize,
					"keyword":_self.keyword,
					"com_id":_self.com_id
				};
				_self.getData(data);
			},
			pickerCompanyChange:function(e){
				console.log('picker发送选择改变，携带值为', e.target.value+"===="+_self.cList[e.target.value] + _self.cIDList[e.target.value]);
				_self.com_id = _self.cIDList[e.target.value];
				_self.cindex = e.target.value; 
			},
			studentsadd(){
				let ret = _self.getUserInfo();
				if(!ret){
					return false;
				}
				const data = {
				    guid: ret.guid,
				    token: ret.token,
					"page":_self.page,
					"pagesize":_self.pagesize
				};
				_self.createDate(data);
			},
			createDate(data){
				_self.sendRequest({
					url : _self.CreateDiscountsUrl,
				    method : _self.Method,
				    data : {
						"guid": data.guid,
						"token":data.token,
						"com_id":data.com_id,
						"t":Math.random()
					},
				    hideLoading : true,
				    success: (res) => {
				    	    if(res){
								var status = parseInt(res.status);
								switch(status){
									case 1:{
										uni.showToast({
											title: '你无权创建优惠券',
											icon: 'none',
										});	
										break;
									}
									case 2:{
										uni.showToast({
											title: '你的会员快到期了，无法创建优惠券',
											icon: 'none',
										});	
										break;
									}
									case 3:{
										//_self.navigateTo('discount');
										if(res){
											var data = res.discountlist.list;
											let list = [];
											if(parseInt(res.status) == 3){
												for (var i = 0; i < data.length; i++) {
													var item = data[i];									
													list.push(item);
												}	
												_self.dataList = list;
											}
											_self.total = res.discountlist.count;
										}
										break;
									}
									case 4:{
										uni.showToast({
											title: '你创建的优惠券数量已用完，无法创建新的优惠券',
											icon: 'none',
										});	
										break;
									}									
								}				    	    	
				    	    }
				    	}
				},"1","");		        
				
			},
			show(){
				let ret = _self.getUserInfo();
				if(!ret){
					return false;
				}
				const data = {
				    guid: ret.guid,
				    token: ret.token,
					"page":_self.page,
					"pagesize":_self.pagesize
				};
				_self.getData(data);
			},
			getData(data){
				_self.sendRequest({
				        url : _self.GetAllDiscountsUrl,
				        method : _self.Method,
				        data : {
							"guid": data.guid,
							"token":data.token,
							"page":data.page,
							"pagesize":data.pagesize,
							"com_id":data.com_id,
							"t":Math.random()
						},
				        hideLoading : true,
				        success: (res) => {
				        	    if(res){
									//debugger;
									var data = res.discountlist.list;
									let list = [];
									if(parseInt(res.status) == 3){
										for (var i = 0; i < data.length; i++) {
											var item = data[i];									
											list.push(item);
										}	
										_self.dataList = list;
									}
									_self.total = res.discountlist.count;
				        	    }
				        	}
				        
				    },"1","");
			}
		}
	}
	
</script>

<style>
	.t2{
		line-height: 75upx;
		border-bottom: 1upx solid #eee;
		background-color: #fff;
		padding-left: 40upx;
	}
	.t2 view{
		display: inline;
	}
	.content .title{
	  		background:url(@/static/img/Discount.png) 10upx 25upx no-repeat;
	  		-webkit-background-size:50upx 50upx ;
	  		background-size:50upx 50upx;
	  		line-height: 60upx;
	  		height: 60upx;
	  		padding: 15upx 0upx 15upx 70upx;
	  	}
	.shows{
		color:#ccc;
	}
	.xb1{
		background:url(/static/img/boy.png) 0upx 10upx no-repeat;
		-webkit-background-size: 45upx 45upx;
		background-size: 45upx 45upx;
	}
	.xb0{
		background:url(/static/img/gril.png) 0upx 10upx no-repeat;
		-webkit-background-size: 45upx 45upx;
		background-size: 45upx 45upx;
	}
	.xblist{
		line-height: 60upx;
		height: 60upx;
		padding-left: 60upx;
		position: relative;
	}
	.time0{
		margin-left: 20upx;
	}
	
	.searchlist ul{
		list-style-type: none;
		margin: 0;
		padding: 0;
		padding-left: 20upx;
	}
	li.slist{
		line-height: 60upx;
		margin-bottom: 40upx;
		padding-bottom: 20upx;
		position: relative;
		border-bottom:1upx #ccc solid;
	}
	.sname{
		float: left;
	}
	.statuslist{
		position: absolute;
		right: 20upx;
		top:0upx
	}
	
	.ctitles{
		background:url(/static/img/students.png) 10upx 25upx no-repeat;
		-webkit-background-size: 40upx 40upx;
		background-size: 40upx 40upx;
	}	
	.icenter{
		width: 95%;
		margin: 0 auto;
	}	
	.subcategory{
		background:url(/static/img/school.png) 50upx 25upx no-repeat;
		-webkit-background-size: 40upx 40upx;
		background-size: 40upx 40upx;
		padding-left: 80upx;
	}
	.statuslist{
		position:absolute;
		right: 30upx;
		margin-top: 10upx;
	}
	.statuslist span{
		margin-right: 10upx;
	}	
	.bdr{
		border-radius: 15upx;
		margin-left: 20upx;
	}
	
	.searchlist{
		clear: both;
		margin-top: 30upx;
	}
	
	.register_account_input{
		border:1px solid #999;		
		float: left;
		width: 35%;
		height: 70upx;
		line-height:70upx;		
		text-align: center;
		font-size: 35upx;
		color:#999;
	}
	
	
	
</style>
