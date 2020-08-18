<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				全部学校
			</view>	
		</view>
		<view class="line"></view>
		<view class="content">	
				<view class="icenter">
					<view class="register_account_input">
						<m-input class="m-input fz30" type="text" clearable focus v-model="school_name" placeholder="填写学校名"></m-input>
					</view>	
					<view class="register_account_input">
						<m-input class="m-input fz30" type="text" clearable v-model="school_address" placeholder="填写学校地址"></m-input>
					</view>
					
					<view class="register_account_input">
						<picker @change="pickerCompanyChange($event)" :value="cindex" :range="cList">
							<view class="uni-input fz30">{{cList[cindex]}}</view>
						</picker>
					</view>
					
					<view class="register_account_input">
						<m-input class="m-input fz30" type="text" clearable v-model="school_order" placeholder="填写顺序"></m-input>
					</view>	
					
					
					<view class="btn-row">
						<button type="primary" class="primary btn" @tap="bindmodify">修改</button>
					</view>			
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
	import headerNav from "@/components/header/company_header.vue"
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
			_self.checkLogin(2);
			_self.school_id = options['id'];
			if(_self.school_id == undefined){
				_self.school_id = 0;
			}
			if(_self.school_id == 0){
				_self.headermsg = "添加新学校,School Add";
			}else{
				_self.headermsg = "学校编辑,School Edit";
			}
		},
		onReady(){
			_self.show();
		},
		data(){
			return{
				school_id:0,
				school_name:'',
				school_order:'1',
				school_address:'',
				dataList:[],	
							
				com_id:0,
				cindex:0,
				cList:[],
				cIDList:[],
				
				headermsg:'',
				footer:''
			}
		},
		methods:{
			pickerCompanyChange:function(e){
				console.log('picker发送选择改变，携带值为', e.target.value+"===="+_self.cList[e.target.value] + _self.cIDList[e.target.value]);
				_self.com_id = _self.cIDList[e.target.value];
				_self.cindex = e.target.value; 
			},
			bindmodify(){
				let that = _self;
				//debugger;
				if(!service.checkName(that.school_name)){
					uni.showToast({
					    icon: 'none',
					    title: '学校名称必须是中文'
					});
					return;
				}
				let ret = this.getUserInfo();
				if(!ret){
					return false;
				}			
					this.sendRequest({
				        url : this.UpdateSchoolInfoUrl,
				        method : _self.Method,
				        data : {
							"guid": ret.guid,
							"token": ret.token,
							"id": _self.school_id,
							"comid":_self.com_id,
							"name": _self.school_name,
							"address": _self.school_address,
							"sorder":_self.school_order,
							"t":Math.random()
						},
				        hideLoading : false,
				       success: (res) => {
				       		let status = res.status;
				       		let str = '';
				       		switch(status){
				       			case 0:{
				       				str = '数据填写错误';
				       				break;
				       			}
				       			case 2:{
				       				str = '学校名已经存在';
				       				break;
				       			}
				       			case 3:{
				       				str = '修改成功';
				       				break;
				       			}							
				       		}
				       		
				       	uni.showModal({
				       		title: str,
				       		content: '请选择返回的页面',
				       		cancelText:'留在本页',
				       		confirmText:'返回前页',
				       		success: function (res) {
				       			if (res.confirm) {
				       				_self.navigateTo('school');
				       			} else if (res.cancel) {
				       				_self.navigateTo('schooledit?id='+_self.school_id);
				       			}
				       		}
				       	});
				       	}
				       
				    },"1","");
			},
			show(){	
				let ret = uni.getStorageSync(_self.USERS_KEY);
				if(!ret){
					return false;
				}
				const data = {
				    guid: ret.guid,
				    token: ret.token,
					id:_self.school_id
				};
				_self.getData(data);
			},
			getData(data){			
				this.sendRequest({
				    url : this.GetSchoolInfoUrl,
				    method : _self.Method,
				    data : {
						"guid": data.guid,
						"token":data.token,
						"id":data.id,
						"t":Math.random()
					},
				    hideLoading : true,
				    success: (res) => {
				    	    if(res){
								//子公司
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
								if(_self.school_id == 0) _self.cindex = 0;
								
								var data = res.schoollist; 
				    			if(parseInt(res.status) == 3){
				    				_self.school_name = data.school_name;
				    				_self.school_address = data.school_address;
				    				_self.school_order = data.school_order.toString();									
									
									_self.com_id = data.com_id;
									let j = _self.cIDList.findIndex(i => i == _self.com_id);
									_self.cindex = j;
									
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
	  		background:url(@/static/img/school.png) 10upx 25upx no-repeat;
	  		-webkit-background-size:50upx 50upx ;
	  		background-size:50upx 50upx;
	  		line-height: 60upx;
	  		height: 60upx;
	  		padding: 15upx 0upx 15upx 70upx;
	  	}	
	
	.icenter{
		width: 95%;
		margin: 0 auto;
	}
	
	.register_account_input{
		padding-top: 20upx;
		padding-bottom: 10px;
		border-bottom: 1px solid #eeeeee;
		line-height: 60upx;
		height: 60upx;
	}
	.register_account{
		font-size: 42upx;
		font-family: '黑体';
		margin-top: 30upx;
		margin-bottom: 20upx;
	}
	.m-input{
		border: 0upx;
		font-size: 28upx;
	}
	
	
	
	
</style>