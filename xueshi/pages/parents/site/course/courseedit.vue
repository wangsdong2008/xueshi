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
			<view>
				<view class="register_account_input">				
					<m-input class="m-input fz30" type="text" clearable focus v-model="c_name" placeholder="填写课程名"></m-input>
				</view>
				<view class="register_account_input">				
					<m-input class="m-input fz30" type="text" clearable focus v-model="organname" placeholder="填写机构名"></m-input>
				</view>
				<view class="register_account_input">				
					<m-input class="m-input fz30" type="text" clearable focus v-model="c_address" placeholder="机构地点"></m-input>
				</view>
				<view class="register_account_input">
					<m-input class="m-input fz30" type="text" clearable v-model="c_order" placeholder="填写顺序"></m-input>
				</view>
				<view class="register_account_input form">
					<radio-group @change="radioChange">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
						<view>
							<radio class="radios" :value="item.value" :checked="parseInt(item.value) === is_show" />
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
			_self.checkLogin(1);
			_self.c_id = options['id'];
			if(_self.c_id == undefined){
				_self.c_id = 0;
			}
			if(_self.c_id == 0){
				_self.headermsg = "添加课程,Course Add";
			}else{
				_self.headermsg = "课程编辑,Course Edit";
			}
		},
		onReady(){
			_self.show();
		},
		data(){
			return{
				c_id:0,
				c_order:'1',		
				headermsg:'',
				c_name:'',
				organname:'',
				c_address:'',
				btntxt:'',
				is_show:1,
				items: [
					{
						value: '1',
						name: '开启'
					},
					{
						value: '0',
						name: '关闭'
					}
				],
				footer: ''
			}
		},
		methods:{
			radioChange: function(evt) {
				var current = evt.detail.value;
				_self.is_show = current;	
			},
			bindmodify(){				
				if(!service.checkNull(_self.c_name)){
					uni.showToast({
					    icon: 'none',
					    title: '课程名称不能为空'
					});
					return;
				}
				/* if(!service.checkNull(_self.organname)){
					uni.showToast({
					    icon: 'none',
					    title: '机构名不能为空'
					});
					return;
				} */
				if(_self.c_order == "" || _self.c_order == undefined){
					_self.c_order = 1;
				}else{
					if(!service.checkNum(_self.c_order)){
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
				       url : _self.ModifyOrganUrl,
				       method : _self.Method,
				       data : {
							"guid": ret.guid,
							"token": ret.token,
							"id": _self.c_id,
							"c_name": _self.c_name,
							"organname":_self.organname,
							"c_address": _self.c_address,
							"c_order":_self.c_order,
							"is_show":_self.is_show,
							"t":Math.random()					
					   },
				       hideLoading : false,
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
									if(_self.c_id > 0){
										str = '修改成功';
									}else{
										_self.c_id = 0;	
										_self.c_order = '';	
										_self.headermsg = '';	
										_self.c_name = '';	
										_self.organname = '';	
										_self.c_address = '';	
										_self.btntxt = '';
										_self.is_show = 1;
										str = '添加成功';
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
										_self.navigateTo('course');
							        } else if (res.cancel) {
							            _self.navigateTo('courseedit?id='+_self.c_id);
							        }
							    }
							});
							
				       }
				   },"1","");			
			},
			show(){
				//if(_self.c_id == 0 ) return;  //考虑添加功能,允许等于0
				let ret = _self.getUserInfo();
				if(!ret){
					return false;
				}
				const data = {
				    guid: ret.guid,
				    token: ret.token,
					id:_self.c_id
				};
				if(_self.c_id == 0) _self.btntxt="添加"; else _self.btntxt = '修改';
				_self.getData(data);
			},
			getData(data){
				this.sendRequest({
				       url : this.OrganUrl,
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
									_self.c_name = data.c_name;
									_self.organname = data.organname;
									_self.c_address = data.c_address;
									_self.is_show = data.is_show;
									_self.c_order = data.c_order.toString();
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
		background:url(/static/img/category.png) 10upx 25upx no-repeat;
		-webkit-background-size: 40upx 40upx;
		background-size: 40upx 40upx;
		padding-left: 60upx;
		line-height: 80upx;
	}
		
	.content view,.content uni-list-item{
		background-color: #fff;		
	}
	
	.uni-list{
		margin-top: 40upx;
		background-color: #fff;		
	}
	
	.uni-list-item{
		padding-left: 0;
		padding-left: 20upx;
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
	
	.btn-row{
		margin-top: 40upx;	
		padding: 0upx;
	}
	
	.register-input{		
		width:90%;
		line-height: 60upx;
		height: 110upx;
		padding-left: 90upx;
	}
	.register-input-username{
		background:url(/static/img/user.png) no-repeat;
		-webkit-background-size:30upx 42upx ;
		background-size:30upx 42upx ;
	}
	.register-input-mobile{
		background:url(/static/img/mobile.png) no-repeat;
	}
	.register-input-mail{
		background:url(/static/img/mail.png) no-repeat;	
		width:53%;
		float: left;
		/* border:1px solid #ff0000; */
	}
	.register_account_input{
		padding-top: 20upx;
		padding-bottom: 10px;
		border-bottom: 1px solid #eeeeee;
		line-height: 60upx;
		height: 60upx;
	}
	.form{
		border: 0;
	}
	.form view{
		display: inline;		
	}

	
	
	
</style>