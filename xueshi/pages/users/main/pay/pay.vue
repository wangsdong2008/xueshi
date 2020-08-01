<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				会员续费
			</view>	
			<view class="main-body write lists">
				<ul>
					<li class="fz35">会员有效期至：{{userinfo.endtime}}</li>
				</ul>
			</view>
			
			<view class="main-body write lists">
				<ul>
					<li class="utitle fz35">续费</li>
					<li class="li30 grids">
						<ul>
							<li :class="{
									'fz30':true,
									'grid-item-box':true,
									'active':item.activer
								}" v-for="(item, index) in dataList" :index="index" :key="index" @click="even(index)">￥{{item.c_price}}元/{{item.c_month}}月</li>
						</ul>
						<view class="clear"></view>
					</li>				
				</ul>
				<view class="clear"></view>
			</view>			
			
			<view class="main-body write lists">
				<radio-group @change="payChange">
					<ul>
						<li class="utitle">支付方式</li>
						<li class="li40">
							<label class="uni-list-cell uni-list-cell-pd" >							
							<view class="radio_text wxpaycss"><radio class="radios" value="1" checked />微信</view>
							</label>
							<view class="clear"></view>
						</li>
						<li class="li40">
							<label class="uni-list-cell uni-list-cell-pd" >							
							<view class="radio_text alipaycss"><radio class="radios" value="2" />支付宝</view>
							</label>
							<view class="clear"></view>
						</li>
					</ul>
				</radio-group>	
				<view class="clear"></view>
				<view class="btn-row">
					<button type="primary" class="btn" @tap="bindpay">去支付</button>
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
		background:url(@/static/img/xf.png) 10upx 22upx no-repeat;
		-webkit-background-size:50upx 50upx ;
		background-size:50upx 50upx;
		line-height: 60upx;
		height: 60upx;
		padding: 15upx 0upx 15upx 70upx;
	}
	.radios{
		margin-right: 100upx;
	}
	.wxpaycss,.alpaycss{
		line-height: 60upx;
		height: 60upx;		
		width:auto;
		float: left;
		padding-left: 0upx;
	}
	.wxpaycss{
		background:url(@/static/img/weixin.png) 80upx 14upx no-repeat;
		-webkit-background-size:50upx 50upx ;
		background-size:50upx 50upx;		
	}
	.alipaycss{
		background:url(@/static/img/alipay.png) 80upx 14upx no-repeat;
		-webkit-background-size:50upx 50upx ;
		background-size:50upx 50upx;		
	}
	.lists{
		/* border:1upx solid #eaeaea; */
		width:100%;
		margin: 0 auto;
		margin-top: 20upx;
	}
	
	.utitle{
		color: green;
		border-bottom: 1upx solid #eee;
		margin-bottom: 20upx;
		margin-top: 60upx;
		padding-bottom:10upx;
		overflow: hidden;
	}
	
    .grid-item-box{
		width: 30%;
		border: 1upx solid #eee;
		float: left;
		margin-right: 20upx;
		padding: 20upx 0upx;
		text-align: center;
		height: 60upx;
		line-height: 60upx;
		color:#666;
		border-radius: 15upx;
	}
	
	.grid-item-box:last-child{
		margin-right: 0;
	}
	
	.active{
		background-color:#007AFF;
		color:#fff;
		border: 0upx;
	}
	
	.li40{
		height: 65upx;
		line-height: 65upx;	
		border:1upx solid #eee;		
		padding: 20upx;
		border-radius: 50upx;
		margin-bottom: 30upx;
		
	}
	
	.radio_text{
		margin-left: 10upx;
		margin-right: 40upx;
	}
	.uni-list-cell-pd view{
		width: auto;
		float: left;
		font-size: 35upx;
	}
	.uni-list-cell-pd view image{
		width: 60upx;
		height: 60upx;
		vertical-align: middle;
		margin-right: 30upx;
	}
	.uni-list-cell-pd view radio{
		margin-top: 0upx;
		margin-left: 20upx;
	}
	
	
</style>

