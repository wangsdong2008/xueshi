<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				一周学习时间编辑
			</view>	
				<view>
				<view class="register_account_input">	
					<view class="uni-list-cell-left fz30">
						选择孩子
					</view>
					<picker focus @change="ChildPickerChange($event)" :value="child_index" :range="child_dataList">
						<view class="uni-input fz30">{{child_dataList[child_index]}}</view>
					</picker>
				</view>
				<view class="register_account_input">	
					<view class="uni-list-cell-left fz30">
						选择课程
					</view>		
					<picker @change="CoursePickerChange($event)" :value="course_index" :range="course_dataList">
						<view class="uni-input fz30">{{course_dataList[course_index]}}</view>
					</picker>
				</view>
				<view :class="{
					'register_account_input':true,
					 'weeklist':(plan_id == 0)
					}">
					<view class="uni-list-cell-left fz30">
						选择周几
					</view>
					<view v-if="plan_id == 0" class="cell-right weeks">
						<checkbox-group @change="weekcheckboxChange">
							<label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in week_dataList" :index="index" :key="item.weekid">
								<checkbox :value="item.weekid" :checked="item.shower" /><text>{{item.weektext}}</text>
							</label>
						</checkbox-group>
					</view>
					<picker v-if="plan_id > 0" @change="WeekPickerChange($event)" :value="week_index" :range="week_dataList">
						<view class="uni-input fz30">{{week_dataList[week_index]}}</view>
					</picker>
				</view>
				
				<view :class="{
					'week-list-time':true,
					'register_account_input':(plan_id > 0)
					}">
					<view class="left_txt fz30">上课时间</view>				
					<view v-if="plan_id == 0" class="cell-right listq">
						<view v-for="(item2,index2) in week_dataList" :index="index2" :key="item2.weekid">
							<view :class="{
								'fz30':true,
								'texts':true,
								'hidden':!item2.shower
								}">周{{item2.weektext}}
							</view>
							<picker mode="time" :value="item2.p_time" start="00:01" end="23:59"  @change="bindTimeChange($event,item2.weekid)" :class="{
									'fz30':true,
									'awidth':true,
									'hidden':!item2.shower
									}">
									<view class="uni-input pickerlist">{{item2.p_time}}</view>
							</picker>
						</view>
						<view class="clear"></view>	
					</view>
					<picker v-if="plan_id > 0"  @change="bindTime2Change" mode="time"  :value="studentsutime_list">
						<view class="uni-input fz30">{{studentsutime_list}}</view>
					</picker>
					<view class="clear"></view>	
				</view>
				
				
				
				<view class="register_account_input">
					<view class="uni-list-cell-left fz30">
						每课时间
					</view>
					<view class="cell-right">
						<m-input class="m-input" type="text" clearable  v-model="p_pertime" placeholder="每节课时间(分)"></m-input>	
					</view>
				</view>
				<view class="register_account_input">
					<view class="uni-list-cell-left fz30">
						总节数
					</view>
					<view class="cell-right">
						<m-input class="m-input fz30" type="text" clearable  v-model="p_num" placeholder="总节数"></m-input>	
					</view>
				</view>
				<view class="register_account_input">
					<view class="uni-list-cell-left fz30">
						已上节数
					</view>  
					<view class="cell-right">
						<m-input class="m-input fz30" type="text" clearable v-model="p_numed" placeholder="已上节数"></m-input>
					</view>
				</view>
				<view class="btn-row">
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
			service,
			headerNav,
			footerNav,
			mInput
		},
		onLoad(options){
			_self = this;
			_self.checkLogin(1);
			_self.plan_id = options['id'];
			if(_self.plan_id == undefined){
				_self.plan_id = 0;
			}
			_self.headermsg = "学习时间编辑,Class Plan Edit";
		},
		onReady(){
			_self.show();
		},
		data(){
			return{
				headermsg:'',
				btntxt:'',
				is_show:'1',
				
				plan_id:0,
				p_num:'',
				p_numed:'',
				p_pertime:'',
				
				child_id:0,	
				child_index:0,
				child_dataList:[],
				child_dataIDList:[],
				
				course_id:0,
				course_index:0,
				course_dataList:[],
				course_dataIDList:[],
				
				week_id:0,
				week_index:0,
				week_dataList:[],
				week_dataIDList:[],				
				p_time:'12:00',		
						
				studentsweek_list:'',//所选周几
				studentsutime_list:'15:00',//所选周几的接孩子时间
				
				items: [
					{
						value: '1',
						name: '开启'
					},
					{
						value: '0',
						name: '关闭'
					}
				],
				footer: ''
			}
		},
		methods:{
			getWeekList:function(){
				//debugger;
				var items = _self.week_dataList;
				let list_utime = [];
				let list = [];				
				for (var i = 0; i <  items.length; i++) {
				    let item = items[i];
					if(item.shower){
						list.push(item.weekid);
						list_utime.push(item.p_time);
				    }
				}
				_self.studentsweek_list = list.toString();
				_self.studentsutime_list = list_utime.toString();	
			},
			weekcheckboxChange: function (e) {
				//debugger;
				var items = _self.week_dataList;
			    var values = e.detail.value;
				let list = [];
			    for (var i = 0; i <  items.length; i++) {
			        let item = items[i];
			        if(values.includes(item.weekid)){
						list.push(item.weekid);
			            this.$set(item,'shower',true);
			        }else{
			            this.$set(item,'shower',false);
			        }
			    }				
				_self.getWeekList();
			},
			bindTimeChange: function(e,num) {
				num = parseInt(num);
				if(num == 0) num = 7;
				_self.week_dataList[num-1].p_time = e.target.value;
				_self.getWeekList();
			},	
			bindTime2Change: function(e) {
				_self.studentsutime_list = e.target.value
			},
			show(){			  
				let ret = _self.getUserInfo();
				if(!ret){
					return false;
				}
				const data = {
				    guid: ret.guid,
				    token: ret.token,
					id:_self.plan_id
				};
				_self.btntxt = '修改';
				_self.week_dataList = ['周一','周二','周三','周四','周五','周六','周日'];
				_self.week_dataIDList = ['1','2','3','4','5','6','0'];
				
				/* if(_self.plan_id == 0){
					//_self.btntxt="添加";
					_self.week_dataList = [					
						{"weektext":'一',"weekid":'1',"shower":false,"p_time":_self.p_time,"uaddress":'','givetime':'18:01','giveaddress':'','backtime':'19:00',"classroom_index":0,"fan_status":0},
						{"weektext":'二',"weekid":'2',"shower":false,"p_time":_self.p_time,"uaddress":'','givetime':'18:01','giveaddress':'','backtime':'19:00',"classroom_index":0,"fan_status":0},
						{"weektext":'三',"weekid":'3',"shower":false,"p_time":_self.p_time,"uaddress":'','givetime':'18:01','giveaddress':'','backtime':'19:00',"classroom_index":0,"fan_status":0},
						{"weektext":'四',"weekid":'4',"shower":false,"p_time":_self.p_time,"uaddress":'','givetime':'18:01','giveaddress':'','backtime':'19:00',"classroom_index":0,"fan_status":0},
						{"weektext":'五',"weekid":'5',"shower":false,"p_time":_self.p_time,"uaddress":'','givetime':'18:01','giveaddress':'','backtime':'19:00',"classroom_index":0,"fan_status":0},
						{"weektext":'六',"weekid":'6',"shower":false,"p_time":_self.p_time,"uaddress":'','givetime':'18:01','giveaddress':'','backtime':'19:00',"classroom_index":0,"fan_status":0},
						{"weektext":'日',"weekid":'0',"shower":false,"p_time":_self.p_time,"uaddress":'','givetime':'18:01','giveaddress':'','backtime':'19:00',"classroom_index":0,"fan_status":0},
					];
				}
				else{ */
					_self.btntxt = '修改';
					//_self.week_dataList = ['周一','周二','周三','周四','周五','周六','周日'];
					_self.week_dataList = [
						{"weektext":'一',"weekid":'1',"shower":false,"p_time":_self.p_time,"uaddress":'','givetime':'18:01','giveaddress':'','backtime':'19:00',"classroom_index":0,"fan_status":0},
						{"weektext":'二',"weekid":'2',"shower":false,"p_time":_self.p_time,"uaddress":'','givetime':'18:01','giveaddress':'','backtime':'19:00',"classroom_index":0,"fan_status":0},
						{"weektext":'三',"weekid":'3',"shower":false,"p_time":_self.p_time,"uaddress":'','givetime':'18:01','giveaddress':'','backtime':'19:00',"classroom_index":0,"fan_status":0},
						{"weektext":'四',"weekid":'4',"shower":false,"p_time":_self.p_time,"uaddress":'','givetime':'18:01','giveaddress':'','backtime':'19:00',"classroom_index":0,"fan_status":0},
						{"weektext":'五',"weekid":'5',"shower":false,"p_time":_self.p_time,"uaddress":'','givetime':'18:01','giveaddress':'','backtime':'19:00',"classroom_index":0,"fan_status":0},
						{"weektext":'六',"weekid":'6',"shower":false,"p_time":_self.p_time,"uaddress":'','givetime':'18:01','giveaddress':'','backtime':'19:00',"classroom_index":0,"fan_status":0},
						{"weektext":'日',"weekid":'0',"shower":false,"p_time":_self.p_time,"uaddress":'','givetime':'18:01','giveaddress':'','backtime':'19:00',"classroom_index":0,"fan_status":0},
					];
					_self.week_dataIDList = ['1','2','3','4','5','6','0'];
					
				//}
				_self.getData(data);
			},
			getData(data){
				_self.sendRequest({
				       url : _self.ShowChildPlanUrl,
				       method : _self.Method,
				       data : {
						  "guid": data.guid,
						  "token":data.token,
						  "id":data.id,
						  "t":Math.random()
					   },
				       hideLoading : true,
				       success:function (res) {
						if(res){
							   //所有孩子
							   var childlist = res.childlist;
							   var list = [];
							   var idlist = [];
							   list.push("==请选择==");
							   idlist.push(0);
							   for (var i = 0; i < childlist.length; i++) {
									var item = childlist[i];
									list.push(item.child_name);
									idlist.push(item.child_id);
							   }								
							   _self.child_dataList = list;
							   _self.child_dataIDList = idlist;
							   
							   //所有课程
							   //debugger;
							   var courselist = res.courselist;
							   list = [];
							   idlist = [];
							   list.push("==请选择==");
							   idlist.push(0);
							   for (var i = 0; i < courselist.length; i++) {
									var item = courselist[i];
									list.push(item.c_name);
									idlist.push(item.c_id);
							   }								
							   _self.course_dataList = list;
							   _self.course_dataIDList = idlist;
							   
							   
							    
							   if(parseInt(res.status) == 3){
									var planlist = res.planlist; 
									_self.child_id = planlist.child_id;
									var j = _self.child_dataIDList.findIndex(i => i == _self.child_id);
									_self.child_index = j;
									
									_self.course_id = planlist.c_id;
									j = _self.course_dataIDList.findIndex(i => i == _self.course_id);
									_self.course_index = j;									
									
									_self.week_id = planlist.p_week;
									j = _self.week_dataIDList.findIndex(i => i == _self.week_id);
									_self.week_index = j;
									
									_self.p_time = planlist.p_time;
									_self.studentsweek_list = planlist.p_week;
									_self.studentsutime_list = planlist.p_time;
									
									
									_self.p_id = planlist.p_id;
									_self.p_num = planlist.p_num.toString();
									_self.p_numed = planlist.p_numed.toString();
									_self.p_pertime = planlist.p_pertime.toString();
								}
							}
						
				       }
				   },"1","");
			},
			ChildPickerChange: function(e) {
			    console.log('picker发送选择改变，携带值为', e.target.value+"===="+_self.child_dataList[e.target.value] + _self.child_dataIDList[e.target.value]);
				_self.child_id = _self.child_dataIDList[e.target.value];
				_self.child_index = e.target.value;
				_self.getWeekPlanByChild();
			},
			CoursePickerChange:function(e){
				console.log('picker发送选择改变，携带值为', e.target.value+"===="+_self.course_dataList[e.target.value] + _self.course_dataIDList[e.target.value]);
				_self.course_id = _self.course_dataIDList[e.target.value];
				_self.course_index = e.target.value;
				_self.getWeekPlanByChild();
				
			},
			WeekPickerChange:function(e){
				console.log('picker发送选择改变，携带值为', e.target.value+"===="+_self.week_dataList[e.target.value] + _self.week_dataIDList[e.target.value]);
				_self.week_id = _self.week_dataIDList[e.target.value];
				_self.week_index = e.target.value;
				_self.studentsweek_list = _self.week_dataIDList[e.target.value];
			},
			getWeekPlanByChild(){
				if(_self.child_id == 0) return;
				if(_self.course_id == 0) return;
				let ret = _self.getUserInfo();
				if(!ret){
					return false;
				}
				_self.sendRequest({
				    url : _self.ChildCourseWeekUrl,
				    method : _self.Method,
				    data : {
						"guid": ret.guid,
						"token": ret.token,
						"id": _self.plan_id,
						"child_id": _self.child_id,
						"course_id":_self.course_id,
						"t":Math.random()
					},
				    hideLoading : true,
				    success:function (res) {
						let status = res.status;
						status = parseInt(status);
						let str = '';
						switch(status){
							case 0:{
								str = '数据填写错误';
								break;
							}
							case 2:{
								str = '课程已经存在';
								break;
							}
							case 3:{
								//debugger;
								var data = res.weeklist;
								for (var i = 0; i < data.length; i++) {
									var item = data[i];
									var n = item.p_week*1-1;
									if(n < 0) n = 6;
									_self.week_dataList[n].shower = true;
									_self.week_dataList[n].p_time = item.p_time;
								}
								break;
							}												
						}
						/* uni.showToast({
							title: str,
							icon: 'none',
							duration:2000
						}); 
						uni.showModal({
						    title: str,
						    content: '请选择返回的页面',
							cancelText:'留在本页',
							confirmText:'返回前页',
						    success: function (res) {
						        if (res.confirm) {
									_self.navigateTo('plan');
						        } else if (res.cancel) {
						            _self.navigateTo('planshow?id='+_self.plan_id);
						        }
						    }
						});*/
				    }
				},"1","");			
				
			},
			bindmodify(){
				if(_self.child_id == 0){
					uni.showToast({
					    icon: 'none',
					    title: '请选择孩子'
					});
					return;
				}
			    if(_self.course_id == 0){
			    	uni.showToast({
			    	    icon: 'none',
			    	    title: '请选择课程'
			    	});
					return;
			    }
				if(_self.plan_id  == 0){
					if(_self.studentsweek_list.length == 0){
						uni.showToast({
							icon: 'none',
							title: '请选择周几'
						});
						return;
					}
					//_self.week_id = _self.week_dataIDList;
				}else{
					if(_self.week_id == -1){
						uni.showToast({
						    icon: 'none',
						    title: '请选择周几'
						});
						return;
					}else{
						if(_self.studentsweek_list.length == 0){
							uni.showToast({
								icon: 'none',
								title: '请选择周几'
							});
							return;
						}
					}
				}
				
				let ret = _self.getUserInfo();
				if(!ret){
					return false;
				}
				
				/* 
				//单个上课时间写法
				"week_id":_self.week_id,
				"p_time":_self.p_time, */
				
				_self.sendRequest({
				    url : _self.ModifyChildPlanUrl,
				    method : _self.Method,
				    data : {
						"guid": ret.guid,
						"token": ret.token,
						"id": _self.plan_id,
						"child_id": _self.child_id,
						"course_id":_self.course_id,
						
						"week_id":_self.studentsweek_list,
						"p_time":_self.studentsutime_list,
						
						"p_num":_self.p_num,
						"p_numed":_self.p_numed,
						"p_pertime":_self.p_pertime,
						"t":Math.random()
					},
				    hideLoading : true,
				    success:function (res) {
						let status = res.status;
						status = parseInt(status);
						let str = '';
						switch(status){
							case 0:{
								str = '数据填写错误';
								break;
							}
							case 2:{
								str = '课程已经存在';
								break;
							}
							case 3:{
								/* if(_self.plan_id == 0){
									str = '添加成功';
									_self.child_id = 0;
									_self.course_id = 0;
									_self.week_id = 0;
									_self.child_index = 0;
									_self.course_index = 0;
									_self.week_index = 0;
									_self.p_time = "12:00";
									_self.p_num = '';
									_self.p_numed = '';				
									
								}else{
									str = '修改成功';
									//_self.show();
								} */
								str = '修改成功';
								break;
							}												
						}
						/* uni.showToast({
							title: str,
							icon: 'none',
							duration:2000
						}); */
						uni.showModal({
						    title: str,
						    content: '请选择返回的页面',
							cancelText:'留在本页',
							confirmText:'返回前页',
						    success: function (res) {
						        if (res.confirm) {
									_self.navigateTo('plan');
						        } else if (res.cancel) {
						            _self.navigateTo('planidit');
						        }
						    }
						});
				    }
				},"1","");
				
		    }
		}
    }
