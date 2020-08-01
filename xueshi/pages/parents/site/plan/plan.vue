<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				一周学习时间安排
			</view>		
				<view class="contentslist">
					<ul class="childlist">
						<li v-for="(item,index) in dataList" :show-arrow="true" :index="index" :key="item.child_id"  :class="{
						'boys':(item.sex==1),
						'grils':(item.sex==0),
						'xblist':true,
						'clist':true,
						'activer':item.open
						}" v-on:click = "changeweek(index)">
						<span class="childname">{{item.child_name}}</span>
						<ul :class="{
							'weeklists':true,
							'showchild':item.open,
							'hidechild':!item.open
						}">
							<li :open="true" :option="true" v-for="(item2,index2) in item.weeklist" :index="index2" :show-arrow="true" :class="{
								'colweek':true,
								'activer2':item.open
							}"  v-on:click = "changeweek2(index,index2)" @click.stop="doSomething($event)">
								<span class="weekname">{{item2.weekname}}
									<view :class="{
										'activer_list':true,
										'activer_icon_channel':!item2.open,
										'activer_icon':item2.open
									}"></view>
								</span>
								<ul class="plsit" :class="{
										'showchild':(item2.open == true),
										'hidechild':(item2.open == false)
									}">
									<li :show-arrow="false" v-for="(item3,index3) in item2.list" :index="index3" :key="item3.p_id">
										<view class="courselistname">{{item3.c_name + '（'+item3.p_time +'）'}}</view>
										<view class="modi" @click.stop="delplan(item3.p_id,index,index2,index3);doSomething($event)" >删除</view>
										<view class="clear"></view>
									</li>
								</ul>
							</li>
						</ul>
						</li>
					</ul>
				</view>
			<button type="primary" class="btn" @tap="planadd">添加上课安排</button>
			<button type="primary" class="btn" @tap="planedit">编辑上课安排</button>
		</view>
		<view class="footer">
			<footerNav :msg="footer"></footerNav>
		</view>
	</view>
</template>

<script>
	import service from '@/service.js';	
	import headerNav from "@/components/header/company_header.vue"
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	import footerNav from "@/components/footer/users_footer_nav.vue"
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
				headermsg:'学习时间安排,Study Plan',
				footer: ''
			}
		},
		methods:{
			doSomething(e){
				 try{
				        e.stopPropagation();//非IE浏览器
				    }
				    catch(e){
				        window.event.cancelBubble = true;//IE浏览器
				    }   
			},
			changeweek(id){
				_self.dataList[id*1].open = !_self.dataList[id*1].open;
			},
			changeweek2(item2,weekid){
				var status = _self.dataList[item2*1]['weeklist'][weekid].open;
				if(status){
					status = false;
				}else{
					status = true;
				}
				_self.dataList[item2*1]['weeklist'][weekid]['open'] = status;
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
				_self.sendRequest({
			       url : _self.ChildWeekUrl,
			       method : _self.Method,
			       data : {
						"guid": data.guid,
						"token":data.token,
						"t":Math.random()
					},
			       hideLoading : false,
			       success:function (res) {					  
					if(res){
						var data = res.childlist; 
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
			},
			planadd(){
				uni.navigateTo({
					url: './planshow',
				});
			},
			planedit(){
				uni.navigateTo({
					url: './planedit',
				});
			},
			delplan(id,index,index2,index3){
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
				_self.sendRequest({
				       url : _self.DelChildPlanUrl,
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
								_self.dataList[index]['weeklist'][index2]['list'].splice(index3,1);	
							}
						}
				       }
				   },"1","");
			},
			showplan(id){
				_self.navigateTo('./planshow?id='+id);
			}
		}
	}
	
</script>

<style>
	.content .title{
		background:url(/static/img/plan.png) 10upx 25upx no-repeat;
		-webkit-background-size: 40upx 40upx;
		background-size: 40upx 40upx;
		padding-left: 60upx;
		line-height: 80upx;
	}
	.weekname{
		font-size: 30upx;
	}
	.showchild{
		display: block;
	}
	.hidechild{
		display: none;
	}
	ul{
		list-style-type: none;
		margin: 0px;
		padding: 0;
	}
	.childname{
		margin-left: 40upx;
	}
	ul.weeklists{
		background-color: #fff;
		border-radius: 20upx;
		padding:0px;
		margin: 0;
		padding-left: 40upx;
		margin-bottom: 20upx;
	}
	ul.plsit{
		padding:0px;
		margin: 0;
		padding-left: 40upx;
		background-color: #fff;
	}
	.courselistname{
		float: left;
		font-size: 30upx;
	}
	.modi{
		float: right;
		margin-right: 20upx;
		font-size: 30upx;
	}
	.clist{
		background-color: #EAEAEA;
		color: #000;
		margin:20upx 0upx;
		padding:5upx 20upx;
		border-radius: 25upx;
		margin-bottom: 40upx;
		line-height: 85upx;		
	}
	.activer{
		background-color: #66CCFF;
		color: #fff;
	}
	.activer2{
		border-radius: 5upx;
		padding-left: 20upx;
		color: #fff;	
		position: relative;
	}	
	.activer_icon{
		background:url(/static/img/down.png) 10upx 25upx no-repeat;
		-webkit-background-size: 40upx 40upx;
		background-size: 40upx 40upx;		
	}
	.activer_icon_channel{
		background:url(/static/img/up.png) 10upx 25upx no-repeat;
		-webkit-background-size: 40upx 40upx;
		background-size: 40upx 40upx;
	}
	.activer_list{
		width:60upx;
		height: 60upx;
		float: right;
		top:0upx;
		margin-right: 20upx;
	}
	
	
	
	.colweek{
		color:#3b4144;
	}
	.colweek uni-image{
		width:60upx;
		height: 60upx;
	}
	.colbg{
		color:#fff;
		background-color: #66ccff;
		margin-bottom: 40upx;
		border-radius: 25upx;		
		
	}
	
	
	.statuslist{
		position:absolute;
		right: 40upx;
		font-size: 30upx;
		margin-top: 10upx;
	}
	.statuslist span{
		margin-right: 10upx;
	}
	.uni-list-item{
		font-size: inherit;
		border: 0upx;
	}
	.uni-list-item .uni-view{
		padding: 10upx;
		border: 0upx;
	}
	.uni-list{
		padding-bottom: 0upx;
		padding: 10upx 0px;
		/* border: 1upx solid #f00; */
		margin-bottom: 0upx;		
	}

	
</style>