<template>
	<view class="login_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				取回密码
			</view>	
		
				<view class="icenter">	
					<view class="register_account_input fz30">				
						<m-input class="m-input register-input register-input-mobile" type="text" clearable focus v-model="mobile" placeholder="填写注册的手机号码"></m-input>
					</view>
					<view class="register_account_input fz30 sms">
						<m-input class="m-input register-input register-input-mail" type="text" clearable v-model="code" placeholder="填写验证码"></m-input>		
						<button class="fz30 yzm" @tap="send_sms">获取验证码</button>
						<view class="clear"></view>
					</view>
					<view class="clear"></view>
					<view class="register_account_input fz30">
						<m-input class="m-input register-input register-input-password" displayable type="password" clearable v-model="password" placeholder="6-20位新登录密码"></m-input>
					</view>
					<view class="register_account_input fz30">
						<m-input class="m-input register-input register-input-password" displayable type="password" clearable v-model="againpassword" placeholder="再次确认新密码"></m-input>
					</view>			
					<view class="btn-row">
						<button type="primary" class="btn" @tap="getpassword">取回密码</button>
					</view>		
				</view>
			</view>
		</view>		
	</view>
</template>

<style>	
   .content .title{
		background:url(@/static/img/password.png) 10upx 22upx no-repeat;
		-webkit-background-size:50upx 50upx ;
		background-size:50upx 50upx;
		line-height: 60upx;
		height: 60upx;
		padding: 15upx 0upx 15upx 70upx;
	}
	
	.icenter{
		width: 95%;
		margin: 0 auto;
		margin-top: 30upx;
	}
	
	.register_account{
		margin-top: 30upx;
		margin-bottom: 20upx;
	}
	
	.register_account_input{
		padding-top: 20upx;
		padding-bottom: 10px;
		border-bottom: 1px solid #eeeeee;		
	}
	
	.register-input{		
		width:90%;
		height: 70upx;
		text-indent: 80upx;
	}
	.register-input-username{
		background:url(/static/img/user.png) no-repeat;
		-webkit-background-size:30upx 42upx ;
		background-size:30upx 42upx ;
	}
	.register-input-mobile{
		background:url(/static/img/mobile.png) no-repeat;
		-webkit-background-size:50upx 62upx ;
		background-size:50upx 62upx ;
	}
	.register-input-mail{
		background:url(/static/img/mail.png) no-repeat;
		width:100%;
		float: left;
		position: absolute;
	}	
	
	.register-input-password{
		background:url(/static/img/password.png) no-repeat;		
	}
	
	.btn1{
		width:40%;		
		top:10upx;
		margin-right: 0upx;
	}
	
	.sms{
		position: relative;
	}
	
	.login_content{
	        width: 100%;
	}
	
</style>

<script>
    import service from '@/service.js';
    import mInput from '@/components/m-input.vue';
	import headerNav from "@/components/header/company_header.vue";
	var _self;
	
	export default {
        components: {
            mInput,headerNav
        },
		onLoad(){
			_self = this;
		},
        data() {
            return {
				headermsg:'重设密码,Reset Password',
				code:'',
                password: '',
                againpassword: '',
				mobile:'',
				sessionid:''
            }
        },
        methods: {
			send_sms(){	
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
						"status":2
					};
					_self.sendsms2(data);
				}
			},
            getpassword() {                
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
                    password: _self.password,
					againpassword: _self.againpassword,
                    mobile: _self.mobile,
					code:_self.code
                }
                _self.ResetPassword(data);
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

