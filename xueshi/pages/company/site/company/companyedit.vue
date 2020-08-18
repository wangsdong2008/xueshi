<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				公司信息
			</view>	
		</view>
		<view class="line"></view>
		<view class="content">
		
			<view class="icenter">
					<view class="register_account_input">
						<view class="uni-list-cell-left fz30">
							名称
						</view> 
						<view>
						<m-input class="m-input" type="text" clearable focus v-model="com_name" placeholder="填写公司名"></m-input>
						</view>
					</view>	
					<view class="register_account_input">
						<view class="uni-list-cell-left fz30">
							电话
						</view> 
						<view>
						<m-input class="m-input" type="text" clearable v-model="com_tel" placeholder="填写公司电话"></m-input>
						</view>
					</view>
					<view class="register_account_input">
						<view class="uni-list-cell-left fz30">
							地址
						</view> 
						<view>
							<m-input class="m-input" type="text" clearable v-model="com_address" placeholder="填写公司地址"></m-input>
						</view>
					</view>
					<view class="register_account_input">
						<view class="uni-list-cell-left fz30">
							顺序
						</view> 
						<view>
							<m-input class="m-input" type="text" clearable v-model="com_order" placeholder="填写顺序"></m-input>
						</view>
					</view>
					<view class="register_account_input">
						<view class="uni-list-cell-left fz30">
							使用定位
						</view>     
						<radio-group @change="radioChange">
							<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
							<view>
								<radio class="radios" :value="item.value" :checked="parseInt(item.value) === gps_status" />
							</view>
							<view class="radio_text fz30">{{item.name}}</view>
							</label>
						</radio-group>	
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
			_self.com_id = options['id'];
			if(_self.com_id == undefined){
				_self.com_id = 0;
			}
			if(_self.com_id == 0){
				_self.headermsg = "添加新公司,Company Add";
			}else{
				_self.headermsg = "公司编辑,Company Edit";
			}
		},
		onReady(){
			_self.show();
		},
		data(){
			return{
				com_id:0,
				com_name:'',
				com_order:'',
				com_address:'',
				com_tel:'',
				dataList:[],				
				headermsg:'',
				gps_status:0,
				gps_x:0,
				gps_y:0,
				items: [
					{
						value: '1',
						name: '启用'
					},
					{
						value: '0',
						name: '不启用'
					}
				],
				wt_status:0,
				wt_items: [
					{
						value: '1',
						name: '托班'
					},
					{
						value: '0',
						name: '非托班'
					}
				],
				footer:''
			}
		},
		methods:{
			wtradioChange: function(evt) {
				var current = evt.detail.value;
				_self.wt_status = current;
			},
			radioChange: function(evt) {
				var current = evt.detail.value;
				_self.gps_status = current;
				if(current == 1){
					uni.getLocation({
					  // 默认为 wgs84 返回 gps 坐标，
					  // gcj02 返回国测局坐标，可用于 uni.openLocation 的坐标
					  type: 'wgs84',
					  geocode: true,
					  success: (data) => {					    
						_self.gps_x = data.latitude;
						_self.gps_y = data.longitude;
					  },
					  fail: (err) => {
					    console.log(err)
					    // _self.$api.msg('获取定位失败');
					  }
					});
				}
			},
			bindmodify(){
				let that = _self;
				//debugger;
				if(!service.checkName(that.com_name)){
					uni.showToast({
					    icon: 'none',
					    title: '公司名称必须是中文'
					});
					return;
				}
				if(!service.checkNum(that.gps_status)){
					uni.showToast({
					    icon: 'none',
					    title: '请选择是否使用定位'
					});
					return;
				}
				let ret = this.getUserInfo();
				if(!ret){
					return false;
				}
				this.sendRequest({
				        url : this.UpdateCompanyInfoUrl,
				        method : _self.Method,
				        data : {
							"guid": ret.guid,
							"token": ret.token,
							"id": _self.com_id,
							"name": _self.com_name,
							"address": _self.com_address,
							"sorder":_self.com_order,
							"tel":_self.com_tel,
							"gps_status":_self.gps_status,
							"gps_x":_self.gps_x,
							"gps_y":_self.gps_y,
							"wt_status":_self.wt_status,
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
				        				str = '公司名已经存在';
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
				        					_self.navigateTo('company');
				        		        } else if (res.cancel) {
				        		            _self.navigateTo('companyedit?id='+_self.com_id);
				        		        }
				        		    }
				        		});
				        		
				        	}
				        
				    },"1","");	
						
			},
			show(){	
				if(_self.com_id == 0 ) return;
				let ret = uni.getStorageSync(_self.USERS_KEY);
				if(!ret){
					return false;
				}
				const data = {
				    guid: ret.guid,
				    token: ret.token,
					id:_self.com_id
				};
				_self.getData(data);
			},
			getData(data){
					this.sendRequest({
				        url : this.GetCompanyInfoUrl,
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
				        	    	var data = res.companylist; 
				        			if(parseInt(res.status) == 3){
				        				_self.com_name = data.com_name;
				        				_self.com_address = data.com_address;
				        				_self.com_tel = data.com_tel;
				        				_self.com_order = data.com_order.toString();
				        				_self.gps_status = data.gps_status;
				        				_self.gps_x = data.latitude;
				        				_self.gps_y = data.longitude;
										_self.wt_status = data.wt_status;
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
	  		background:url(@/static/img/company.png) 10upx 25upx no-repeat;
	  		-webkit-background-size:50upx 50upx ;
	  		background-size:50upx 50upx;
	  		line-height: 60upx;
	  		height: 60upx;
	  		padding: 15upx 0upx 15upx 70upx;
	  	}	
	.icenter{
		width: 95%;
		margin: 0 auto;
		margin-top: 40upx;
	}
	.m-input{
		border: 0upx;
		width: 80%;
		border: 1upx solid #eee;
		line-height: 65upx;
		height: 65upx;
		border-radius: 25upx;
		padding-left: 20upx;
	}
	.uni-list-cell-left{
		margin-right: 40upx;
		float: left;
	}
	.radio_text{
		margin-right: 40upx;
	}
	.uni-list-cell-pd view{
		width: auto;
		float: left;
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
	
	
	
</style>