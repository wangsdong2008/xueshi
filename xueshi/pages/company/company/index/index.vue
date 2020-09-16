<template>
	<view class="content">
		<view>
			<view class="icenter">
				<view class="gglist" v-if="gonggaonum>0">
					<ul>
						<li class="ggitem fz25" v-for="(item3,ggindex) in gonggaoList" :index="ggindex" :key="item3.article_id" @tap="showgg(item3.guid)">{{item3.article_title}}</li>
					</ul>
				</view>
				<view class="title">今日上课 </view>
				<view class="studentlist">
					<ul v-for="(item,index) in dataList" :index="index" :key="item.com_id">
						<li v-if="parseInt(item.category_num) > 0" class="list-title list">
						{{item.com_name}}
							<ul v-if="parseInt(item2.students_num) > 0" v-for="(item2,index2) in item.categorylist" :index="index2" :key="item2.cat_id">							
								<li class="list-title2 list">{{item2.cat_name}}
									<ul>
										<li v-for="(item3,index3) in item2.studentslist" :index="index3" :key="item3.uid" :class="{
											'studentsclass':true,
											 'xb1':(item3.sex==1),
											 'xb0':(item3.sex==0),
											 'qj':(item3.sign_status == 2),
											 'green':(item3.sign_status == 1),
											 'xblist':true,
											 'fz30':true
											}">{{item3.uname}}<span class="tname" v-if="item3.teacher != ''">({{item3.teacher}})</span><span class="cname">{{item3.class_name+' '+item3.utime}}</span> <span class="t1"><view class="t2 fz30"><span v-if="item3.uaddress != ''" @tap="jie(item3.uname,item3.utime,item3.uaddress,1)">接</span></view> 
<view class="t2 fz30"><span v-if="item3.giveaddress != ''" @tap="jie(item3.uname,item3.givetime,item3.giveaddress,2)">送</span></view> 
<view class="t2 fz30"><span v-if="item3.backtime != '00:00'" @tap="jie(item3.uname,item3.backtime,item3.giveaddress,3)">回</span></view>

</span>
											<view class="times fz30" v-if="(item3.sign_status == 0 || item3.sign_status == 1)">				
												<span v-if="item3.tw_time > 2" @tap="bindtw(item3.uname,item3.uid,item2.cat_id,item.com_id,index,index2,index3)">体温</span>
											</view>	
										</li>
									</ul>
									
								</li>
							</ul>
						</li>
					</ul>
				</view>
				<!-- 提交信息 -->
				<uni-popup ref="dialogInput" type="dialog" @change="change">
					<uni-popup-dialog mode="input" :title="title2" value="36.8" placeholder="请输入学生体温" @confirm="dialogInputConfirm"></uni-popup-dialog>
				</uni-popup>	
				
				<uni-popup ref="dialogInput2" type="dialog">
				    <uni-popup-dialog type="info" mode="base" :title="title" :content="content" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
				</uni-popup>
				
			</view>		
		</view>
		<view>
			<view class="icenter">
				<view class="title">日常管理</view>
				<view class="piclist">
					<!-- 一般用法 -->
					<uni-grid :column="3" :show-border="false"  :square="false">
						<uni-grid-item>	
							<image src="/static/img/usign.png" @tap="bindsksign"></image>
							<text class="text" @tap="bindsksign">上课签到</text>
						</uni-grid-item>				    
						<uni-grid-item>
							<image src="/static/img/fsign.png" @tap="bindcfsign"></image>
							<text class="text" @tap="bindcfsign">吃饭签到</text>
						</uni-grid-item>					
						<uni-grid-item>
							<image src="/static/img/esign.png" mode="2" @tap="bindygsign"></image>
							<text class="text" @tap="bindygsign">员工签到</text>
						</uni-grid-item>					
					</uni-grid>
				</view>
			</view>
		</view>
		<view>
			<view class="icenter">
				<view class="title">系统管理</view>
				<view class="systempiclist">
					<!-- 一般用法 -->
					<uni-grid :column="4" :show-border="false"  :square="false">
						<uni-grid-item>
							<image src="/static/img/stsearch.png" @tap="bindstudentssearch"></image>
						</uni-grid-item>				    
						<uni-grid-item>
							<image src="/static/img/tjsearch.png" @tap="bindstatistics"></image>
						</uni-grid-item>					
						<uni-grid-item v-if="is_brithday === 1">
							<image :src="'/static/img/brithday'+isBrithday+'.png'" @tap="bindbrithday" ></image>
						</uni-grid-item>
						<uni-grid-item>
							<image src="/static/img/system.png" @tap="bindsystem" ></image>
						</uni-grid-item>
					</uni-grid>
				</view>
			</view>
		</view>
		<view class="footer">
			<footerNav :msg="footer"></footerNav>
		</view>
		
	</view>	
