<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		
		<view class="content">
			<view class="title">
				显示设置
			</view>	
		</view>
		<view class="line"></view>
		<view class="content">	
				<view class="icenter">
					<view class="register_account_input form fz35">首页显示内容</view>
					
					<view class="register_account_input form">
						<view class="left_txt">签到</view>
						<view class="cell-right">
							<radio-group @change="signChange">
								<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in sign_items" :key="item.value">
								<view>
									<radio class="radios" :value="item.value" :checked="parseInt(item.value) == is_sign" />
								</view>
								<view class="radio_text fz30">{{item.name}}</view>
								</label>							
							</radio-group>
						</view>
					</view>
					
					<view class="register_account_input form">
						<view class="left_txt">体温</view>
						<view class="cell-right">
							<radio-group @change="twChange">
								<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in tw_items" :key="item.value">
								<view>
									<radio class="radios" :value="item.value" :checked="parseInt(item.value) == is_tw" />
								</view>
								<view class="radio_text fz30">{{item.name}}</view>
								</label>							
							</radio-group>
						</view>
					</view>
					
					<view class="register_account_input form">
						<view class="left_txt">生日</view>
						<view class="cell-right">
							<radio-group @change="brithdayChange">
								<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in brithday_items" :key="item.value">
								<view>
									<radio class="radios" :value="item.value" :checked="parseInt(item.value) == is_brithday" />
								</view>
								<view class="radio_text fz30">{{item.name}}</view>
								</label>							
							</radio-group>
						</view>
					</view>
					
					<view class="register_account_input form">
						<view class="left_txt">班主任</view>
						<view class="cell-right">
							<radio-group @change="teacherChange">
								<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in teacher_items" :key="item.value">
								<view>
									<radio class="radios" :value="item.value" :checked="parseInt(item.value) == is_teacher" />
								</view>
								<view class="radio_text fz30">{{item.name}}</view>
								</label>							
							</radio-group>
						</view>
					</view>
					
					
					<view class="register_account_input form">
						<view class="left_txt">放学时间</view>
						<view class="cell-right">
							<radio-group @change="timeChange">
								<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in time_items" :key="item.value">
								<view>
									<radio class="radios" :value="item.value" :checked="parseInt(item.value) == is_time" />
								</view>
								<view class="radio_text fz30">{{item.name}}</view>
								</label>							
							</radio-group>
						</view>
					</view>
					
					<view class="register_account_input form">
						<view class="left_txt">班级</view>
						<view class="cell-right">
							<radio-group @change="gradeChange">
								<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in grade_items" :key="item.value">
								<view>
									<radio class="radios" :value="item.value" :checked="parseInt(item.value) == is_grade" />
								</view>
								<view class="radio_text fz30">{{item.name}}</view>
								</label>							
							</radio-group>
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
			_self.btntxt="保存";
			_self.headermsg = "显示设置,Display Site";
			
		},
		onReady(){
			_self.show();
		},
		data(){
			return{
				sign_items: [
					{
						value: '1',
						name: '显示'
					},
					{
						value: '0',
						name: '隐藏'
					}
				],
				tw_items:[
					{
						value: '1',
						name: '显示'
					},
					{
						value: '0',
						name: '隐藏'
					}
				],
				brithday_items:[
					{
						value: '1',
						name: '显示'
					},
					{
						value: '0',
						name: '隐藏'
					}
				],
				teacher_items:[
					{
						value: '1',
						name: '显示'
					},
					{
						value: '0',
						name: '隐藏'
					}
				],
				grade_items:[
					{
						value: '1',
						name: '显示'
					},
					{
						value: '0',
						name: '隐藏'
					}
				],
				time_items:[
					{
						value: '1',
						name: '显示'
					},
					{
						value: '0',
						name: '隐藏'
					}
				],
				
				is_brithday:0, //生日
				is_tw:0,//体温
				is_sign:0,//签到
				is_time:0,//时间
				is_teacher:0, //老师
				is_grade:0, //班级				
				
				headermsg:'',
				btntxt:'',
				footer:''
			}
		},
		methods:{
			bindmodify(){
				let ret = _self.getUserInfo();
				let datas = {
					"guid": ret.guid,
					"token": ret.token,	
					"is_brithday":_self.is_brithday, //是否显示生日功能
					"is_tw":_self.is_tw,//体温
					"is_sign":_self.is_sign,//签到
					"is_teacher":_self.is_teacher,//老师
					"is_time":_self.is_time,//放学时间
					"is_grade":_self.is_grade,//班级		
					"t":Math.random()
				};
				
				//上传图片
				_self.sendRequest({
					url : _self.SaveDisplaySiteUrl,
					method :_self.Method,
					data : datas,
					hideLoading : false,
					success: (res) => {
						let data = res;
						if(parseInt(data.status) == 3){		
							//把新设置保存到缓存							
							let d2 = {
								id:ret.id,
								mobile:ret.mobile,
								username:ret.username,
								true_name:ret.true_name,
								nick_name:ret.nick_name,
								token:ret.token,
								guid:ret.guid,
								time:ret.time,
								identity:ret.identity,
								is_brithday:_self.is_brithday, //是否显示生日功能
								is_tw:_self.is_tw,//体温
								is_sign:_self.is_sign,//签到
								is_teacher:_self.is_teacher,//老师
								is_time:_self.is_time,//放学时间
								is_grade:_self.is_grade,//班级
								pay_status:ret.pay_status,
								face:data.imgpath,
								power:ret.power //权限
							}
							
							uni.removeStorageSync(_self.USERS_KEY);
							//存储数组前，将数组转为字符串
							//uni.setStorageSync(_self.USERS_KEY,JSON.stringify(d2));
							uni.setStorage({
							    key:_self.USERS_KEY,          //key String 本地缓存中的指定key
							    data: d2,               //data Any 需要存储的内容，只支持原生类型、及能够通过 JSON.stringify 序列化的对象
							    success: function () {       //success Function	接口调用成功的回调函数
							        //console.log('success');
							    }
							});
							
						}
					}
				},"1","");
				
				
				var d3 = {
					id:ret.id,
					mobile:ret.mobile,
					username:ret.username,
					true_name:ret.true_name,
					nick_name:ret.nick_name,
					token:ret.token,
					guid:ret.guid,
					time:ret.time,
					identity:ret.identity,
					is_brithday:parseInt(_self.is_brithday), //是否显示生日功能
					is_tw:parseInt(_self.is_tw),//体温
					is_sign:parseInt(_self.is_sign),//签到
					is_teacher:parseInt(_self.is_teacher),//老师
					is_time:parseInt(_self.is_time),//放学时间
					is_grade:parseInt(_self.is_grade),//班级										
					pay_status:ret.pay_status,
					face:ret.face,
					power:ret.power //权限
				}
				uni.removeStorageSync(_self.USERS_KEY);
				//存储数组前，将数组转为字符串
				//uni.setStorageSync(_self.USERS_KEY,JSON.stringify(d2));
				uni.setStorage({
				    key:_self.USERS_KEY,          //key String 本地缓存中的指定key
				    data: d3,               //data Any 需要存储的内容，只支持原生类型、及能够通过 JSON.stringify 序列化的对象
				    success: function () {       //success Function	接口调用成功的回调函数
				        //console.log('success');
						uni.showToast({
							title: '保存成功!',
							mask: true,
							duration: 1500
						});	
				    }
				});
				
				
				
			},
			gradeChange: function(evt) {
				var current = evt.detail.value;
				_self.is_grade = current;
			},
			timeChange: function(evt) {
				var current = evt.detail.value;
				_self.is_time = current;
			},	
			teacherChange: function(evt) {
				var current = evt.detail.value;
				_self.is_teacher = current;
			},			
			
			brithdayChange: function(evt) {				
				var current = evt.detail.value;
				_self.is_brithday = current;
			},
			twChange: function(evt) {
				var current = evt.detail.value;
				_self.is_tw = current;
			},
			signChange: function(evt) {
				var current = evt.detail.value;
				_self.is_sign = current;
			},
			show(){
				let ret = uni.getStorageSync(_self.USERS_KEY);
				if(!ret){
					return false;
				}
				_self.is_brithday = ret.is_brithday;
				_self.is_tw = ret.is_tw;
				_self.is_sign = ret.is_sign;
				
				_self.is_time = ret.is_time;
				_self.is_teacher = ret.is_teacher;
				_self.is_grade = ret.is_grade;
			}
		
		
		}
    }
</script>

<style>
	.content .title{
	  		background:url(@/static/img/display.png) 10upx 25upx no-repeat;
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
	
</style>