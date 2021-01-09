<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				{{cat_name}}统计
			</view>
				
				<view class="icenter bg">
					<view class="input2 fz30">公司：</view>
					<view class="searchinput input-txt fz30">
						<picker @change="pickerChange($event)" :value="index" :range="dataList">
							<view class="uni-input">{{dataList[index]}}</view>
						</picker>
					</view>
					<view class="clear"></view>
					<view v-if="id == 1" class="input2 fz30">课程：</view>
					<view class="searchinput input-txt fz30" v-if="id == 1">
						<picker @change="pickerCourseChange($event)" :value="cindex" :range="cList">
							<view class="uni-input">{{cList[cindex]}}</view>
						</picker>
					</view>
					<view class="clear"></view>
					<view class="input2 fz30">月份：</view>
					<view class="input-txt fz30">
						<picker @change="pickerDateChange($event)" :value="dindex" :range="dateList">
							<view class="uni-input">{{dateList[dindex]}}</view>
						</picker>
					</view>					
				</view>
				<view class="clear"></view>
				<view class="btn-row"><button type="primary" class="btn" @tap="bindclick">搜索</button></view>
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
				id:0,
				cid:0,
				dateid:'',
				c_id:0,
				cat_name:''
			}
		},
		onLoad(options){
			_self = this;
			_self.checkLogin(2);
			var pid = options['id'];
			 if(pid == '') pid = 1;
			_self.id =  pid;
			switch(parseInt(pid)){
				case 1:{
					_self.headermsg = '上课统计,Statistics';
					_self.cat_name = '上课';
					break;
				}
				case 2:{
					_self.headermsg = '吃饭统计,Statistics';
					_self.cat_name = '吃饭';
					break;
				}
				case 3:{
					_self.headermsg = '员工统计,Statistics';
					_self.cat_name = '考勤';
					break;
				}
			}
		},
		onReady(){
			_self.dateList = _self.GetStudyMonth();
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
				var date = new Date();
				var str = date.getMonth() + 1;
				str = "00" + str;
				_self.dateid = date.getFullYear() + "-" + str.substr(str.length-2,str.length);
			},
			bindclick(){
				var com_id = _self.cid;
				var d = _self.dateid;
				var c_id = _self.c_id;
				_self.navigateTo('statisticcompanyresult?com_id='+com_id+'&d='+d+'&cid='+_self.c_id+'&id='+_self.id);
			},
			getData(data){
				let data1 = data;
				this.sendRequest({
				        url : this.GetAllSubCompanyUrl,
				        method : _self.Method,
				        data : {
							"guid": data.guid,
							"token":data.token,
							"t":Math.random()
						},
				        hideLoading : true,
				        success: (res) => {
				        	    if(res){
				        	    	var data = res.subcompanylist; 
				        			if(parseInt(res.status) == 0){
				        				uni.showToast({
				        					title: '无数据1',
				        					icon: 'none',
				        				});		
				        			}else{
				        				let uid = 0;
				        				let list = [];
				        				let idlist = [];
				        				for (var i = 0; i < data.length; i++) {
				        					var item = data[i];									
				        					list.push(item.com_name);
				        					idlist.push(item.com_id);
				        					if(i == 0){
				        						uid = item.com_id;
				        					}
				        				}
				        				_self.dataList = list;
				        				_self.dataIDList = idlist;
				        				if(_self.id == 1){
				        					if(uid > 0){
				        						data1['uid'] = uid;										
				        						_self.getCompanyCategory(data1);
				        					}
				        				}
				        				
				        				/* list = [];
				        				var dlist = res.data.datelist;
				        				for(var i = dlist.length-1; i > 0; i--){
				        					var item = dlist[i];
				        					list.push(item.d);
				        				}
				        				_self.dateList = list; */
				        				_self.cid = _self.dataIDList[0];
				        			}					    	
				        	    }
				        	}
				        
				    },"1","");				
			},
			getCompanyCategory:function(data){	
				var id = _self.id;
				this.sendRequest({
				        url : this.GetCompanyCategory,
				        method : _self.Method,
				        data : {
							"guid": data.guid,
							"token":data.token,
							"id":_self.id,
							"cid":data.uid,
							"t":Math.random()
						},
				        hideLoading : true,
				        success: (res) => {
				       	    if(res){
				       			var data = res.categorylist;
				       			if(parseInt(res.status) == 3){
				       				let list = [];
				       				let idlist = [];
				       				let catid = 0;
				       				for (var i = 0; i < data.length; i++) {
				       					var item = data[i];									
				       					list.push(item.cat_name);
				       					idlist.push(item.cat_id);
				       					if(i == 0){
				       						catid = item.cat_id;
				       					}
				       				}
				       				_self.c_id = catid;
				       				_self.cList = list;
				       				_self.cIDList = idlist;
				       			}else{
				       				uni.showToast({
				       					title: '无数据2',
				       					icon: 'none',
				       				});	
				       			}
				       		}
				       	},
				       
				    },"1","");
			},
			pickerChange: function(e) {
			    console.log('picker-company发送选择改变，携带值为', e.target.value+"===="+_self.dataList[e.target.value] + _self.dataIDList[e.target.value]);
				_self.cid = _self.dataIDList[e.target.value];
				_self.index = e.target.value;
				//_self.navigateTo('statisticsresult?id='+_self.cid);
				let ret = _self.getUserInfo();
				const data = {
				    guid: ret.guid,
				    token: ret.token,
					uid:_self.dataIDList[e.target.value]
				};
				if(_self.id == 1){
					_self.getCompanyCategory(data);
				}
				
			},
			pickerDateChange:function(e){
				console.log('picker-date发送选择改变，携带值为', e.target.value+"===="+_self.dateList[e.target.value]);
				_self.dateid = _self.dateList[e.target.value];
				_self.dindex = e.target.value; 
			},
			pickerCourseChange:function(e){
				console.log('picker-course发送选择改变，携带值为', e.target.value+"===="+_self.cList[e.target.value] + _self.cIDList[e.target.value]);
				_self.c_id = _self.cIDList[e.target.value];
				_self.cindex = e.target.value; 
			}
			
		}
	}
	
</script>

<style>	
	.content .title{
		background:url(/static/img/etj.png) 10upx 22upx no-repeat;
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
		float: left;
		margin-bottom: 30upx;
	}
	/* .icenter .input-txt{		
		width: 65%;
		border:1upx solid #eeeeee;
		line-height: 55upx;
		height: 55upx;
		padding-left: 60upx;
		border-radius: 25upx;
	}
	.icenter > view.searchinput{
		background: url(/static/img/search.png) no-repeat 5upx 10upx;
		-webkit-background-size: 55upx 55upx;
		background-size: 55upx 55upx;
	} */
	
	.icenter .input2{
		width:23%;
		line-height: 75upx;
		height: 75upx;
	}
	
	picker view{
		border: 1px solid #ccc;
		width:450upx;
		text-align: center;
		height: 75upx;
		line-height: 75upx;
		border-radius: 50upx;
	}
	
</style>
