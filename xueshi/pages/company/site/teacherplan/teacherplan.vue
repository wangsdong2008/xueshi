<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				员工上课安排
			</view>	
		</view>
		<view class="line"></view>
		<view class="content">
				<view class="icenter">
					<!-- 一般用法 -->
					<uni-collapse>					
						<uni-collapse-item v-for="(item,index) in dataList" :title="item.com_name" :open="true" thumb="/static/img/company.png" :index="index" :key="item.com_id" >
							
							<ul>
								<li class="t2" v-for="(item2,index2) in item.memberlist" :index="index2" :key="item2.id">
									<view class="fz35">{{item2.true_name}}</view>
									<view class="statuslist fz30"><span class="fz25" @tap="planedit(item2.guid)">详情</span></view>
								</li>
							</ul>
							
							
							
						</uni-collapse-item>
					   
					</uni-collapse>
				</view>
				<view class="btn-row">
					<button type="primary" class="btn" @tap="memberadd">添加员工</button>
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
				headermsg:'员工管理,Member Manage',
				footer:''
			}
		},
		methods:{			
			planedit(id){				
				_self.navigateTo('teacherplandetail?id='+id);
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
				_self.sendRequest({
				        url : _self.GetAllMemberlistUrl,
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
	  		background:url(@/static/img/sk.png) 10upx 25upx no-repeat;
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
		margin-top: 0upx;
	}
	.statuslist span{
		margin-right: 10upx;
	}	
	
	
</style>
