<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				课程设置
			</view>
			<view>
				<!-- 一般用法 -->
				<uni-collapse>					
					<uni-collapse-item v-for="(item,index) in dataList" :index="index" :key="item.c_id" :title="'【'+item.c_name+'】'" thumb="/static/img/course.png" :open="false" :class="{
						'showclass':(item.is_show == 0)						
					}">
					<view class="details">
						<ul class="detail">
							<li class="organname fz35">{{item.organname}}</li>
							<li class="organaddress fz35">地址：{{item.c_address}}</li>
							<li class="organoprate fz35"><span @tap="showorgan(item.c_id)">修改</span><span @tap="delorgan(item.c_id)">删除</span></li>
						</ul>
					</view>
					</uni-collapse-item>
			 </uni-collapse>
			</view>
			<view class="btn-row">
				<button type="primary" class="btn" @tap="showorganadd">添加课程</button>
			</view>
		</view>
		<view class="footer">
			<footerNav :msg="footer"></footerNav>
		</view>
	</view>
</template>

<script>
	import service from '@/service.js';
	import headerNav from "@/components/header/company_header.vue"
	import footerNav from "@/components/footer/users_footer_nav.vue"
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'	
	var _self;	
	
	export default {
	    components: {
			headerNav,
			footerNav,
			uniCollapse,
			uniCollapseItem
		},
		onLoad(){
			_self = this;
			_self.checkLogin(1);
		},
		onReady(){
			_self.show();
		},
		data(){
			return{
				dataList:[],				
				headermsg:'课程设置,Course Manage',
				footer: ''
			}
		},
		methods:{
			showorganadd(){
				_self.navigateTo('courseedit');
			},
			showorgan(id){				
				_self.navigateTo('courseedit?id='+id);
			},
			DelData(data){
				var data2 = {
					"guid": data.guid,
					"token":data.token,
					"id":data.id,
					"t":Math.random()
				};
				this.sendRequest({
					url : this.DelOrganUrl,
				    method : _self.Method,
				    data : data2,
				    hideLoading : false,
				    success:function (res) {
						if(res){
							if(parseInt(res.status) == 3){	
								uni.showToast({
									title: '删除成功',
									icon: 'none',
								});
								var data = res.list;
								if(parseInt(res.status) == 3){
									let list = [];
									for (var i = 0; i < data.length; i++) {
										var item = data[i];
										list.push(item);
									}								
									_self.dataList = list;
								}		
								
							}else{
								uni.showToast({
									title: '删除失败',
									icon: 'none',
								});
							}					    	
						}
				    }
				},"1","");	
				
				
				/* uni.request({
					url: _self.DelOrganUrl,
					header: {
				        "Content-Type": "application/x-www-form-urlencoded"							 
				    },
				    data: data2,
				    method: "get",
					success: (res) => {
					   
					}
				}) */
			},			
			delorgan(id){
				let ret = _self.getUserInfo();
				if(!ret){
					return false;
				}
				const data = {
				    guid: ret.guid,
				    token: ret.token,
					id:id
				};
				_self.DelData(data);
			},
			show(){
				let ret = uni.getStorageSync(_self.USERS_KEY);
				if(!ret){
					return false;
				}
				const data = {
				    guid: ret.guid,
				    token: ret.token
				};
				_self.getData(data);
			},
			getData(data){
				this.sendRequest({
				       url : this.AllOrganUrl,
				       method : _self.Method,
				       data : {
						   "guid": data.guid,
						   "token":data.token,
						   "t":Math.random()
					   },
				       hideLoading : false,
				       success:function (res) {
							if(res){
								var data = res.list;
								if(parseInt(res.status) == 3){
									let list = [];
									for (var i = 0; i < data.length; i++) {
										var item = data[i];
										list.push(item);
									}								
									_self.dataList = list;
								}    	
							}
				       }
				   },"1","");
			}
			
		}
	}
	
</script>

<style>	
	.details{
		width: 100%;
		background: #fff;
	}
	ul.detail{		
		padding: 0upx;
		width: 80%;
		margin: 0 auto;
	}
	ul.detail li{
		line-height: 70upx;
	}
	.organname{
		background:url(/static/img/mechanismHL.png) 10upx 15upx no-repeat;
		-webkit-background-size: 40upx 40upx;
		background-size: 40upx 40upx;
		padding-left: 60upx;
	}
	.organaddress{
		background:url(/static/img/addressHL.png) 10upx 15upx no-repeat;
		-webkit-background-size: 40upx 40upx;
		background-size: 40upx 40upx;
		padding-left: 60upx;
	}
	.organoprate{
		text-align: right;
		margin-right: 0upx;
	}
	.organoprate span{
		margin-right: 20upx;
	}
	
	
	.content .title{		
		background:url(/static/img/category.png) 10upx 25upx no-repeat;
		-webkit-background-size: 40upx 40upx;
		background-size: 40upx 40upx;
		padding-left: 60upx;
		line-height: 80upx;
	}
	
	.statuslist{
		right: 40upx;
		font-size: 30upx;
		margin-top: 10upx;
	}	
</style>