</template>

<script>
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import uniPopupShare from '@/components/uni-popup/uni-popup-share.vue'
	
    import footerNav from "@/components/footer/footer_nav.vue"
	
	var _self;
	
	export default {
	    components: {
			uniGrid,uniGridItem,footerNav,
			uniPopupMessage,
			uniPopupDialog,
			uniPopupShare
		},
		data(){
			return{
				dataList:[],
				isBrithday: 0,
				is_brithday:0,
				footer: 'index',
				gonggaoList:[],
				gonggaonum:0,
				com_id:0, //公司id
				sid:0 ,//学生id
				index_1:-1,
				index_2:-1,
				index_3:-1,
				title:'',
				content:'',
				title2:''
			}
		},
		onLoad:function() {	
			_self = this;
			_self.checkLogin(2);
		},
		onReady(){
			_self.show();
		},
		methods: {
			showgg:function(guid){
				_self.navigateTo('../../gonggao/showgonggao?id='+guid);
			},
			/**
			 * popup 状态发生变化触发
			 * @param {Object} e
			 */
			change(e) {
				console.log('popup ' + e.type + ' 状态', e.show)
			},
			
			/**
			        * 点击取消按钮触发
			        * @param {Object} done
			        */
			       close(done){
			           // TODO 做一些其他的事情，before-close 为true的情况下，手动执行 done 才会关闭对话框
			           // ...
			           done()
			       },
			       /**
			        * 点击确认按钮触发
			        * @param {Object} done
			        * @param {Object} value
			        */
			       confirm(done,value){
			           // 输入框的值
			           console.log(value)
			           // TODO 做一些其他的事情，手动执行 done 才会关闭对话框
			           // ...
			           done()
			       },
			jie(uname,utime,uaddress,status){
				switch(status){
					case 1:{
						_self.title = "【" + uname + "】接的信息";
						_self.content = utime +"去["+uaddress+']接'+uname;
						break;
					}
					case 2:{
						_self.title = "【" + uname + "】送的信息";
						_self.content = utime +"送"+uname+'去['+uaddress+']';
						break;
					}3
					case 3:{
						_self.title = "【" + uname + "】回的信息";
						_self.content = utime +"去"+uaddress+'接回['+uname+']';
						break;
					}
				}
				
				_self.$refs.dialogInput2.open();
			},
			/**
			 * 输入对话框的确定事件
			 */
			dialogInputConfirm(done, val) {
				console.log(val);
				if(val.trim() == ''){
					return false;
				}
				let ret = uni.getStorageSync(_self.USERS_KEY);
				if(!ret){
					return false;
				}
				const data = {
				    guid: ret.guid,
				    token: ret.token,
					"comid":_self.com_id,
					"temperature":val,
					"sid":_self.sid,
					"catid":_self.cat_id,
					"t":Math.random()
				};
				_self.sendRequest({
					url : _self.SetStudentsTemperatureUrl,
					method : _self.Method,
					data : data,
					hideLoading : false,
					success:function (res) {
						if(res){
							var data = res.list;
							if(parseInt(res.status) == 3){
								_self.dataList[_self.index_1]['categorylist'][_self.index_2]['studentslist'][_self.index_3]['tw_time'] = 0;
								_self.index_1 = -1;
								_self.index_2 = -1;
								_self.index_3 = -1;
								done();
							}
						}
					}
				},"1","");
				
				
			},
			bindtw(sname,sid,cat_id,comid,index,index2,index3){
				_self.sid = sid;
				_self.cat_id = cat_id;
				_self.com_id = comid;
				_self.index_1 = index;
				_self.index_2 = index2;
				_self.index_3 = index3;
				_self.title2 = '记录【'+sname+'】的体温',
				_self.$refs.dialogInput.open();
			},
			bindsystem(){
				_self.navigateTo('/pages/users/main/index/main');
			},
			bindsksign(){//上课签到
				_self.navigateTo('../sign/sksign');
			},
			bindcfsign(){ //吃饭签到
				_self.navigateTo('../sign/cfsign');
			},
			bindygsign(){ //员工签到
				_self.navigateTo('../sign/ygsign');
			},
			bindstudentssearch(){ //学生查询
				_self.navigateTo('../search/studentssearch');
			},
			bindstatistics(){ //统计
				_self.navigateTo('../statistics/statistics');
			},
			bindbrithday(){ //生日提醒
				_self.navigateTo('../brithday/birthday')
			},
			show(){
				let ret = uni.getStorageSync(_self.USERS_KEY);				
				if(!ret){
					return false;
				}
				_self.is_brithday = ret.is_brithday;
				const data = {
				    guid: ret.guid,
				    token: ret.token
				};
				_self.getData(data);
			},
			getData(data){
				let ret = _self.getUserInfo();
				if(parseInt(ret.pay_status) == 0){ //过期会员去续费
					uni.showModal({
					    title: "提醒",
					    content: '会员已过期，请续费',
						cancelText:'留在本页',
						confirmText:'去续费',
					    success: function (res) {
					        if (res.confirm) {
								_self.navigateTo('../../users/main/pay');
					        }
					    }
					});
				}else{				
					_self.sendRequest({
						url : _self.GetCurrentStudents,
						method : _self.Method,
						data : {
							"guid": data.guid,
							"token":data.token,
							"catid":1,
							"t":Math.random()
						},
						hideLoading : true,
						success:function (res) {
							if(res){
								var data = res.list;
								if(data != undefined){
									if(parseInt(res.status) == 3){
										if(data.length > 0){
											let list = [];
											for (var i = 0; i < data.length; i++) {
												var item = data[i];
												list.push(item);
											}
											_self.dataList = list;
										}																			
										_self.isBrithday = res.isBrithday; 
									}
									//公告内容
									let list = [];
									data = res.gonggaolist;
									_self.gonggaonum = res.gonggaonum;
									for (var i = 0; i < data.length; i++) {
										var item = data[i];
										list.push(item);								
									}								
									_self.gonggaoList = list;
								}
							}
						}
					},"1","");
				}
			}
		}
	}
	
