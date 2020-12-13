<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				课程分类
			</view>	
		</view>
		<view class="line"></view>
		<view class="content">	    
				<view class="icenter">
					<uni-collapse>					
						<uni-collapse-item v-for="(item,index) in dataList" :title="item.com_name" :open="true" thumb="/static/img/company.png" :index="index" :key="item.com_id" >						
							<ul>
								<li v-for="(item2,index2) in item.categorylist" :title="item2.cat_name" :index="index2" :key="item2.cat_id" :class="{
													'slist':true,
													 'xblist':true
													}">
									<view :class="{
										'css_course':true,
										'css_tname':true,
										'sname':true,
										'shows':(item2.is_show == 0)
										}">{{item2.cat_name}}</view>
									<view class="statuslist fz30"><view class="editor" @tap="categoryedit(item2.cat_id)"></view><view class="delete" @tap="categorydel(item2.cat_id)"></view></view>
									<view class="clear"></view>
								</li>
							</ul>	
										
										
						</uni-collapse-item>				   
					</uni-collapse>
				</view>
				<view class="btn-row">
					<button type="primary" class="btn" @tap="categoryadd">添加分类</button>
				</view>
		</view>
	    <view class="footer">
	    	<footerNav :msg="footer"></footerNav>
	    </view>
	</view>
</template>

<script>	
	import headerNav from "@/components/header/company_header.vue"
	import footerNav from "@/components/footer/footer_nav.vue"
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'	
	var _self;
	export default {
	    components: {
			headerNav,footerNav,
			uniCollapse,uniCollapseItem
		},
		onLoad(){	
			_self = this;
			_self.checkLogin(2);
		},
		onReady(){
			_self.show();
		},
		data(){
			return{
				dataList:[],				
				headermsg:'课程管理,Category Manage',
				footer:''
			}
		},
		methods:{
			categoryadd(){
				_self.navigateTo('categoryedit');
			},
			categoryedit(id){				
				_self.navigateTo('categoryedit?id='+id);
			},
			categorydel(id){
				let ret = uni.getStorageSync(_self.USERS_KEY);
				if(!ret){
					return false;
				}
				const data = {
				    guid: ret.guid,
				    token: ret.token,
					id:id
				};
				_self.delData(data);
			},
			delData(data){
				this.sendRequest({
				        url : this.DelCategoryInfoUrl,
				        method : _self.Method,
				        data : {
							"guid": data.guid,
							"token":data.token,
							"id":data.id,
							"t":Math.random()
						},
				        hideLoading : false,
				        success: (res) => {
				        	    if(res){					    	
				        			if(parseInt(res.status) == 3){
				        				_self.show();
				        				uni.showToast({
				        					title: '删除课程成功',
				        					icon: 'none',
				        				});	
				        			}
				        			else{
				        				uni.showToast({
				        					title: '删除失败，请检查此课程是否删除干净',
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
				    token: ret.token
				};
				_self.getData(data);
			},
			getData(data){
				this.sendRequest({
				        url : this.GetAllSubCompanyCategoryUrl,
				        method : _self.Method,
				        data : {
							"guid": data.guid,
							"token":data.token,
							"t":Math.random()
						},
				        hideLoading : true,
				        success: (res) => {
				       	    if(res){
				       	    	var data = res.subcompanylist; 
				       			if(parseInt(res.status) == 3){
				       				if(data.length > 0){
				       					let list = [];
				       					for (var i = 0; i < data.length; i++) {
				       						var item = data[i];
				       						list.push(item);
				       					}								
				       					_self.dataList = list;
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
	.content .title{
	  		background:url(@/static/img/category.png) 10upx 25upx no-repeat;
	  		-webkit-background-size:50upx 50upx ;
	  		background-size:50upx 50upx;
	  		line-height: 60upx;
	  		height: 60upx;
	  		padding: 15upx 0upx 15upx 70upx;
	  	}	
	.shows{
		color:#ccc;
	}
	.xblist{
		padding-left: 40upx;
		position: relative;
	}
	.time0{
		margin-left: 20upx;
	}
	
	.icenter ul{
		list-style-type: none;
		margin: 0;
		padding: 0;
	}
	li.slist{
		line-height: 75upx;
		padding-bottom: 20upx;
		position: relative;
		background-color: #fff;
		border-bottom: 1upx solid #eee;
	}
	.sname{
		float: left;
		font-size: 35upx;
	}
	.statuslist{
		position: absolute;
		right: 20upx;
		top:0upx
	}
	
	
	.icenter{
		width: 100%;
		margin: 0 auto;
	}
	
	.statuslist{
		position:absolute;
		right: 30upx;
		font-size: 30upx;
		margin-top: 10upx;
	}
	.statuslist span{
		margin-right: 10upx;
	}
	
</style>
