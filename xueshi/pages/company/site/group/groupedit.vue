<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title fz40">
				老师开课设置
			</view>		
				<view class="icenter bg">	
					<view class="namescss">
						<m-input class="m-input fz35" type="text" clearable focus v-model="groupname" placeholder="班名"></m-input>
					</view>
					<view class="clear"></view>			
								
					<view class="searchinput input-txt">
						<picker @change="pickerCompanyChange($event)" :value="cindex" :range="cList">
							<view class="uni-input fz35">{{cList[cindex]}}</view>
						</picker>
					</view>
					<view class="clear"></view>
					
					<view class="searchinput input-txt">
						<picker @change="categoryPickerChange($event)" :value="category_index" :range="category_dataList">
							<view class="uni-input fz35">{{category_dataList[category_index]}}</view>
						</picker>
					</view>
					<view class="clear"></view>
					
					<view :class="{
						'register_account_input':true,
						 'checkboxlist':(_self.studentsnum*1 > 0)
						}">
						<view class="studentslist" v-if="_self.studentsnum*1 == 0">==请选择学生==</view>
						<view v-if="_self.studentsnum*1 > 0">
							<checkbox-group @change="checkboxChange">
								<label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in students_dataList" :index="index" :key="index">
									<checkbox class="checkbox" :value="item.uid.toString()" :checked="item.shower"/><text>{{item.uname}}</text>
								</label>
							</checkbox-group>							
							
							
						</view>
					</view>
					
					
				</view>
				<view class="clear"></view>
				<view class="btn-row"><button type="primary" class="btn" @tap="bindclick">{{btn_txt}}</button></view>
			</view>			
		</view>
	</view>
</template>
<style>	
	.namescss{
		line-height: 80upx;
		height: 80upx;
		border: 1upx solid #ccc;
		border-radius: 50upx;
			
	}
	.m-input{
		line-height: 80upx;
		height: 80upx;
		width:auto;
		padding-left:50upx;
		/* text-indent: 40upx; */
	}
	.content .title{
			background:url(@/static/img/course.png) 10upx 22upx no-repeat;
			-webkit-background-size:50upx 50upx ;
			background-size:50upx 50upx;
			line-height: 60upx;
			height: 60upx;
			padding: 15upx 0upx 15upx 70upx;
		}
	
	.icenter{
		width:90%;
		margin: 0 auto;
		margin-top: 60upx;
	}
	.icenter > view{
		/* float: left; */
		margin-bottom: 30upx;
	}
	.icenter .input2{
		width:20%;
		line-height: 60upx;
		height: 60upx;
	}
	.checkboxlist{
		font-size: 30upx;
		text-align: left;
		height: 400upx;
		overflow-y: auto;
		padding: 20upx;
		border: 1upx solid #ccc;
		margin:20upx 0;
		border-radius:25upx;
	}
	.checkboxlist label{
		margin-right: 15upx;
		width:180upx;
		margin-bottom: 20upx;
		height: 40upx;
		line-height: 40upx;
		display: block;
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
	}
	picker{
		line-height: 80upx;
		height: 80upx;
	}
	
	
</style>

