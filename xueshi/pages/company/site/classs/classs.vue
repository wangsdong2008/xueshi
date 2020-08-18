<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				全部班级
			</view>	
		</view>
		<view class="line"></view>
		<view class="content">	
				<view class="icenter">
				<!-- 一般用法 -->
				<uni-collapse>					
						<uni-collapse-item v-for="(item,index) in dataList" :title="item.com_name" :open="(index == 0?true:false)" thumb="/static/img/company.png" :index="index" :key="item.com_id" >
							
							<uni-collapse>
								<uni-collapse-item v-for="(item2,index2) in item.schoollist" :title="item2.school_name" :index="index2" :open="(index2 == 0?true:false)" class="subcategory" :key="item2.school_id" >
									
									<ul>
										<li class="t2" v-for="(item3,index3) in item2.classlist" :index="index3" :key="item3.class_id">
											<view class="fz35">{{item3.class_name}}</view>
											<view class="statuslist"><span class="fz30" @tap="classedit(item3.class_id)">修改</span><span class="fz30" @tap="classdel(item3.class_id)">删除</span></view>
										</li>
									</ul>
									
									
								</uni-collapse-item>
							</uni-collapse>					
							
						</uni-collapse-item>
					   
					</uni-collapse>
				</view>
			    <view class="btn-row">
					<button type="primary" class="btn" @tap="classadd">添加班级</button>
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
				headermsg:'班级管理,Class Manage',
				footer:''
			}
		},
		methods:{
			classadd(){
				_self.navigateTo('classsedit');
			},
			classedit(id){				
				_self.navigateTo('classsedit?id='+id);
			},
			classdel(id){
				let ret = _self.getUserInfo();
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
				        url : this.DelClassinfoUrl,
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
				        					title: '删除班年级成功',
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
				    token: ret.token
				};
				_self.getData(data);
			},
			getData(data){
				this.sendRequest({
				        url : this.GetAllClassUrl,
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
	
</style>
