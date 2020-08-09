<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				孩子编辑
			</view>
		</view>
		<view class="line"></view>
		<view class="content">
		    <view>
				<view class="register_account_input">				
					<m-input class="m-input" type="text" clearable focus v-model="child_name" placeholder="填写孩子名"></m-input>
				</view>
				<view class="register_account_input">				
					<radio-group @change="sexChange">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in sex_items" :key="item.value">
						<view>
							<radio class="radios" :value="item.value" :checked="parseInt(item.value) == sex" />
						</view>
						<view class="radio_text fz30">{{item.name}}</view>
						</label>
						
					</radio-group>
				</view>
				<view class="register_account_input">
					<m-input class="m-input" type="text" clearable v-model="child_order" placeholder="填写顺序"></m-input>
				</view>
				<view class="register_account_input form">
					<radio-group @change="radioChange">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
						<view>
							<radio class="radios" :value="item.value" :checked="parseInt(item.value) == is_show" />
						</view>
						<view class="radio_text fz30">{{item.name}}</view>
						</label>
						
					</radio-group>	
				</view>
				<button type="primary" class="btn" @tap="bindmodify">{{btntxt}}</button>
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
	import footerNav from "@/components/footer/users_footer_nav.vue"
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
			_self.child_id = options['id'];
			if(_self.child_id == undefined){
				_self.child_id = 0;
			}
			if(_self.child_id == 0){
				_self.headermsg = "添加孩子,Children Add";
			}else{
				_self.headermsg = "孩子编辑,Children Edit";
			}
		},
		onReady(){
			_self.show();
		},
		data(){
			return{
				child_id:0,
				child_order:'',		
				headermsg:'',
				child_name:'',
				btntxt:'',
				sex:'1',
				is_show:'1',
				sex_items:[
					{
						value: '1',
						name: '男'
					},
					{
						value: '0',
						name: '女'
					}
				],
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
				footer: ''
			}
		},
		methods:{
			sexChange: function(evt) {
				var current = evt.detail.value;
				_self.sex = current;	
			},
			radioChange: function(evt) {
				var current = evt.detail.value;
				_self.is_show = current;	
			},
			bindmodify(){
				//debugger;
				if(!service.checkNull(_self.child_name)){
					uni.showToast({
					    icon: 'none',
					    title: '孩子名不能为空'
					});
					return;
				}
				if(_self.child_order == "" || _self.child_order == undefined){
					_self.child_order = 1;
				}else{
					if(!service.checkNum(_self.child_order)){
						uni.showToast({
							icon: 'none',
							title: '顺序请填写数字'
						});
						return;
					}
				}
				
				let ret = _self.getUserInfo();
				if(!ret){
					return false;
				}
				
				_self.sendRequest({
				       url : _self.ModifyChildrenUrl,
				       method : _self.Method,
				       data : {
							"guid": ret.guid,
							"token": ret.token,
							"id": _self.child_id,
							"childname": _self.child_name,
							"childorder":_self.child_order,
							"is_show":_self.is_show,
							"sex":_self.sex,
							"t":Math.random()
					   },
				       hideLoading : true,
				       success:function (res) {
						//debugger;
						let status = res.status;
						status = parseInt(status);
						let str = '';
						switch(status){
							case 0:{
								str = '数据填写错误';
								break;
							}
							case 2:{
								str = '课程已经存在';
								break;
							}
							case 3:{
								if(_self.child_id == 0){
									str = '添加成功';
									_self.child_id = 0;
									_self.child_name = "";
									_self.child_order = "";
									_self.is_show = 1;
									_self.sex = 1;
									
								}else{
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
									_self.navigateTo('child');
						        } else if (res.cancel) {
						            _self.navigateTo('childshow?id='+_self.child_id);
						        }
						    }
						});
				       }
				   },"1","");			
			},
			show(){
				//if(_self.child_id == 0 ) return;  //考虑添加功能,允许等于0
				let ret = _self.getUserInfo();
				if(!ret){
					return false;
				}
				const data = {
				    guid: ret.guid,
				    token: ret.token,
					id:_self.child_id
				};
				if(_self.child_id == 0) _self.btntxt="添加"; else _self.btntxt = '修改';
				if(_self.child_id > 0){
					_self.getData(data);
				}
			},
			getData(data){
				_self.sendRequest({
				       url : _self.ShowChildrenUrl,
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
								var data = res.list; 
								if(parseInt(res.status) == 3){
									_self.child_name = data.child_name;
									_self.is_show = data.is_show;
									_self.child_order = data.child_order.toString();
									_self.sex = data.sex;
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
		background:url(/static/img/userHL.png) 10upx 25upx no-repeat;
		-webkit-background-size: 40upx 40upx;
		background-size: 40upx 40upx;
		padding-left: 60upx;
		line-height: 80upx;
	}
	
	.register_account_input view{
		float: left;
		margin-bottom: 10upx;
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