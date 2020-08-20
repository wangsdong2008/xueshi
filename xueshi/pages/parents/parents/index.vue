<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="gglist" v-if="gonggaonum>0">
				<ul class="gglistul">
					<li class="gglistulli ggitem fz25" v-for="(item3,ggindex) in gonggaoList" :index="ggindex" :key="item3.article_id" @tap="showgg(item3.guid)">{{item3.article_title}}</li>
				</ul>
			</view>
			<view class="title waring">				
				<view class="title2">
					<image class="title2image" src="/static/img/clock.png" mode=""></image>
					<view class="title2view">今日上课</view>
				</view>
				<view class="date">{{currenttime}}</view>
				<view class="clear"></view>
			</view>
			<view class="studentlist">			
					<view v-for="(item,index) in dataList" v-if="item.num > 0" :index="index" :key="item.child_id" class="classlist fz35">
						<view class="classlistview">
							<view :class="{
								'childname':true,
								'fz35':true,
								'boys':(item.sex == '1'),
								'grils':(item.sex == '0')
							}">{{item.child_name}}</view>
						</view>
						<view class="clear"></view>
						<view class="courseList">
							<ul class="courseListul">
								<li :class="{
									'txts':true,
									'fz30':true,
									'class_status0':(item2.class_status == '0'),
									'class_status1':(item2.class_status == '1'),
									'class_status3':(item2.class_status == '3')
									}" v-for="(item2,index2) in item.courselist" :index="index2" :key="item2.cat_id">
									{{item2.p_time+' ' + '【' + item2.c_name + '】'}}
									<span v-if="item2.organname">{{'-'+item2.organname}}</span>
									<span v-if="item2.c_address">{{'-'+item2.c_address}}</span>									
								</li>
							</ul>
						</view>	
					</view>				
			</view>
		</view>
		<view class="footer">
			<footerNav :msg="footer"></footerNav>
		</view>
	</view>	
</template>
<script>
	import headerNav from "@/components/header/users_header.vue"
	import footerNav from "@/components/footer/footer_nav.vue"
	
	var _self;	
	export default {
	    components: {
			footerNav,
			headerNav
		},
		data(){
			return{
				dataList:[],
				gonggaoList:[],
				gonggaonum:0,
				headermsg:'今日提醒,Remind today',
				footer: 'family',
				currenttime:'',
				extra1:{
					color: '#F00',size: '15',type: 'spinner'
				}
			}
		},
		onLoad(){
			_self = this;
			_self.checkLogin(1);
		},
		onReady() {
			var date = new Date();
			var str = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate()+ " " + "星期" + "日一二三四五六".charAt(new Date().getDay());
			_self.currenttime = str;
			_self.getData();
		},
		created() {
		    _self.currentTime();    
	    },		
		methods: {
			 // 销毁定时器
			beforeDestroy: function() {
			    if (_self.getDate) {
			        console.log("销毁定时器")
			        clearInterval(_self.getDate); // 在Vue实例销毁前，清除时间定时器
			    }
			},
			currentTime(){
			    setInterval(_self.getTime,10*60*1000);
			},
			getTime:function(){
				  _self.getData();
			},
			showgg:function(guid){
				_self.navigateTo('/pages/parents/gonggao/showgonggao?id='+guid);
			},
			getData() {
				let ret = uni.getStorageSync(_self.USERS_KEY);
				if(parseInt(ret.pay_status) == 0){ //过期会员去续费
					uni.showModal({
					    title: "提醒",
					    content: '会员已过期，请续费',
						cancelText:'留在本页',
						confirmText:'去续费',
					    success: function (res) {
					        if (res.confirm) {
								_self.navigateTo('/pages/users/main/pay/pay');
					        }
					    }
					});
				}else{
					_self.sendRequest({
						url : _self.DayClassUrl,
					    method : _self.Method,
					    data : {
							"token": ret.token,
							"guid": ret.guid,
							"t":Math.random()
						},
					    hideLoading : true,
					    success:function (res) {
							var data = res.list;
							if(data != undefined){
								switch(parseInt(res.status)){
									case 1:{
										/* uni.showToast({
											title: '无数据',
											icon: 'none',
										});	*/	
										break; 
									}
									case 3:{
										let num = 0;
										let list = [];
										for (var i = 0; i < data.length; i++) {
											var item = data[i];
											list.push(item);
											num = num + item.num*1;
										}		
										_self.dataList = list;
										break;
									}
								}								
								//公告内容
								let list = [];
								data = res.gonggaolist;
								if(data != undefined){
									_self.gonggaonum = res.gonggaonum;
									if(res.gonggaonum*1 > 0){
										for (var i = 0; i < data.length; i++) {
											var item = data[i];
											list.push(item);								
										}								
										_self.gonggaoList = list;
									}
								}
							}
						}
					},"1","");
				}			
			}
		}
	}
</script>

<style>	
.classlist{
		margin-bottom: 40upx;
		border-radius: 25upx;		
		padding: 4upx 0px 30upx 0upx;
		background-color: #66ccff;
		color:#fff;	
		padding-bottom: 40upx;
	}		
	.classlistdiv{
		width: 90%;
		margin: 6upx 10upx 10upx 10upx;	
	}	
	.childname{
		width: 85%;
		float: left;
		padding-left: 65upx;
		height: 70upx;
		line-height: 70upx;
		padding-top: 10upx;
		
	}
	.courseList{
		width: 95%;
		background-color: #fff;	
		border-radius: 15upx;
		margin: 0 auto;
	}
	.courseListul{
		list-style-type: none;
		margin: 0;
		padding: 0;
	}
	.txts{
		padding-left: 20upx;
		color:#999;
		line-height: 65upx;
	}
	
	.class_status0{
		color:#333;		
	}
	.class_status1{
		color:#66ccff;
	}
	.class_status3{
		color:#ccc;
	}
	.gglist{
		background:url(/static/img/gonggao.png) 0upx 0upx no-repeat;
		-webkit-background-size: 45upx 45upx;
		background-size: 45upx 45upx;
		height: 45upx;
		line-height: 45upx;
		padding-left: 50upx;
		overflow: hidden;
		color:#666;
	}
	.gglistul{
		list-style-type: none;
		padding: 0;
		margin: 0;
		color:#666;
	}
	.gglistulli{
		padding: 0;
		margin: 0;
	}
	.title2{
		
	}
	.title2image{
		width: 50upx;
		height: 50upx;
		float: left;
	}
	.title2div{
		width: auto;
		float: left;
	}
	.waring{
		position: relative;
		margin-bottom: 20upx;
	}
	.date{
		position: absolute;
		top:0upx;
		right:10upx;
		font-size: 25upx;
		height: 60upx;
		line-height: 60upx;
	}
	.classlist .uni-list .uni-list-item{
		border: none;
	}
	.studentlist{
		margin-top: 20upx;
		border-radius: 50upx;
	}
	.content{
		width:96%;
		margin: 0 auto;
		margin-top: 40upx;
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
	.uni-list{
		width:98%;
		margin: 0 auto;
		margin-bottom: 15upx;
		border-radius: 15upx;
	}

</style>