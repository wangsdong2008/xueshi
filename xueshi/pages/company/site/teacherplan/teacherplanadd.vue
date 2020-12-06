<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title fz40">
				{{teacher_name}}计划信息
			</view>	
		</view>
		<view class="line"></view>
		<view class="content">		
				<view class="icenter">				
				
				<view class="searchinput input-txt">
					<picker @change="pickerCompanyChange($event)" :value="cindex" :range="cList">
						<view class="uni-input fz30">{{cList[cindex]}}</view>
					</picker>
				</view>
				<view class="searchinput input-txt">
					<picker @change="categoryPickerChange($event)" :value="category_index" :range="category_dataList">
						<view class="uni-input fz30">{{category_dataList[category_index]}}</view>
					</picker>
				</view>		
				<view class="searchinput input-txt">
					<picker @change="weekPickerChange($event)" :value="week_index" :range="week_dataList">
						<view class="uni-input fz30">{{week_dataList[week_index]}}</view>
					</picker>
				</view>
				<view class="searchinput input-txt">
					<picker mode="time" start="00:01" end="23:59" @change="bindTimeChange($event)" :value="_self.ptime">
						<view class="uni-input fz30">{{_self.ptime}}</view>
					</picker>
				</view>
				<view class="searchinput input-txt">
					<picker @change="bindClassRoomChange($event)" :value="classroomindex" :range="classroom_dataList"  :class="{
						'awidth':true
						}">
						<view class="uni-input">{{classroom_dataList[classroomindex]}}</view>
					</picker>
				</view>	
				
				<view class="clear"></view>
				</view>
				<view class="btn-row clear">
					<button type="primary" class="primary btn" @tap="bindmodify">{{btntxt}}</button>
				</view>
		</view>
		<view class="footer">
			<footerNav :msg="footer"></footerNav>
		</view>
	</view>
</template>
<style>	
.content .title{
	  		background:url(/static/img/plan.png) 10upx 25upx no-repeat;
	  		-webkit-background-size:50upx 50upx ;
	  		background-size:50upx 50upx;
	  		line-height: 60upx;
	  		height: 60upx;
	  		padding: 15upx 0upx 15upx 70upx;
	  	}
		
	.icenter{
		width: 95%;
		margin: 0 auto;
	}	
	.texts{
		font-size: 25upx;
		margin-right: 10upx;
		/* border: 1px solid #f00; */
	}
	.hidden{
		display: none;
	}
	.week-list label{
		margin-right: 15upx;
		margin-bottom:10upx;
		font-size: 30upx;
		width: 120upx;
		display: block;
		float: left;
	}
	.week-list .left_txt{
		width:30%;
		font-size: 30upx;
		/* border:1px solid #f00; */
	}	
	.cell-right{
		width:67%;
		padding-right: 10upx;
		/* border:1px solid #ff0; */
	}	
	.week-list{
		padding-left: 20upx;
		border:1px solid #ccc;
		border-radius: 25upx;		
		margin-top: 20upx;
	}		
	.icenter .input-txt,.studentslist{
		border:1upx solid #ccc;
		line-height: 80upx;
		height: 80upx;
		border-radius: 50upx;
		padding-left: 60upx;
		border-radius: 50upx;
	}
	.icenter > view.searchinput{		
		line-height: 80upx;
		height: 80upx;
		border-radius: 50upx;
		margin-bottom: 20upx;
		margin-top: 30upx;
	}
	picker{
		line-height: 80upx;
		height: 80upx;
	}
	.awidth{
		margin-left: 10upx;
		text-align: left;		
		margin-bottom: 20upx;
		overflow: hidden;
		
	}
	.week-list picker{
		width: 300upx;
		height: 60upx;
		line-height: 60upx;	
		margin-left: 62upx;
		border:1px solid #eee;	
		padding-left: 5upx;
	}
	.week-list .m-input{
		padding-left: 10upx;
		margin-bottom: 20upx;
	}
	
	.week-list .week-list-time{
		padding-left: 20upx;
	}
	.week-list .week-list-time.address{
		clear: both;
	}
	.week-list .week-list-time view{
		float: left;
		margin-right: 0upx;
		margin-bottom: 20upx;
	}
	.week-list .week-list-time view view{
		margin-bottom: 0upx;
	}
	
	.week-list-time .cell-right .m-input{
		border: 0upx;
		border: 1px solid #eee;
		line-height: 70upx;
		height: 70upx;
		font-size: 28upx;
	}
	.week-list view{
		/* float: left;	 */	
	}
	.checkboxlist{
		font-size: 30upx;
		text-align: left;
		height: 400upx;
		overflow-y: auto;
		padding: 20upx;
		border: 1px solid #eee;
		margin:20upx 0;
	}
	.checkboxlist label{
		margin-right: 15upx;
		width:180upx;
		margin-bottom: 20upx;
		height: 40upx;
		line-height: 40upx;
		display: block;
	} 
	
	view.txt{
		font-size: 30upx;
	}
	.weeklist label{
		margin-right: 10upx;
		width:120upx;
		margin-bottom: 20upx;
		height: 40upx;
		line-height: 40upx;
		font-size: 30upx;
	} 	
	.checkboxlist .checkbox{
		height: 40upx;
		line-height: 40upx;
	}
	.weeklist{
		height: 110upx;
	}	
	
	.register_account_input{
		padding-top: 20upx;
		padding-bottom: 10px;
		border-bottom: 1px solid #eeeeee;
		line-height: 60upx;	
		text-align: left;
	}		
	
	.form label view{
		float: left;
		margin-bottom: 10upx;	
		font-size: 30upx;
		height: 60upx;
		line-height: 60upx;
	}	
	.radio_text{
		margin-right: 40upx;
	}
	.texts{
		font-size: 25upx;
		margin-right: 10upx;
		/* border: 1px solid #f00; */
	}
	
	
