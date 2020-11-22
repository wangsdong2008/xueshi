<template>
	<view class="main_content">
		
		<headerNav :msg="headermsg"></headerNav>
		
		<view class="line"></view>
		<view class="content">
			
			<view class="main-body write lists">
				<ul>
					<li class="lists fz35" v-for="(item,index) in dataList" :key="index" @tap="bindclick(index,1)"><image :src="'/static/img/'+item.image"></image>{{item.text}}</li>
				</ul>
			</view>	
		</view>
		<view class="line"></view>
		<view class="content">
			<ul>
				<li class="lists fz35" v-for="(item2,index2) in dataList2" :key="index2" @tap="bindclick(index2,2)"><image :src="'/static/img/'+item2.image"></image>{{item2.text}}</li>		
			</ul>
		</view>
		<view class="line"></view>
		
		
	    <view class="footer">
	    	<footerNav :msg="footer"></footerNav>
	    </view>
	</view>
</template>

<script>	
	import service from '@/service.js';
	import headerNav from "@/components/header/users_header.vue"
	import footerNav from "@/components/footer/footer_nav.vue"
	
	var _self;
	
	export default {
	    components: {			
			footerNav,headerNav,service
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
					{"image":"userHL.png","text":"孩子管理","url":"../child/child"},
					{"image":"couse.png","text":"课程管理","url":"../course/course"},
					{"image":"plan.png","text":"上课安排","url":"../plan/plan"},
					{"image":"tiaoke.png","text":"调课管理","url":"../tiaoke/tiaoke"},
					{"image":"qingjia.png","text":"请假管理","url":"../qingjia/qingjia"},
					/* {"image":"etj.png","text":"上课统计","url":"../tongji/tongji"}, */
				],
				dataList2:[
					/* {"image":"gx.png","text":"个性设置","url":"../system/setup"}, */
					{"image":"baoming.png","text":"我的报名","url":"../enlist/enlist"},
					
					{"image":"help.png","text":"帮助文档","url":"../help/help"},
				],	
				
				longitude:0,
				latitude:0,
				currentaddress:'',
				
				headermsg:'会员中心,Member Center',
				footer: 'mine',
				version_num:0,
				version_url:''
			}
		},
		methods:{
			show2:function(){
				uni.getLocation({
				    type: 'wgs84',
				　　 geocode:true,
				    success: function (res) {
						_self.currentaddress = res.address.city;
						_self.longitude = res.longitude;
						_self.latitude = res.latitude;
						var currentWebview = _self.$mp.page.$getAppWebview();  
						currentWebview.setTitleNViewButtonStyle(0, {  
						    text: res.address.province,
						});  
				    }
				});
			},
			onNavigationBarButtonTap(e) {
				_self.bindsearch();
			},		
			onNavigationBarSearchInputChanged (e) {
			    //console.log("你在搜索框中输入了信息"+e.text);				
				_self.course_name = e.text;
			},
			bindsearch(){
				/* if(_self.longitude == 0){  //没有经纬度的时候，获取经纬度
					//获取经纬度
					uni.getLocation({
					  // 默认为 wgs84 返回 gps 坐标，
					  // gcj02 返回国测局坐标，可用于 uni.openLocation 的坐标
					  type: 'wgs84',
					  geocode: true,
					  success: (data) => {
						this.longitude = data.longitude;
						this.latitude = data.latitude;
					  },
					  fail: (err) => {
						console.log(err)
						// this.$api.msg('获取定位失败');
					  }
					});
				} */
				if(!service.checkNull(this.course_name)){
					uni.showToast({
					    icon: 'none',
					    title: '课程不能为空'
					});
					return;
				}
				let url = '/pages/parents/find/find/searchresult?keyword='+_self.course_name+"&longitude="+_self.longitude+"&latitude="+_self.latitude;				
				_self.navigateTo(url);
			},
			download:function() { //下载最新安装包
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
			bindclick:function(num,pos){
				switch(pos){
					case 1:{
						_self.navigateTo(_self.dataList[num].url);	
						break;
					}
					case 2:{
						_self.navigateTo(_self.dataList2[num].url);
						break;
					}
				}			
			},
			show(){
				let ret = _self.getUserInfo();
				_self.show2();//定位功能	
				
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
								/* _self.dataList[3].text = "我的消息("+data.messagenum+")";
								
								let vlist = data.versionlist; //获取最新版本信息
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
			}			
		}
	}
</script>

<style lang="scss">
	.bottom{
	}
	.quit{
		text-align: center;
	}
	li.lists{
		height: 60upx;
		line-height: 60upx;
		border-bottom: 1upx solid #ccc;
		padding:20upx 0upx;
	}
	li image{
		height: 45upx;
		width: 45upx;
		margin-right: 20upx;
	}

	.content .title{		
		background:url(/static/img/system.png) 10upx 25upx no-repeat;
		-webkit-background-size: 40upx 40upx;
		background-size: 40upx 40upx;
		padding-left: 60upx;
		
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
	
	ul li:last-child{
		border-bottom: 0upx;
	}

	
</style>