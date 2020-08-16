<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				{{cat_name}}
			</view>	
		
				<view class="twlist">
					<ul>
						<li class="tlist" v-for="(item,index) in dataList" :index="index" :key="item.com_id">
							<view class="lefts views">{{item.record_time}}</view>
							<view class="rights views">{{item.temperature}}℃</view>
						</li>
					</ul>
				</view>
				
		</view>
			</view>
		</view>
	</view>
</template>

<script>
	import service from '@/service.js';
	import mInput from '@/components/m-input.vue'
	import headerNav from "@/components/header/company_header.vue"
	import uniSection from '@/components/uni-section/uni-section.vue'
	var _self = _self;
	
	export default {
	    components: {
			headerNav,uniSection
		},
		data(){
			return{
				headermsg:'',
				dataList:[],
				selected: [],
				id:0,
				cid:0, //课程id
				uid:0, //学生id
				d:'',//月份
				cat_name:'体温记录' //课程分类名称
			}
		},
		onLoad(options){
			_self = this;
			_self.checkLogin(2);
			if(options == undefined) return false;
			_self.com_id = options['com_id']; //id=1为上课统计
			_self.cat_id = options['cat_id'];  //课程id
			_self.sid = options['sid']; //学生
			_self.d = options['d']; //日期
			_self.headermsg = '体温记录,Temperature';
		},
		onReady(){
			_self.show();
		},
		methods:{
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
				        url : _self.GetTwtatisticsUrl,
				        method : _self.Method,
				        data : {
							"guid": data.guid,
							"token":data.token,
							"comid":_self.com_id,
							"sid":_self.sid,
							"catid":_self.cat_id,
							"d":_self.d,
							"id":_self.id,
							"t":Math.random()
						},
				        hideLoading : true,
				        success: (res) => {
				        	    if(res){
				        			if(parseInt(res.status) == 3){														        				
				        				var data = res;
										_self.cat_name = data.student.uname + _self.d + _self.cat_name;
				        				if(parseInt(res.status) == 3){
				        					//所有签到记录
				        					let list = [];
				        					let signlist = data['twresult'];
				        					for (var i = 0; i < signlist.length; i++) {
				        						var item = signlist[i];									
				        						list.push(item);
				        					}
				        					_self.dataList = list;
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
			background:url(@/static/img/tw.png) 10upx 22upx no-repeat;
			-webkit-background-size:50upx 50upx ;
			background-size:50upx 50upx;
			line-height: 60upx;
			height: 60upx;
			padding: 15upx 0upx 15upx 70upx;
		}
		
	.twlist ul{
		list-style-type: none;
		margin: 20upx;
		padding: 0upx;		
	}
	li.tlist{
		position: relative;
		padding-left: 40upx;
		border-bottom: 1upx dotted #ccc;		
		line-height: 80upx;
		height: 80upx;
		margin-bottom: 20upx;
	}
	view.views{}
	view.left{
		float: left;
		width:auto;
	}
	view.rights{
		position: absolute;
		right:40upx;
		top:0upx
	}
	.ctitles{
		background:url(/static/img/tjsearch.png) 10upx 25upx no-repeat;
		-webkit-background-size: 40upx 40upx;
		background-size: 40upx 40upx;
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
</style>
