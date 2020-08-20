<template>
	<div class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<div class="content">
			<div class="title">
				上课统计
			</div>
			<div>
				<div class="register_account_input clear">
					<div class="uni-list-cell-left fz30">姓名：</div>
					<div class="searchinput input-txt">
						<picker @change="pickerChange($event)" :value="index" :range="dataList">
							<div class="uni-input fz30">{{dataList[index]}}</div>
						</picker>
					</div>
				</div>
				
				<div class="register_account_input clear">
					<div class="uni-list-cell-left fz30">课程：</div>
					<div class="searchinput input-txt">
						<picker @change="pickerCourseChange($event)" :value="cindex" :range="cList">
							<div class="uni-input fz30">{{cList[cindex]}}</div>
						</picker>
					</div>
				</div>
				
				<div class="register_account_input clear">
					<div class="uni-list-cell-left fz30">年份：</div>
					<div class="input-txt">
						<picker @change="pickerDateChange($event)" :value="dindex" :range="dateList">
							<div class="uni-input fz30">{{dateList[dindex]}}</div>
						</picker>
					</div>
				</div>					
					
				<div class="btn-row clear">
					<button type="primary" class="primary btn" @tap="bindclick">搜索</button>
				</div>				
				
			</div>
			<div class="footer">
				<footerNav :msg="footer"></footerNav>
			</div>
			
			</div>
		</div>
	</div>
</template>

<script>
	import service from '@/service.js';
	import mInput from '@/components/m-input.vue'
	import uniSection from '@/components/uni-section/uni-section.vue'
	import headerNav from "@/components/header/users_header.vue"	
	import footerNav from "@/components/footer/footer_nav.vue"
	
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
			headerNav,footerNav,uniSection
		},
		data(){
			return{
				index:0,
				dindex:0,
				cindex:0,				
				dataList:[],
				dataIDList:[], //这里是每个值对应的id
				dateList:[], //日期
				cList:[], //分类
				cIDList:[], //分类id
				dateIDList:[], 
				headermsg:'',
				child_id:0,//孩子
				cid:0,   //课程
				dateid:0 ,//年份
				footer: ''
			}
		},
		onLoad(options){
			_self = this;
			_self.checkLogin(1);
			_self.headermsg = '上课统计,Statistics';
				
		},
		onReady(){
			_self.show();
		},
		methods:{
			bindclick(){
				if(_self.child_id == 0 || _self.child_id == undefined){
					uni.showToast({
					    icon: 'none',
					    title: '请选择孩子'
					});
					return;
				}
				if(_self.cid == 0){
					uni.showToast({
					    icon: 'none',
					    title: '请选择课程'
					});
					return;
				}
				if(_self.dateid == 0){
					uni.showToast({
					    icon: 'none',
					    title: '请选择年份'
					});
					return;
				}				
				_self.navigateTo('tongjiresult?child_id='+_self.child_id+"&dateid="+_self.dateid+"&cid="+_self.cid);
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
				let data1 = data;
				_self.sendRequest({
					url : _self.AllChildrenUrl,
				    method : _self.Method,
				    data : {
						"guid": data.guid,
						"token":data.token,
						"t":Math.random()
					},
				    hideLoading : true,
				    success: (res) => {
						if(res){
							var data = res.list; 
							if(parseInt(res.status) == 3){
								let uid = 0;
								let list = [];
								let idlist = [];
								list.push("==请选择孩子==");
								idlist.push(0);								
								for (var i = 0; i < data.length; i++) {
									var item = data[i];									
									list.push(item.child_name);
									idlist.push(item.child_id);
								}
								_self.dataList = list;
								_self.dataIDList = idlist;
								
								list = [];
								idlist = [];
								data = res.courselist;
								list.push("==请选择课程==");
								idlist.push(0);	
								for (var i = 0; i < data.length; i++) {
									var item = data[i];									
									list.push(item.c_name);
									idlist.push(item.c_id);
								}
								_self.cList = list;
								_self.cIDList = idlist;
								
								_self.dateList = _self.GetStudyYear();
								_self.dateid = _self.dateList[0];
								
							}					    	
						}	    
				    }
				    
				},"1","");
			},
			
			pickerChange: function(e) {
			    console.log('child picker发送选择改变，携带值为', e.target.value+"===="+_self.dataList[e.target.value] + _self.dataIDList[e.target.value]);
				_self.child_id = _self.dataIDList[e.target.value];
				_self.index = e.target.value;
				
				
			},
			pickerDateChange:function(e){
				console.log('date picker发送选择改变，携带值为', e.target.value+"===="+_self.dateList[e.target.value]);
				_self.dateid = _self.dateList[e.target.value];
				_self.dindex = e.target.value; 
			},
			pickerCourseChange:function(e){
				console.log('course picker发送选择改变，携带值为', e.target.value+"===="+_self.cList[e.target.value] + _self.cIDList[e.target.value]);
				_self.cid = _self.cIDList[e.target.value];
				_self.cindex = e.target.value; 
			}
			
		}
	}
	
</script>

<style>
	.btn-row{		
		margin-top: 40upx;
	}
	.content .title{
		background:url(/static/img/etj.png) 10upx 25upx no-repeat;
		-webkit-background-size: 40upx 40upx;
		background-size: 40upx 40upx;
		padding-left: 60upx;
		line-height: 80upx;
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
		.register_account_input div{
			float: left;
		}
		
	
		.register_account_input{
			padding-top: 20upx;
			padding-bottom: 10px;
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
			width:20%;
		}
		
		picker div{
			border: 1px solid #ccc;
			width:480upx;
			text-align: center;
			height: 75upx;
			line-height: 75upx;
			border-radius: 50upx;
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