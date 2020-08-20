<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				机构详情
			</view>				
		
				<view class="searchlist">
					<view class="com_title">{{com_name}}</view>
					<view class="icenter com_tel">{{com_tel}}</view>
					<view class="icenter com_address">地址：{{com_address}}</view>
				</view>
				<view class="blackdiv"></view>
				<view class="searchlist">
				<view class="courseList">所有课程</view>
				<view class="courselists">	
								
					<uni-grid :column="3" :show-border="false" @change="even">
					   <uni-grid-item v-for="(item, index) in dataList" :index="index" :key="index">
					          <view class="grid-item-box" ><image src="/static/img/course.png" class="identify-head" mode="aspectFill" ></image>
					               <text class="gemmologist-name">{{item.cat_name}}</text>
					           </view>
					       </uni-grid-item>
					</uni-grid>					
				</view>
			
			</view>
		</view>		
		<view class="footer">
			<footerNav :msg="footer"></footerNav>
		</view>
	</view>
</template>
<script>
	import service from '@/service.js';
	import headerNav from "@/components/header/users_header.vue"	
	import footerNav from "@/components/footer/footer_nav.vue"
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	
	var _self;
	
	export default {
	    components: {
			headerNav,footerNav,
			uniGrid,
			uniGridItem
		},
		onLoad(options) {
			_self = this;
			_self.checkLogin(0);
			_self.pid = options['pid'];
			_self.comid = options['comid'];
		},
		onReady(){
			_self.show();
		},
		data(){
			return{
				headermsg:'机构详情',
				pid:0,
				comid:0,
				com_name:'',
				com_address:'',
				com_tel:'',
				dataList:[],
				footer:''
			}
		},
		methods:{
			even(e){
				let num = e.detail.index;
				let url = 'showcourse?pid='+_self.pid+"&comid="+_self.comid+"&cid="+_self.dataList[num].cat_id;
				uni.navigateTo({
					url: url,
				}); 
			},
			show(){
				let ret = _self.getUserInfo();
				if(!ret){
					return false;
				}
				const data = {
				    guid: ret.guid,
				    token: ret.token,
					pid:_self.pid,
					comid:_self.comid
				};				
				_self.getData(data);
			},
			bindcompany(){
				//_self.navigateTo('showshop?pid='+_self.uid+"&comid="+_self.comid);
			},
			getData(data){
				_self.sendRequest({
				        url : _self.CompanyInfoUrl,
				        method : _self.Method,
				        data : {
							"token": data.token,
							"guid": data.guid,
							"pid":data.pid,							
							"comid":data.comid,
							"t":Math.random()
						},
				        hideLoading : true,
				       success: (res) => {
				       		var data = res.companyinfo;
				       		switch(parseInt(res.status)){
				       			case 1:{
				       				uni.showToast({
				       					title: '无数据',
				       					icon: 'none',
				       				});		
				       				break;
				       			}
				       			case 3:{
				       				_self.com_name  = data.com_name;
									_self.com_address  = data.com_address;
									_self.com_tel = data.com_tel;
									
									var data_courselist = res.courselist;
									let list = [];
									for (var i = 0; i < data_courselist.length; i++) {
										var item = data_courselist[i];
										list.push(item);
									}								
									_self.dataList = list;
									
				       				break;
				       			}
				       		}
				       		
				       	}
				    },"1","");
			}
		}
	}
	
</script>
<style>	
	.content .title{
		background:url(@/static/img/detail.png) 10upx 22upx no-repeat;
		-webkit-background-size:50upx 50upx ;
		background-size:50upx 50upx;
		line-height: 60upx;
		height: 60upx;
		padding: 15upx 0upx 15upx 70upx;
	}
	
	.courselists{
		width:90%;
		margin: 0 auto;
	}
	
	.gemmologist-name{
		display: block;
		height: 45upx;
		line-height: 45upx;
		font-size: 25upx;
	
	}
	.grid-item-box{
		text-align: center;
		height: 165upx;
		margin-top: 25upx;
		padding-top: 30upx;
		border:1upx solid #eee;
		margin-right: 30upx;
	}
	.grid-item-box text{
		height: 45upx;
	}
	.identify-head{
	width: 80upx;
	height: 80upx;
	clear: both;
	}
	
	.uni-list-item{
		width:100%;
		padding:0upx;
	}
	
	.icenter{
		width: 90%;
		margin: 0 auto;
		margin-top: 10upx;
		font-size: 30upx;
		line-height: 65upx;
	}
	.com_title{
		width: 80%;
		margin: 0 auto;
		font-size: 45upx;
		font-weight: bold;
		line-height:80upx;
		padding-bottom:20upx;
		margin-top: 40upx;
		padding-left: 80upx;
		background:url(/static/img/company.png) no-repeat 10upx 5upx;
		background-size: 60upx 60upx;
	}
	.com_address{
		width: 80%;
		margin: 0 auto;
		padding-left: 80upx;
		background:url(/static/img/address.png) no-repeat 10upx 30upx;
		background-size: 40upx 40upx;
		line-height: 100upx;
	}
	
	.com_tel{
		width: 80%;
		margin: 0 auto;
		padding-left: 80upx;
		background:url(/static/img/tel.png) no-repeat 10upx 20upx;
		background-size: 40upx 40upx;
		line-height: 80upx;
	}
	
	.blackdiv{
		width: 100%;
		height: 30upx;
		line-height: 30upx;
		background-color: #eee;
	}
	
	.courseList{
		width: 90%;
		padding-bottom: 20upx;
		margin: 0 auto;
		margin-top: 30upx;
		border-bottom: 1upx solid #EEEEEE;
		font-size: 35upx;
	}
	
	
</style>