</script>

<style>	
.ctitles{
		background:url(/static/img/plan.png) 10upx 25upx no-repeat;
		-webkit-background-size: 40upx 40upx;
		background-size: 40upx 40upx;
	}	
    .pickerlist{
		width: 98%;
	}
	.listq{
		padding: 20upx 0upx;
		margin-top: 20upx;
	}
	
	.texts{
		margin-right: 10upx;
		float: left;
		width: 20%;
	}
   .left_txt{
		width:30%;
		float: left;
	}	
	.week-list{
		padding-left: 20upx;
		border:1px solid #ccc;
		border-radius: 25upx;		
		margin-top: 20upx;
	}			
	
	.hidden{
		display: none;
	}
	.awidth{
		margin-left: 10upx;
		text-align: left;		
		margin-bottom: 20upx;
		width: 75%;
		overflow: hidden;
		
	}
	.register_account_input view{
		float: left;
	}
	

	.register_account_input{
		padding-top: 20upx;
		padding-bottom: 10px;
		border-bottom: 1px solid #eeeeee;
		line-height: 60upx;
		height: 60upx;
	}
	.register_account{
		font-size: 42upx;
		font-family: '黑体';
		margin-top: 30upx;
		margin-bottom: 20upx;
	}
	
	.register-input{		
		width:90%;
		line-height: 60upx;
		height: 110upx;
		padding-left: 90upx;
	}
	
	
	.uni-list-cell-left{
		margin-right: 40upx;
		width:25%;
	}
	picker view{
		border: 1px solid #ccc;
		width:65%;
		text-align: center;
	}
	.cell-right{
		float: left;
		border: 1px solid #ccc;
		width:65%;
		text-align: center;		
	}
	.btn-row{
		margin-bottom: 60upx;
	}
	.weeks{
		font-size: 30upx;
		text-align: left;
		height: 120upx;
		border:0upx;
	}	
	.weeklist{
		height: 110upx;
	}
	.weeks label{
		margin-right: 15upx;
	}
</style>