<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				一月内生日榜
			</view>		
				<view class="studentlist">					
					<ul>
						<li  class="list-title list fz35" v-for="(item,index) in dataList" :index="index" :key="item.com_id">{{item.com_name}}
							<ul>
								<li :class="{
									'fz35':true,
									'list-title2':true,
									'grils0':(item3.sex==0),
									'boys0':(item3.sex == 1) 
								}"  v-for="(item3,index3) in item.studentslist" :index="index3" :key="item3.uid"> {{item3.uname}} <span class="day fz30">{{item3.birthday}}</span></li>
							</ul>
						</li>
					</ul>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import service from '@/service.js';
	import mInput from '@/components/m-input.vue'
	import headerNav from "@/components/header/company_header.vue"	
	import uniSection from '@/components/uni-section/uni-section.vue'
	var _self;
	import {
	    mapState,
	    mapMutations
	} from 'vuex'
	
	export default {
	    components: {
			headerNav,uniSection
		},
		data(){
			return{		
				headermsg:'生日提醒,Birthday',
				dataList:[]
			}
		},
		onLoad:function() {
			_self = this;
			_self.checkLogin(2);			
		},
		onReady:function(){
			_self.show();
		},
		methods:{
			bindStudents(uid){
				_self.navigateTo('studentsshow?id='+uid);
			},
			show(){
				let ret = _self.getUserInfo();
				if(!ret){
					return false;
				}
				const data = {
				    guid: ret.guid,
				    token: ret.token
				};
				_self.getData(data);
			},
			getData(data){
				this.sendRequest({
					url : this.GetBirthdaytStudentsUrl,
					method : _self.Method,
				    data : {
						"guid": data.guid,
						"token":data.token,
						"t":Math.random()
					},
				    hideLoading : true,
				    success: (res) => {
				    	    if(res){
				    			if(res.status == 3){
				    				let data = res.subcompanylist;
				    				//debugger;
				    				
				    				let list = [];
				    				let str = '';
				    				//debugger;
				    				for (var i = 0; i < data.length; i++) {				
				    					var item = data[i];
				    					list.push(item);									
				    				}								
				    				_self.dataList = list;
				    				
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
		background:url(@/static/img/brithday0.png) 10upx 22upx no-repeat;
		-webkit-background-size:50upx 50upx ;
		background-size:50upx 50upx;
		line-height: 60upx;
		height: 60upx;
		padding: 15upx 0upx 15upx 70upx;
	}
	
	.studentlist{
		overflow: auto;
		margin-bottom: 20upx;
		margin-top: 40upx;
	}
	
	.list{
		padding-left: 50upx;
		line-height: 55upx;
		margin-bottom: 30upx;
	}
	
	.list-title{
		font-weight: bold;
		background: url(/static/img/company.png) no-repeat;
		-webkit-background-size: 45upx 45upx;
		background-size: 45upx 45upx;
	}
	
	.list-title2{		
		font-weight: normal;
		-webkit-background-size: 45upx 45upx;
		background-size: 45upx 45upx;
		margin-top: 20upx;
		padding-left: 60upx;
		position: relative;
		border-bottom: 1upx solid #ccc;
		padding-bottom: 15upx;
		
	}
	.day{
		position: absolute;
		right:40upx;
		top:0upx
	}
	
</style>
