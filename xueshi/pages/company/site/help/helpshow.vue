<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				帮助文档
			</view>	
		</view>
		<view class="line"></view>
		<view class="content">		
				<view class="main-body write lists">
					<view class="titles ll">{{article_title}}</view>
					<view class="contents ll" v-html="article_content"></view>
					<view class="times ll">{{article_time}}</view>
				</view>
		</view>		
		
		<view class="footer">
			<footerNav :msg="footer"></footerNav>
		</view>
	</view>
</template>

<script>
	import headerNav from "@/components/header/users_header.vue"
	import footerNav from "@/components/footer/footer_nav.vue"
	import uniPagination from '@/components/uni-pagination/uni-pagination.vue'
	
	var _self;
	
	export default {
	    components: {			
			headerNav,footerNav
		},		
		onLoad(options){
			_self = this;
			this.checkLogin(_self.identity);
			_self.article_id = options['id'];
		},
		onReady() {
			this.show();
		},
		data(){
			return{
				article_id:0,
				article_title:'',
				article_content:'',
				article_time:'',
				headermsg:'帮助文档',
				footer:'',
				identity:2
			}
		},
		methods:{			
			show(){
				let ret = this.getUserInfo();
				const data = {
				    guid: ret.guid,
				    token: ret.token,
					id:_self.article_id
				};
				this.getData(data);
			},			
			getData(data){
				this.sendRequest({
				    url : _self.helpshowUrl,
				    method : _self.Method,
				    data : {"token":data.token,"guid":data.guid,"id":data.id,"identity":_self.identity,"t":Math.random()},
				    hideLoading : true,
				    success:function (res) {
						if(res){
							let data = res.articlelist;
							if(res.status == 3){
								_self.article_title = data.article_title;
								_self.article_content = data.article_content;
								_self.article_time = data.addtime;
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
	  		background:url(@/static/img/help.png) 10upx 25upx no-repeat;
	  		-webkit-background-size:50upx 50upx ;
	  		background-size:50upx 50upx;
	  		line-height: 60upx;
	  		height: 60upx;
	  		padding: 15upx 0upx 15upx 70upx;
	  	}	
	.contents{
		padding: 40upx 0upx 0upx 0upx;
		font-size: 30upx;
		line-height: 50upx;
	}
	.times{
		padding: 20upx 0upx 40upx 0upx;		
		font-size: 30upx;
		text-align: left;
	}
	.ll{
		width: 90%;
		margin: 0 auto;
	}
	.titles{
		padding-bottom: 20upx;
		border-bottom:1px solid #ccc;
		font-size: 35upx;
	}
	.lists{
		border:1upx solid #eaeaea;
		width:96%;
		margin: 0 auto;
		margin-top: 40upx;
		padding-top: 30upx;
		border-radius: 15upx;
	}
	
	
</style>
