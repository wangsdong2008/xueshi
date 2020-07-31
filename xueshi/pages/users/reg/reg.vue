<template>
	<div class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<div class="content">
			<div class="title">用手机号码注册</div>
			<div class="fw">注册即代表阅读并同意<navigator url="../../index/index">服务协议</navigator>和<navigator url="../../index/index">隐私政策</navigator></div>
			<div class="forms">
				<input class="register-input register-input-mobile" type="number" clearable focus v-model="mobile" placeholder="填写手机号码" maxlength="11" />
			</div>
			<div class="btn">
				<button class="btn" type="primary" @tap="register">下一步</button>
			</div>
			<div class="login"><navigator url="../login/login">已有账号登录</navigator></div>
		</div>
	</div>
</template>

<script>
	import service from '@/service.js';
	import headerNav from "@/components/header/users_header.vue";
	
	var _self;
	export default {
		components: {
		   headerNav
		},
		data() {
		    return {
				headermsg:'注册,Register',
				mobile:''
		    }
		},
		onLoad(){
			_self = this;			
		},
		methods: {
			register(){
				if(!service.checkMobile(_self.mobile)){
					uni.showToast({
					    icon: 'none',
					    title: '手机号码不合法'
					});
					return;
				}
				
				if(_self.temp_status == 1){ //测试
					try {
						uni.clearStorageSync();  
					} catch (e) {  
					// error  
					}
					debugger;
				}
				
				var ret = uni.getStorageSync(_self.Temp_KEY);
				if(ret == undefined || ret == ""){//如果不能获取的话，获取新的sessionid，防止软件直接注册
					return false;
				}else{
					//正常的页面，通过登录页面过来的
					const data = {
					    "token": ret.token,
					    "mobile": _self.mobile,
						"smsid":ret.smsid,
						"status":1
					};
					_self.sendsms2(data);
				}
			},
			gonext(){
				_self.navigateTo("./regpassword?mobile="+_self.mobile); 
			}
		}
	}
</script>

<style>
	.forms{
			margin: 80upx 0;
		}	
		.title{	
			font-size: 60upx;
			color: #000;
			text-align: left;
		}
		.fw{
			font-size:35upx;
			color:#333;
			text-align: left;
			margin-top: 20upx
		}
		.login{		
			text-align: center;
			margin-top: 50upx ;
		}
		
</style>
