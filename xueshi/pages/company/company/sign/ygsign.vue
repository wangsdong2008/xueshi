<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				今日员工情况
			</view>		
				<view class="studentlist">
					
					<checkbox-group  @change="checkboxChange"> 					
						<ul v-for="(item,index) in dataList" :index="index" :key="item.com_id">
							<li class="list-title list">{{item.com_name}}
								<ul>
									<li class="list-title2" v-for="(item3,index3) in item.memberlist" :index="index3" :key="item3.id" >
										<checkbox :value="item3.id.toString()" :checked="ulist.indexOf(item3.id)>=0" />
										{{item3.true_name}}
									</li>
								</ul>
							</li>
						</ul>
					</checkbox-group>
					
					 
					  
					  <view class="btnlist">
						<checkbox-group @change="bindSelectAll">
							<view>
								<label class="checkbox">
									<checkbox value="1" :checked="isCheckedAll" />全选
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
				headermsg:'员工签到,Member sign',
			}
		},
		onLoad:function() {
			_self = this;
			_self.checkLogin(2);
			_self.show();
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
				    url : _self.GetCurrentMemberlistUrl,
				    method : _self.Method,
				    data : {
						"guid": data.guid,
						"token":data.token,
						"catid":3,
						"t":Math.random()
					},
				    hideLoading : true,
				    success:function (res) {
						if(res){
					    	var data = res.subcompanylist; 
							if(parseInt(res.status) == 3){
								if(data.length > 0){
									let num = 0;
									let list = [];
									for (var i = 0; i < data.length; i++) {				
										var item = data[i];
										list.push(item);
										num ++;
									}								
									_self.dataList = list;
									_self.dataList_num = num;
								}
							}			    	
					    }
					
				    }
				},"1","");
				
			},			
						
			bindSelectAll:function(){
				//debugger;
				_self.isCheckedAll = !_self.isCheckedAll
				if (_self.isCheckedAll) {
					let str = [];
					// 全选时
					_self.ulist = [];					
				    _self.dataList.forEach(function (item) {						
						var memberlist = item.memberlist;
						for(var j = 0; j < memberlist.length; j++ ){
							var value = memberlist[j].id;
							_self.ulist.push(value);
							let v = item.com_id+"-0-"+value;
							str.push(v);
						}
					}, _self);
					_self.selectid = str.join(",");
				} else {					
					_self.ulist = [];
					_self.selectid = "";
				}
			},
			checkboxChange: function (e) {
				var items = _self.dataList;
				var	values = e.detail.value;
				var str = [];
				var num = 0;
				//debugger;
				let companylist = items;
				_self.ulist = [];
				
				for (var i = 0; i < companylist.length; i++) {
					let item = companylist[i];
					let memberlist = item.memberlist;
					for(var j = 0; j < memberlist.length; j++){
						let studentslist = memberlist[j];
						var value = studentslist['id'].toString();
						if(values.includes(value)){
							_self.ulist.push(value);												
							str.push(companylist[i].com_id+"-0-"+value);
							num ++;
						}
					}
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
				_self.selectid = str.join(",");
			},			
			bindclick(sid){				
				if( _self.selectid.toString() == '') {
					uni.showToast({
						title: '请选择员工',
						icon: 'none'
					});
					return false;
				}
				//调用签到函数
				_self.setSign(3,sid,_self.selectid.toString(),'ygsign');
			}
		}
	}
	
</script>


<style>	
 .content .title{
    		background:url(@/static/img/yg.png) 10upx 22upx no-repeat;
    		-webkit-background-size:50upx 50upx ;
    		background-size:50upx 50upx;
    		line-height: 60upx;
    		height: 60upx;
    		padding: 15upx 0upx 15upx 70upx;
    	}
	
	.btnlist{
		border-top:1upx solid #eeeeee;
		padding-top: 20upx;
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
		width: 25%;
		margin-left: 20upx;
	}
	
	.studentlist{
		margin-top: 30upx;
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
		margin-top: 20upx;
		padding-left: 40upx;
		line-height: 65upx;
	}
</style>
