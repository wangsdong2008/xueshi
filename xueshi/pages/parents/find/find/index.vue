<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				发现
			</view>	
		</view>
		<view class="content">
			<view class="icenter">					
				<view class="findaddress fz30">当前位置：{{location}}</view>	
				
				<view class="courseinput fz30">
					<m-input class="m-input fz30" type="text" clearable focus v-model="searchInput" placeholder="填写课程名"></m-input>
				</view>
				<view class="register_account_input form">
					<radio-group @change="radioChange" class="fz30">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
						<radio class="radios" :value="item.value" :checked="item.show == true" />{{item.name}}
						</label>						
					</radio-group>	
				</view>				
				<view class="btn-row">
					<button type="primary" class="primary btn" @tap="bindfind">{{findtxt}}</button>
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
	import mInput from '@/components/m-input.vue';
	import headerNav from "@/components/header/users_header.vue"
	import footerNav from "@/components/footer/users_footer_nav.vue"
	
	var _self;
	
	export default {
	    components: {			
			headerNav,footerNav,mInput
		},		
		onLoad(options){
			_self = this;
			_self.checkLogin(0);
		},
		onReady() {
			_self.show();
		},
		data(){
			return{
				headermsg:'发现,Find',
				footer:'',
				location:'',
				searchInput:'',
				distance:2, //2公里
				findtxt:'搜索机构',
				items: [
					{
						show:true,
						value: '2',
						name: '二公里内'
					},{
						show:false,
						value: '5',
						name: '五公里内'
					},{
						show:false,
						value: '10',
						name: '十公里内'
					}
				],
				longitude:0,
				latitude:0
			}
		},
		methods:{
			bindfind(){
				if(!service.checkNull(_self.searchInput)){
					uni.showToast({
					    icon: 'none',
					    title: '课程不能为空'
					});
					return;
				}
				_self.navigateTo('searchresult?keyword='+_self.searchInput+"&longitude="+_self.longitude+"&latitude="+_self.latitude+"&distance="+_self.distance);
			},
			radioChange(evt){
				var current = evt.detail.value;
				_self.distance = current;	
			},
			show(){
				let ret = _self.getUserInfo();
				const data = {
				    guid: ret.guid,
				    token: ret.token,
					id:_self.guid
				};
				_self.getData(data);
			},			
			getData(data){
				_self.showgps();
			},
			showgps(){
				uni.getLocation({
				  // 默认为 wgs84 返回 gps 坐标，
				  // gcj02 返回国测局坐标，可用于 uni.openLocation 的坐标
				  type: 'wgs84',
				  geocode: true,
				  success: (data) => {
					if (data.address){						
						  _self.location = data.address.city + data.address.district; // +data.address.street;
						  _self.longitude = data.longitude;
						  _self.latitude = data.latitude;
					}
				  },
				  fail: (err) => {
					console.log(err)
					// this.$api.msg('获取定位失败');
				  }
				});
			}
				
		}
	}
</script>

<style>
	label{
		margin-right: 20upx;
	}
	.register_account_input{
		margin-top: 30upx;
	}
	.courseinput{
		margin-top: 20upx;
		border: 1upx solid #333;
		border-radius: 50upx;
		height: 65upx;
		line-height: 65upx;		
	}
	.m-input{
		height: 65upx;
		line-height: 65upx;
		text-indent: 40upx;
	}
	.findaddress{
		background:url(@/static/img/address.png) 10upx 22upx no-repeat;
		-webkit-background-size:30upx 30upx ;
		background-size:30upx 30upx;
		line-height: 70upx;
		padding-left: 50upx;
	}
	.content .title{
		background:url(@/static/img/findHL.png) 10upx 22upx no-repeat;
		-webkit-background-size:50upx 50upx ;
		background-size:50upx 50upx;		
		padding: 15upx 0upx 15upx 70upx;
	}
	.titles{
		border-bottom: 1upx solid #ccc;
		padding-bottom: 20upx;
	}
	.contents{
		padding-top: 20upx;
		line-height: 45upx;
	}
	.times{
		text-align: right;
		margin-right: 20upx;
	}
	
	.icenter{
		width: 95%;
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

