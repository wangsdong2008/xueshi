<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				{{studentsname+_self.d+'【'+_self.category_name+'】'+cat_name}}
			</view>
				<uni-calendar 
					:insert="true"
					:lunar="false" 
					:selected="selected"
					:start-date="'2019-3-2'"
					:end-date="'2059-5-20'"
					:date = "d+'-01'"
					@monthSwitch="changeMonth"
				></uni-calendar>		
			</view>
			</view>
		</view>
	</view>
</template>

<script>
	import service from '@/service.js'
	import mInput from '@/components/m-input.vue'
	import headerNav from "@/components/header/company_header.vue"
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	var _self;
	
	export default {
	    components: {
			headerNav,uniSection,uniCalendar
		},
		data(){
			return{
				headermsg:'',
				dataList:[],
				selected: [],
				studentsname:'',
				category_name:'',
				id:0,
				cid:0, //课程id
				uid:0, //学生id
				d:'',//月份
				cat_name:'吃饭统计' ,//课程分类名称
			}
		},
		onLoad(options){
			_self = this;
			_self.checkLogin(2);
			if(options == undefined) return false;
			_self.id = options['id']; //id=1为上课统计
			_self.cid = options['cid'];  //课程id
			_self.uid = options['uid']; //学生
			_self.d = options['d']; //日期
			var strname = "";
			switch(parseInt(_self.id)){
				case 1:{
					strname = "上课统计";
					_self.headermsg = '上课统计,Statistics';
					break;
				}
				case 2:{
					strname = "吃饭统计";
					_self.headermsg = '吃饭统计,Statistics';
					break;
				}
				case 3:{
					strname = "员工统计";
					_self.headermsg = '员工统计,Statistics';
					break;
				}
			}
			_self.cat_name = strname;
		},
		onReady(){
			_self.show();
		},
		methods:{
			changeMonth(e){
				_self.d = e.year + "-" + ("0"+e.month).trimRight(2);
				_self.show();
			},
			show(){
				let ret = _self.getUserInfo();
				const data = {
				    guid: ret.guid,
				    token: ret.token
				};
				_self.getData(data);
			},
			getData(data){
				_self.sendRequest({
				        url : _self.GetStudentssign,
				        method : _self.Method,
				        data : {
							"guid": data.guid,
							"token":data.token,
							"uid":_self.uid,
							"cid":_self.cid,
							"d":_self.d,
							"id":_self.id,
							"t":Math.random()
						},
				        hideLoading : true,
				        success: (res) => {
				        	    if(res){
									_self.studentsname = res.studentsinfo.uname;
									_self.category_name = res.categoryinfo.cat_name;
				        			if(parseInt(res.status) == 3){								
				        				//_self.cat_name = res.categorylist.cat_name;
				        				var data = res;
				        				if(parseInt(res.status) == 3){
				        					//所有签到记录
				        					let list = [];
				        					let signlist = data['signlist'];
				        					for (var i = 0; i < signlist.length; i++) {
				        						var item = signlist[i];									
				        						list.push(item);
				        					}									
				        					_self.selected = list;
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
		background:url(@/static/img/tjsearch.png) 10upx 22upx no-repeat;
		-webkit-background-size:50upx 50upx ;
		background-size:50upx 50upx;
		line-height: 60upx;
		height: 60upx;
		padding: 15upx 0upx 15upx 70upx;
	}
	
	.uni-section{
		background-color: #fff;
	}
	.uni-calendar{
		width:96%;
		margin:0 auto;
	}
	.content{
		background-color: #fff;
	}
	.icenter > view{
		float: left;
	}
	.icenter > view.searchinput{
		background: url(/static/img/search.png) no-repeat 5upx 10upx;
		-webkit-background-size: 55upx 55upx;
		background-size: 55upx 55upx;
		width: 65%;
		border:1upx solid #eeeeee;
		line-height: 55upx;
		height: 55upx;
		padding-left: 60upx;
		border-radius: 25upx;
	}
	.sites{
		padding-bottom: 200upx;
	}
</style>