<script>
	
	function random(lower, upper) {
		return Math.floor(Math.random() * (upper - lower+1)) + lower;
	}  
	
	import mInput from '@/components/m-input.vue'
	import headerNav from "@/components/header/users_header.vue"
	import footerNav from "@/components/footer/users_footer_nav.vue"
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	
	var _self;
	
	export default {
	    components: {			
			mInput,headerNav,footerNav,uniGrid,uniGridItem 
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
				starttime:'',
				endtime:'',
				childface:'',
				user_identity:0,
				num:0,
				payitems: [
					{
						imgurl:'/static/img/weixin.png',
						value: '1',
						name: '微信'
					},
					{
						imgurl:'/static/img/alipay.png',
						value: '2',
						name: '支付宝'
					}
				],
				payid:1,
				headermsg:'会员中心,Member Center',
				footer:'',
			}
		},
		methods:{
			payChange: function(evt) {
				_self.payid = evt.detail.value;
			},
			bindpay(){
				let alipay = _self.payAccount.alipaylist;
				let payid = parseInt(_self.payid);
				let nums = parseInt(_self.num);	
				let cguid = _self.dataList[nums].c_guid;
				let ret = _self.getUserInfo();
				if(!ret){
					return;
				}
				uni.req	
				var url = '';
				switch(payid){
					case 1:{ //微信支付
						//url = '../pay/wxpay';
						
					/* appid: 应用ID,
							noncestr: 随机字符串,
							package: 'Sign=WXPay', // 固定值，以微信支付文档为主
							partnerid: 商户号,
							prepayid: 预支付交易会话ID,
							timestamp: 时间戳,
							sign: 签名 ,// 根据签名算法生成签名 */
						//
						let obj = {							
							appid: 'wx0411fa6a39d61297',
							noncestr: '5JigiIJicbq8hQI2',
							package: 'Sign=WXPay',
							partnerid: '1230636401',
							prepayid: 'wx21204902147233e222e12d451613768000',
							timestamp: 1582257316,
							sign: '0E5C9B9B1C8D7497A234CCC3C721AB1F'
						};
						// 第一种写法，传对象
						//let orderInfo = obj;
						// 第二种写法，传对象字符串
						let orderInfo = JSON.stringify(obj);
						
						uni.requestPayment({
							provider: 'wxpay',
							orderInfo: orderInfo, // 订单数据							
							success: function (res) {
								// 支付成功的回调中 创建绘本馆成功
								uni.showToast({
									title: '微信支付成功',
									icon: 'success',
									duration: 1500
								});
							},
							fail: function (err) {
								// 支付失败的回调中 用户未付款
								uni.showToast({
									title: '支付取消',
									duration: 1500,
									image: '/static/png/error_icon.png'
								});
							}
						});
						// 
						break;
					}
					case 2:{//支付宝支付						
						let d = new Date();
						let order_sn = '';
						let currentday =  '';
						let price = 0;
						
						_self.sendRequest({
						    url : _self.getMemberCostUrl,
						    method : _self.Method,
						    data : {
								"guid": ret.guid,
								"token":ret.token,
								"cguid":cguid,
								"status":1,
								"t":Math.random()
							},
						    hideLoading : false,
						    success:function (res) {
								let data = res;
								price = res.membercostlist.c_price;
								order_sn = res.membercostlist.order_sn;
								currentday = res.membercostlist.currentday;
								var orderInfo = 'app_id='+alipay.app_id+'&biz_content='+alipay.biz_content+'&charset='+alipay.charset+'&method='+alipay.method+'&notify_url='+alipay.notify_url+'&out_trade_no='+order_sn+'&product_code='+alipay.product_code+'&sign_type='+alipay.sign_type+'&subject=mysql&timestamp='+currentday+'&total_amount='+price+'&version=1.0&sign=';
								uni.requestPayment({
									provider: 'alipay',
									orderInfo: orderInfo, // 订单数据
									success: function (res) {
										if (res.resultCode == 6001) {
											uni.showToast({
												title: '支付取消',
												icon: 'none',
												duration: 1500
											});
										} else {
											uni.showToast({
												title: '支付宝支付成功',
												icon: 'success',
												duration: 1500
											});
										}
									},
									fail: function (err) {
										// 支付失败的回调中 用户未付款
										uni.showToast({
											title: '支付取消',
											duration: 1500,
											icon: 'none'
										});
									}
								});	
								
						    }
						},"1","");
						 //根据response中的结果继续业务逻辑处理
						break;
					}
				}				
			},
			even(index){
				_self.num = index;
				let list = _self.dataList;
				for(let i = 0;i<list.length; i++){
					list[i].activer = false;
				}
				list[index].activer = true;
				_self.dataList = list;				
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
								    title: '修改成功'
								});
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
				    hideLoading : true,
				    success:function (res) {
						if(res){
							//debugger;
							let data = res;
							if(data.status == 3){
								let userinfo2 = data.userinfo;
								_self.userinfo = userinfo2;
								_self.nick_name = userinfo2.nick_name;
								_self.childface = _self.PicUrl + 'users' + userinfo2.face;
								
								let costdata = data.costlist;
								let list = [];					
								for (var i = 0; i < costdata.length; i++) {
									var item = costdata[i];
									list.push(item);
									///idlist.push(item.class_id);
								}								
								_self.dataList = list;
								_self.num = 0;
							}
						}
				    }
				},"1");				
			}
			
		}
	}
		
</script>