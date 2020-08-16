<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				全部统计
			</view>
			<uni-collapse>
						    <uni-collapse-item title="上课统计" thumb="/static/img/stj.png">
						        <view style="padding: 30rpx;">
									<ul class="t1">
										<li class="fz30" @tap="bindtj(1)">单人查询</li>
										<li class="fz30" @tap="bindcompanytj(1)" >整体查询</li>
									</ul>
						        </view>
						    </uni-collapse-item>
						</uni-collapse>
						
						<uni-collapse>
						    <uni-collapse-item title="吃饭统计" thumb="/static/img/ftj.png">
						        <view style="padding: 30rpx;">
									<ul class="t1">
										<li class="fz30" @tap="bindtj(2)" >单人查询</li>
										<li class="fz30" @tap="bindcompanytj(2)">整体查询</li>
									</ul>
						        </view>
						    </uni-collapse-item>
						</uni-collapse>
						
						<uni-collapse>
						    <uni-collapse-item title="员工统计" thumb="/static/img/etj.png">
						        <view style="padding: 30rpx;">
									<ul class="t1">
										<li class="fz30" @tap="bindtj(3)">单人查询</li>
										<li class="fz30" @tap="bindcompanytj(3)">整体查询</li>
									</ul>
						        </view>
						    </uni-collapse-item>
						</uni-collapse>
						
						<uni-collapse>
						    <uni-collapse-item title="体温查询" thumb="/static/img/tw.png">
						        <view style="padding: 30rpx;">
									<ul class="t1">
										<li class="fz30"  @tap="bindtw">单人查询</li>
									</ul>
						        </view>
						    </uni-collapse-item>
						</uni-collapse>
			
			
		</view>
			
		</view>
	</view>
</template>

<script>
	import service from '@/service.js';	
	import headerNav from "@/components/header/company_header.vue"
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	
	var _self;
	
	import {
	    mapState,
	    mapMutations
	} from 'vuex'
	
	export default {
	    components: {
			headerNav,uniSection,uniCollapse,uniCollapseItem
		},
		onLoad:function() {
			_self = this;
			_self.checkLogin(2);			
		},
		data(){
			return{
				headermsg:'统计,Statistics',
				dataList:[]
			}
		},
		methods:{
			bindtw(){
				_self.navigateTo('statisticstw');
			},
			bindtj(id){
				if(id == 3){
					_self.navigateTo('statisticsmember?id='+id);	
				}
				else{
					_self.navigateTo('statisticsstudents?id='+id);	
				}
				
			},
			bindcompanytj(id){
				_self.navigateTo('statisticscompany?id='+id);	
			},
			change(e) {}
			
		}
	}
</script>

<style>
	.content .title{
		background:url(@/static/img/tjsearch.png) 10upx 22upx no-repeat;
		-webkit-background-size:50upx 50upx ;
		background-size:50upx 50upx;
		line-height: 60upx;
		height: 60upx;
		padding: 15upx 0upx 15upx 70upx;
	}

	ul.t1{
		background-color: #fff;
		margin: 0upx;
		padding: 0upx
	}
	
	ul.t1 li{
		line-height: 95upx;
		padding-left: 30upx;
		border-bottom: 1upx solid #ccc;
	}
	
</style>