<script>
	import service from '@/service.js';
	import mInput from '@/components/m-input.vue'
	import headerNav from "@/components/header/company_header.vue"
	var _self = this;
	import {
	    mapState,
	    mapMutations
	} from 'vuex'
	
	export default {
	    components: {
			headerNav,mInput
		},
		data(){
			return{
				groupid:0,
				groupname:'',
				
				index:0,
				dindex:0,
				cindex:0,
					
				com_id:0,
				category_id:0,
				students_id:0,
				
				
				dataList:[],
				dataIDList:[], //这里是每个值对应的id
				dateList:[], //日期
				cList:[], //分类
				cIDList:[], //分类id
				dateIDList:[], 
				headermsg:'',
				id:0,
				cid:0,
				dateid:'',
				c_id:0,
				
				category_id:0,
				category_index:0,
				category_dataList:[],
				category_dataIDList:[],
				
				//学生列表
				uid:0,
				students_index:0,
				students_dataList:[],
				students_dataIDList:[],
				studentsnum:0,
				btn_txt:''
			}
		},
		onLoad(options){
			_self = this;
			_self.checkLogin(2);	
			_self.groupid = options['id']==undefined?0:options['id']; 
			if(_self.groupid == 0){
				_self.headermsg = '老师开班设置,New Course';
				_self.btn_txt = "添加";
			}else{
				_self.headermsg = '老师开班设置,New Course Edit';
				_self.btn_txt = "修改";
			}			
		},
		onReady(){
			_self.show();
		},
		methods:{
			checkboxChange: function (e) {
				var items = _self.students_dataList;
			    var values = e.detail.value;
				let list = [];
			    for (var i = 0; i <  items.length; i++) {
			        let item = items[i];
			        if(values.includes(item.uid.toString())){
						list.push(item.uid.toString());
			        }
			    }
				_self.studentsid_list = list.toString();
			},
			show(){
				let ret = _self.getUserInfo();
				const data = {
				    guid: ret.guid,
				    token: ret.token
				};
				_self.getData(data);
			},			
			bindclick(){
				var com_id = _self.com_id;				
				var cat_id = _self.category_id;
				var sid = _self.studentsid_list;
				var ugname = _self.groupname;	
				
				if(com_id*1 > 0 && sid !='' && cat_id*1 > 0 && ugname != '' ){
					//根据comid,catid获取学生
					let ret = _self.getUserInfo();
					_self.sendRequest({
					    url : _self.AddTeacherGroupUrl,
					    method : _self.Method,
					    data : {
							"guid": ret.guid,
							"token":ret.token,
							"comid":_self.com_id,
							"catid":cat_id,
							"sid":sid,
							"ugname":_self.groupname,
							"ugid":_self.groupid,
							"t":Math.random()
						},
					    hideLoading : false,
					    success: (res) => {	
							let str = _self.btn_txt+"成功";
					    	if(res){
								if(parseInt(res.status) == 3){
									//添加完成
									uni.showModal({
										title: str,
									    content: '请选择返回的页面',
										cancelText:'留在本页',
										confirmText:'返回前页',
									    success: function (res) {
									        if (res.confirm) {
												_self.navigateTo('group');
									        } else if (res.cancel) {
									            _self.navigateTo('groupedit?id='+_self.groupid);
									        }
									    }
									});
								}							
							}
						}
					});	
									
				}else{
					uni.showToast({
						title: '请选择相关信息',
						icon: 'none',
						duration: 2000
					});
				}
			},
			getData(data){
				let list2 = [];
				let idlist2 = [];				
				
				_self.sendRequest({
				    url : _self.GetTeacherGroupInfoUrl,
				    method : _self.Method,
				    data : {
						"guid": data.guid,
						"token":data.token,
						"id":_self.groupid,
						"t":Math.random()
					},
				    hideLoading : false,
				    success: (res) => {
							if(_self.groupid > 0){
								//组信息
								var data = res.groupinfo;
								_self.groupname = data.groupname;
								_self.com_id = data.com_id;
								_self.sid = data.studentlist;
								_self.cat_id = data.cat_id;
							}							
							
							//子公司
							data = res.subcompanylist;
							let list = [];
							let idlist = [];
							let statuslist = [];
							list.push("==请选择所属机构==");
							idlist.push(0);
							statuslist.push(0)
							var num = 0;
							var index = 0;
							for (var i = 0; i < data.length; i++) {
								num ++;
								var item = data[i];									
								list.push(item.com_name);
								idlist.push(item.com_id);
								if(item.com_id*1 == _self.com_id*1){
									index = num;
								}
								statuslist.push(item.wt_status);
							}
							_self.cList = list;
							_self.cIDList = idlist;
							_self.cStatuslist = statuslist;	
							if(_self.groupid > 0){
								//设置默认值
								_self.cindex = index;								
							}
							
							//获取分类
							data = res.categorylist;
							list = [];
							idlist = [];
							list.push("==请选择课程==");
							idlist.push(0);
							if(_self.groupid > 0){	
								num = 0;
								index = 0;			
								for(var i = 0;i < data.length; i++){
									num ++;
									var item = data[i];									
									list.push(item.cat_name);
									idlist.push(item.cat_id);
									if(item.cat_id*1 == _self.cat_id*1){
										index = num;
										_self.category_id = item.cat_id;
									}
								}			
								//默认值
								//_self.category_index = index;					
							}
							_self.category_dataList = list;
							_self.category_dataIDList = idlist;	
							
							
							
							//学生
							data = res.studentslist;
							list = [];
							idlist = [];
							if(_self.groupid > 0){									
								_self.studentsnum = data.length*1; //学生数量，为复选框准备的								
								for (var i = 0; i < data.length; i++) {
									var item = data[i];									
									list.push(item);
									idlist.push(item.uid);
								}								
								
							}else{								
								list.push("==请选择学生==");
								idlist.push(0);									
							}
							_self.students_dataList = list;
							_self.students_dataIDList = idlist;
							_self.students_index = index;
							
							
				    	}
				},"1","");
				
				
			},
			
			
			categoryPickerChange:function(e){
				console.log('学校picker发送选择改变，携带值为', e.target.value+"===="+_self.category_dataList[e.target.value] + _self.category_dataIDList[e.target.value]);
				var category_id = _self.category_dataIDList[e.target.value];
				_self.category_id = category_id;
				_self.category_index = e.target.value;
				
				//根据comid,catid获取学生
				let ret = _self.getUserInfo();
				_self.sendRequest({
				    url : _self.GetAllStudentsByComidCatidUrl,
				    method : _self.Method,
				    data : {
						"guid": ret.guid,
						"token":ret.token,
						"comid":_self.com_id,
						"catid":category_id,
						"t":Math.random()
					},
				    hideLoading : false,
				    success: (res) => {	
				    	if(res){
							if(parseInt(res.status) == 3){
								var data = res.studentslist;
								let uid = 0;
								let list,idlist;
								if(_self.students_dataList == "==请选择学生=="){
									list = [];
									idlist = [];
								}else{
									list = _self.students_dataList;
								    idlist = _self.students_dataIDList;
								}
								_self.students_dataList = [];
								_self.students_dataIDList = [];							
								
								
								for (var i = 0; i < data.length; i++) {	
									let flag = false;
									var item2 = data[i];				
									for(let j=0 ; j < idlist.length;j++){										
										let v = idlist[j];
										//console.log(v+"===="+item2.uid);
										if(v*1 == item2.uid*1){
											flag = true;//重复的学生不显示在里面
											break;
										}
									}
									if(flag==false){ //重复的学生不显示在里面
										list.push(item2);
										idlist.push(item2.uid.toString());
									}
								}									
								
								_self.studentsnum = data.length;
								_self.students_dataList = list;
								_self.students_dataIDList = idlist;							
								
								_self.students_index = 0;
							}							
						}
					}
				});	
				
			},
			pickerDateChange:function(e){
				console.log('日期picker发送选择改变，携带值为', e.target.value+"===="+_self.dateList[e.target.value]);
				_self.dateid = _self.dateList[e.target.value];
				_self.dindex = e.target.value; 
			},
			pickerCompanyChange:function(e){
				console.log('公司picker发送选择改变，携带值为', e.target.value+"===="+_self.cList[e.target.value] + _self.cIDList[e.target.value]);
				_self.com_id = _self.cIDList[e.target.value];
				_self.status = _self.cStatuslist[e.target.value];
				_self.cindex = e.target.value; 
				
				//获取下属分类
				let ret = _self.getUserInfo();
				_self.sendRequest({
				    url : _self.GetAllSubCompanyCategoryByComidUrl,
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
								var data = res.categorylist;
								let uid = 0;
								let list = [];
								let idlist = [];
								list.push("==请选择课程==");
								idlist.push(0);
								for (var i = 0; i < data.length; i++) {
									var item = data[i];									
									list.push(item.cat_name);
									idlist.push(item.cat_id.toString());
								}
								_self.category_dataList = list;
								_self.category_dataIDList = idlist;
								_self.category_index = 0;
												
								
							}							
						}
					}
				});				
				
			}
		}
	}
	
</script>

