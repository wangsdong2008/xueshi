<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				在线报名
			</view>	
				<view class="register_account_input">
					<view class="uni-list-cell-left fz30">
						课程
					</view>
					<view class="cell-right fz30 clearborder">{{course_name}}</view>
				</view>
				
				<view class="register_account_input">	
					<view class="uni-list-cell-left fz30">
						选择孩子
					</view>
					<picker focus @change="ChildPickerChange($event)" :value="child_index" :range="child_dataList">
						<view class="uni-input fz30">{{child_dataList[child_index]}}</view>
					</picker>
				</view>
				
				<view class="register_account_input">
					<view class="uni-list-cell-left fz30">
						联系方式
					</view>
					<view class="cell-right">
						<m-input class="m-input fz30 vs" type="text" clearable  v-model="tel" placeholder="联系方式"></m-input>	
					</view>
				</view>
				
				<view class="register_account_input">
					<view class="uni-list-cell-left fz30">
						联系人
					</view>
					<view class="cell-right">
						<m-input class="m-input fz30 vs" type="text" clearable  v-model="true_name" placeholder="联系人"></m-input>	
					</view>
				</view>
			
			
			<view class="btn-row">
			    <button type="primary" class="primary btn" @tap="bindmodify">{{btntxt}}</button>
			</view>
		</view>
		<view class="footer">
			<footerNav :msg="footer"></footerNav>
		</view>
		
	</view>
</template>
<script>
	import service from '@/service.js';
	import mInput from '@/components/m-input.vue';
	import headerNav from "@/components/header/users_header.vue"	
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
			_self.checkLogin(1);			
			_self.headermsg = "在线报名,Online Registration";
			_self.course_id = options['cid'];
			_self.pid = options['pid'];
			_self.comid = options['comid'];
			if(_self.course_id == 0 || _self.course_id == undefined){
				_self.navigateTo("/pages/parents/site/index");
				return;
			}
			
		},
		onReady(){
			_self.show();
		},
		data(){
			return{
				headermsg:'',
				btntxt:'报名',
				is_show:'1',
				
				child_id:0,	
				child_index:0,
				child_dataList:[],
				child_dataIDList:[],
				
				course_id:0, //课程id
				course_name:'',//课程名
				pid:0, //存放uid
				comid:0, //企业id
				
				true_name:'',//联系人
				tel:'',//联系电话	
				footer:''
				
			}
		},
		methods:{			
			show(){			  
				let ret = _self.getUserInfo();
				if(!ret){
					return false;
				}
				const data = {
				    guid: ret.guid,
				    token: ret.token
				};
				_self.tel = ret.mobile;
				_self.true_name = ret.true_name;
				_self.getData(data);
			},
			getData(data){
				_self.sendRequest({
				        url : _self.showCourseUrl,
				        method : _self.Method,
				        data : {
							"token": data.token,
							"guid": data.guid,
							"uid":_self.pid,
							"cid":_self.course_id,
							"comid":_self.comid,
							"t":Math.random()
						},
				        hideLoading : true,
				       success: (res) => {
				       		var data = res.courselist;
				       		switch(parseInt(res.status)){
				       			case 1:{
				       				uni.showToast({
				       					title: '无数据',
				       					icon: 'none',
				       				});		
				       				break;
				       			}
				       			case 3:{
				       				_self.course_name  = data.cat_name;
				       				break;
				       			}
								case 0:{
									uni.showToast({
										title: '此课程不存在',
										icon: 'none',
									});		
									break;
								}
				       		}
				       		
				       	}
				    },"1","");
				   
				_self.sendRequest({
				       url : _self.ShowChildPlanUrl,
				       method : _self.Method,
				       data : {
						  "guid": data.guid,
						  "token":data.token,
						  "id":data.id,
						  "t":Math.random()
					   },
				       hideLoading : true,
				       success:function (res) {
						if(res){
							//所有孩子
							   var childlist = res.childlist;
							   var list = [];
							   var idlist = [];
							   list.push("==请选择孩子==");
							   idlist.push(0);
							   for (var i = 0; i < childlist.length; i++) {
									var item = childlist[i];
									list.push(item.child_name);
									idlist.push(item.child_id);
							   }								
							   _self.child_dataList = list;
							   _self.child_dataIDList = idlist;	
							   
							   /* var data = res.courselist;
							   for (var i = 0; i < data.length; i++) {
							    	item = data[i];
									if(parseInt(item.c_id) == _self.course_id){
										_self.course_name = item.c_name;
										break;
									}							  
							   } */
							}
				       }
				   },"1","");
			},
			ChildPickerChange: function(e) {
			    console.log('picker发送选择改变，携带值为', e.target.value+"===="+_self.child_dataList[e.target.value] + _self.child_dataIDList[e.target.value]);
				_self.child_id = _self.child_dataIDList[e.target.value];
				_self.child_index = e.target.value;
			},
		
			bindmodify(){
				if(_self.child_id == 0){
					uni.showToast({
					    icon: 'none',
					    title: '请选择孩子'
					});
					return;
				}	
				if(_self.true_name == ''){
					uni.showToast({
					    icon: 'none',
					    title: '请填写联系人'
					});
					return;
				}
				
				let ret = _self.getUserInfo();
				if(!ret){
					return false;
				}
				
				_self.sendRequest({
				    url : _self.EnlistBiomingUrl,
				    method : _self.Method,
				    data : {
						"guid": ret.guid,
						"token": ret.token,
						"child_id": _self.child_id,
						
						
						"pid": _self.pid,						
						"course_id":_self.course_id,
						"com_id":_self.comid,
						"true_name":_self.true_name,
						"tel":_self.tel,
						"child_id":_self.child_id,
						
						
						"t":Math.random()
					},
				    hideLoading : false,
				    success:function (res) {
						let status = res.status;
						status = parseInt(status);
						let str = '';
						switch(status){
							case 0:{
								str = '数据填写错误';
								break;
							}
							case 2:{
								str = '已经报名';
								break;
							}
							case 3:{								
								str = '报名成功';
								break;
							}												
						}
						uni.showToast({
							title: str,
							icon: 'none',
							duration:2000
						});
						
				    }
				},"1","");
				
		    }
		}
    }
</script>

<style>
	.content .title{
		background:url(@/static/img/bm.png) 10upx 22upx no-repeat;
		-webkit-background-size:50upx 50upx ;
		background-size:50upx 50upx;
		line-height: 60upx;
		height: 60upx;
		padding: 15upx 0upx 15upx 70upx;
	}

	.register_account_input view{
		float: left;
		margin-bottom: 10upx;
	}	
	
	.register_account_input{
		padding-top: 20upx;
		padding-bottom: 10px;
		border-bottom: 1px solid #eeeeee;
		line-height: 80upx;
		height: 80upx;
	}
	.register_account{
		font-size: 42upx;
		font-family: '黑体';
		margin-top: 30upx;
		margin-bottom: 20upx;
		border-bottom: 1upx solid #ccc;
		padding-bottom: 20upx;
	}
	
	.uni-list-cell-left{
		margin-right: 40upx;
		width:25%;
	}
	picker view{
		border: 1px solid #ccc;
		width:65%;
		text-align: center;
		border-radius: 50upx;
	}
	.vs{
		height: 70upx;
		line-height: 70upx;
	}
	.cell-right{
		float: left;
		border: 1px solid #ccc;
		width:65%;
		text-align: center;	
		line-height: 70upx;
		height: 70upx;
		border-radius: 50upx;
	}
	.clearborder{
		border:0upx;
		text-align: left;
	}
	
</style> 