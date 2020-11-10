<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		
		<view class="content">
			<view class="title">
				搜索课程：{{course_name}}
			</view>	
		</view>
		
		<view class="line"></view>
		<view class="content">			
			<view class="searchlist">
				<view class="icenter">
					<ul class="courses">
						<li class="" v-for="(item,index) in dataList" :index="index" :key="item.cat_id" @tap="showcourse(item.userid,item.com_id,item.cat_id)" >
							<view class="fz35 cname">{{item.cat_name}}</view>
							<view class="courseaddress fz30">{{'【'+item.com_name + '】 ' + item.com_address + ' 距离' + (item.distance*1000).toFixed(2) + '米'}}</view>						
						</li>
						<view class="clear"></view>
					</ul>
					
				</view>
			</view>
				
		</view>	
		
		
		<view class="footer">
			<footerNav :msg="footer"></footerNav>
		</view>
	
	</view>
</template>
<script>
	import service from '@/service.js';
	import headerNav from "@/components/header/users_header.vue"
	import footerNav from "@/components/footer/footer_nav.vue"
	var _self;
	
	export default {
	    components: {
			headerNav,
			footerNav
		},
		onLoad(options) {
			_self = this;
			_self.checkLogin(0);
			_self.course_name = options['keyword'];
			_self.longitude = options['longitude'];
			_self.latitude = options['latitude'];	
			_self.distance = options['distance'];
		},
		onReady(){
			_self.show();
		},
		data(){
			return{
				headermsg:'查找结果,Search Result',
				course_name:'',
				latitude:0,
				longitude:0,
				distance:0,
				dataList:[],
				footer:''
			}
		},
		methods:{
			show(){
				let ret = _self.getUserInfo();
				if(!ret){
					return false;
				}
				const data = {
				    guid: ret.guid,
				    token: ret.token,
					keyword:_self.course_name,
					longitude:_self.longitude,
					latitude:_self.latitude,
					distance:_self.distance
				};				
				_self.getData(data);
			},
			showcourse(userid,com_id,cat_id){
				_self.navigateTo('showcourse?pid='+userid+"&comid="+com_id+"&cid="+cat_id);
			},
			getData(data){
				_self.sendRequest({
				        url : _self.SearchCourseUrl,
				        method : _self.Method,
				        data : {
							"token": data.token,
							"guid": data.guid,
							"keyword":data.keyword,
							"longitude":data.longitude,
							"latitude":data.latitude,
							"distance":data.distance,
							"t":Math.random()
						},
				        hideLoading : true,
				       success: (res) => {
				       		var data = res.courselist;
				       		switch(parseInt(res.status)){
				       			case 1:{
				       				uni.showToast({
				       					title: '无数据',
				       					icon: 'none',
				       				});		
				       				break;
				       			}
				       			case 3:{
				       				let list = [];
				       				for (var i = 0; i < data.length; i++) {
				       					var item = data[i];
				       					list.push(item);
				       				}								
				       				_self.dataList = list;
				       				break;
				       			}
				       		}
				       		
				       	}
				    },"1","");
			}
		}
	}
	
</script>
<style>	
	.cname{
		background:url(@/static/img/course.png) 10upx 12upx no-repeat;
		-webkit-background-size:50upx 50upx ;
		background-size:50upx 50upx;
		line-height: 60upx;
		border-bottom: 1upx solid #999;
		margin-bottom: 20upx;
		padding-bottom: 10upx;
		padding-left: 80upx;
	}
	.courses{
		margin: 0upx;
		padding: 0upx;
	}
	.courses li{
		border: 1upx solid #999;
		border-radius: 25upx;
		margin-bottom: 30upx;
		padding: 20upx 20upx 20upx 20upx;
	}	
	
	.content .title{
		background:url(@/static/img/tjsearch.png) 10upx 22upx no-repeat;
		-webkit-background-size:50upx 50upx ;
		background-size:50upx 50upx;
		line-height: 60upx;
		height: 60upx;
		padding: 15upx 0upx 15upx 70upx;
	}
	
	.icenter{
		width:100%;
		margin: 0 auto;
		margin-top: 20upx;
	}
	
	
</style>