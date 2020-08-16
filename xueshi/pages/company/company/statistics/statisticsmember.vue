<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				考勤统计
			</view>			
				<view class="icenter bg">
					<view class="fz30">机构：</view>
					<view class="input-txt">					
						<picker @change="pickerCompanyChange($event)" :value="cindex" :range="cList">
							<view class="uni-input fz30">{{cList[cindex]}}</view>
						</picker>
					</view>
					<view class="clear"></view>
					<view class="fz30">姓名：</view>				
					<view class="searchinput input-txt">
						<picker @change="pickerChange($event)" :value="index" :range="dataList">
							<view class="uni-input fz30">{{dataList[index]}}</view>
						</picker>
					</view>
					<view class="clear"></view>
					<view class="fz30">年份：</view>
					<view class="input-txt">
						<picker @change="pickerDateChange($event)" :value="dindex" :range="dateList">
							<view class="uni-input fz30">{{dateList[dindex]}}</view>
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
				com_id:0
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
			pickerCompanyChange:function(e){
				console.log('picker发送选择改变，携带值为', e.target.value+"===="+_self.cList[e.target.value] + _self.cIDList[e.target.value]);
				_self.com_id = _self.cIDList[e.target.value];
				_self.cindex = e.target.value;
				 
				let ret = _self.getUserInfo();
				this.sendRequest({
					url : this.GetAllSubCompanyMemberlistUrl,
				    method : _self.Method,
				    data : {
						"guid": ret.guid,
						"token":ret.token,
						"com_id":_self.com_id,
						"t":Math.random()
					},
				    hideLoading : true,
				    success: (res) => {
						if(parseInt(res.status) == 3){
							let data = res.memberlist;
							let uid = 0;
							let list = [];
							let idlist = [];
							list.push("==请选择员工==");
							idlist.push(0);
							
							for (var i = 0; i < data.length; i++) {
								var item = data[i];									
								list.push(item.true_name);
								idlist.push(item.id);
							}
							_self.dataList = list;
							_self.dataIDList = idlist;							
						}
					},
				});				
				
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
				_self.navigateTo('statisticsmemberresult?comid='+_self.com_id+"&d="+_self.dateid+"&cid="+_self.cid+"&id="+_self.id);
			},
			getData(data){
				let data1 = data;
				this.sendRequest({
					url : this.GetAllMemberlistUrl,
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
							let list = [];
							let idlist = [];
							list.push("==请选择所属机构==");
							idlist.push(0);
							for (var i = 0; i < data.length; i++) {
								var item = data[i];									
								list.push(item.com_name);
								idlist.push(item.com_id);
							}								
							_self.cList = list;
							_self.cIDList = idlist;	
							
							//年份
							_self.dateList = _self.GetStudyYear();
							_self.cid = _self.dataIDList[0];
							_self.dateid = _self.dateList[0]; 
							
							list = [];
							idlist = [];
							list.push("==请选择员工==");
							idlist.push(0);
							_self.dataList = list;
							_self.dataIDList = idlist;				    	
						}	    
				    }
				    
				},"1","");
				
				
			},
			getStudentsCategory:function(data){	
				var id = _self.id;
				this.sendRequest({
					url : this.GetStudentsCategory,
				    method : _self.Method,
				    data : {
						"guid": data.guid,
						"token":data.token,
						"id":_self.id,
						"uid":data.uid,
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
			    console.log('picker发送选择改变，携带值为', e.target.value+"===="+_self.dataList[e.target.value] + _self.dataIDList[e.target.value]);
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
					_self.getStudentsCategory(data);
				}
				
			},
			pickerDateChange:function(e){
				//console.log('picker发送选择改变，携带值为', e.target.value+"===="+_self.dateList[e.target.value]);
				_self.dateid = _self.dateList[e.target.value];
				_self.dindex = e.target.value; 
			},
			pickerCourseChange:function(e){
				console.log('picker发送选择改变，携带值为', e.target.value+"===="+_self.cList[e.target.value] + _self.cIDList[e.target.value]);
				_self.c_id = _self.cIDList[e.target.value];
				_self.cindex = e.target.value; 
			}
			
		}
	}
	
</script>

<style>
	.content .title{
		background:url(@/static/img/etj.png) 10upx 22upx no-repeat;
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
	.icenter .input-txt{		
		width: 65%;
		border:1upx solid #eeeeee;
		line-height: 55upx;
		height: 55upx;
		padding-left: 60upx;
		border-radius: 25upx;
	}
	.icenter > view.searchinput{
		
	}
	.btn{
		width: 100%;
	}
	
</style>
