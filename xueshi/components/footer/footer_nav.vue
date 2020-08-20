<template>
    <view class="tabBar">
        <view v-for="(item,index) in tabBar" :key="item.url" class="tabbar_item" :class="{'active':item.url == currentPage}"
         @click="navTo(item,index)">
            <image v-if="item.nav == currentPage" :src="item.imgClick" mode=""></image>
            <image v-else :src="item.imgNormal" mode=""></image>
            <view class="text">{{item.text}}</view>
        </view>
    </view>
</template>
<script>
	export default {	
		props:{
			msg: String
		},
		data() {
			return {
				title: '家长',
				currentPage:this.msg,
				tabBar: [	
				//家长	
				{
					nav: 'family',
					url: 'parents/parents/index',
					text: '首页',
					imgNormal:'/static/img/home.png',
					imgClick:'/static/img/homeHL.png'
				},				
				{
					nav: 'mine',
					url: 'parents/site/index/index',
					text: '我的',
					imgNormal:'/static/img/user.png',
					imgClick:'/static/img/userHL.png'
				},{
					nav: 'findsite',
					url: 'parents/find/find/index',
					text: '发现',
					imgNormal:'/static/img/find.png',
					imgClick:'/static/img/findHL.png'
				},
				{
					nav: 'familysite',
					url: 'users/main/index/main',
					text: '设置',
					imgNormal:'/static/img/familysite.png',
					imgClick:'/static/img/familysiteHL.png'
				},
				//机构
				{
					nav: 'family',
					url: 'company/company/index/index',
					text: '首页',
					imgNormal:'/static/img/home.png',
					imgClick:'/static/img/homeHL.png'
				},{
					nav: 'mine',
					url: 'company/site/index/index',
					text: '我的',
					imgNormal:'/static/img/user.png',
					imgClick:'/static/img/userHL.png'
				},{
					nav: 'familysite',
					url: 'users/main/index/main',
					text: '设置',
					imgNormal:'/static/img/familysite.png',
					imgClick:'/static/img/familysiteHL.png'
				}
				
				
				]
			}
		},	
		
		created:function(){
			this.currentPage = this.msg;
			uni.hideTabBar({});	
			this.init();
			//console.log(this.msg);
		},		
		
		methods: {
			init(){					
				let userinfo = this.getUserInfo();
				let userlevel = userinfo.identity;
				//userlevel = 3; //测试使用
				let _this = this;
				//debugger;
				if(userlevel == "" || userlevel == undefined) userlevel = 0;
				else userlevel = parseInt(userlevel);
				
				//splice 删除数据要从大到小删除
				switch(userlevel){
					case 1:{//家长	
						_this.tabBar.splice(6, 1);
						_this.tabBar.splice(5, 1);
						_this.tabBar.splice(4, 1);
						break;
					}
					case 2:{//机构
						_this.tabBar.splice(3, 1);
						_this.tabBar.splice(2, 1);
						_this.tabBar.splice(1, 1);
						_this.tabBar.splice(0, 1);
						break;
					}
					
				}
			}
		}
		
	}
	</script>
<style lang="scss" scoped>
  //导航栏设置
  $isRadius:20upx; //左上右上圆角
  $isWidth:100vw; //导航栏宽度
  $isBorder:1px solid #eeeeee; //边框 不需要则设为0px
  $isBg:white; //背景
   
  // 选中设置
  $chooseTextColor:#1b60ac; //选中时字体颜色
  $chooseBgColor:white; //选中时背景颜色 transparent为透明
   
  //未选中设置
  $normalTextColor:#999; //未选中颜色
   
  .tabBar {
      width: $isWidth;
      height: 100upx;
      position: fixed;
      bottom: 0upx;
      left: 0;
      right: 0;
      margin: 0 auto;
      z-index: 998;
      background-color: $isBg;
      color: $normalTextColor;
      border-left: $isBorder;
      border-top: $isBorder;
      border-right: $isBorder;
      display: flex;
      justify-content: space-around;
      border-top-right-radius: $isRadius;
      border-top-left-radius: $isRadius;
      box-sizing: border-box;
      overflow: hidden;
   
      .tabbar_item {
          width: 25%;
          font-size: 12px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
   
          &.active {
              /* border-left: $isBorder;
              border-top: $isBorder; */
              background: $chooseBgColor;
              color: $chooseTextColor;
          }
      }
   
      image {
          width: 36upx;
          height: 36upx;
          margin-left: 5upx;
      }
  }
</style>