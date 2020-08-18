<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<view class="register">
			<navigator url="../users/reg/reg">注册新用户</navigator>
		</view>
		<view>
			<navigator url="../company/company/index/index">点击进入</navigator>
		</view>
	</view>
</template>

<script>
	var _self;
	export default {
		data() {
			return {
				title: 'Hello-123'
			}
		},
		onLoad() {
			_self = this;
			_self.show();
		},
		onReady(){
			//_self.getsession();
			
		},
		methods: {
			/* getsession(){
				_self.getcurrentsession();	
			} */
			show(){
				//debugger;
				let ret = _self.getUserInfo();
				if(!ret){
					return false;
				}else{
					var identity = ret.identity;
					var url = "";
					switch(identity){
						case 1:{ //家长
							url = "../parents/parents/index";
							uni.reLaunch({
								url:url
							})
							break;
						}
						case 2:{ //机构
							url = "../company/company/index/index";
							uni.reLaunch({
								url:url
							})
							break;
						}
						
					}
				}
				
			}
		}
	}
</script>

<style>	
	navigator{
		color: #f00;
	}
	
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
