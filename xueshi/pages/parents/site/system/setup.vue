<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		
		<view class="content">
			<view class="title">
				个性设置
			</view>	
		</view>
		<view class="line"></view>
		<view class="content">	
				<view class="icenter">
					<view class="register_account_input form fz35">上课提醒设置</view>
					
					<view class="register_account_input form">
						<view class="left_txt">提前时间</view>
						<view class="cell-right">							
							<m-input class="m-input fz30 minput" type="text" clearable focus v-model="remind_time" placeholder="提醒时间"></m-input>
						</view>
					</view>
					
					<view class="register_account_input form">
						<view class="left_txt">提醒音乐</view>
						<view class="cell-right">
							<radio-group @change="signChange">
								<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in remind_statuslist" :key="item.value">
								<view>
									<radio class="radios" :value="item.value" :checked="parseInt(item.value) == parseInt(remind_status)" />
								</view>
								<view class="radio_text fz30">{{item.name}}</view>
								</label>							
							</radio-group>
						</view>
					</view>
					
					<view class="register_account_input form" v-if="remind_status == 1">
						<view class="left_txt">提示音</view>
						<view class="cell-right">
							<picker @change="MusicPickerChange($event)" :value="music_index" :range="music_dataList">
								<view class="uni-input">{{music_dataList[music_index]}}</view>
							</picker>
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
			_self.checkLogin(1);
			_self.btntxt="保存";
			_self.headermsg = "设置,Siteup";
			
		},
		onReady(){
			_self.show();
		},
		data(){
			return{
				music_dataList:["==请选择提示音==","叮咚","微信","机器人","ready"],
				music_dataIDList:['','qianniu','weixin','Robot','ready'],
				music_index:0,
				music_id:'',
				remind_statuslist: [
					{
						value: '1',
						name: '使用'
					},
					{
						value: '0',
						name: '禁用'
					}
				],
				remind_time:'0',
				remind_status:'0',
				remind_music:'',
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
					"remind_time":_self.remind_time,
					"remind_status":_self.remind_status,
					"remind_music":_self.remind_music,
					"t":Math.random()
				};
				//保存设置
				_self.sendRequest({
					url : _self.SaveRemindUrl,
					method :_self.Method,
					data : datas,
					hideLoading : false,
					success: (res) => {
						let data = res;
						if(parseInt(data.status) == 3){		
							uni.showToast({
								title: '保存成功!',
								mask: true,
								duration: 1500
							});	
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
								
								remind_time:_self.remind_time,//提醒提前时间
								remind_status:_self.remind_status,//提示音开关
								remind_music:_self.remind_music,//提示音
								
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
				
				
				/* var d3 = {
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
				}); */
				
				
				
			},	
			MusicPickerChange: function(e) {
			    console.log('picker发送选择改变，携带值为', e.target.value+"===="+_self.music_dataList[e.target.value]);
				_self.music_index = e.target.value;
				_self.music_id = _self.music_dataList[e.target.value];				
				_self.remind_music = _self.music_dataIDList[_self.music_index];
			},
			signChange: function(evt) {
				var current = evt.detail.value;
				_self.remind_status = current.toString();
				
				if(parseInt(current) == 0){
					_self.music_index = 0;
				}
			},
			show(){
				 let ret = uni.getStorageSync(_self.USERS_KEY);
				if(!ret){
					return false;
				}				
				_self.remind_time = ret.remind_time;
				_self.remind_status = ret.remind_status;
				_self.remind_music = ret.remind_music;
				
				let j = _self.music_dataIDList.findIndex(i => i == _self.remind_music);
				_self.music_index = j;
			}
		
		
		}
    }
</script>

<style>
	.content .title{
	  		background:url(@/static/img/gx.png) 10upx 25upx no-repeat;
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
	

	.minput,picker{
		font-size: 28upx;
		border: 1upx solid #999;
		line-height: 60upx;
		width:60%;
		float: left;
		height: 60upx;
		border-radius: 25upx;
		
	}
	.minput{
		text-indent: 10upx;
	}
	picker{
		text-align: center;
	}
</style>