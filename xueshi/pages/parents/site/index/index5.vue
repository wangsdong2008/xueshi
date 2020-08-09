<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				会员中心
			</view>	
		</view>
		<view class="line"></view>
		<view class="content">
			<view class="main-body write lists">
				<ul>
					<li class="lists fz35" v-for="(item,index) in dataList" :key="index" @tap="bindclick(index)"><image :src="'/static/img/'+item.image"></image>{{item.text}}</li>
				</ul>
			</view>
		</view>
		<view class="line"></view>
		<view class="content">
			<view class="main-body write lists">
				<ul>
					<li class="lists fz35" v-for="(item2,index2) in dataList2" :key="index2" @tap="bindclick(index2)"><image :src="'/static/img/'+item2.image"></image>{{item2.text}}</li>
				</ul>
			</view>
		</view>
		
		<view class="footer">
				<footerNav :msg="footer"></footerNav>
			</view>
	</view>
</template>

<script>
	import service from '@/service.js';
	import uniSection from '@/components/uni-section/uni-section.vue'	
	import headerNav from "@/components/header/users_header.vue"
	import footerNav from "@/components/footer/users_footer_nav.vue"
	
	var _self;
	
	export default {
	    components: {
			uniSection,			
			headerNav,
			footerNav,
			service			
		},
		data(){
			return{
				dataList:[
					{"image":"couse.png","text":"课程设置","url":"../course/course"},
					{"image":"userHL.png","text":"孩子管理","url":"../child/child"},
					{"image":"plan.png","text":"上课安排","url":"../plan/plan"},
					{"image":"tiaoke.png","text":"调课管理","url":"../tiaoke/tiaoke"},
					{"image":"qingjia.png","text":"请假管理","url":"../qingjia/qingjia"}
				],
				dataList2:[
					{"image":"baoming.png","text":"我的报名","url":"../enlist/enlist"},
					{"image":"etj.png","text":"上课统计","url":"../tongji/tongji"},
					{"image":"help.png","text":"帮助文档","url":"../help/help"},
				],	
				headermsg:'会员中心,Member Center',
				footer: 'familysite',
				course_name:'',
				longitude:0,
				latitude:0,
				currentaddress:''
			}
		},
		onLoad:function() {
			_self = this;
			_self.checkLogin(1);
		},
		onReady:function(){
			_self.show();
		},		
		methods:{
			show:function(){
				uni.getLocation({
				    type: 'wgs84',
				　　 geocode:true,
				    success: function (res) {
						_self.currentaddress = res.address.city;
						_self.longitude = res.longitude;
						_self.latitude = res.latitude;
						var currentWebview = _self.$mp.page.$getAppWebview();  
						currentWebview.setTitleNViewButtonStyle(0, {  
						    text: res.address.province,
						});  
				    }
				});
			},
			onNavigationBarButtonTap(e) {
				_self.bindsearch();
			},		
			onNavigationBarSearchInputChanged (e) {
			    //console.log("你在搜索框中输入了信息"+e.text);
				_self.course_name = e.text;
			},
			bindclick:function(num){
				_self.navigateTo(_self.dataList[num].url);				
			},			
			bindsearch(){
				/* if(_self.longitude == 0){  //没有经纬度的时候，获取经纬度
					//获取经纬度
					uni.getLocation({
					  // 默认为 wgs84 返回 gps 坐标，
					  // gcj02 返回国测局坐标，可用于 uni.openLocation 的坐标
					  type: 'wgs84',
					  geocode: true,
					  success: (data) => {
						this.longitude = data.longitude;
						this.latitude = data.latitude;
					  },
					  fail: (err) => {
						console.log(err)
						// this.$api.msg('获取定位失败');
					  }
					});
				} */
				if(!service.checkNull(this.course_name)){
					uni.showToast({
					    icon: 'none',
					    title: '课程不能为空'
					});
					return;
				}
				this.navigateTo('/pages/index/index/searchresult?keyword='+this.course_name+"&longitude="+this.longitude+"&latitude="+this.latitude);
			}
			
		}
	}
</script>

<style>	
	ul li:last-child{
		border-bottom: 0upx;
	}
	li.lists{
		height: 65upx;
		line-height: 65upx;
		border-bottom: 1upx solid #ccc; 
		padding:20upx 0upx;
	}
	li image{
		height: 45upx;
		width: 45upx;     
		margin-right: 20upx;
	}
	
	.content .title{		
		background:url(/static/img/userHL.png) 10upx 25upx no-repeat;
		-webkit-background-size: 40upx 40upx;
		background-size: 40upx 40upx;
		padding-left: 60upx;
		line-height: 80upx;
		
	}	
		
	
	
	
	
</style>