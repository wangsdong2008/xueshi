<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				课程详情
			</view>			
			<view class="searchlist">
				<view class="course_title">{{cat_name}}</view>
				<view class="icenter course_content" v-html="cat_content">	</view>
				<view class="icenter course_jg fz30" @tap="bindcompany">所属机构：{{company}}</view>
				<view class="btn-row icenter">
					<button type="primary" class="primary btn" @tap="bindmodify">{{btntxt}}</button>
				</view>
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
			headerNav,
			mInput,
			footerNav
		},
		onLoad(options) {
			_self = this;
			_self.checkLogin(0);
			_self.pid = options['pid'];
			_self.cid = options['cid'];
			_self.comid = options['comid'];
		},
		onReady(){
			_self.show();
		},
		data(){
			return{
				headermsg:'课程详情,Course introduction',
				pid:0,
				cid:0,
				comid:0,
				cat_content:'',
				cat_name:'',
				dataList:[],
				btntxt:'报名',
				company:'',
				footer:''
			}
		},
		methods:{
			show(){
				let ret = _self.getUserInfo();
				if(!ret){
					return false;
				}
				const data = {
				    guid: ret.guid,
				    token: ret.token,
					uid:_self.pid,
					cid:_self.cid,
					comid:_self.comid
				};				
				_self.getData(data);
			},
			bindmodify(){
				_self.navigateTo('baoming?pid='+_self.pid+"&comid="+_self.comid+"&cid="+_self.cid);
			},
			bindcompany(){
				_self.navigateTo('showshop?pid='+_self.pid+"&comid="+_self.comid);
			},
			getData(data){
				_self.sendRequest({
				        url : _self.showCourseUrl,
				        method : _self.Method,
				        data : {
							"token": data.token,
							"guid": data.guid,
							"uid":data.uid,
							"cid":data.cid,
							"comid":data.comid,
							"t":Math.random()
						},
				        hideLoading : true,
				       success: (res) => {
				       		var data = res.courselist;
				       		switch(parseInt(res.status)){
				       			case 1:{
				       				uni.showToast({
				       					title: '无数据',
				       					icon: 'none',
				       				});		
				       				break;
				       			}
				       			case 3:{
				       				_self.cat_name  = data.cat_name;
									_self.cat_content  = data.cat_content;
									_self.company = res.companylist.com_name;
				       				break;
				       			}
								case 0:{
									uni.showToast({
										title: '此课程不存在',
										icon: 'none',
									});		
									break;
								}
				       		}
				       		
				       	}
				    },"1","");
			}
		}
	}
	
</script>
<style>	
	.content .title{
		background:url(@/static/img/detail.png) 10upx 22upx no-repeat;
		-webkit-background-size:50upx 50upx ;
		background-size:50upx 50upx;
		line-height: 60upx;
		height: 60upx;
		padding: 15upx 0upx 15upx 70upx;
	}

	
	.icenter{
		width: 90%;
		margin: 0 auto;
		margin-top: 20upx;
		margin-bottom: 10upx;
		font-size: 30upx;
		line-height: 65upx;
		
	}
	.course_title{
		width: 80%;
		margin: 0 auto;
		font-size: 35upx;
		padding-left: 80upx;
		padding-top: 10upx;
		background:url(/static/img/course.png) no-repeat 10upx 5upx;
		background-size: 60upx 60upx;
		
	}
	.course_content{
		border-bottom: 1upx solid #eee;
		border-top: 1upx solid #eee;
		padding:10upx 0upx;
	}
	
	.course_jg{
		width: 80%;
		margin: 0 auto;
		padding-left: 80upx;
		background:url(/static/img/company.png) no-repeat 10upx 0upx;
		background-size: 60upx 60upx;
		text-decoration: underline; 
	}
	
	
	
</style>