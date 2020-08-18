<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				公司相关设置
			</view>	
			
		</view>
		<view class="line"></view>
		<view class="content">
			<view class="main-body write lists">
				<ul>
					<li class="lists fz35" v-for="(item,index) in dataList" :key="index" @tap="bindclick(index,1)"><image :src="'/static/img/'+item.image"></image>{{item.text}}</li>
				</ul>
			</view>	
		</view>
		<view class="line"></view>
		<view class="content">
			<ul>
				<li class="lists fz35" v-for="(item2,index2) in dataList2" :key="index2" @tap="bindclick(index2,2)"><image :src="'/static/img/'+item2.image"></image>{{item2.text}}</li>		
			</ul>
		</view>
		
		<view class="footer">
			<footerNav :msg="footer"></footerNav>
		</view>
	</view>
</template>

<script>
	import headerNav from "@/components/header/company_header.vue"
	import footerNav from "@/components/footer/footer_nav.vue"
	
	var _self;
	
	export default {
	    components: {
			headerNav,
			footerNav
		},
		data(){
			return{				
				headermsg:'公司设置,Company Siteup',
				footer: 'companysite',
				dataList:[
					{"image":"company.png","text":"公司设置","url":"../company/company"},
					{"image":"category.png","text":"课程分类","url":"../category/category"},
					{"image":"classroom.png","text":"教室管理","url":"../classroom/classroom"},
					{"image":"school.png","text":"学校管理(托班)","url":"../school/school"},
					{"image":"grade.png","text":"年级管理(托班)","url":"../grade/grade"},
					{"image":"classs.png","text":"班级管理(托班)","url":""},
					{"image":"students.png","text":"学生管理","url":""},
					{"image":"plan.png","text":"上课安排","url":""},
					
				],
				dataList2:[
					
					{"image":"staff.png","text":"员工管理","url":""},
					{"image":"power.png","text":"权限管理","url":""},
					{"image":"help.png","text":"帮助文档","url":""},
					
				],	
				
				
			}
		},
		onLoad:function() {
			_self = this;
			_self.checkLogin(2);
		},
		methods:{
			bindclick:function(num,pos){
				switch(pos){
					case 1:{
						_self.navigateTo(_self.dataList[num].url);	
						break;
					}
					case 2:{
						_self.navigateTo(_self.dataList2[num].url);
						break;
					}
				}			
			}
			
		}
	}
</script>

<style>
	li.lists{
		height: 60upx;
		line-height: 60upx;
		border-bottom: 1upx solid #ccc;
		padding:20upx 0upx;
	}
	li image{
		height: 45upx;
		width: 45upx;
		margin-right: 20upx;
	}
	
	.content .title{
	  		background:url(@/static/img/system.png) 10upx 22upx no-repeat;
	  		-webkit-background-size:50upx 50upx ;
	  		background-size:50upx 50upx;
	  		line-height: 60upx;
	  		height: 60upx;
	  		padding: 15upx 0upx 15upx 70upx;
	  	}

	.uni-list{
		margin-top: 40upx;
		background-color: #fff;
	}
</style>
