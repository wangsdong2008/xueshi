<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="login_account">帐号</view>
			<view class="login_account_input">
				<input class="register-input register-input-mobile" type="number" clearable focus v-model="account" placeholder="请输入手机号码" />
			</view>
			<view class="login_account">密码</view>
			<view class="login_account_input">
				<input class="register-input register-input-password" type="password" displayable v-model="password" placeholder="请输入密码" />
			</view>
			<view class="login_account_input">
				<view class="remeber">
					<checkbox value="1" checked="checked" />
					<view class="ltxt">自动登录</view>
					<view class="clear"></view>
				</view>
			</view>
			<view class="btn-row">
				<button class="btn" type="primary" cursor @tap="bindLogin">登录</button>
			</view>
			<view class="action-row">
			    <navigator url="../reg/reg">注册账号</navigator>
			    <text>|</text>
			    <navigator url="../pwd/pwd">取回密码</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	import service from '@/service.js';
	import mInput from '@/components/m-input.vue'
	import headerNav from "@/components/header/users_header.vue";
	var _self;
	import {
	    mapState,
	    mapMutations
	} from 'vuex'
	
	export default {
	    components: {
	       /* mInput, */
			headerNav
	    },
		onLoad(){
			_self = this;
			_self.show();
		},
	    data() {
	        return {
				headermsg:'登录,login',
	            providerList: [],
				hasProvider: false,
	            account: '',
	            password: '',
	            positionTop: 0
	        }
	    },		
		computed: mapState(['forcedLogin']),
		methods: {
		    ...mapMutations(['login']),
			getsession(){
				_self.getcurrentsession();	
			},	
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
							url = "/pages/parents/parents/index";
							uni.reLaunch({
								url:url
							})
							break;
						}
						case 2:{ //机构
							url = "/pages/company/company/index/index";
							uni.reLaunch({
								url:url
							})
							break;
						}
						
					}
				}
			},
			bindLogin() {
                /**
                 * 客户端对账号信息进行一些必要的校验。
                 * 实际开发中，根据业务需要进行处理，这里仅做示例。
                 */
                if (_self.account.length != 11) {
                    uni.showToast({
                        icon: 'none',
                        title: '请输入手机号码'
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
                /**
                 * 下面简单模拟下服务端的处理
                 * 检测用户账号密码是否在已注册的用户列表中
                 * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
                 */
                const data = {
                    username: _self.account,
                    password: _self.password
                };
                /* const validUser = service.getUsers().some(function (user) {
                    return data.account === user.account && data.password === user.password;
                });
                if (validUser) {
                    _self.toMain(_self.account);
                } else {
                    uni.showToast({
                        icon: 'none',
                        title: '用户账号或密码不正确',
                    });
                } */
				_self.userLogin(data);
            },
            initPosition() {
                /**
                 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
                 * 反向使用 top 进行定位，可以避免此问题。
                 */
                _self.positionTop = uni.getSystemInfoSync().windowHeight - 100;
            },
			userLogin(data){
				//清空缓存			
				let name = data.username,password = data.password;
				//console.log(_self.LoginUrl);
				
				_self.sendRequest({
				        url : _self.LoginUrl,
				        method : _self.Method,
				        data : {
							"username": name,
							"password": password
						},
				        hideLoading : false,
				        success: (res) => {
				        	    var data = res;
				        	    if(data.status == 3){
				        			//清空原来的缓存
				        			try {
				        				uni.clearStorageSync();  
				        			} 
				        			catch (e) {  
				        			}
				        			
				        			var d = {
				        				id:data.id,
				        				mobile:data.mobile,
				        				username:data.username,
										true_name:data.true_name,
										nick_name:data.nick_name,
				        				token:data.token,
				        				guid:data.guid,
				        				time:data.time,
				        				identity:data.user_identity,
				        				is_brithday:data.is_brithday, //是否显示生日功能
										pay_status:data.pay_status,
										face:data.face,
										power:data.power //权限
				        			}
				        			let url = '';
				        			switch(parseInt(data.user_identity))
				        			{
				        				case 1:{
				        					url = 'parents/parents/index';
				        					break;
				        				}
				        				case 2:{
				        					url = 'company/company/index/index';
				        					break;
				        				}
				        				case 3:{
				        					url = 'teacher/teacher/index';
				        					break;
				        				}
				        			}
				        			url = '../../' + url;
				        			
				        			uni.setStorage({
				        				key:_self.USERS_KEY,
				        				data:d
				        			});
				        			
				        			uni.showToast({
				        				title: '登录成功!',
				        				mask: true,
				        				duration: 1500,
				        				success: function(){
				        					
				        				    uni.reLaunch({  
				        				        url: url  
				        				    }); 
				        					
				        				}  
				        			});	
				        			
				        			
				        		}else{
				        			uni.showToast({
				        				icon: 'none',
				        				title: '用户账号或密码不正确',
				        			});
				        		}
				        	}
				        
				    },"1","");
				//debugger;
			},			
			autoLogin(){
				let url = "users/login/login";
				let Storage = this.getUserInfo();
				if(Storage != "[]"){
					switch(parseInt(Storage.identity))
					{
						case 1:{
							url = 'parents/parents/index';
							break;
						}
						case 2:{
							url = 'company/company/index';
							break;
						}
						case 3:{
							url = 'teacher/teacher/index';
							break;
						}
					}
				}			
				url = '../../' + url;
				this.navigateTo(url);
			}
		},
		
        onReady() {
            _self.initPosition();
            /* _self.initProvider(); */
			_self.getsession();
			/* let ret = _self.getUserInfo();
			if(ret){
				_self.autoLogin();
			} */
        }
	}
</script>

<style lang="scss">	
	.action-row {
		display: flex;
	    flex-direction: row;
	    justify-content: center;
		margin-top: 40upx;
	}
	
	.action-row navigator {
	    color: #007aff;
	    padding: 20upx 20upx;
		font-size: 35upx;
	}
	.action-row text{
		font-size: 30upx;
		margin-top: 20upx;
	}	
	
	.remeber{
		font-size: 28upx;
		margin-top: 40upx;	
	}
	
	.remeber checkbox{
		float: left;
	}	
	.remeber .ltxt{
		float: left;
		width: 120upx;
	}
	
	.login_account_input{
		padding-top: 10upx;
	}
	.login_account{
		font-size: 32upx;
		font-family: '黑体';
		margin-top: 40upx;
	}
	.login_content{
	        width: 100%;/* 
	        height: 2500upx; */
	    }
	.title{
		background:url('@/static/img/login_title.png') #ffffff center 0 no-repeat;
	    background-size:100% 100%;
	    padding-bottom:20%
	}
	.login_center{
		width:85%;			
		margin: 0 auto;
	}
	.login_title_txt{
	    color:#fff;
	    font-family:'微软雅黑';
	    font-size:60upx;
	    padding-top:150upx;
	}
	.login_title_txt span{
	    font-size: 48upx;
	}
</style>
