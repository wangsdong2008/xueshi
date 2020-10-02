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
				<view class="facecss">
					<!-- <image :src="facedata" mode="" @tap="upload" :style="'position:absolute;width:'+imageW+'upx;height:'+imageH+'upx;'"></image> -->
					<avatar						
						selWidth="180px" selHeight="180px" expWidth="150px" expHeight="150px" ref='avatar' fileType='png'
						:avatarSrc="url" @upload="myUpload" quality="1" inner=true			
						avatarStyle="width: 180px; height: 180px; margin: 0px;">
					</avatar>
				</view>
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
	.facecss{
		width: 380upx;
		height: 380;
		border:1upx solid #666;
	}
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
	import avatar from "@/components/yq-avatar/yq-avatar.vue";
	
	var _self;
	
	export default { 
	    components: {			
			mInput,headerNav,footerNav,avatar
		},
		onLoad(){
			_self = this;
			_self.checkLogin(0);
		},
		onReady() {
			_self.show();
		},
		computed:{
			captchaSrc(){
				//return this.facedata.replace(/[\r\n]/g, "");
			}
		},
		data(){
			return{
				userinfo:[],
				dataList:[],
				nick_name:'',
				true_name:'',
				user_identity:0,
				facedata:'',
				imageW:300,
				imageH:300,
				headermsg:'会员中心,Member Center',
				url:'',
				footer:''
			}
		},
		methods:{
			clk() {
				let avatar = this.$refs.avatar;
				avatar.fChooseImg(1, {selWidth: "480upx", selHeight: "480upx", expWidth: "280upx", expHeight: "280upx", inner:true, canRotate: true, canScale:true}, {data: 'xxx'});
			},
			myUpload(rsp) {	
				//debugger;
				//_self.url = rsp.path;
				
				//app获取图片转成base64;
				const path = plus.io.convertLocalFileSystemURL(rsp.path) //绝对路径
				const fileReader = new plus.io.FileReader()
				fileReader.readAsDataURL(path)
				fileReader.onloadend = (res) => { //读取文件成功完成的回调函数
				    //console.log(res.target.result) //输出base64内容					
					let datas1 = res.target.result;
					
					let ret = _self.getUserInfo();
					let datas = {
						"guid": ret.guid,
						"token": ret.token,	
						"imgdata":datas1,
						"t":Math.random()
					};
					
					//上传图片
					_self.sendRequest({
						url : _self.ChangeUserFaceUrl,
						method :_self.Method,
						data : datas,
						hideLoading : false,
						success: (res) => {
							let data = res;
							if(parseInt(data.status) == 3){	
								_self.url = rsp.path;
								
								//把新图片保存到缓存中去
								let d2 = {
									id:ret.id,
									mobile:ret.mobile,
									username:ret.username,
									true_name:ret.true_name,
									nick_name:ret.nick_name,
									token:ret.token,
									guid:ret.guid,
									time:ret.time,
									identity:ret.identity,
									is_brithday:parseInt(ret.is_brithday), //是否显示生日功能
									is_tw:parseInt(ret.is_tw),//体温
									is_sign:parseInt(ret.is_sign),//签到
									is_teacher:parseInt(ret.is_teacher),//老师
									is_time:parseInt(ret.is_time),//放学时间
									is_grade:parseInt(ret.is_grade),//班级			
									
									pay_status:ret.pay_status,
									face:data.imgpath,
									power:ret.power //权限
								}
								uni.removeStorageSync(_self.USERS_KEY);
								//存储数组前，将数组转为字符串
								//uni.setStorageSync(_self.USERS_KEY,JSON.stringify(d2));
								uni.setStorage({
								    key:_self.USERS_KEY,          //key String 本地缓存中的指定key
								    data: d2,               //data Any 需要存储的内容，只支持原生类型、及能够通过 JSON.stringify 序列化的对象
								    success: function () {       //success Function	接口调用成功的回调函数
								        //console.log('success');
								    }
								});
								
							}
						}
					},"1","");
					
				}
			
			},
			
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
				
				_self.nick_name = ret.nick_name;
				_self.true_name = ret.true_name;	
				//头像
				_self.url =  _self.WebUrl + ret.face;
				
				
				/* _self.sendRequest({
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
								//头像
								_self.url =  _self.userinfo.facedata;
								
							}
						}
				    }
				},"1");			 */	
			}
			
		}
	}
		
</script>