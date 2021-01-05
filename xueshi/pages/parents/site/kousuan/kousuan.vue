<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				口算练习
			</view>
		</view>
		
		<view class="line"></view>
		<view class="content" style="width: 95%;">
			<view>
				<view class="register_account_input clear">
					<view class="uni-list-cell-left fz30">数量：</view>
					<view class="searchinput input-txt">
						<radio-group @change="numChange">
							<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in num_items" :key="item.value">
							<view>
								<radio class="radios" :value="item.value.toString()" :checked="parseInt(item.value) == num" />
							</view>
							<view class="radio_text fz30">{{item.name}}</view>
							</label>							
						</radio-group>
					</view>
				</view>
				
				<view class="register_account_input clear">
					<view class="uni-list-cell-left fz30">运算：</view>
					<view class="searchinput input-txt">
						<picker @change="CoursePickerChange($event)" :value="course_index" :range="course_dataList">
							<view class="uni-input fz30">{{course_dataList[course_index]}}</view>
						</picker>
					</view>
				</view>
				
				<view class="register_account_input clear">
					<view class="uni-list-cell-left fz30" id="fw1">第一个数：</view>
					<view class="searchinput input-txt">
						<picker @change="Rrang1PickerChange($event)" :value="rang1_index" :range="rang1_dataList">
							<view class="uni-input fz30">{{rang1_dataList[rang1_index]}}</view>
						</picker>
					</view>
				</view>
				
				<view class="register_account_input clear">
					<view class="uni-list-cell-left fz30" id="fw2">第二个数：</view>
					<view class="searchinput input-txt">
						<picker @change="Rrang2PickerChange($event)" :value="rang2_index" :range="rang2_dataList">
							<view class="uni-input fz30">{{rang2_dataList[rang2_index]}}</view>
						</picker>
					</view>
				</view>
				
				<view class="register_account_input clear">
					<view class="uni-list-cell-left fz30">括号位置：</view>
					<view class="searchinput input-txt">
						<radio-group @change="posChange">
							<label class="uni-list-cell uni-list-cell-pd" v-for="(item2, index) in pos_items" :key="item2.value">
							<view>
								<radio class="radios" :value="item2.value.toString()" :checked="parseInt(item2.value) == pos" />
							</view>
							<view class="radio_text fz30">{{item2.name}}</view>
							</label>							
						</radio-group>
					</view>
				</view>
				
				
				<view class="clear"></view>
				
			</view>
		</view>
		
		<view class="line"></view>
		<view class="content">
			<view class="btn-row">
				<button type="primary" class="btn"  @tap="kousuanprint">{{btntxt}}</button>
			</view>
		</view>
		
		<view class="footer">
			<footerNav :msg="footer"></footerNav>
		</view>
	</view>
</template>

