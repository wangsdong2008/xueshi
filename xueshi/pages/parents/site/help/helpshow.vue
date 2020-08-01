<template>
	<div class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<div class="content">
			<div class="title">
				帮助文档
			</div>
			<div>		
				<div class="main-body write lists">
					<div class="titles ll fz30">{{article_title}}</div>
					<div class="hcontents ll fz30" v-html="article_content"></div>
					<div class="times ll fz30">{{article_time}}</div>
				</div>
				
			</div>
		</div>		
		<div class="footer">
			<footerNav :msg="footer"></footerNav>
		</div>
	</div>
</template>

<script>
	import headerNav from "@/components/header/users_header.vue"
	import footerNav from "@/components/footer/users_footer_nav.vue"
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
				identity:1
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
		background:url(/static/img/help.png) 10upx 25upx no-repeat;
		-webkit-background-size: 40upx 40upx;
		background-size: 40upx 40upx;
		padding-left: 60upx;
		line-height: 80upx;
	}
	.hcontents{
		padding: 40upx 0upx 0upx 0upx;
		font-size: 30upx;
		line-height: 50upx;
		overflow: hidden;
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
		width:100%;
		margin: 0 auto;
		margin-top: 40upx;
		padding-top: 30upx;
		border-radius: 15upx;
	}
	
	
</style>