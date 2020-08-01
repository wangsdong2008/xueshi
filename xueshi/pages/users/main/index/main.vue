<template>
	<view class="main_content">
		<view class="header-title">
		    <view class="login_center login_title_txt">
				<view class="header-img"><image :src="childface" mode=""  @click="upload"></image></view>
				<view class="titles"> <span>{{userinfo.nick_name}}</span></view>	
			</view>
			<view class="logo" :style="'background:url('+logo+') 0upx 0upx / 320upx 320upx no-repeat;'"> </view>
			<view class="logo" :style="'background:url('+logo+') 0upx 0upx no-repeat;-webkit-background-size: 320upx 320upx;background-size: 320upx 320upx;'"> </view>
		</view>	
		<view class="content">
			<view class="title">
				会员中心
			</view>		
			<view class="main-body write lists">
				<ul>
					<li class="lists fz35" v-for="(item,index) in dataList" :key="index" @tap="bindclick(index)"><image :src="'/static/img/'+item.image"></image>{{item.text}}</li>
				</ul>
			</view>	
		</view>
	    <view class="footer">
	    	<footerNav :msg="footer"></footerNav>
	    </view>
	</view>
</template>

<script>	
	import headerNav from "@/components/header/users_header.vue"
	import footerNav from "@/components/footer/users_footer_nav.vue"
	
	var _self;
	
	export default {
	    components: {			
			footerNav,headerNav
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
				name:'',
				en_name:'',				
				childface:'',
				userinfo:[],
				dataList:[					
					{"image":"power.png","text":"个人资料","url":"../account/account"},
					{"image":"password.png","text":"修改密码","url":"../account/modifypassword"},
					{"image":"mobile5.png","text":"更换手机","url":"../account/modifymobile"},					
					{image:'message.png',text:'我的消息(0)',url:"../message/messagelist"},
					{image:'xf.png',text:'续费',url:"../pay/pay"},
					{image:'quit.png',text:'退出',url:"../../login/loginout"},
				],
				headermsg:'会员中心,Member Center',
				footer: 'mine',
				version_num:0,
				version_url:''
			}
		},
		methods:{
			download:function() { //下载最新安装包
			debugger;
				alert('uni-app Runtime version：' + plus.runtime.uniVersion);
				if( _self.version_url == '') return false;
				const downloadTask = uni.downloadFile({
					url: _self.version_url,
					success: (res) => {
						if (res.statusCode === 200) {
							console.log('下载成功');
						}
						let that = this;
						uni.saveFile({
							tempFilePath: res.tempFilePath,
								success: function(red) {
									that.luj = red.savedFilePath
									console.log(red)
								}
							});
						}
					});
		 
					downloadTask.onProgressUpdate((res) => {
						console.log('下载进度' + res.progress);
						console.log('已经下载的数据长度' + res.totalBytesWritten);
						console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
				});
			},
			bindface:function(){
				//_self.childface = "http://192.168.1.103/uploadfile/users/20200220/f2ebe7a571357bd83c6708cdf702d44b.jpg";
			},
			navToDetailPage:function(e){
				let index = e.detail.index;
				let url = _self.data_ctgy[index].url;
				_self.navigateTo(url);
			},
			bindquit:function(){
				_self.quit();
			},
			bindclick:function(num){
				_self.navigateTo(_self.dataList[num].url);				
			},
			show(){
				let ret = _self.getUserInfo();
							
				
				if(!ret){					
					return false;
				}
				const data = {
				    guid: ret.guid,
				    token: ret.token
				};	
				_self.getData(data);
			},
			getData(data){
				_self.sendRequest({
				    url : _self.getUsersInfoUrl,
				    method : _self.Method,
				    data : {"token":data.token,"guid":data.guid,"t":Math.random()},
				    hideLoading : true,
				    success:function (res) {
						if(res){
							let data = res;
							if(data.status == 3){
								_self.userinfo = data.userinfo;
								let face = data.userinfo.face;
								if(face != null ){
									_self.childface = _self.PicUrl + 'users' + data.userinfo.face;
								}								
								_self.dataList[3].text = "我的消息("+data.messagenum+")";
								
								/* let vlist = data.versionlist; //获取最新版本信息
								let soft_Version = parseFloat(_self.version); //此软件版本号
								let version_num = parseFloat(vlist.v_num);
								if(version_num > soft_Version){
									_self.dataList[4].text = "系统升级(new)";
									_self.version_url = vlist.v_url;
								} */
								
								
							}
						}
				    }
				},"1","");
			},
			
			upload(){
				uni.chooseImage({
				 count: 1,
				 sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				 sourceType: ['album'], //从相册选择
				 success: function (res) {					
					let ret = _self.getUserInfo();
					var url = _self.ModifyParentfaceUrl;
					const tempFilePaths = res.tempFilePaths;
					const uploadTask = uni.uploadFile({
					"url" : url,
					"filePath": tempFilePaths[0],
					"name": 'file',
					"formData": {
						guid: ret.guid,
						token: ret.token,
						t:Math.random()
					},
					success: function (uploadFileRes) {
						let imgpath = uploadFileRes.data;
						_self.childface = imgpath;
						uni.showToast({
							title: '上传成功',
							icon: 'none'
						});						
					}
				});							 
				uploadTask.onProgressUpdate(function (res) {
					   _self.percent = res.progress;
					   console.log('上传进度' + res.progress);
					   console.log('已经上传的数据长度' + res.totalBytesSent);
					   console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
					  });
					},
					 error : function(e){
					  console.log(e);
					}
				});	
			}
		}
	}
</script>

<style lang="scss">
	
	li.lists{
		height: 65upx;
		line-height: 65upx;
		border-bottom: 1upx solid #ccc;
		padding:20upx 0upx;
	}
	li image{
		height: 45upx;
		width: 45upx;
		margin-right: 20upx;
	}

.content .title{		
		background:url(/static/img/userHL.png) 10upx 25upx no-repeat;
		-webkit-background-size: 40upx 40upx;
		background-size: 40upx 40upx;
		padding-left: 60upx;
		line-height: 80upx;
		height: 80upx;
		
	}	
	.titles{
		line-height: 40upx;
		margin-top: 20upx;
		text-align: left;
	}
	
	.header-title{
		background:url(/static/img/login_title.png) #ffffff center 0 no-repeat;
	    background-size:100% 100%;
	    padding-bottom:20%;
		padding-left: 50upx;
		position: relative;
	}
	
	.login_title_txt{
		padding-top: 55upx;
		z-index: 100;
		position: relative;
	}
	
	.logo{
		width:320upx;
		height: 320upx;
		position:absolute;
		top:90upx;
		left:400upx;
	}
	
	.header-img{
		width:150upx;
		height: 150upx;
		overflow: hidden;
		border-radius: 90upx;	
		border:1upx solid #fff;
		background-color: #fff;
		margin-top: 40upx;
	}
	
	.login_center image{
		width:150upx;
		height: 150upx;
		margin: 0 auto;
	}

	
</style>