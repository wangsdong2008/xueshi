<template>
	<view class="main">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">输入短信验证码</view>
			<view class="forms">
				<input class="register-input register-input-mail" type="number" clearable focus v-model="code" placeholder="填写验证码" maxlength="4" /><br />
				<input class="register-input register-input-password" type="password" clearable v-model="password" placeholder="填写密码" /><br />
				<input class="register-input register-input-password" type="password" clearable  v-model="againpassword" placeholder="填写确认密码" /><br />
			</view>
			<view class="btn">
				<button class="btn" type="primary" @tap="register">注册</button>
			</view>
		</view>
	</view>
</template>

<script>
	import service from '@/service.js';
	import headerNav from "@/components/header/users_header.vue";
	import md5 from '@/static/js/md5.js';
	var _self;
	export default {
		components: {
		   headerNav
		},
		data() {
		    return {
				headermsg:'注册,Register',
				code:'',
				password: '',
				againpassword: '',
				mobile:'',
				recommend:'', //推荐人手机
				sessionid:''
		    }
		},
		onLoad(options) {
			_self = this;
			_self.mobile = options['mobile'];
		},
		methods: {
			register() {
				if(!service.checkMobile(_self.mobile)){
				    uni.showToast({
				        icon: 'none',
				        title: '手机号码不合法'
				    });
				    return;
				}
				
				if(!service.checkNull(_self.code)){
				    uni.showToast({
				        icon: 'none',
				        title: '验证码不能为空'
				    });
				    return;
				}
				
			    if (_self.password.length < 6) {
			        uni.showToast({
			            icon: 'none',
			            title: '密码最短为 6 个字符'
			        });
			        return;
			    }
				if (_self.againpassword.length < 6) {
				    uni.showToast({
				        icon: 'none',
				        title: '密码最短为 6 个字符'
				    });
				    return;
				}
				if(_self.againpassword != _self.password){
					uni.showToast({
					    icon: 'none',
					    title: '两次密码不一致，请重新填写！'
					});
					return;
				}
				
			    const data = {
			        password: md5(_self.password),
					againpassword: md5(_self.againpassword),
			        mobile: _self.mobile,
					recommend:_self.recommend,
					code:_self.code
			    }
			    _self.addUsers(data);
			    /* uni.showToast({
			        title: '注册成功'
			    });
			    uni.navigateBack({
			        delta: 1
			    }); */
			}
			
		}
	}
</script>


<style lang="scss">
	.forms{
		margin: 60upx 0;
	}
	.title{	
		font-size: 60upx;
		color: $main_color;
		text-align: left;
	}
	.fw{
		font-size:35upx;
		color:$color;
		text-align: left;
		margin-top: 10upx
	}
	

</style>
