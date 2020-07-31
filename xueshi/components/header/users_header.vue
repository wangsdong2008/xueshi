<template>
	<view class="header-title">		
		<view class="login_center login_title_txt">{{name}}<br /><span>{{en_name}}</span></view>
		<view class="logo" :style="'background:url('+logo+') 0upx 0upx no-repeat;-webkit-background-size: 320upx 320upx;background-size: 320upx 320upx;'"> </view>
	</view>	
</template>

<script>
	export default {
		props:{
			msg: String
		},
		data() {
			return {
				msgarr:'',
				name:'',
				en_name:'',
				face:''
			}
		},
		created:function(){
			this.msgarr = this.msg;
			uni.hideTabBar({});	
			this.init();
			//console.log(this.msg);
		},	
		methods:{
			init(){
				//debugger;
				let arr = this.msgarr.split(",");
				this.name = arr[0];
				this.en_name = arr[1];
			
				/* let ret = this.getUserInfo();
				if(!ret){					
					return false;
				}
				else{
					this.logo = _self.logo;
				} */
				
			}
		}
	}
</script>

<style>
	.header-title{
		position: relative;
	}
	.login_title_txt{
		z-index: 100;
		position: relative;
	}
	.logo{
		/* background:url(../../static/img/logo.png) 0upx 0upx no-repeat; 
		-webkit-background-size: 320upx 320upx;
		background-size: 320upx 320upx;*/
		width:320upx;
		height: 320upx;
		position:absolute;
		top:90upx;
		left:400upx;
		/* animation:mymove 2s infinite;
		-webkit-animation:mymove 2s infinite; */ /*Safari and Chrome*/
		animation-iteration-count:1;
		-webkit-animation-iteration-count:1;
		
	}
	@keyframes mymove
	{
		from {left:0upx;}
		to {left:400upx;}
	}
	
	@-webkit-keyframes mymove /*Safari and Chrome*/
	{
		from {left:0upx;}
		to {left:400upx;}
	}	
</style>
