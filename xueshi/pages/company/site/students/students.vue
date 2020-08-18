<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				全部学生
			</view>	
		</view>
		<view class="line"></view>
		<view class="content">	
				<view class="search">		
						<m-input class="m-input fz30 bdr" type="text" clearable v-model="keyword"  placeholder="搜索学生"></m-input>
						<view class="register_account_input bdr">
							<picker @change="pickerCompanyChange($event)" :value="cindex" :range="cList">
								<view class="uni-input fz30">{{cList[cindex]}}</view>
							</picker>
						</view>
						<button type="primary" class="searchbtn fz30 bdr" plain="true" @tap="searchstudents">搜索</button>
				</view>
				<view class="searchlist">
					<ul>
						<li v-for="(item,index) in dataList" :index="index" :key="item.uid" :class="{
											'slist':true,
											 'xb1':(item.sex==1),
											 'xb0':(item.sex==0),
											 'xblist':true
											}">
							<view :class="{
								'fz35':true,
								'sname':true,
								'shows':(item.is_show == 0)
								}">{{item.uname}}</view>
							<view class="statuslist fz30"><span @tap="studentsedit(item.uid)">修改</span><span @tap="studentsdel(item.uid)">删除</span></view>
							<view class="clear"></view>
						</li>
					</ul>					
				</view>			
				<view class="example-body">
					<uni-pagination @change="handlePage" :show-icon="true" :total="total" :current="page" :pageSize="pagesize" title="标题文字" />
				</view>	
				<view class="btn-row">			
				<button type="primary" class="btn" @tap="studentsadd">添加学生</button>
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
				headermsg:'学生管理,Students Manage',
				page:1,
				current: 1,
				total: 0,
				pagesize: 10,
				keyword:'',
				
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
				_self.navigateTo('studentsedit');
			},
			studentsedit(id){				
				_self.navigateTo('studentsedit?id='+id);
			},
			studentsdel(id){
				let ret = _self.getUserInfo();
				if(!ret){
					return false;
				}
				const data = {
				    guid: ret.guid,
				    token: ret.token,
					id:id,
					page:_self.page,
					pagesize:_self.pagesize
				};
				_self.delData(data);
			},
			delData(data){
				this.sendRequest({
				        url : this.DelStudentsInfoUrl,
				        method : _self.Method,
				        data : {
							"guid": data.guid,
							"token":data.token,
							"id":data.id,
							"page":data.page,
							"pagesize":data.pagesize,
							"t":Math.random()
						},
				        hideLoading : false,
				        success: (res) => {
				        	    if(res){					    	
				        			if(parseInt(res.status) == 3){
				        				_self.show();
				        				uni.showToast({
				        					title: '删除学生成功',
				        					icon: 'none',
				        				});	
				        			}
				        			else{
				        				uni.showToast({
				        					title: '删除失败',
				        					icon: 'none',
				        				});	
				        			}
				        	    }
				        	},
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
					"pagesize":_self.pagesize,
					"keyword":_self.keyword,
				};
				_self.getData(data);
			},
			getData(data){
				this.sendRequest({
				        url : this.GetAllStudentsUrl,
				        method : _self.Method,
				        data : {
							"guid": data.guid,
							"token":data.token,
							"page":data.page,
							"pagesize":data.pagesize,
							"keyword":data.keyword,
							"com_id":data.com_id,
							"t":Math.random()
						},
				        hideLoading : true,
				        success: (res) => {
				        	    if(res){
									var data = res.subcompanylist;
									let list = [];
									let idlist = [];
									list.push("=所属机构=");
									idlist.push(0);
									for (var i = 0; i < data.length; i++) {
										var item = data[i];									
										list.push(item.com_name);
										idlist.push(item.com_id);
									}								
									_self.cList = list;
									_self.cIDList = idlist;	
									
									
				        	    	data = res.studentslist.list; 
				        			if(parseInt(res.status) == 3){
				        				if(data.length > 0){
				        					let list = [];
				        					for (var i = 0; i < data.length; i++) {
				        						var item = data[i];
				        						list.push(item);
				        					}								
				        					_self.dataList = list;
											_self.total = res.studentslist.count;
				        				}
				        			}
				        			else{
				        				uni.showToast({
				        					title: '无数据为空',
				        					icon: 'none',
				        				});		
				        				
				        			}
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
	  		background:url(@/static/img/classs.png) 10upx 25upx no-repeat;
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
		padding-top: 40upx;
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
	.search{
		height: 60upx;
		line-height: 60upx;	
		background: url(/static/img/search.png) 15upx 20upx no-repeat;
		background-size:40upx 40upx;
		padding-left: 55upx;
	}
	.search .searchbtn{
		width: 25%;
		float: left;
		height: 70upx;
		line-height:70upx;
	}
	.search .m-input{
		border:1px solid #999;
		width: 25%;
		height: 70upx;
		line-height:70upx;
		text-align: center;
		float: left;
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
