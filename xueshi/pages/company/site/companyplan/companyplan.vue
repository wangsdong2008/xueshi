<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				全部安排
			</view>	
		</view>
		<view class="line"></view>
		<view class="content">
			<view class="icenter">
				<!-- 一般用法 -->
				<uni-collapse>					
					<uni-collapse-item v-for="(item,index) in dataList" :title="item.com_name" :open="item.activer" thumb="/static/img/company.png" :index="index" :key="item.com_id" >
						<ul>
							<li class="t2"  v-for="(item2,index2) in item.planlist" :index="index2" :key="item2.id" >
								<view class="fz35">{{'【'+item2.cat_name+'】'+item2.uname}}</view>
								<view class="statuslist fz30"><view class="editor" @tap="companyplanedit(item2.uid,item2.cat_id)"></view><view class="delete" @tap="companyplandel(item2.uid,item2.cat_id)"></view></view>
							</li>
						</ul>
					</uni-collapse-item>
				</uni-collapse>
			</view>
			<view class="btn-row">
				<!-- <button type="primary" class="btn" @tap="companyplanaddone">单人添加</button> -->
				<button type="primary" class="btn" @tap="companyplanadd">批量添加</button>
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
				headermsg:'上课安排管理,Companyplan Manage',
				footer:''
			}
		},
		methods:{
			companyplanaddone(){
				_self.navigateTo('companyplanedit');
			},
			companyplanadd(){
				_self.navigateTo('companyplanadd');
			},
			companyplanedit(id,cat_id){				
				_self.navigateTo('companyplanedit?id='+id+"&cat_id="+cat_id);
			},
			companyplandel(id,cat_id){
				let ret = _self.getUserInfo();
				if(!ret){
					return false;
				}
				const data = {
				    guid: ret.guid,
				    token: ret.token,
					id:id,
					cat_id:cat_id
				};
				_self.delData(data);
			},
			delData(data){
				_self.sendRequest({
				        url : _self.DelCompanyplaninfoUrl,
				        method : _self.Method,
				        data : {
							"guid": data.guid,
							"token":data.token,
							"id":data.id,
							"cat_id":data.cat_id,
							"t":Math.random()
						},
				        hideLoading : false,
				        success: (res) => {
				        	    if(res){					    	
				        			if(parseInt(res.status) == 3){
				        				_self.show();
				        				uni.showToast({
				        					title: '删除成功',
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
				        url : this.GetAllCompanyplanUrl,
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
	  		background:url(/static/img/plan.png) 10upx 25upx no-repeat;
	  		-webkit-background-size:50upx 50upx ;
	  		background-size:50upx 50upx;
	  		line-height: 60upx;
	  		height: 60upx;
	  		padding: 15upx 0upx 15upx 70upx;
	  	}
		
	.icenter{
		width: 96%;
		margin: 0 auto;
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
