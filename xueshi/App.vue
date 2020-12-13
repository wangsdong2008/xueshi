<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">	
	/*每个页面公共css */
	.main_content{
		width: 100%;
	}
	
	.grey{
		color:$color;
	}
	.content{
		width: $content_width;
		margin: 0 auto;
		padding-bottom: 20upx;
		margin-top: 20upx;
	}
	.content .title{
		border-bottom: 1px solid $bgcolor;
		line-height: 80upx;
		height: 80upx;
		margin-buttom: 30upx;
		padding-bottom: 10upx;
		background-color: #fff;
	}
	
	.title image{
		width: 50upx;
		height: 50upx;
		margin-right: 20upx;
	}
	.content ul{
		list-style-type: none;
		margin: 0;
		padding: 0;
	}
	
	navigator{
		display: inline;
		color:#0000ff;
	}
	.clear{
		clear: both;
	}
	
	.btn-row{
		margin-top: 40upx;
	}
	
	.btn{
		width: 100%;
		text-align: center;
		background-color: #fff;
		font-size: 35upx;
		border-radius: 50upx;
		margin-bottom: 30upx;
		margin-top: 20upx;
	}
	
	.footer{
		height: 100upx;
	}
	
	input.register-input{
		height: 100upx;
		line-height: 100upx;
		border-bottom: 1upx solid #ccc;
		text-indent: 70upx;
	}
	input.register-input-mobile{
		background:url(@/static/img/mobile.png) 10upx 22upx no-repeat;
		-webkit-background-size:40upx 50upx ;
		background-size:40upx 50upx ;		
	}
	input.register-input-password{
		background:url(@/static/img/password.png) 10upx 22upx no-repeat;	
		-webkit-background-size:40upx 50upx ;
		background-size:40upx 50upx ;
	}
	input.register-input-mail{
		background:url(@/static/img/mail.png) 10upx 22upx no-repeat;	
		-webkit-background-size:40upx 52upx ;
		background-size:40upx 52upx ;
	}
	
	//头像
	.boys{
		background:url(@/static/img/boy.png) 10upx 20upx no-repeat;
		-webkit-background-size:50upx 50upx ;
		background-size:50upx 50upx ;
	}
	.grils{
		background:url(@/static/img/gril.png) 10upx 20upx no-repeat;
		-webkit-background-size:50upx 50upx ;
		background-size:50upx 50upx ;
	}
	.boys0{
		background:url(@/static/img/boy.png) 10upx 0upx no-repeat;
		-webkit-background-size:50upx 50upx ;
		background-size:50upx 50upx ;
	}
	.grils0{
		background:url(@/static/img/gril.png) 10upx 0upx no-repeat;
		-webkit-background-size:50upx 50upx ;
		background-size:50upx 50upx ;
	}
	
	
	/* 头部信息 */
	.header-title{
		background:url('@/static/img/login_title.png') #ffffff center 0 no-repeat;
	    background-size:100% 100%;
	    padding-bottom:20%
	}
	.login_center{
		width:85%;			
		margin: 0 auto;
	}
	.login_title_txt{
	    color:#fff;
	    font-family:'微软雅黑';
	    font-size:60upx;
	    padding-top:120upx;
	}	
	.login_title_txt span{
	    font-size: 48upx;
	}
	.logo{
		width:320upx;
		height: 320upx;
		position:absolute;
		bottom: 25upx;
		right:40upx;
		/* animation:mymove 2s infinite;
		-webkit-animation:mymove 2s infinite; */ /*Safari and Chrome*/
		animation-iteration-count:1;
		-webkit-animation-iteration-count:1;
	}
	
	.fb{
		font-weight: bold;
	}
	/*头部css*/
	.fz20{
		font-size: 20upx;
	}
	.fz25{
		font-size: 25upx;
	}
	.fz30{
		font-size: 30upx;
	}
	.fz35{
		font-size: 35upx;
	}
	.fz40{
		font-size: 40upx;
	}
	
	//验证码按纽
	.yzm{		
		text-align: center;
		border-radius: 50upx;
		float: right;
		width:40%;
		border: 0upx;
		color:#fff;
		background-color: $bgcolor;
		line-height: 60upx;
		height: 60upx;
	}
	.yzm::after{
		border: 0upx;
	}
	.line{
		background-color: #eee;
		height: 30upx;
	}
	.top20{
		margin-top: 20upx;
	}
	.pd20{
		padding-top: 20upx;
	}
	ul li:last-child{
		border-bottom: 0upx;
	}
	li.lists{
		line-height: 55upx;
		border-bottom: 1upx solid #ccc; 
		padding:30upx 0upx;
		background:url(/static/img/right.png) no-repeat right center;
		background-origin: content-box; /* 背景右定位 */
		-webkit-background-size: 40upx 40upx;
		background-size: 40upx 40upx;		 
	}
	.editor,.delete{
		background-size:35upx 35upx ;
		width:50upx;
		height:50upx;
		float: left;
		margin-top: 20upx;
		margin-right: 10upx;
	}
	.editor{
		background:url(@/static/img/editor.png) 10upx 0upx no-repeat;
		-webkit-background-size:30upx 30upx;
	}
	.delete{
		background:url(@/static/img/delete.png) 10upx 0upx no-repeat;
		-webkit-background-size:30upx 30upx;
	}	
	//列表样式
	ul.css_detail li{
		line-height: 90upx;
		margin-bottom: 20upx;
		
	}
	//名称样式
	.css_tname{
		padding-left: 60upx;
	}
	//公司图标
	.css_company{
		background:url(@/static/img/company.png) 0upx 0upx no-repeat;
		-webkit-background-size:40upx 40upx ;
		background-size:40upx 40upx;
	}
	//课程图标
	.css_course{
		background:url(@/static/img/course.png) 0upx 20upx no-repeat;
		-webkit-background-size:40upx 40upx ;
		background-size:40upx 40upx;
	}

</style>
