<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				临时加餐
			</view>		
				<view class="icenter bg">
					<view class="input2 fz35">公司：</view>
					<view class="searchinput input-txt">
						<picker @change="pickerCompanyChange($event)" :value="cindex" :range="cList">
							<view class="uni-input fz30">{{cList[cindex]}}</view>
						</picker>
					</view>
					<view class="clear"></view>
					
					<view class="input2 fz35">课程：</view>
					<view class="searchinput input-txt">
						<picker @change="categoryPickerChange($event)" :value="category_index" :range="category_dataList">
							<view class="uni-input fz30">{{category_dataList[category_index]}}</view>
						</picker>
					</view>
					<view class="clear"></view>
					
					<view class="input2 fz35">日期：</view>
					<view class="searchinput input-txt">
						<picker mode="date" @change="pickerDateChange($event)" :value="dindex">
							<view class="uni-input fz30">{{date}}</view>
						</picker>
					</view>
					
					<view class="input2 fz35">学生：</view>
					<view class="searchinput input-txt">
						<picker @change="studentsPickerChange($event)" :value="students_index" :range="students_dataList">
							<view class="uni-input fz30">{{students_dataList[students_index]}}</view>
						</picker>
					</view>
					<view class="clear"></view>
					
					
					
				</view>
				<view class="clear"></view>
				<view class="btn-row"><button type="primary" class="btn" @tap="bindclick">加餐</button></view>
			</view>			
		</view>
	</view>
</template>

