<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				今日上课
			</view>
		</view>
		<view class="line"></view>
		<view class="content">				
				<view class="studentlist">
					<checkbox-group  @change="checkboxChange"> 
					<ul v-for="(item,index) in dataList" :index="index" :key="item.com_id">
						<li v-if="parseInt(item.category_num) > 0"  class="list-title list"> {{item.com_name}}
							<ul v-if="parseInt(item2.students_num) > 0" v-for="(item2,index2) in item.categorylist" :index="index2" :key="item2.cat_id">
								<li class="list-title2"> {{'【'+item2.cat_name+'】'}}
									<ul class="studentsclass" v-for="(item3,index3) in item2.studentslist" :index="index3" :key="item3.uid">
										<li>
												<label class="checkbox">
													<checkbox :value="item.com_id.toString()+'-'+item2.cat_id.toString()+'-'+item3.uid.toString()" :checked="ulist.indexOf(item.com_id+'-'+item2.cat_id+'-'+item3.uid)>=0" />
												</label>
												<view :class="{
												 'boys0':(item3.sex==1),
												 'grils0':(item3.sex==0)
												 }">{{item3.uname}}
												</view>
									</li>
									</ul>
								</li>
							</ul>							
						</li>
					</ul>
					
					
					</checkbox-group>
					  
					  <view class="btnlist">
						<checkbox-group @change="bindSelectAll">
							<view>
								<label class="checkbox">
									<checkbox value="1" :checked="isCheckedAll"/>全选
								</label>
							</view>							
							<button type="primary" @tap="bindclick(1)" v-if="parseInt(_self.dataList_num ) > 0">签到</button>
							<button type="primary" @tap="bindclick(2)" v-if="parseInt(_self.dataList_num ) > 0">请假</button>
							<button type="primary" disabled="false" v-if="parseInt(_self.dataList_num ) == 0">签到</button>
							<button type="primary" disabled="true" v-if="parseInt(_self.dataList_num ) == 0">请假</button>
							
						</checkbox-group> 
					  </view>
					  
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	import headerNav from "@/components/header/company_header.vue"
	var _self;
	export default {
	    components: {uniGrid,uniGridItem,headerNav},
		data(){
			return{
				dataList:[],	
				dataList_num:0,
				selectid:'',
				isCheckedAll: false,
				ulist:[],
				headermsg:'上课签到,Class sign',
			}
		},
		onReady:function(){
			_self.show();
		},
		onLoad:function() {
			_self = this;
			_self.checkLogin(2);			
		},
		methods: {
			show(){
				let ret = _self.getUserInfo();
				if(!ret){
					return false;
				}
				if(parseInt(ret.pay_status) == 0){ //过期会员去续费
					uni.showModal({
					    title: "提醒",
					    content: '会员已过期，请续费',
						cancelText:'留在本页',
						confirmText:'去续费',
					    success: function (res) {
					        if (res.confirm) {
								_self.navigateTo('../../users/main/pay');
					        }
					    }
					});
				}else{
					const data = {
						guid: ret.guid,
						token: ret.token
					};
					_self.getData(data);
				}
			},
			getData(data){
				_self.sendRequest({
				    url : _self.GetNoSignStudents,
				    method : _self.Method,
				    data : {
						"guid": data.guid,
						"token":data.token,
						"catid":1,
						"t":Math.random()
					},
				    hideLoading : true,
				    success:function (res) {
						if(res){
					    	var data = res.list; 
							if(parseInt(res.status) == 3){
								if(data.length > 0){
									let list = [];
									let str = '';
									var num = 0;
									//debugger;
									for (var i = 0; i < data.length; i++) {				
										var item = data[i];
										list.push(item);
										var tstr = item.com_id+"-";
										for(var j = 0;j<item.categorylist.length;j++){
											var mstr = tstr + item.categorylist[j].cat_id+"-";
											for(var k = 0;k<item.categorylist[j].studentslist.length;k++){
												str += mstr + item.categorylist[j].studentslist[k].uid + ",";
												num ++;
											}
										}								
										
									}								
									_self.dataList = list;
									_self.dataList_num = num;
									if(str != ''){
										str = str.substr(0,str.length-1);
									}
								}
							}			    	
					    }
					
				    }
				},"1","");
			},
			bindSelectAll:function(){
				let str = ''
				_self.isCheckedAll = !_self.isCheckedAll
				if (_self.isCheckedAll) {
					// 全选时
					_self.ulist = [];					
				    _self.dataList.forEach(function (item) {						
						var categorylist = item.categorylist;
						for(var j = 0; j < categorylist.length; j++ ){
							var studentslist = categorylist[j].studentslist;
							for(var k = 0; k < studentslist.length; k++){
								var value = item.com_id + '-' + categorylist[j].cat_id + '-' + studentslist[k].uid;
								str += value + ",";
								_self.ulist.push(value);
							}
						}
					}, _self);				  
				} else {
				  _self.ulist = [];
				}
				if(str != ''){
					str = str.substr(0,str.length-1);					
				}
				_self.selectid = str;
			},
			checkboxChange: function (e) {
				var items = _self.dataList;
				var	values = e.detail.value;
				var str = '';
				var num = 0;				
				let companylist = items;
				_self.ulist = [];
				for (var i = 0; i < companylist.length; i++) {
					let item = companylist[i];
					let categorylist = item.categorylist;
					for(var j = 0; j < categorylist.length; j++){
						let studentslist = categorylist[j].studentslist;
						for(var k = 0; k < studentslist.length; k++ ){
							var value = item['com_id'].toString()+'-'+item.categorylist[j]['cat_id'].toString()+'-'+studentslist[k]['uid'].toString();
							if(values.includes(value)){
								str = values + ",";	
								num ++;
								_self.ulist.push(value);
							}
						}
					}
				}
				if(str != ''){
					str = str.substr(0,str.length-1);					
				}
				if(_self.ulist.length == 0){
					_self.isCheckedAll = false;
				}else{
					if(num == _self.dataList_num){
						_self.isCheckedAll = true;
					}else{
						_self.isCheckedAll = false;
					}
				}
				_self.selectid = str;
				
			},			
			bindclick(sid){
				if( _self.selectid.toString() == '') {
					uni.showToast({
						title: '请选择学生',
						icon: 'none'
					});
					return false;
				}				
				//调用签到函数
				_self.setSign(1,sid,_self.selectid.toString(),'sksign');
				_self.selectid = '';
			}
		}
	}
	
</script>


<style>	
 .content .title{
		background:url(@/static/img/clock.png) 10upx 22upx no-repeat;
		-webkit-background-size:50upx 50upx ;
		background-size:50upx 50upx;
		line-height: 60upx;
		height: 60upx;
		padding: 15upx 0upx 15upx 70upx;
	}
	.studentsclass image{
		width:50upx;
		height: 50upx;
	}
	.list-title2{
		background-color: #eee;
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
	.list{
		line-height: 45upx;
		padding-left:50upx;	
		margin-bottom: 20upx;
	}
	.list-title{
		font-weight: bold;
		background: url(/static/img/company.png) no-repeat;
		-webkit-background-size: 45upx 45upx;
		background-size: 45upx 45upx;
	}
	.list-title2{		
		font-weight: normal;
		background: url(/static/img/course.png) no-repeat;
		-webkit-background-size: 45upx 45upx;
		background-size: 45upx 45upx;
		margin-top: 20upx;
		padding-left: 40upx;
	}
	li view{
		display: inline;
		padding-left: 80upx;
		height: 60upx;
		line-height: 60upx;
	}	

</style>
