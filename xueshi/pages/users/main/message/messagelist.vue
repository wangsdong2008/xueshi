<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				我的消息
			</view>	
		</view>
		<view class="line"></view>
		<view class="content">			
			<view class="main-body write lists">
				<ul>
					<li :class="{
						'lists':true,
						'fz35':true,
						'messageopen':item.isread==1?true:false,
						'messageclose':item.isread==0?true:false
					}" v-for="(item,index) in dataList" :key="index" @tap="bindclick(item.message_id)">{{item.message_title}}</li>
				</ul>
				
			</view>
			<view>
				<uni-pagination @change="handlePage" :show-icon="true" :total="total" :current="page" :pageSize="pagesize" />
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
	import uniPagination from '@/components/uni-pagination/uni-pagination.vue'
	
	var _self;
	
	export default {
	    components: {
			headerNav,footerNav,uniPagination
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
				page:1,
				current: 1,
				total: 0,
				pagesize: 6,
				headermsg:'会员中心,Member Center',
				footer:'',
				dataList:[					
				],
				dataList2:[
					
				]
			}
		},
		methods:{
			navToDetailPage:function(e){
				let index = e.detail.index;
				let url = _self.data_ctgy[index].url;
				_self.navigateTo(url);
			},
			bindquit:function(){
				_self.quit();
			},
			bindclick:function(message_id){
				_self.navigateTo('messageshow?id='+message_id+"&page="+_self.page);
				
			},
			show(){
				let ret = this.getUserInfo();
				const data = {
				    guid: ret.guid,
				    token: ret.token
				};
				this.getData(data);
			},
			handlePage(params){
				//debugger;
				_self.page = params.current;
				_self.show();
			},
			getData(data){
				this.sendRequest({
				    url : _self.MessagelistUrl,
				    method : _self.Method,
				    data : {"token":data.token,"guid":data.guid,"page":_self.page,"pagesize":_self.pagesize,"t":Math.random()},
				    hideLoading : false,
				    success:function (res) {
						if(res){
						//	debugger;
							let data = res.messagelist;
							if(res.status == 3){
								let data1 = data.list;
								let list = [];
								for (var i = 0; i < data1.length; i++) {
									var item = data1[i];
									list.push(item);
								}								
								_self.dataList = list;
								_self.total =  data.count;
							}
						}
				    }
				},"1","");
			},
			upload(){
				var _self = this;
				uni.chooseImage({
				 count: 1,
				 sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				 sourceType: ['album'], //从相册选择
				 success: function (res) {					
					let ret = _self.getUserInfo();
					//debugger;
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
						_self.childface = uploadFileRes.data;
						uni.showToast({
							title: '上传成功',
							icon: 'none',
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

<style>	
	.content .title{
		background:url(@/static/img/message.png) 10upx 22upx no-repeat;
		-webkit-background-size:50upx 50upx ;
		background-size:50upx 50upx;
		line-height: 60upx;
		height: 60upx;
		padding: 15upx 0upx 15upx 70upx;
	}
	.messageopen{		
		background:url(@/static/img/messageopen.png) 10upx 22upx no-repeat;
		-webkit-background-size:40upx 50upx ;
		background-size:40upx 50upx;
	}
	.messageclose{
		background:url(@/static/img/messageclose.png) 10upx 22upx no-repeat;
		-webkit-background-size:40upx 50upx ;
		background-size:40upx 50upx;
	}
	li.lists{
		height: 75upx;
		line-height: 75upx;
		border-bottom: 1upx solid #ccc;	
		padding: 15upx 0 15upx 70upx;
	}
	li image{
		height: 55upx;
		width: 45upx;
		margin-right: 20upx;
	}
	.uni-pagination{
		margin: 0 auto;
		margin-top: 40upx;
	}	


	
	
</style>