<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				孩子管理
			</view>
		</view>
		<view class="line"></view>
		<view class="content">
			<view>
				<ul class="detail">
					<li v-for="(item,index) in dataList" :index="index" :key="item.child_id" :class="{
						'boys':(item.sex == 1),
						'grils':(item.sex == 0)
					}">
						<view :class="{
							'cname':true,
							'grey':(item.is_show == 0)
						}">{{item.child_name}}</view>
						<view class="statuslist fz35"><view class="editor" @tap="showchild(item.child_id)"></view><view class="delete" @tap="delchild(item.child_id,item.sex)"></view></view>
						<view class="clear"></view>
					</li>
				</ul>
			</view>
		</view>
		<view class="line"></view>
		<view class="content">
			<view class="btn-row">
				<button type="primary" class="btn"  @tap="childadd">添加孩子</button>
			</view>
		</view>
	    <view class="footer">
	    	<footerNav :msg="footer"></footerNav>
	    </view>
	</view>
</template>
<script>
	import service from '@/service.js';
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'		
	import headerNav from "@/components/header/users_header.vue"
	import footerNav from "@/components/footer/footer_nav.vue"
	var _self;
	export default {
	    components: {
			headerNav,
			uniCollapse,
			uniCollapseItem,
			footerNav
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
				headermsg:'孩子管理,Children Manage',
				footer: ''
			}
		},
		methods:{
			childadd(){
				uni.navigateTo({
					url: './childshow',
				});
			},
			delchild(id,sex){
				let sexs = (parseInt(sex)==1?'他':'她'); 
				if(!confirm("删除孩子，"+sexs+"的上课安排也被删除，确定要删除此孩子吗？")) return false;
				//debugger;
				let ret = _self.getUserInfo();
				if(!ret){
					uni.showToast({
						title: '孩子不存在',
						icon: 'none',
					});	
					return false;
				}
				const data = {
				    guid: ret.guid,
				    token: ret.token
				};
				this.sendRequest({
				       url : this.DelChildrenUrl,
				       method : _self.Method,
				       data : {
						"guid": data.guid,
						"token":data.token,
						"id":id,
						"t":Math.random()
						},
				       hideLoading : false,
				       success:function (res) {
							if(res){
								var data = res; 
								if(parseInt(res.status) == 0){
									uni.showToast({
										title: '删除失败',
										icon: 'none',
									});		
								}else{
									var data = res.list;
									if(parseInt(res.status)==3){
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
				
			},
			showchild(id){
					uni.navigateTo({
					    url: 'childshow?id='+id,
					});
			},
			show(){
				let ret = _self.getUserInfo();
				if(!ret){
					return;
				}
				const data = {
				    guid: ret.guid,
				    token: ret.token
				};
				_self.getData(data);
			},
			getData(data){
				this.sendRequest({
				       url : this.AllChildrenUrl,
				       method : _self.Method,
				       data : {
						"guid": data.guid,
						"token":data.token,
						"t":Math.random()
					   },
				       hideLoading : true,
				       success:function (res) {						
						if(res){							
							var data = res.list; 
							if(data != undefined){
								if(parseInt(res.status)==0){
									/* uni.showToast({
										title: '无数据',
										icon: 'none',
									});		 */
								}else{	
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
	.content .title{
		background:url(/static/img/userHL.png) 10upx 25upx no-repeat;
		-webkit-background-size: 40upx 40upx;
		background-size: 40upx 40upx;
		padding-left: 60upx;
		line-height: 80upx;
	}
	
	ul.detail li{
		line-height: 90upx;
		padding-left: 70upx;
		margin-bottom: 10upx;
	}
	.cname{
		float: left;
	}
	.statuslist{
		float: right;
		right: 0upx;
		top:0upx;
	}
	.statuslist span{
		margin-right: 20upx;
	}
</style>