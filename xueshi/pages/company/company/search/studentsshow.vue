<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				个人资料
			</view>	
			
				<view class="bg">
					<view class="icenter">
						<ul class="mui-table-view">
							<li class="mui-table-view-cell" >
								<view class="slist fz30">姓名：{{dataList.uname}}</view>						
							</li>
							<li>
								<view class="slist fz30">生日：{{dataList.birthday}}</view>
							</li>
							<li v-if="dataList !== undefined && dataList.mtel !== null">
								<view class="slist mtels fz30">
									联系方式：<span class="btn fz30" @click="callphone()">点击拨打</span>
								</view>
							</li>
							<li>
								<view class="slist fz30">学校：{{school_name}}</view>
							</li>
							
							<li>
								<view class="slist fz30">班主任：{{dataList.teacher}}</view>
							</li>
							
							<li>
								<view class="slist fz30">班级：{{grade_name}}</view>
							</li>
							
							<li v-if="dataList !== undefined && dataList.fan_status == 1">
								<view class="slist fz30">是否吃饭：{{dataList.fanstatus}}</view>
							</li>
							<li v-if="dataList !== undefined && dataList.fan_status == 1">
								<view class="slist fz30">忌口：{{dataList.fan_jkou}}</view>
							</li>
							<li>
								<view class="slist fz30">备注：{{dataList.memo}}</view>
							</li>
						</ul>	
					</view>
				</view>
				<view class="bg">	
					<view class="icenter">
						<ul class="mui-table-view">
							<li class="mui-table-view-cell" >
								<view class="c_name">学习课程</view>						
							</li>
							
							<li class="courseList" v-for="(item,key) in courseList" :key="item.id" :id="item.id">
								<ul class="ul-list">
									<li class="catname fz30">【{{item.cat_name}}】</li>
									<li v-if="item.cat_id == 1">
										<ul>											
											<li class=" fz30" v-for="(item2,key2) in item.list" :key="item2.id">
												周{{_self.week_dataList[item2.week_id]}}：{{item2.utime.substring(0,5)}} {{item2.uaddress == null?'':item2.uaddress+'接'}} {{item2.givetime.substring(0,5) == '00:00'?'':item2.givetime.substring(0,5)+'送'+item2.giveaddress+' '}} {{item2.backtime.substring(0,5) == '00:00'?'':item2.backtime.substring(0,5)+'接回'+' '}} ({{item2.fan_status=='1'?'吃饭':'不吃'}})
											</li>
										</ul>
									</li>
									<li v-if="item.cat_id > 1">
										<ul>											
											<li class=" fz30" v-for="(item2,key2) in item.list" :key="item2.id">
												周{{_self.week_dataList[item2.week_id]}}：{{item2.utime.substring(0,5)}}
											</li>											
										</ul>
									</li>
								</ul>
							</li>
							
							
						</ul>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import service from '@/service.js';
	import mInput from '@/components/m-input.vue'
	import headerNav from "@/components/header/company_header.vue"
	var _self;
	import {
	    mapState,
	    mapMutations
	} from 'vuex'
	
	export default {
	    components: {
			headerNav
		},
		data(){
			return{		
				id:0,
				headermsg:'学生详情,Students detail',
				dataList:[],
				courseList:[],
				school_name:'',
				grade_name:'',
				week_dataList:['日','一','二','三','四','五','六'],
				mtel:''
			}
		},
		onLoad:function(options){
			_self = this;
			_self.checkLogin(2);	
			var sid = options['id'];
			if(sid == undefined) sid = 0;
			_self.id = sid;
		},
		onReady:function(){
			_self.show();
		},
		methods:{
			show(){				
				let ret = _self.getUserInfo();
				const data = {
				    guid: ret.guid,
				    token: ret.token,
					uid:_self.id
				};
				_self.getData(data);
			},
			callphone(){
			 	uni.makePhoneCall({
					// 手机号
					phoneNumber:_self.mtel,
					// 成功回调
					success: (res) => {
						console.log('调用成功!')	
					},				
					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
					}
				 });
			},
			getData(data){
				this.sendRequest({
					url : this.GetStudentsDetail,
				    method : _self.Method,
				    data : {
						"guid": data.guid,
						"token":data.token,
						"id":data.uid,
						"t":Math.random()
					},
				    hideLoading : true,
				    success: (res) => {
				   	    if(res){
				   	    	var data = res.studentslist; 
				   			if(parseInt(res.status) == 3){
				   				_self.dataList = data;
				   				_self.mtel = data['mtel'];
				   				
				   				_self.school_name = data['schoolinfo']['school_name'];
				   				_self.grade_name = data['gradeinfo']['grade_name'] + data['classinfo']['class_name'];
				   				
								//debugger;
				   				//所有课程
				   				let list = [];
				   				let course_data = data['CourseInfo'];
				   				for (var i = 0; i < course_data.length; i++) {
				   					var item = course_data[i];									
				   					list.push(item);
				   				} 								
				   				_self.courseList = list;
				   			}else{
				   				uni.showToast({
				   					title: '无数据',
				   					icon: 'none',
				   				});
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
    		background:url(@/static/img/userHL.png) 10upx 22upx no-repeat;
    		-webkit-background-size:50upx 50upx ;
    		background-size:50upx 50upx;
    		line-height: 60upx;
    		height: 60upx;
    		padding: 15upx 0upx 15upx 70upx;
    	}
		.icenter{
			margin-top: 40upx;
		}
	
	.catname{
		border-bottom: 1px dotted #808080;
		padding-bottom: 10upx;
		padding-right: 10upx;		
		background:url(@/static/img/course.png) 10upx 22upx no-repeat;
		-webkit-background-size:50upx 50upx ;
		background-size:50upx 50upx;
		padding-top: 20upx;
		padding-left: 60upx;
		margin-bottom: 20upx;
	}

	.courseList{
		border-radius: 10upx;
		border:#F1F1F1 solid 1upx;
		margin-bottom: 25upx;
	}
	.ul-list{
		
	}
	.bg{
		margin-bottom: 30upx;
	}
	.mtels{
		clear: both;
		width:100%;
	}	
	.mtels .btn{		
		color:#007AFF;
		padding: 10upx 20upx;
		color:#fff;
	}
	
	.slist{
		padding-left: 20upx;
		line-height: 55upx;
		margin-bottom: 20upx;
	}
	.c_name{
		border-bottom:#66CCFF 1upx solid;
		padding-bottom: 20upx;
		padding-left: 10upx;
		padding-top: 20upx;
		margin-bottom: 30upx;
	}	
	ul{
		list-style-type: none;
		margin: 0;
		padding: 0;
	}
	ul > li{
		line-height: 55upx;
	}
	.ul-list,.ul-list ul{
		margin:0 20upx;
	}
	
</style>
