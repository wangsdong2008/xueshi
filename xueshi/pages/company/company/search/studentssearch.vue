<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				查询
			</view>			
				<view class="icenter bg">
					<view class="fz35">请选择：</view>
					<view class="searchinput">
						<picker @change="pickerChange($event)" :value="index" :range="dataList">
							<view class="uni-input fz35">{{dataList[index]}}</view>
						</picker>
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
				index:0,
				dataList:[],
				dataIDList:[], //这里是每个值对应的id
				headermsg:'学生查询,Students search'
			}
		},
		onLoad(){
			_self = this;
			_self.checkLogin(2);
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
			getData(data){
				this.sendRequest({
					url : this.GetAllStudents,
					    method : _self.Method,
					    data : {
							"guid": data.guid,
							"token":data.token,
							"t":Math.random()
						},
					    hideLoading : true,
					    success: (res) => {
					    	    if(res){
					    	    	var data = res.studentslist; 
					    			if(parseInt(res.status) == 0){
					    				uni.showToast({
					    					title: '无数据',
					    					icon: 'none',
					    				});		
					    			}else{	
					    				let list = [];
					    				let idlist = [];
					    				for (var i = 0; i < data.length; i++) {
					    					var item = data[i];									
					    					list.push(item.uname);
					    					idlist.push(item.uid);
					    				}								
					    				_self.dataList = list;
					    				_self.dataIDList = idlist;
					    			}					    	
					    	    }
					    	}
					    
					},"1","");
			},
			pickerChange: function(e) {
			    //console.log('picker发送选择改变，携带值为', e.target.value+"===="+_self.dataList[e.target.value] + _self.dataIDList[e.target.value]);
				_self.cid = _self.dataIDList[e.target.value];
				_self.index = e.target.value;
				_self.navigateTo('studentsshow?id='+_self.cid);
				
			}			
			
		}
	}
	
</script>

<style>	
  .content .title{
    		background:url(@/static/img/search2.png) 10upx 22upx no-repeat;
    		-webkit-background-size:50upx 50upx ;
    		background-size:50upx 50upx;
    		line-height: 60upx;
    		height: 60upx;
    		padding: 15upx 0upx 15upx 70upx;
    	}
	.icenter{
		margin-top: 40upx;
	}
	.icenter > view{
		float: left;
	}
	view.searchinput{
		background: url(/static/img/search.png) no-repeat 5upx 10upx;
		-webkit-background-size: 55upx 55upx;
		background-size: 55upx 55upx;
		width: 65%;
		border:1upx solid #999;
		line-height: 65upx;
		height: 65upx;
		padding-left: 60upx;
		border-radius: 25upx;
	}
	
	.btnlist{
		border-top:2px solid #eeeeee;
		padding-top: 40upx;
		width: 100%;
		height:140upx;
	}
	.btnlist button{
		float: left;
		width:30%;
		margin-left: 20upx;
	}
	.btnlist view{
		float: left;
		width: 20%;
		margin-left: 20upx;
	}
	
</style>