<script>
	import service from '@/service.js';
	import mInput from '@/components/m-input.vue'
	import headerNav from "@/components/header/company_header.vue"
	var _self = this;
	import {
	    mapState,
	    mapMutations
	} from 'vuex'
	
	Date.prototype.addMonth = function (addMonth) {
	 var y = this.getFullYear();
	 var m = this.getMonth();
	 var nextY = y;
	 var nextM = m;
	 //如果当前月+要加上的月>11 这里之所以用11是因为 js的月份从0开始
	 if ((m + addMonth)> 11) {
	  nextY = y + 1;
	  nextM = parseInt(m + addMonth) - 12;
	 } else {
	  nextM = this.getMonth() + addMonth
	 }	
	 return new Date(nextY, nextM);
	 }; 
	 
	 
	export default {
	    components: {
			headerNav
		},
		data(){
			return{
				index:0,
				dindex:0,
				cindex:0,
					
				com_id:0,
				category_id:0,
				students_id:0,
				
				
				dataList:[],
				dataIDList:[], //这里是每个值对应的id
				dateList:[], //日期
				
				date:'==请选择加餐日期==',
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
				students_dataIDList:[]
			}
		},
		onLoad(options){
			_self = this;
			_self.checkLogin(2);
			_self.headermsg = '查询,Temperature';
			if(options == undefined) return false;
			_self.id = options['id']; //id=1为上课统计 2为吃饭统计			
			switch(parseInt(_self.id)){
				case 1:{
					_self.headermsg = '上课统计,Statistics';
					break;
				}
				case 2:{
					_self.headermsg = '吃饭统计,Statistics';
					break;
				}
				case 3:{
					_self.headermsg = '员工统计,Statistics';
					break;
				}
			}
			
		},
		onReady(){
			_self.show();
		},
		methods:{
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
				var sid = _self.students_id;
				var cat_id = _self.category_id;
				var d = _self.dateid;				
				debugger;
				if(com_id*1 > 0 && sid*1 > 0 && cat_id*1 > 0 && d != '' ){
					let ret = _self.getUserInfo();
					const data = {
					    guid: ret.guid,
					    token: ret.token
					};
					_self.sendRequest({
					    url : this.SetStudentsExtrameal,
					    method : _self.Method,
					    data : {
							"guid": data.guid,
							"token":data.token,
							"com_id":com_id,
							"sid":sid,
							"cat_id":cat_id,
							"d":d,
							"t":Math.random()
						},
					    hideLoading : false,
					    success: (res) => {
							if(res){
								if(parseInt(res.status) == 3){
									uni.showToast({
										title: '临时加餐成功',
										icon: 'none',
										success() {
											_self.navigateTo("cfsign");
										}
									});
								}
							}else{
								uni.showToast({
									title: '临时加餐失败',
									icon: 'none',
									duration: 2000
								});
							}							
					    }
					},"1","");
									
				}else{
					uni.showToast({
						title: '请选择要加餐的学生的相关信息',
						icon: 'none',
						duration: 2000
					});
				}
			},
			getData(data){
				_self.sendRequest({
				    url : this.GetCompanyplanInfoUrl,
				    method : _self.Method,
				    data : {
						"guid": data.guid,
						"token":data.token,
						"id":data.id,
						"t":Math.random()
					},
				    hideLoading : false,
				    success: (res) => {
							//子公司
							var data = res.subcompanylist;
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
							if(_self.uid == 0) _self.cindex = 0;
							
							list = [];
							idlist = [];
							list.push("==请选择课程==");
							idlist.push(0);
							_self.category_dataList = list;
							_self.category_dataIDList = idlist;
							//if(_self.uid == 0)	_self.category_index = 0;							
							
							
							list = [];
							idlist = [];
							list.push("==请选择学生==");
							idlist.push(0);
							_self.students_dataList = list;
							_self.students_dataIDList = idlist;
							if(_self.uid == 0)	_self.students_index = 0;
							
				    	}
				},"1","");
				
				
			},
			
			studentsPickerChange:function(e){
				console.log('学生picker发送选择改变，携带值为', e.target.value+"===="+_self.students_dataList[e.target.value] + _self.students_dataIDList[e.target.value]);
				var students_id = _self.students_dataIDList[e.target.value];
				_self.students_id = students_id;
				_self.students_index = e.target.value;
			},
			categoryPickerChange:function(e){
				console.log('学校picker发送选择改变，携带值为', e.target.value+"===="+_self.category_dataList[e.target.value] + _self.category_dataIDList[e.target.value]);
				var category_id = _self.category_dataIDList[e.target.value];
				_self.category_id = category_id;
				_self.category_index = e.target.value;			
				
				
			},
			pickerDateChange:function(e){
				console.log('日期picker发送选择改变，携带值为', e.target.value);
				_self.dateid = e.target.value;
				_self.dindex = e.target.value; 
				_self.date = e.target.value; 
				
				//根据comid,catid获取学生
				let ret = _self.getUserInfo();
				this.sendRequest({
					url:this.GetCurrentNOCFStudents,
				    method : _self.Method,
				    data : {
						"guid": ret.guid,
						"token":ret.token,
						"comid":_self.com_id,
						"catid":_self.category_id,
						"d":_self.dateid,
						"t":Math.random()
					},
				    hideLoading : false,
				    success: (res) => {	
				    	if(res){
							if(parseInt(res.status) == 3){								
								var data = res.studentslist;
								let uid = 0;
								let list = [];
								let idlist = [];
								list.push("==请选择学生==");
								idlist.push(0);
								for (var i = 0; i < data.length; i++) {
									var item = data[i];									
									list.push(item.uname);
									idlist.push(item.uid.toString());
								}
								_self.students_dataList = list;
								_self.students_dataIDList = idlist;
								_self.students_index = 0;
							}							
						}
					}
				});	
				
				
				
			},
			pickerCompanyChange:function(e){
				console.log('公司picker发送选择改变，携带值为', e.target.value+"===="+_self.cList[e.target.value] + _self.cIDList[e.target.value]);
				_self.com_id = _self.cIDList[e.target.value];
				_self.status = _self.cStatuslist[e.target.value];
				_self.cindex = e.target.value; 
				
				//获取下属分类
				let ret = _self.getUserInfo();
				this.sendRequest({
				    url : this.GetAllSubCompanyCategoryByComidUrl,
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

<style>	
	.content .title{
			background:url(@/static/img/jc.png) 10upx 22upx no-repeat;
			-webkit-background-size:50upx 50upx ;
			background-size:50upx 50upx;
			line-height: 60upx;
			height: 60upx;
			padding: 15upx 0upx 15upx 70upx;
		}
	
	.icenter{
		width:80%;
		margin: 0 auto;
		margin-top: 60upx;
	}
	.icenter > view{
		float: left;
		margin-bottom: 30upx;
	}
	.icenter .input2{
		width:20%;
		line-height: 60upx;
		height: 60upx;
	}
	.icenter .input-txt{		
		width: 65%;
		border:1upx solid #ccc;
		line-height: 55upx;
		height: 55upx;
		padding-left: 60upx;
		border-radius: 25upx;
	}
	.icenter > view.searchinput{
		background: url(/static/img/search.png) no-repeat 5upx 10upx;
		-webkit-background-size: 55upx 55upx;
		background-size: 55upx 55upx;
	}
	
	
</style>
