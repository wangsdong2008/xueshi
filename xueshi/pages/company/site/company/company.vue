<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				公司设置
			</view>	
			
		</view>
		<view class="line"></view>
		<view class="content">
			<ul class="css_detail">
				<li class="t2" v-for="(item,index) in dataList" :index="index" :key="item.com_id" >
					<view class="css_company css_tname">{{item.com_name}}</view>
					<view class="statuslist">
						<view class="editor" @tap="companyedit(item.com_id)"></view><view class="delete" @tap="companydel(item.com_id)"></view>
					</view>
				</li>
			</ul>			
			<view class="btn-row">
				<button type="primary" class="btn" @tap="companyadd">添加公司</button>
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
	var _self;
	export default {
	    components: {
			headerNav,footerNav
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
				headermsg:'公司管理,Company Manage',
				footer: ''
			}
		},
		methods:{
			companyadd(){
				_self.navigateTo('companyedit');
			},
			companyedit(id){				
				_self.navigateTo('companyedit?id='+id);
			},
			companydel(id){
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
				        url : this.DelCompanyInfoUrl,
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
				        					title: '删除公司成功',
				        					icon: 'none',
				        				});	
				        			}
				        			else{
				        				uni.showToast({
				        					title: '删除失败，请检查此公司是否删除干净',
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
				        url : this.GetAllSubCompanyUrl,
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
		border-bottom:1upx solid #ccc;
	}
	
	.t2 view{
		display: inline;
	}
	.content .title{
	  		background:url(@/static/img/company.png) 10upx 25upx no-repeat;
	  		-webkit-background-size:50upx 50upx ;
	  		background-size:50upx 50upx;
	  		line-height: 60upx;
	  		height: 60upx;
	  		padding: 15upx 0upx 15upx 70upx;
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
