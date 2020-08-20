<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content"></view>
		<view class="line"></view>
		<view class="content">
			<view>
				<ul>
					<li class="lists fz35" v-for="(item,index) in dataList" :key="index" @tap="bindclick(index,1)">{{item.text}}</li>
				</ul>
			</view>
			{{version}}
		</view>
		<view class="line"></view>
		<view class="content">
			<view class="fw">
				<navigator url="./xy">服务协议</navigator> | <navigator url="./ys">隐私政策</navigator>
			</view>
			<view class="cpy">Copyright 2020-2021 Yuwen.All Rights Reserved.</view>
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
		onLoad(){
			_self = this;
			_self.checkLogin(0);
		},
		data(){
			return{
				dataList:[
					{"text":"版本更新","url":""},
					{"text":"功能介绍","url":"./gn"},
					{"text":"隐私保护指引","url":"./ysbh"},
					{"text":"反馈","url":""}
				],
				headermsg:'学时,Xueshi',
				footer: ''
			}
		},
		methods:{
			bindclick:function(num,pos){
				switch(pos){
					case 1:{
						_self.navigateTo(_self.dataList[num].url);	
						break;
					}
					case 2:{
						_self.navigateTo(_self.dataList2[num].url);
						break;
					}
				}			
			},
		}
	}
</script>

<style>
	.cpy{
		margin-top: 20upx;
		font-size: 30upx;
		text-align: center;
		line-height: 45upx;
	}
	 .fw{
		 text-align: center;	
		margin-top: 50upx;
	 }
	 .fw navigator{
		 font-size: 35upx;
		 margin-right: 20upx;
		 margin-left: 20upx;
	 }
	.content .title{
		background:url(/static/img/about.png) 10upx 25upx no-repeat;
		-webkit-background-size: 40upx 40upx;
		background-size: 40upx 40upx;
		padding-left: 60upx;
		line-height: 80upx;
	}
	li image{
		height: 45upx;
		width: 45upx;     
		margin-right: 20upx;
	}
</style>
