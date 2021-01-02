<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				口算习题
			</view>
		</view>
		
		<view class="line"></view>
		<view class="content">
			<view class="ks_title f35">口算习题</view>
			<view class="ks_list">
				<ul>
					<li v-for="(item, index) in dataList" :index="index" :key="index">{{item.ks}}</li>
				</ul>
			</view>
			<view class="clear"></view>
		</view>
		
		<view class="line"></view>
		<view class="content">
			<view>
				<view class="share sh fz35">分享至：</view>
				<view class="share sh"><image class="weixin" @click="formSubmit"></image></view>
			</view>
		</view>
		
		<view class="footer">
			<footerNav :msg="footer"></footerNav>
		</view>
	</view>
</template>

<script>
	import service from '@/service.js';
	import mInput from '@/components/m-input.vue';
	import headerNav from "@/components/header/users_header.vue"
	import footerNav from "@/components/footer/footer_nav.vue"
	
	var _self;
	export default {
	    components: {
			service,
			headerNav,footerNav,
			mInput
		},
		onLoad(options){
			_self = this;
			_self.checkLogin(1);
						
			_self.num = options['n'];//数量
			_self.pos = options['p'];//括号位置
			_self.rang1_id = options['r1'];//第一个数字
			_self.rang2_id = options['r2'];//第二个数字
			_self.course_id = options['c'];//加减乘除			
			
		},
		onReady(){
			_self.show();
		},
		data(){
			return{
				headermsg:'口算题目',
				footer: '',
				num:0,//数量
				pos:0,//括号位置
				rang1_id:0,//第一个数字
				rang2_id:0, //第二个数字
				course_id:0,//加减乘除
				btntxt:'',
				dataList:[],
				pdfurl:'',//pdfurl
				detail:''//pdf描述
			}		
		},
		methods:{
			show(){
				//if(_self.child_id == 0 ) return;  //考虑添加功能,允许等于0
				let ret = _self.getUserInfo();
				if(!ret){
					return false;
				}
				
				const data = {
				    guid: ret.guid,
				    token: ret.token,
					num:_self.num,
					pos:_self.pos,
					rang1_id:_self.rang1_id,
					rang2_id:_self.rang2_id,
					course_id:_self.course_id
				};
				_self.getData(data);
				
			},
			getData(data){
				_self.sendRequest({
				    url : _self.KousuanUrl,
				    method : _self.Method,
				    data : {
				    			"guid": data.guid,
				    			"token":data.token,
				    			
				    			"num":_self.num,
				    			"pos":_self.pos,
				    			"rang1_id":_self.rang1_id,
				    			"rang2_id":_self.rang2_id,
				    			"course_id":_self.course_id,
				    			
				    			"t":Math.random()			
							},
				    hideLoading : true,
				    success:function (res) {
				    	if(res){				    		
				    		if(parseInt(res.status) == 3){
								var data = res.list; 
								_self.pdfurl = res.fname;
								_self.detail = res.detail;
								let list = [];
								for (var i = 0; i < data.length; i++) {
									var item = data[i];
									list.push(item);
								}								
								_self.dataList = list;
				    		}
				    	}
				    }
				},"1","");
			},
			formSubmit:function(){
			   var title = "口算习题";
			   var miaoshu = _self.detail;
			   var imgurl = "http://www.yuwenjiaoyu.net/static/img/pdf.png";
			   var url = _self.pdfurl;
			       
			       uni.share({
			           provider: "weixin",
			           scene: "WXSceneSession",
			           type: 0,
			           href: url,
			           title: title,
			           summary: miaoshu,
			           imageUrl: imgurl,
			           success: function (res) {
			               console.log(JSON.stringify(res));
			               uni.showToast({
			                   title: '已分享',
			                   duration: 2000
			               });
			           },
			           
			           fail: function (err) {
			       
			               var errrr = JSON.stringify(err);
			               if(errrr){
			                   uni.showModal({
			                   title: '表单不能留空',
			                   content: '请完善所有信息再发起分享',
			                   success: function (res) {
			                       if (res.confirm) {
			                               console.log('用户点击确定');
			                           } else if (res.cancel) {
			                               console.log('用户点击取消');
			                           }
			                       }
			                   });
			               }
			           }
			       });
			   
				
			}
		}
    }
</script>


<style>
	.ks_list ul{
		list-style-type: none;
		margin-left: 30upx;
		padding: 0;
		margin-bottom: 40upx;
	}
	.ks_list ul li{
		height: 80upx;
		line-height: 80upx;
		/* border: 1upx solid #f00; */
		width: 180upx;
		margin-bottom: 30upx;
		margin-right: 30upx;
		float: left;
	}
	
	.ks_title{
		text-align: center;
		margin-top: 40upx;
		margin-bottom: 60upx;
	}
	.sh{
		line-height: 80upx;
		height: 80upx;
		margin-top: 20upx;
	}
	.share{
		float: left;
		margin-right: 20upx;		
	}
	.weixin{
		background:url(/static/img/weixinpay.png) 0upx 0upx no-repeat;
		-webkit-background-size: 80upx 80upx;
		background-size: 80upx 80upx;
		width:80upx;
	}
	.content .title{
		background:url(/static/img/kousuan.png) 10upx 25upx no-repeat;
		-webkit-background-size: 40upx 40upx;
		background-size: 40upx 40upx;
		padding-left: 60upx;
		line-height: 80upx;
	}
	
	ul.detail li{
		line-height: 90upx;
		padding-left: 70upx;
		margin-bottom: 10upx;
	}
	.cname{
		float: left;
	}
	.statuslist{
		float: right;
		right: 0upx;
		top:0upx;
	}
	.statuslist span{
		margin-right: 20upx;
	}
	
	.content .title{
		background:url(/static/img/kousuan.png) 10upx 25upx no-repeat;
		-webkit-background-size: 40upx 40upx;
		background-size: 40upx 40upx;
		padding-left: 60upx;
		line-height: 80upx;
	}
	
	ul.detail li{
		line-height: 90upx;
		padding-left: 70upx;
		margin-bottom: 10upx;
	}
	.cname{
		float: left;
	}
	.statuslist{
		float: right;
		right: 0upx;
		top:0upx;
	}
	.statuslist span{
		margin-right: 20upx;
	}
</style>