</style>
<script>
	import service from '@/service.js';
	import mInput from '@/components/m-input.vue';
	import headerNav from "@/components/header/company_header.vue"
	import footerNav from "@/components/footer/footer_nav.vue"
	
	
	var _self;
	export default {
	    components: {
			service,
			headerNav,footerNav,
			mInput
		},
		onLoad(options){
			_self = this;
			_self.checkLogin(2);
			_self.teacher_id = options['teacher_id'];
			_self.pid = options['id'];
			
			if(_self.pid == undefined){
				_self.pid = 0;
			}
			if(_self.pid == 0){
				_self.btntxt = '保存'
				_self.headermsg = "员工新计划,Plan New";
			}else{
				_self.btntxt="修改";
				_self.cat_id = options['cat_id'];
				_self.headermsg = "计划编辑,Plan Edit";
			}
		},
		onReady(){
			_self.show();
		},
		data(){
			return{
				teacher_name:'',
				teacher_id:'',
				pid:0,				
				
				cat_id:0,								
				//教室相关
				classroom_id:0,
				classroomindex:0,
				classroom_dataList:["==请选择教室=="],
				classroom_dataIDList:[0],				
				
				dataList:[],	
							
				com_id:0,
				cindex:0,
				cList:[],
				cIDList:[],
				cStatuslist:[],
				
				//临时保存的信息
				studentsid_list:'', //所有学生id
				studentsweek_list:'1',//所选周几
				studentsutime_list:'15:00',//所选周几的接孩子时间
				
				
				category_id:0,
				category_index:0,
				category_dataList:[],
				category_dataIDList:[],
				
				//学生列表
				uid:0,
				uname:'',
				students_dataList:[],
				
				week_id:0,
				week_index:0,				
				week_dataList:['==请选择星期==','星期一','星期二','星期三','星期四','星期五','星期六','星期日'],
				week_dataIDList:['-1',1,2,3,4,5,6,0],
				
				
				
				ptime:"==请选择上课时间==",
				utime:'',
				headermsg:'',
				btntxt:'',
				footer:''
			}
		},
		methods:{			
			bindmodify(){				
				if(_self.teacher_id == ''){
					uni.showToast({
					    icon: 'none',
					    title: '请选择员工'
					});
					return;
				}
				if(parseInt(_self.com_id) == 0){
					uni.showToast({
					    icon: 'none',
					    title: '请选择机构'
					});
					return;
				}
				if(parseInt(_self.category_id) == 0){
					uni.showToast({
					    icon: 'none',
					    title: '请选择课程'
					});
					return;
				}
				
				if(parseInt(_self.week_index) == 0){
					uni.showToast({
					    icon: 'none',
					    title: '请选择星期几'
					});
					return;
				}
				
				if(_self.utime == ''){
					uni.showToast({
					    icon: 'none',
					    title: '请选择上课时间'
					});
					return;
				}
				
				//提交数据
				let ret = _self.getUserInfo();		
				let data = {
					"token":ret.token,
					"guid":ret.guid,
					"com_id":_self.com_id,
					"uid":_self.teacher_id,
					"cat_id":_self.category_id,	
					"weekid":_self.week_id,
					"roomid":_self.classroom_id,
					"utime":_self.utime
				};
				_self.sendRequest({
				    url : _self.AddCompanyTeacherplanInfoUrl,
				    method : _self.Method,
				    data : data,
				    hideLoading : false,
				    success:function (res) {
						if(res){
							let status = res.status;
							let str = '';
							switch(status){
								case 0:{
									str = '数据填写错误';
									break;
								}
								case 1:{
									str = '请选择员工';
									break;
								}
								case 2:{
									str = '上课天数和上课次数不一致';
									break;
								}
								case 3:{
									
										_self.dataList = [];
										_self.com_id = 0;
										_self.cindex = 0;
										_self.cList = [];
										_self.cIDList =  [];
										_self.cStatuslist = [];
										
										//临时保存的信息
										_self.studentsid_list = ''; //所有学生id
										_self.studentsweek_list = '1';//所选周几
										_self.studentsutime_list = '15:00';//所选周几的接孩子时间
										
										
										_self.category_id = 0;
										_self.category_index = 0;
										_self.category_dataList = [];
										_self.category_dataIDList = [];
										
										//学生列表
										_self.uid = 0;
										_self.students_dataList = [];
										
										_self.week_id = 0;
										_self.week_index = 0;				
										_self.week_dataList = [];
										_self.week_dataIDList = [];	
									
									str = '保存成功';
									
									break;
								}							
							}
							
							uni.showModal({
								title: str,
								content: '请选择返回的页面',
								cancelText:'留在本页',
								confirmText:'返回前页',
								success: function (res) {
									if (res.confirm) {
										_self.navigateTo('teacherplanadd?teacher_id='+_self.teacher_id)										
									} else if (res.cancel) {
										_self.navigateTo('teacherdetail?id='+_self.teacher_id);
									}
								}
							});
						}
				    }
				},"1","");
			},
			show(){	
						let ret = uni.getStorageSync(_self.USERS_KEY);
						if(!ret){
							return false;
						}
						const data = {
						    guid: ret.guid,
						    token: ret.token,
							id:_self.teacher_id,
							cat_id:_self.cat_id
						};		
						
						
						
						
						_self.getData(data);
					},
					getData(data){
						_self.sendRequest({
						    url : _self.GetCompanyTeacherOneplanInfoUrl,
						    method : _self.Method,
						    data : {
								"guid": data.guid,
								"token":data.token,
								"id":data.id,
								"t":Math.random()
							},
						    hideLoading : true,
						    success: (res) => {
								   var data = res.memberinfo;
								   _self.teacher_name = data.true_name;
								
									//子公司
									 data = res.subcompanylist;
									let list = [];
									let idlist = [];
									let statuslist = [];
									list.push("==请选择所属机构==");
									idlist.push(0);
									statuslist.push(0)
									for (var i = 0; i < data.length; i++) {
										var item = data[i];									
										list.push(item.com_name);
										idlist.push(item.com_id);
										statuslist.push(item.wt_status);
									}								
									_self.cList = list;
									_self.cIDList = idlist;
									_self.cStatuslist = statuslist;
									if(_self.teacher_id == 0) _self.cindex = 0; 
									
								//debugger;
									
									
										list = [];
										idlist = [];
										list.push("==请选择课程==");
										idlist.push(0);
										_self.category_dataList = list;
										_self.category_dataIDList = idlist;
										_self.category_index = 0; 
									
									
														
									
							}
						    
						},"1","");				
					},
			bindTimeChange: function(e) {
				//debugger;
							console.log('时间picker发送选择改变，携带值为', e.target.value);							
							_self.utime = e.target.value; 
							_self.ptime = e.target.value;
						},
						bindClassRoomChange:function(e){	
							console.log('教室picker发送选择改变，携带值为', e.target.value+"===="+_self.classroom_dataList[e.target.value] + _self.classroom_dataIDList[e.target.value]);
							let index = e.target.value;							
							_self.classroomindex= index;
							_self.classroom_id = _self.classroom_dataIDList[e.target.value];
						},
						pickerCompanyChange:function(e){
							console.log('公司picker发送选择改变，携带值为', e.target.value+"===="+_self.cList[e.target.value] + _self.cIDList[e.target.value]);
							_self.com_id = _self.cIDList[e.target.value];
							_self.status = _self.cStatuslist[e.target.value];
							_self.cindex = e.target.value; 
							
							//获取下属分类
							let ret = _self.getUserInfo();
							_self.sendRequest({
							    url : _self.GetAllSubCompanyTeachergroupByComidUrl,
							    method : _self.Method,
							    data : {
									"guid": ret.guid,
									"token":ret.token,
									"com_id":_self.com_id,
									"status":_self.status,
									"t":Math.random()
								},
							    hideLoading : true,
							    success: (res) => {	
							    	if(res){
										if(parseInt(res.status) == 3){
											var data = res.grouplist;
											let uid = 0;
											let list = [];
											let idlist = [];
											list.push("==请选择课程==");
											idlist.push(0);
											//debugger;
											for (var i = 0; i < data.length; i++) {
												var item = data[i];									
												list.push(item.groupname);
												idlist.push(item.groupid.toString());
											}
											_self.category_dataList = list;
											_self.category_dataIDList = idlist;
											_self.category_index = 0;								
												
											
											//所有教室								
											data = res.classroomlist;
											list = [];
											list.push("==请选择教室==");
											idlist = [];
											idlist.push(0);
											for (var i = 0; i < data.length; i++) {
												var item = data[i];
												list.push(item.classroom_name);
												idlist.push(item.classroom_id);
											}
											_self.classroom_dataList = list;
											_self.classroom_dataIDList = idlist;
										}							
									}
								}
							});				
							
						},
						weekPickerChange:function(e){
							console.log('星期picker发送选择改变，携带值为', e.target.value+"===="+_self.week_dataList[e.target.value] + _self.week_dataIDList[e.target.value]);
							var weekid = e.target.value;
							_self.week_index = weekid;
							_self.week_id = _self.week_dataIDList[weekid];
							
						},
						
						categoryPickerChange:function(e){
							console.log('学校picker发送选择改变，携带值为', e.target.value+"===="+_self.category_dataList[e.target.value] + _self.category_dataIDList[e.target.value]);
							var category_id = _self.category_dataIDList[e.target.value];
							_self.category_id = category_id;
							_self.category_index = e.target.value;
							//debugger;
							
							//获取下属分类
							let ret = _self.getUserInfo();
							_self.sendRequest({
							    url : _self.SelectCompanyTeacherplanCategorylistUrl,
							    method : _self.Method,
							    data : {
									"guid": ret.guid,
									"token":ret.token,
									"com_id":_self.com_id,
									"uid":_self.teacher_id,
									"cat_id":_self.category_id,
									"status":_self.status,
									"t":Math.random()
								},
							    hideLoading : true,
							    success: (res) => {	
							    	if(res){
										//debugger;
										if(parseInt(res.status) == 3){
											var data = res.weeklist;
											for(let i = 0;i<data.length;i++){
												let j = 0;
												let d = data[i];
												if(d.week_id*1 == 0) j = 6;else j = d.week_id*1 - 1;
																				
												
												let jj = _self.classroom_dataIDList.findIndex(i => i == d.classroom_id);									
												_self.classroom_index = jj;	
												
											}
											
										}							
									}
								}
							});				
							
							
							
							
						}
		
		}
    }
</script>