<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title fz40">
				{{teacher_name}}全部安排
			</view>	
		</view>
		<view class="line"></view>
		<view class="content">
			<view class="icenter">
				<!-- 一般用法 -->
				<uni-collapse>					
					<uni-collapse-item v-for="(item,index) in week_dataList" :title="item.weekday" :open="item.activer" thumb="/static/img/course.png" :index="index" :key="item.com_id" v-if="item.count > 0">
						<ul>
							<li class="t2"  v-for="(item2,index2) in item.list" :index="index2" :key="item2.id" >
								<view class="fz35">{{item2.gtime +'【'+item2.groupname+'】'}}</view>
								<view class="statuslist fz30"><span @tap="teacherplanedit(index,index2,_self.teacher_id,item2.pid,item2.groupname,item2.gtime)">修改</span><span @tap="teacherplandel(_self.teacher_id,item2.pid)">删除</span></view>
							</li>
						</ul>
					</uni-collapse-item>
				</uni-collapse>
			</view>
			<view class="btn-row">
				<!-- <button type="primary" class="btn" @tap="companyplanaddone">单人添加</button> -->
				<button type="primary" class="btn" @tap="teacherplanadd">添加新安排</button>
			</view>	
			<uni-popup ref="dialogInput" type="dialog" @change="change">
				<uni-popup-dialog mode="input" :title="'请输入'+title+'上课时间'" :value="gtime" placeholder="09:00" @confirm="dialogInputConfirm"></uni-popup-dialog>
			</uni-popup>
		</view>
		<view class="footer">
			<footerNav :msg="footer"></footerNav>
		</view>
	</view>
</template>

<script>
	import headerNav from "@/components/header/company_header.vue"
	import footerNav from "@/components/footer/footer_nav.vue"
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'	
	
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import uniPopupShare from '@/components/uni-popup/uni-popup-share.vue'
	
	var _self;
	export default {
	    components: {
			headerNav,footerNav,
			uniCollapse,uniCollapseItem,
			uniPopupMessage,
			uniPopupDialog,
			uniPopupShare
		},
		onLoad(options){	
			_self = this;
			_self.checkLogin(2);
			_self.teacher_id = options['id'];
		},
		onReady(){
			_self.show();
		},
		data(){
			return{
				dataList:[],	
				teacher_id:'',
				teacher_name:'',
				gtime:'',
				
				title:'',
				index:0,
				index2:0,
				
				week_dataList:[],
				ptime:'08:00',
				headermsg:'员工上课安排,Member Plan Manage',
				footer:''
			}
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
					        url : _self.GetCompanyTeacherplanInfoUrl,
					        method : _self.Method,
					        data : {
								"guid": data.guid,
								"token":data.token,
								"id":_self.teacher_id,
								"t":Math.random()
							},
					        hideLoading : true,
					        success: (res) => {
					       	    if(res){
									if(parseInt(res.status) == 3){
									let Memberinfo = res.memberinfo;
									_self.teacher_name = Memberinfo.true_name;
									
									var data = res.teacherlist;
									if(data.length > 0){
										let list1 = [];
										for (var i = 0; i < data.length; i++) {
											var item = data[i];
											list1.push(item);
											//_self.week_dataList[i].list = list1;
										}
										_self.week_dataList = list1;
									}
									
									
									
								    }
					       	    }
					       	}
					       
					    },"1","");
			},
			//teacherplanedit(index,index2,item2.teacher_id,item2.pid,item2.groupname,item2.gtime)
			teacherplanedit(index,index2,id,pid,pname,gtime){
				_self.pid = pid;
				_self.teacher_id = id;
				_self.title = pname;
				_self.gtime = gtime;
				_self.index = index;
				_self.index2 = index2;
				_self.$refs.dialogInput.open();
			},
			/**
			 * popup 状态发生变化触发
			 * @param {Object} e
			 */
			change(e) {
				//console.log('popup ' + e.type + ' 状态', e.show)
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
					"id":_self.teacher_id,	
					"pid":_self.pid,
					"ptime":val,					
					"t":Math.random()
				};
				let index = _self.index;
				let index2 = _self.index2;
				_self.sendRequest({
					url : _self.UpdateCompanyTeacherplanInfoUrl,
					method : _self.Method,
					data : data,
					hideLoading : false,
					success:function (res) {
						let status = res.status;
						if(status == 3){
							_self.week_dataList[index].list[index2].gtime = val;
						}
						done();
					}
				},"1","");
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
			/* companyplanaddone(){
				_self.navigateTo('companyplanedit');
			},*/
			teacherplanadd(){
				_self.navigateTo('teacherplanadd?teacher_id='+_self.teacher_id);
			},
			
			teacherplandel(id,cat_id){
				let ret = _self.getUserInfo();
				if(!ret){
					return false;
				}
				const data = {
				    guid: ret.guid,
				    token: ret.token,
					id:id,
					cat_id:cat_id
				};
				_self.delData(data);
			},
			delData(data){ 
				_self.sendRequest({
				        url : _self.DelCompanyTeacherplanInfoUrl,
				        method : _self.Method,
				        data : {
							"guid": data.guid,
							"token":data.token,
							"id":data.id,
							"pid":data.cat_id,
							"t":Math.random()
						},
				        hideLoading : false,
				        success: (res) => {
				        	    if(res){					    	
				        			if(parseInt(res.status) == 3){
				        				_self.show();
				        				uni.showToast({
				        					title: '删除成功',
				        					icon: 'none',
				        				});	
				        			}
				        			else{
				        				uni.showToast({
				        					title: '删除失败',
				        					icon: 'none',
				        				});	
				        			}
				        	    }
				        	},
				        
				    },"1","");							
			}
		}
	}
	
</script>

<style>
	.t2{
		line-height: 75upx;
		border-bottom: 1upx solid #eee;
		background-color: #fff;
		padding-left: 40upx;
	}
	.t2 view{
		display: inline;
	}
	.content .title{
	  		background:url(/static/img/sk.png) 10upx 25upx no-repeat;
	  		-webkit-background-size:50upx 50upx ;
	  		background-size:50upx 50upx;
	  		line-height: 60upx;
	  		height: 60upx;
	  		padding: 15upx 0upx 15upx 70upx;
	  	}
		
	.icenter{
		width: 96%;
		margin: 0 auto;
	}	
	.statuslist{
		position:absolute;
		right: 30upx;
		margin-top: 10upx;
	}
	.statuslist span{
		margin-right: 10upx;
	}	
	
</style>
