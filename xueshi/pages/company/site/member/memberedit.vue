<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				员工信息
			</view>	
		</view>
		<view class="line"></view>
		<view class="content">		
				<view class="icenter">
					<view class="register_account_input">
						<picker @change="pickerCompanyChange($event)" :value="cindex" :range="cList">
							<view class="uni-input fz30">{{cList[cindex]}}</view>
						</picker>
					</view>
					<view class="register_account_input">				
						<m-input class="m-input fz30" type="text" clearable focus v-model="true_name" placeholder="填写员工名"></m-input>
					</view>
					<view class="register_account_input">
						<m-input class="m-input fz30" type="text" clearable v-model="mobile" placeholder="填写手机号码"></m-input>
					</view>			
					<view class="register_account_input">
						<m-input class="m-input login-input-password fz30" type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
					</view>
					
					<view class="btn-row">
						<button type="primary" class="primary btn" @tap="bindmodify">{{btntxt}}</button>
					</view>
					</view>
				</view>
				<view class="footer">
					<footerNav :msg="footer"></footerNav>
				</view>
			</view>
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
			_self.id = options['id'];
			if(_self.id == undefined){
				_self.id = 0;
			}
			if(_self.id == 0){
				_self.headermsg = "添加新员工,Member Add";
			}else{
				_self.headermsg = "员工编辑,Member Edit";
			}
		},
		onReady(){
			_self.show();
		},
		data(){
			return{
				id:0,
				true_name:'',
				mobile:'',
				password:'',
				
				dataList:[],
				headermsg:'',
				cindex:0,
				com_id:0,
				cList:[],
				cIDList:[],
				btntxt:'',
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
				if(!service.checkNull(_self.true_name)){
					uni.showToast({
					    icon: 'none',
					    title: '员工真实姓名不能为空'
					});
					return;
				}
				if(_self.com_id == 0){
					uni.showToast({
					    icon: 'none',
					    title: '请选择公司'
					});
					return;
				}
				if(!service.checkNull(_self.mobile)){
					uni.showToast({
					    icon: 'none',
					    title: '手机不能为空'
					});
					return;
				}
				if(_self.id == 0){ //添加新员工的时候才检查密码不能为空
					if(!service.checkNull(_self.password)){
						uni.showToast({
							icon: 'none',
							title: '密码不能为空'
						});
						return;
					}
				}
				let ret = this.getUserInfo();
				if(!ret){
					return false;
				}
				this.sendRequest({
				        url : this.UpdateMemberInfoUrl,
				        method : _self.Method,
				        data : {
							"guid": ret.guid,
							"token": ret.token,
							"id": _self.id,
							"true_name": _self.true_name,
							"comid":_self.com_id,
							"mobile":_self.mobile,
							"password":_self.password,
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
									case 1:{
										str = '手机号码已经存在';
										break;
									}
				        			case 2:{
				        				str = '员工名已经存在';
				        				break;
				        			}
				        			case 3:{
				        				if(_self.id == 0){
				        					str = '添加成功';
				        					_self.id = 0;
				        					_self.true_name = '';
				        					_self.mobile = '';	
				        					_self.password = '';
				        					_self.cindex = 0;
				        					_self.com_id = 0;
				        					_self.cList = [];
				        					_self.cIDList = [];
				        				}
				        				else{
				        					
											str = '修改成功';
				        				}
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
											_self.navigateTo('member');
										} else if (res.cancel) {
											_self.navigateTo('memberedit?id='+_self.id);
										}
									}
								});
				        	}
				        
				    },"1","");		
			},
			show(){
				//if(_self.id == 0 ) return;  //考虑添加功能,允许等于0
				let ret = this.getUserInfo();
				if(!ret){
					return false;
				}
				const data = {
				    guid: ret.guid,
				    token: ret.token,
					id:_self.id
				};
				if(_self.id == 0) _self.btntxt="添加"; else _self.btntxt = '修改';
				_self.getData(data);
			},
			getData(data){			
					this.sendRequest({
				        url : this.GetMemberInfoUrl,
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
				        	    	var data = res.subcompanylist; 
									
									let list = [];
				        			let idlist = [];
									list.push("==请选择机构==");
									idlist.push(0);
									for (var i = 0; i < data.length; i++) {
										var item = data[i];									
										list.push(item.com_name);
										idlist.push(item.com_id);
									}								
									_self.cList = list;
									_self.cIDList = idlist;
				        				
									
				        			if(parseInt(res.status) == 3){
				        				data = res.memberinfo;
										_self.true_name = data.true_name;
										_self.username = data.username;
										_self.mobile = data.mobile;
										
										//设置默认
										if(_self.id > 0){
											_self.com_id = data.com_id;
											if(_self.cIDList != undefined){
												_self.cindex = _self.cIDList.findIndex(i => i == data.com_id);
											}
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
	  		background:url(@/static/img/userHL.png) 10upx 25upx no-repeat;
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
	.textareainput{
		padding: 20upx 0upx;
		border-bottom: 1px solid #eeeeee;
		line-height: 28px;
	}
	.textarea{
	  border: 1rpx solid #eeeeee;
	  min-height: 220upx;
	  padding:10upx
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
	
	
	
</style>