</script>

<style>
	.tname{
	}
	.cname{
		margin-left: 20upx;
	}
	.t1{
		right:60upx;
		width:150upx;
		position: absolute;
	}
	.t2{
		margin-right:10upx;
		color:#f00;
		width:35upx;
		border:1upx solid #fff;
		float: left;
		display: inline;		
	}
	.green{
		color:green;
	}
	.qj{
		color:#ccc;
	}
	.studentlist ul{
		list-style-type: none;
		margin: 0;
		padding: 0;
		margin-top: 30upx;
	}
	.list{
		line-height: 45upx;
		padding-left:50upx;	
		margin-bottom: 20upx;
	}
	.list-title{
		font-weight: bold;
		background: url(/static/img/company.png) no-repeat;
		-webkit-background-size: 45upx 45upx;
		background-size: 45upx 45upx;
	}
	.list-title2{		
		font-weight: normal;
		background: url(/static/img/course.png) no-repeat;
		-webkit-background-size: 45upx 45upx;
		background-size: 45upx 45upx;
		margin-top: 20upx;
	}
	.studentsclass{
		padding-left: 20upx;
		line-height: 50upx;
		height: 50upx;
		margin-top: 20upx;
		position: relative;
	}
	
	.xb1{
		background:url(/static/img/boy.png) 0upx 10upx no-repeat;
		-webkit-background-size: 45upx 45upx;
		background-size: 45upx 45upx;
	}
	.xb0{
		background:url(/static/img/gril.png) 0upx 10upx no-repeat;
		-webkit-background-size: 45upx 45upx;
		background-size: 45upx 45upx;
	}
	.xblist{
		line-height: 60upx;
		height: 60upx;
		padding-left: 60upx;
		position: relative;
	}
	.time0{
		margin-left: 20upx;
	}
	
	.times{
		position: absolute;
		right: 0upx;
		top:2upx;
		/* border: 1px solid #f00; */
		width:auto;
		padding: 0upx 10upx;
	}	
	.times ul li{
		float: left;
		margin-right: 10upx;
	}
	.gglist{
		background:url(/static/img/gonggao.png) 0upx 10upx no-repeat;
		padding-left:40upx;
		-webkit-background-size: 45upx 45upx;
		background-size: 45upx 45upx;
		height: 45upx;
		line-height: 45upx;
		padding:10upx 50upx;
		overflow: hidden;
		color:#666;
		border-bottom: 1upx solid #eee;
	}
	.gglist ul{
		list-style-type: none;
		padding: 0;
		margin: 0;
		color:#666;
	}
	.gglist ul li{
		padding: 0;
		margin: 0;
	}
	
	.systempiclist image{
		width: 80upx;
		height: 80upx;
		margin: 0 auto;
		margin-top: 40upx;
		margin-bottom: 40upx;
	}
	.piclist image{
		width: 120upx;
		height: 120upx;
		margin: 0 auto;
		margin-top: 40upx;
	}
	.system{
		margin-bottom: 20upx;
	}
	.text{
		width: 100%;
		text-align: center;
		margin-top: 10upx;
		margin-bottom: 10upx;
		font-size: 28upx;
	}
	.piclist{
		margin-top: 20upx;
		margin-bottom: 20upx;
	}
	.studentlist{
		height: 900upx;
		overflow: auto;
		margin-bottom: 20upx;
	}
	.uni-list-item{
		padding: 0 14upx;
	}
</style>
