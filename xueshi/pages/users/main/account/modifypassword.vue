<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				修改密码
			</view>	
</view>
		<view class="line"></view>
		<view class="content">			
			<view class="main-body write lists">
				<ul>				
					<li class="li30">					
						<m-input class="m-input" type="password" clearable focus v-model="old_password" placeholder="请输入旧密码"></m-input>					
					</li>
					<li class="li30">					
						<m-input class="m-input" type="password" v-model="new_password" placeholder="请输入新密码"></m-input>					
					</li>
					<li class="li30">					
						<m-input class="m-input" type="password" v-model="again_password" placeholder="请输入确认密码"></m-input>					
					</li>
				</ul>
				<button type="primary" class="btn" @tap="bindsaveuserinfo">修改</button>
			</view>
		</view>
		<view class="footer">
			<footerNav :msg="footer"></footerNav>
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
	.inputs {
		float: left;
		width: 60%;
		margin-right: 20upx;		
	}
	.li30{		
		padding: 20upx 20upx;
 		margin-bottom: 30upx;
		padding-left: 70upx;
		background:url(/static/img/password1.png) 30upx 25upx no-repeat;
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
	
	
</style>

<script>
	import service from '@/service.js'
	import mInput from '@/components/m-input.vue'
	import headerNav from "@/components/header/users_header.vue"
	import footerNav from "@/components/footer/footer_nav.vue"
	
	var _self;
	export default {
	    components: {			
			service,mInput,headerNav,footerNav
		},
		onLoad(){
			_self = this;
			this.checkLogin(0);
		},
		onReady() {
			this.show();
		},
		data(){ 
			return{
				old_password:'',
				new_password:'',
				again_password:'',
				headermsg:'会员中心,Member Center',
				footer:''
			}
		},
		methods:{
			bindsaveuserinfo(){
				if(!service.checkNull(_self.old_password)){
					uni.showToast({
					    icon: 'none',
					    title: '请填写旧密码'
					});
					return;
				}
				if(!service.checkNull(_self.new_password)){
					uni.showToast({
					    icon: 'none',
					    title: '请填写新密码'
					});
					return;
				}
				if(!service.checkNull(_self.again_password)){
					uni.showToast({
					    icon: 'none',
					    title: '请填写确认密码'
					});
					return;
				}
				if(_self.new_password != _self.again_password){
					uni.showToast({
					    icon: 'none',
					    title: '两次密码不一致，请重新输入'
					});
					return;
				}
				let ret = _self.getUserInfo();
				
				this.sendRequest({
				    url : this.ModifyUserInfoUrl,
				    method : _self.Method,
				    data : {
						"guid": ret.guid,
						"token": ret.token,	
						"old_password":_self.old_password,
						"new_password":_self.new_password,
						"again_password":_self.again_password,						
						"status":1,
						"t":Math.random()
					},
				    hideLoading : false,
				    success:function (res) {
						let data = res;
						let str = '';
						switch(parseInt(data.status)){
							case 1:{
								str = '两次密码不一致，请重新输入';
								break;
							}
							case 2:{
								str = '旧密码错误';
								break;
							}
							case 3:{
								str = '密码修改成功，请使用新密码登录';
								break;
							}
						}
						this.userinfo = data.userinfo;
						uni.showToast({
						    icon: 'none',
						    title: str
						});	
                    }
				},"1","");
			},
			show(){
				let ret = this.getUserInfo();
				const data = {
				    guid: ret.guid,
				    token: ret.token
				};
				this.getData(data);
			},
			getData(data){
				this.sendRequest({
			       url : this.getUsersInfoUrl,
			       method : _self.Method,
			       data : {"token":data.token,"guid":data.guid},
			       hideLoading : true,
			       success:function (res) {
						if(data.status == 3){
							this.userinfo = data.userinfo;
							this.nick_name = this.userinfo.nick_name;
						}
			       }
			   },"1","");	
			}
			
		}
	}
		
</script>