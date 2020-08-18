<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				课程编辑
			</view>	
		</view>
		<view class="line"></view>
		<view class="content">		
				<view class="icenter">
					<view class="register_account_input">
						<picker @change="pickerCompanyChange($event)" :value="cindex" :range="cList">
							<view class="uni-input">{{cList[cindex]}}</view>
						</picker>
					</view>
					<view class="register_account_input">				
						<m-input class="m-input" type="text" clearable focus v-model="cat_name" placeholder="填写分类名"></m-input>
					</view>			
					<view class="textareainput">
						<textarea class="textarea" v-model="cat_content" placeholder="请填写课程介绍" auto-height="true" ></textarea>
					</view>			
					
					<view class="register_account_input form">
						<view class="left_txt">课程性质：</view>
						<view class="cell-right">
							<radio-group @change="wtChange">
								<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in wt_items" :index="index" :key="item.value">
								<view>
									<radio class="radios" :value="item.value" :checked="parseInt(item.value) == wt_status" />
								</view>
								<view class="radio_text">{{item.name}}</view>
								</label>
								<view class="clear"></view>
							</radio-group>
						</view>
					</view>
					
					<view class="register_account_input form">
						<view class="left_txt">状态：</view>
						<view class="cell-right">
							<radio-group @change="radioChange">
								<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
								<view>
									<radio class="radios" :value="item.value" :checked="parseInt(item.value) == is_show" />
								</view>
								<view class="radio_text fz30">{{item.name}}</view>
								</label>							
							</radio-group>
						</view>
					</view>
					
					<view class="register_account_input">
						<m-input class="m-input" type="text" clearable v-model="cat_order" placeholder="填写顺序"></m-input>
					</view>
					
					<view class="btn-row">
						<button type="primary" class="primary" @tap="bindmodify">{{btntxt}}</button>
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
			_self.cat_id = options['id'];
			if(_self.cat_id == undefined){
				_self.cat_id = 0;
			}
			if(_self.cat_id == 0){
				_self.headermsg = "添加新分类,Category Add";
			}else{
				_self.headermsg = "分类编辑,Category Edit";
			}
		},
		onReady(){
			_self.show();
		},
		data(){
			return{
				cat_id:0,
				cat_name:'',
				cat_order:'',	
				cat_content:'',
				dataList:[],
				headermsg:'',
				cindex:0,
				com_id:0,
				cList:[],
				cIDList:[],
				btntxt:'',
				footer:'',
				wt_status:0,
				wt_items:[
					{
						value: '0',
						name: '非托班'
					},
					{
						value: '1',
						name: '托班'
					}
				],
				is_show:'1',
				items: [
					{
						value: '1',
						name: '启用'
					},
					{
						value: '0',
						name: '禁用'
					}
				],
			}
		},
		methods:{
			radioChange: function(evt) {
				var current = evt.detail.value;
				_self.is_show = current;	
			},
			wtChange: function(evt) {
				var current = evt.detail.value;
				_self.wt_status = current;	
			},
			pickerCompanyChange:function(e){
				//console.log('picker发送选择改变，携带值为', e.target.value+"===="+_self.cList[e.target.value] + _self.cIDList[e.target.value]);
				_self.com_id = _self.cIDList[e.target.value];
				_self.cindex = e.target.value; 
			},
			bindmodify(){
				if(!service.checkNull(_self.cat_name)){
					uni.showToast({
					    icon: 'none',
					    title: '分类名称不能为空'
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
				if(!service.checkNum(_self.cat_order)){
					uni.showToast({
					    icon: 'none',
					    title: '请填写顺序'
					});
					return;
				}
				let ret = _self.getUserInfo();
				if(!ret){
					return false;
				}
				_self.sendRequest({
				        url : _self.UpdateCategoryInfoUrl,
				        method : _self.Method,
				        data : {
							"guid": ret.guid,
							"token": ret.token,
							"id": _self.cat_id,
							"name": _self.cat_name,
							"content": _self.cat_content,
							"sorder":_self.cat_order,
							"comid":_self.com_id,
							"wt_status":_self.wt_status,
							"is_show":_self.is_show,
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
				        				str = '分类名已经存在';
				        				break;
				        			}
				        			case 3:{
				        				if(_self.cat_id == 0){
				        					str = '添加成功';
				        					_self.cat_id = 0;
				        					_self.cat_name = '';
				        					_self.cat_order = '';	
				        					_self.cat_content = '';
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
											_self.navigateTo('category');
										} else if (res.cancel) {
											_self.navigateTo('categoryedit?id='+_self.cat_id);
										}
									}
								});
				        	}
				        
				    },"1","");		
			},
			show(){
				//if(_self.cat_id == 0 ) return;  //考虑添加功能,允许等于0
				let ret = _self.getUserInfo();
				if(!ret){
					return false;
				}
				const data = {
				    guid: ret.guid,
				    token: ret.token,
					id:_self.cat_id
				};
				if(_self.cat_id == 0) _self.btntxt="添加"; else _self.btntxt = '修改';
				_self.getData(data);
			},
			getData(data){			
					_self.sendRequest({
				        url : _self.GetCategoryInfoUrl,
				        method : _self.Method,
				        data : {
							"guid": data.guid,
							"token":data.token,
							"id":data.id,
							"comid":data.comid,
							"t":Math.random()
						},
				        hideLoading : true,
				        success: (res) => {
				        	    if(res){
				        			//debugger;
				        			
				        	    	var data = res.subcompanylist; 
				        			if(parseInt(res.status) == 3){									
				        				let list = [];
				        				let idlist = [];
				        				list.push("==请选择==");
				        				idlist.push(0);
				        				for (var i = 0; i < data.length; i++) {
				        					var item = data[i];									
				        					list.push(item.com_name);
				        					idlist.push(item.com_id);
				        				}								
				        				_self.cList = list;
				        				_self.cIDList = idlist;										
				        				
				        				if(_self.cat_id > 0){
				        					data = res.categorylist;									
				        					_self.cat_name = data.cat_name;									
				        					_self.cat_order = data.cat_order.toString();
											_self.is_show = data.is_show.toString();
											
											let content = data.cat_content;
											if(content != ''){
												_self.cat_content = content.replace(new RegExp("<br />","gm"),"\r\n");
											}											
				        					
											_self.wt_status = data.wt_status;
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
	  		background:url(@/static/img/category.png) 10upx 25upx no-repeat;
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
	.left_txt{
		width:30%;
		font-size: 30upx;
		/* border:1px solid #f00; */
		float: left;
	}	
	.cell-right{
		width:95%;
		padding-right: 10upx;
		/* border:1px solid #ff0; */
	}	
	.register_account_input.form{
		/* height: 60upx;
		line-height: 60upx; */
	}
	.form image{
		width:80upx;
		height: 80upx;
	}	
	.form label view{
		float: left;
		margin-bottom: 10upx;	
		font-size: 30upx;
		height: 60upx;
		line-height: 60upx;
	}	
	.radio_text{
		margin-right: 40upx;
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
	
	
	.clear{
		clear: both;
	}
	
	
	uni-button{
		border-radius: 50upx;		
	}
	uni-button:after{
		border: 0px;		
	}
	.remeber{
		font-size: 28upx;
		margin-top: 10upx;		
	}
	.remeber checkbox{
		
	}
	.content{
		background-color: #fff;		
		padding-top: 10upx;
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

	.register-input{		
		width:90%;
		line-height: 60upx;
		height: 110upx;
		padding-left: 90upx;
	}
	
	
	
	
</style>