<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				{{studentsname+_self.d+'【'+_self.category_name+'】'+cat_name}}
			</view>
			<uni-calendar 
				:insert="true"
				:lunar="false" 
				:selected="selected"
				:start-date="'2019-3-2'"
				:end-date="'2059-5-20'"
				:date = "d+'-01'"
				@monthSwitch="changeMonth"
				@change="changes"
			></uni-calendar>			
		</view>
	</view>
</template>

<script>
	import service from '@/service.js'
	import mInput from '@/components/m-input.vue'
	import headerNav from "@/components/header/company_header.vue"
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'	
	
	var _self;
	
	export default {
	    components: {
			headerNav,uniSection,uniCalendar
			
		},
		data(){
			return{
				headermsg:'',
				dataList:[],
				selected: [],
				studentsname:'',
				category_name:'',
				id:0,
				cid:0, //课程id
				uid:0, //学生id
				d:'',//月份
				com_id:'',//机构
				cat_name:'吃饭统计' ,//课程分类名称
				title:'',
				content:'',
				title2:'',
				currstatus:0,
				currentday:'' ,//当前选择的日期
				itemList:[] //按纽上文字
			}
		},
		onLoad(options){
			_self = this;
			_self.checkLogin(2);
			if(options == undefined) return false;
			_self.id = options['id']; //id=1为上课统计
			_self.cid = options['cid'];  //课程id
			_self.uid = options['uid']; //学生
			_self.d = options['d']; //日期
			_self.com_id = options['com_id']; //机构
			var strname = "";
			switch(parseInt(_self.id)){
				case 1:{
					_self.title2 = "上课";
					strname = "上课统计";
					_self.headermsg = '上课统计,Statistics';	
					_self.itemList = Array('签到','请假','删除');
					break;
				}
				case 2:{
					_self.title2 = "吃饭";
					strname = "吃饭统计";
					_self.headermsg = '吃饭统计,Statistics';
					_self.itemList = Array('已吃','没吃','删除');
					break;
				}
				case 3:{
					_self.title2 = "员工";
					strname = "员工统计";
					_self.headermsg = '员工统计,Statistics';
					break;
				}
			}
			_self.cat_name = strname;
		},
		onReady(){
			_self.show();
		},
		methods:{
			setsignstatus(currstatus){
				let ret = _self.getUserInfo();
				const data = {
				    guid: ret.guid,
				    token: ret.token
				};
				let data2 = {
							"guid": data.guid,
							"token":data.token,
							"com_id":_self.com_id,
							"uid":_self.uid,
							"cid":_self.cid, //课程
							"d":_self.currentday,//
							"id":_self.id,  //上课和吃饭
							"signstatus":currstatus,
							"t":Math.random()
						};
				//临时添厍签到记录
				_self.sendRequest({
				        url : _self.RepairsignUrl,
				        method : _self.Method,
				        data : data2,
				        hideLoading : true,
				        success: (res) => {
							if(res){
								if(parseInt(res.status) == 3){
									/*去掉已有的样式*/
									let currday = _self.currentday;
									for(let i = 0; i<_self.selected.length; i++ ){
										let t = _self.selected[i].date;
										if(_self.selected[i].date == currday)
										{
											_self.selected.splice(i, 1);
											break;
										}
									}
									
									
									switch(currstatus){
										case 1:{ //签到
											let item = {};
											item['date'] = _self.currentday;
											item['status'] = 1;
											_self.selected.push(item);
											break;
										}
										case 2:{ //请假
											
											let item = {};
											item['date'] = _self.currentday;
											item['status'] = 2;
											_self.selected.push(item);
											break;
										}
										case 0:{ //删除
											/* let currday = _self.currentday;
											for(let i = 0; i<_self.selected.length; i++ ){
													let t = _self.selected[i].date;
													if(_self.selected[i].date == currday)
													{
														_self.selected.splice(i, 1);
														break;
													} 
											}*/
											break;
									    }
								    }								
								}			    	
							}
				        }				        
				    },"1","");
			},
			
			changes(e){
				/* _self.$refs.dialogInput2.open();
				
				let status = 0;
				let statusname = "设置";
				let currday = _self.d+'-' + ("00"+e.date).slice(-2);
				for(let i = 0; i<_self.selected.length; i++ ){
					let t = _self.selected[i].date;
					if(_self.selected[i].date == currday){
						status = 1; //已经有了，只能取消
						statusname = "取消";
						break;
					}
				}
				_self.currstatus = status;
				_self.currentday = currday;
				_self.title = "您确定要【" + statusname + "】\r\n"+_self.studentsname+'' + currday + '\r\n在'+_self.category_name+_self.title2+"签到吗？"; */
				
				
				let currday = _self.d+'-' + ("00"+e.date).slice(-2);				
				_self.currentday = currday;
				
				uni.showActionSheet({
					itemList: _self.itemList,
					success: function (res) {
						switch(res.tapIndex){
							case 0:{ //签到
								//console.log('你选中了A按钮');
								_self.setsignstatus(1);
								break;
							}
							case 1:{ //未签到
								//console.log('你选中了B按钮');
								_self.setsignstatus(2);
								break;
							}
							case 2:{ //删除
								//console.log('你选中了C按钮');
								_self.setsignstatus(0);
								break;
							}
						}						
					},
					fail: function (res) {
						console.log(res.errMsg);
					}
				});
				
				
			},
			changeMonth(e){
				let currmonth = e.year + "-" + ("0"+e.month).slice(-2);
				_self.d = currmonth;				
				_self.show();
			},
			show(){
				let ret = _self.getUserInfo();
				const data = {
				    guid: ret.guid,
				    token: ret.token
				};
				_self.getData(data);
			},
			getData(data){
				_self.sendRequest({
				        url : _self.GetStudentssign,
				        method : _self.Method,
				        data : {
							"guid": data.guid,
							"token":data.token,
							"com_id":_self.com_id,
							"uid":_self.uid,
							"cid":_self.cid, //课程
							"d":_self.d,
							"id":_self.id,  //上课和吃饭
							"t":Math.random()
						},
				        hideLoading : true,
				        success: (res) => {
				        	    if(res){
									_self.studentsname = res.studentsinfo.uname;
									_self.category_name = res.categoryinfo.cat_name;									
				        			if(parseInt(res.status) == 3){								
				        				//_self.cat_name = res.categorylist.cat_name;
										
										
				        				var data = res;
				        				if(parseInt(res.status) == 3){
				        					//所有签到记录
				        					let list = [];
				        					let signlist = data['signlist'];
				        					for (var i = 0; i < signlist.length; i++) {
				        						var item = signlist[i];									
				        						list.push(item);
				        					}	
				        					_self.selected = list;
				        				}								
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
		background:url(@/static/img/tjsearch.png) 10upx 22upx no-repeat;
		-webkit-background-size:50upx 50upx ;
		background-size:50upx 50upx;
		line-height: 60upx;
		height: 60upx;
		padding: 15upx 0upx 15upx 70upx;
	}
	
	.uni-section{
		background-color: #fff;
	}
	.uni-calendar{
		width:96%;
		margin:0 auto;
	}
	.content{
		background-color: #fff;
	}
	.icenter > view{
		float: left;
	}
	.icenter > view.searchinput{
		background: url(/static/img/search.png) no-repeat 5upx 10upx;
		-webkit-background-size: 55upx 55upx;
		background-size: 55upx 55upx;
		width: 65%;
		border:1upx solid #eeeeee;
		line-height: 55upx;
		height: 55upx;
		padding-left: 60upx;
		border-radius: 25upx;
	}
	.sites{
		padding-bottom: 200upx;
	}
</style>
