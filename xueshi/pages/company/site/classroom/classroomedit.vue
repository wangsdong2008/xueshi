<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="contents">
			<view class="content sites">
				<view class="title ctitles fz35">教室编辑</view>	
				<view class="icenter">		
					<view class="register_account_input">
						<picker @change="pickerCompanyChange($event)" :value="cindex" :range="cList">
							<view class="uni-input fz30">{{cList[cindex]}}</view>
						</picker>
					</view>
					<view class="register_account_input">				
						<m-input class="m-input fz30" type="text" clearable focus v-model="classroom_name" placeholder="填写教室名"></m-input>
					</view>
					<view class="register_account_input">				
						<m-input class="m-input fz30" type="text" clearable v-model="classroom_url" placeholder="监控地址"></m-input>
					</view>
					
					<view class="register_account_input">
						<m-input class="m-input fz30" type="text" clearable v-model="classroom_order" placeholder="填写顺序"></m-input>
					</view>
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
			_self.classroom_id = options['id'];
			if(_self.classroom_id == undefined){
				_self.classroom_id = 0;
			}
			if(_self.classroom_id == 0){
				_self.headermsg = "添加新教室,Classroom Add";
			}else{
				_self.headermsg = "教室编辑,Classroom Edit";
			}
		},
		onReady(){
			_self.show();
		},
		data(){
			return{
				classroom_id:0,
				classroom_name:'',
				classroom_order:'',	
				classroom_url:'',
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
				if(!service.checkNull(_self.classroom_name)){
					uni.showToast({
					    icon: 'none',
					    title: '教室名称不能为空'
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
				let ret = this.getUserInfo();
				if(!ret){
					return false;
				}
				this.sendRequest({
				        url : this.UpdateClassroomInfoUrl,
				        method : _self.Method,
				        data : {
							"guid": ret.guid,
							"token": ret.token,
							"classroom_id": _self.classroom_id,
							"classroom_name": _self.classroom_name,
							"classroom_order":_self.classroom_order,
							"com_id":_self.com_id,
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
				        				str = '教室名已经存在';
				        				break;
				        			}
				        			case 3:{
				        				if(_self.classroom_id == 0){
				        					str = '添加成功';
				        					_self.classroom_id = 0;
				        					_self.classroom_name = '';
				        					_self.classroom_order = '';	
				        					_self.classroom_url = '';
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
											_self.navigateTo('classroom');
										} else if (res.cancel) {
											_self.navigateTo('classroomedit?id='+_self.classroom_id);
										}
									}
								});
				        	}
				        
				    },"1","");		
			},
			show(){
				//if(_self.classroom_id == 0 ) return;  //考虑添加功能,允许等于0
				let ret = this.getUserInfo();
				if(!ret){
					return false;
				}
				const data = {
				    guid: ret.guid,
				    token: ret.token,
					id:_self.classroom_id
				};
				if(_self.classroom_id == 0) _self.btntxt="添加"; else _self.btntxt = '修改';
				_self.getData(data);
			},
			getData(data){			
					this.sendRequest({
				        url : this.GetClassroomInfoUrl,
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
				        			list.push("==请选择所属机构==");
				        			idlist.push(0);
				        			for (var i = 0; i < data.length; i++) {
				        				var item = data[i];									
				        				list.push(item.com_name);
				        				idlist.push(item.com_id);
				        			}								
				        			_self.cList = list;
				        			_self.cIDList = idlist;	
									
				        			if(parseInt(res.status) == 3){
				        				if(_self.classroom_id > 0){
				        					data = res.classroomlist;									
				        					_self.classroom_name = data.classroom_name;	
				        					_self.classroom_order = data.classroom_order.toString();
											
											_self.com_id = data.com_id;
											let j = _self.cIDList.findIndex(i => i == _self.com_id);
											_self.cindex = j;
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
	  		background:url(@/static/img/classroom.png) 10upx 25upx no-repeat;
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
		line-height: 60upx;
		height: 60upx;
	}
	.register_account{
		font-size: 42upx;
		font-family: '黑体';
		margin-top: 30upx;
		margin-bottom: 20upx;
	}
	picker{
		border: 1upx solid #eeeeee;
		border-radius: 50upx;
		text-align: center;
		line-height: 60upx;
	}
	
	
	
</style>