<script>
	import service from '@/service.js';	
	import headerNav from "@/components/header/users_header.vue"
	import footerNav from "@/components/footer/footer_nav.vue"
	var _self;
	export default {
	    components: {
			headerNav,
			footerNav
		},
		data(){
			return{
				dataList:[],				
				headermsg:'口算练习,Children Manage',
				footer: '',
				btntxt:'打印题目',
				num:30,
				num_items:[],
				pos:1,
				pos_items:[],
				course_index:0,
				course_id:1,
				course_dataList:[],				
				course_dataIDList:[],
				
				rang1_id:10,
				rang1_index:0,
				rang1_dataList:[],
				rang1_dataIDList:[],
				
				rang2_id:10,
				rang2_index:0,
				rang2_dataList:[],
				rang2_dataIDList:[]
			}
		},
		onLoad(){
			_self = this;
			_self.checkLogin(1);
		},
		onReady(){
			_self.show();
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
				_self.getData(data);
			},
			getData(data){
				_self.sendRequest({
				    url : _self.KousuanCsUrl,
				    method : _self.Method,
				    data : {
				    			"guid": data.guid,
				    			"token":data.token,
				    			"t":Math.random()			
							},
				    hideLoading : true,
				    success:function (res) {
				    	if(res){				    		
				    		if(parseInt(res.status) == 3){
								//数量
								var data = res.numlist;								
								let list = [];
								for (var i = 0; i < data.length; i++) {
									var item = data[i];
									list.push(item);
								}								
								_self.num_items = list;
								_self.num = res.initnum;
								
								//运算
								data = res.operationlist;
								list = [];
								var idlist = [];
								for (var i = 0; i < data.length; i++) {
									var item = data[i];
									list.push(item.name);
									idlist.push(item.value);
								}
								_self.course_dataList = list;
								_self.course_dataIDList = idlist;
								
								//范围								
								data = res.ranglist;
								list = [];
								var idlist = [];
								for (var i = 0; i < data.length; i++) {
									var item = data[i];
									list.push(item.name);
									idlist.push(item.value);
								}
								_self.rang1_dataList = list;
								_self.rang1_dataIDList = idlist;
								_self.rang2_dataList = list;
								_self.rang2_dataIDList = idlist;
								
								//位置
								data = res.poslist;
								list = [];
								for (var i = 0; i < data.length; i++) {
									var item = data[i];
									list.push(item);
								}								
								_self.pos_items = list;
								_self.pos = res.initpos;
								
				    		}
				    	}
				    }
				},"1","");
			},
			kousuanprint:function(){
				var n = _self.num; //数量
				var p = _self.pos; //括号位置
				var r1 = _self.rang1_id; //第一个数字
				var r2 = _self.rang2_id; //第二个数字
				var c = _self.course_id; //加减乘除
				var url = 'kousuanresult?n='+n+'&p='+p+"&r1="+r1+"&r2="+r2+"&c="+c;
				_self.navigateTo(url);
			},
			numChange:function(evt){
				var current = evt.detail.value;
				_self.num = current;
			},
			posChange:function(evt){
				var current = evt.detail.value;
				_self.pos = current;
			},
			Rrang1PickerChange:function(e){
				_self.rang1_id = _self.rang1_dataIDList[e.target.value];
				_self.rang1_index = e.target.value;
			},
			Rrang2PickerChange:function(e){
				_self.rang2_id = _self.rang2_dataIDList[e.target.value];
				_self.rang2_index = e.target.value;
			},
			CoursePickerChange:function(e){
				console.log('picker发送选择改变，携带值为', e.target.value+"===="+_self.course_dataList[e.target.value] + _self.course_dataIDList[e.target.value]);
				_self.course_id = _self.course_dataIDList[e.target.value];
				_self.course_index = e.target.value;
			}
		}
	}
</script>

<style>
	.content .title{
		background:url(/static/img/kousuan.png) 10upx 25upx no-repeat;
		-webkit-background-size: 40upx 40upx;
		background-size: 40upx 40upx;
		padding-left: 60upx;
		line-height: 80upx;
	}
	
	ul.detail li{
		line-height: 90upx;
		padding-left: 70upx;
		margin-bottom: 10upx;
	}
	.cname{
		float: left;
	}
	.statuslist{
		float: right;
		right: 0upx;
		top:0upx;
	}
	.statuslist span{
		margin-right: 20upx;
	}
	.register_account_input{
		padding-top: 20upx;
		padding-bottom: 10px;
		line-height: 60upx;
		height: 60upx;
		margin-left: 40upx;
	}
	
	.register_account_input view{
		float: left;
		margin-bottom: 10upx;
	}
	.radio_text{
		margin-right: 20upx;
	}
	
	.uni-list-cell-left{
		margin-right: 40upx;
		width:23%;
	}
	
	picker view{
		border: 1px solid #ccc;
		width:400upx;
		text-align: center;
		height: 75upx;
		line-height: 75upx;
		border-radius: 50upx;
	}
</style>
