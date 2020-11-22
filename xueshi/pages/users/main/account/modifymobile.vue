<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				更换手机
			</view>	
		</view>
		<view class="line"></view>
		<view class="content">			
			<view class="main-body write lists">
				<ul>
					<li class="li30">
						<m-input class="m-input" type="text" clearable focus v-model="old_mobile" placeholder="请输入旧手机"></m-input>
					</li>
					<li class="li30">
						<m-input class="m-input" type="text" v-model="new_mobile" placeholder="请输入新手机"></m-input>
					</li>
					<li class="li30 v2">
						<m-input class="m-input inputs" type="text" v-model="code" placeholder="请输入验证码"></m-input>
						<button class="fz30 yzm" @tap="bindcode">获取验证码</button>
						<view class="clear"></view>
					</li>
					<view class="clear"></view>
				</ul>
				<button type="primary" class="btn" @tap="bindsavemobile">更换</button>
			</view>
		</view>
		<view class="footer">
			<footerNav :msg="footer"></footerNav>
		</view>
	</view>
</template>
<style >
	.content .title{
		background:url(@/static/img/mobile5.png) 10upx 22upx no-repeat;
		-webkit-background-size:50upx 50upx ;
		background-size:50upx 50upx;
		line-height: 60upx;
		height: 60upx;
		padding: 15upx 0upx 15upx 70upx;
	}
	
	.li30{
		padding: 20upx 20upx;
		margin-bottom: 30upx;
		padding-left: 70upx;
		background:url(/static/img/mobile5.png) 30upx 25upx no-repeat;
		-webkit-background-size: 40upx 40upx;
		background-size: 40upx 40upx;
		border: 1upx solid #EEEEEE;
		line-height:60upx;
		height: 60upx;
		border-radius: 50upx;		
	}
	.li30 .m-input{
		line-height:60upx;
		height: 60upx;
		padding-left: 30upx;
	}	
	.v2{
		position: relative;
	}
	.yzm{
		position: absolute;
		right: 10upx;
	}
	.inputs {
		float: left;
		width:200upx;
		margin-right: 20upx;
	}	
	.lists{
		padding-top: 20upx;
	}
	
</style>

<script>
	import service from '@/service.js'
	import mInput from '@/components/m-input.vue'	
	import headerNav from "@/components/header/users_header.vue"
	import footerNav from "@/components/footer/footer_nav.vue"
	var _self;
	export default {
		components: {
			service,
			mInput,
			headerNav,
			footerNav
		},
		onLoad() {
			_self = this;
			_self.checkLogin(0);
		},
		onReady() {
			_self.show();
			_self.getcurrentsession();
		},
		data() {
			return {
				old_mobile: '',
				new_mobile: '',
				code: '',
				headermsg:'会员中心,Member Center',
				footer:''
			}
		},
		methods: {
			bindcode(){
				if(!service.checkMobile(_self.new_mobile)){
					uni.showToast({
					    icon: 'none',
					    title: '新手机号码不合法'
					});
					return;
				}
				
				if(this.temp_status == 1){ //测试
					uni.removeStorage({
					    key:_self.Temp_KEY,
					    success:function() {
					        console.log(' 移除成功')　　　　　
					    }
					});
				}
				
				//debugger;				
				var ret = uni.getStorageSync(_self.Temp_KEY);
				if(ret == undefined || ret == ""){//如果不能获取的话，获取新的sessionid，防止软件直接注册
					return false;
				}else{
					//通过更换手机页面过来的
					const data = {
					    "token": ret.token,
					    "mobile": _self.new_mobile,
						"smsid":ret.smsid,
						"status":3
					};
					_self.sendsms2(data);
				}
				
			},
			bindsavemobile() {
				if (!service.checkMobile(_self.old_mobile)) {
					uni.showToast({
						icon: 'none',
						title: '请填写旧手机'
					});
					return;
				}
				if (!service.checkMobile(_self.new_mobile)) {
					uni.showToast({
						icon: 'none',
						title: '请填写新手机'
					});
					return;
				}
				if (!service.checkNull(_self.code)) {
					uni.showToast({
						icon: 'none',
						title: '请填写验证码'
					});
					return;
				}
				
				let ret = _self.getUserInfo();
				 _self.sendRequest({
				        url : _self.ModifyUserInfoUrl,
				        method : _self.Method,
				        data : {
							"guid": ret.guid,
							"token": ret.token,
							"old_mobile": _self.old_mobile,
							"new_mobile": _self.new_mobile,
							"code": _self.code,
							"status": 2,
							"t": Math.random()
						},
				        hideLoading : false,
				        success:function (res) {
							//debugger;
				            //console.log("获取数据:" + JSON.stringify(res));
							let data = res;
							let str = '';
							switch (parseInt(data.status)) {
								case 1:
									{
										str = '旧手机错误';
										break;
									}
								case 2:
									{
										str = '手机号码不存在的';
										break;
									}
								case 3:
									{
										str = '手机修改成功，请使用新手机登录';
										break;
								}
								case 4:{
									str = '验证码不正确';
									break;
								}
							}
							//this.userinfo = data.userinfo;
							uni.showToast({
								icon: 'none',
								title: str
							});
							try {
								uni.clearStorageSync();
							} 
							catch (e) {  
							}
							this.reLaunchurl('../login/login');
							
				        }
				    },"1","");			
			},
			show() {
				let ret = this.getUserInfo();
				const data = {
					guid: ret.guid,
					token: ret.token
				};
				this.getData(data);
			},
			getData(data) {
				this.sendRequest({
					url : this.getUsersInfoUrl,
				    method : _self.Method,
				    data : {
						"guid": data.guid,
						"token": data.token,
						"t": Math.random()
					},
				    hideLoading : true,
				    success:function (res) {
						if (res) {
							let data = res;
							if (data.status == 3) {
								this.userinfo = data.userinfo; 
							}
						
						}
				    }
				},"1","");				
			}
		}
	}
</script>