<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				个人资料
			</view>
		</view>
		<view class="line"></view>
		<view class="content">
			<view class="main-body write lists">
				<view class="register_account_input">
					<m-input class="m-input" type="text" clearable v-model="nick_name" placeholder="请输入昵称"></m-input>
				</view>
				<!-- <view class="register_account_input">
					<m-input class="m-input" type="text" clearable v-model="true_name" placeholder="请输入姓名"></m-input>
				</view> -->
				<view class="btn-row">
					<button type="primary" class="btn" @tap="bindsaveuserinfo">保存</button>
				</view>
			</view>	
		</view>
		<view class="footer">
			<footerNav :msg="footer"></footerNav>
		</view>		
	</view>
</template>
<style>	
    .content .title{
		background:url(@/static/img/power.png) 10upx 22upx no-repeat;
		-webkit-background-size:50upx 50upx ;
		background-size:50upx 50upx;
		line-height: 60upx;
		height: 60upx;
		padding: 15upx 0upx 15upx 70upx;
	}

	.register_account_input view{
		float: left;
		margin-bottom: 10upx;
	}
	.register_account_input{
		padding-top: 20upx;
		padding-bottom: 10px;
		border-bottom: 1px solid #eeeeee;
		line-height: 60upx;
		height: 60upx;
	}	
	
</style>

<script>
	import mInput from '@/components/m-input.vue'
	import headerNav from "@/components/header/users_header.vue"
	import footerNav from "@/components/footer/footer_nav.vue"
	
	var _self;
	
	export default { 
	    components: {			
			mInput,headerNav,footerNav
		},
		onLoad(){
			_self = this;
			_self.checkLogin(0);
		},
		onReady() {
			_self.show();
		},
		data(){
			return{
				userinfo:[],
				dataList:[],
				nick_name:'',
				true_name:'',
				user_identity:0,
				headermsg:'会员中心,Member Center',
				footer:''
			}
		},
		methods:{			
			bindsaveuserinfo(){
				if(_self.nick_name.trim() == '' || _self.nick_name.trim().length == 0){
					uni.showToast({
					    icon: 'none',
					    title: '请填写昵称'
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
							"nick_name":_self.nick_name,
							"true_name":_self.true_name,
							"status":0,
							"t":Math.random()
						},
				        hideLoading : false,
				        success:function (res) {
							let data = res;
							if(parseInt(data.status) == 3){
								
								_self.userinfo = data.userinfo;
								uni.showToast({
								    icon: 'none',
								    title: '修改成功',
									duration:2000,
									url:'account'
								}); 
								//_self.navigateTo('main');
							}
				        }
				    },"1");
			},
			show(){
				let ret = _self.getUserInfo();
				const data = {
				    guid: ret.guid,
				    token: ret.token
				};
				_self.getData(data);
			},
			getData(data){
				let ret = _self.getUserInfo();
				_self.sendRequest({
					url : _self.getUsersInfoUrl,
				    method : _self.Method,
				    data : {"token":ret.token,"guid":ret.guid,"t":Math.random()},
				    hideLoading : false,
				    success:function (res) {
						if(res){
							let data = res;
							if(data.status == 3){
								_self.userinfo = data.userinfo;
								_self.nick_name = _self.userinfo.nick_name;
								_self.true_name = _self.userinfo.true_name;
							}
						}
				    }
				},"1");				
			}
			
		}
	}
		
</script>