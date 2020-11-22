<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				手机号码
			</view>
		</view>
		<view class="line"></view>
		<view class="content">
			<view class="mobile"></view>
			<view class="mobilenum">你的手机号码：{{mobile_1}}***{{mobile_2}}</view>
			<view class="btn f30" @click="fclick()">更换</view>
		</view>
		<view class="line"></view>
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
			headerNav,footerNav
		},
		onLoad(){
			_self = this;
			_self.headermsg = "手机号码,Mobile";
			this.checkLogin(0);
		},
		onReady(){
			_self.mobile_1 = _self.mobile.substr(0,4);
			_self.mobile_2 = _self.mobile.substr(7,4);
		},
		data(){
			return{
				mobile:'13800138000',
				mobile_1:'',
				mobile_2:'',
				footer: ''
			}
		},
		methods:{
			fclick(){
				let url = 'modifymobile';
				_self.navigateTo(url);
			}
		}
		
	}
</script>

<style>
	.content .title{
		background:url(/static/img/mobile5.png) 10upx 25upx no-repeat;
		-webkit-background-size: 40upx 40upx;
		background-size: 40upx 40upx;
		padding-left: 60upx;
		line-height: 80upx;
	}
	.mobile{
		background:url(/static/img/mobile5.png) 10upx 25upx no-repeat;
		-webkit-background-size: 160upx 160upx;
		background-size: 160upx 160upx;
		width:200upx;
		height: 200upx;		
		margin: 0 auto;
		margin-top: 60upx;
	}
	.mobilenum{
		width:420upx;
		margin: 0 auto;
		font-weight: bold;
		margin-top: 60upx;
	}
	.btn{
		width:140upx;
		border-radius: 50upx;
		text-align: center;
		margin: 0 auto;
		margin-top: 40upx;
		height: 80upx;
		line-height: 80upx;
		border: 1upx solid #999;
		margin-bottom: 60upx;
	}
</style>
