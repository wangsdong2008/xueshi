<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				{{d}}{{cat_name}}统计
			</view>
			<view class="icenter">
				<ul>
					<li>日期<span class="nums fz30">人数</span></li>
					<li v-for="(item,index) in dataList" :index="index" :key="item.date">
						{{item.date}}
						<span class="nums fz30">{{item.num}}</span>
					</li>
				</ul>
			</view>	
		</view>
	</view>
</template>

<script>
	import service from '@/service.js';
	import mInput from '@/components/m-input.vue'
	import headerNav from "@/components/header/company_header.vue"
	import uniSection from '@/components/uni-section/uni-section.vue'
	var _self;
	
	export default {
	    components: {
			headerNav,uniSection
		},
		data(){
			return{
				headermsg:'',
				dataList:[],
				datalist: [],
				id:0,
				cid:0, //课程id
				comid:0, //公司id
				d:'',//月份
				cat_name:'' //课程分类名称
			}
		},
		onLoad(options){
			_self = this;
			_self.checkLogin(2);
			if(options == undefined) return false;
			_self.id = options['id']; //id=1为上课统计
			_self.cid = options['cid'];  //课程id
			_self.comid = options['com_id']; //公司
			_self.d = options['d']; //日期
			switch(parseInt(_self.id)){
				case 1:{
					_self.headermsg = '上课统计,Statistics';
					_self.cat_name = '上课';
					break;
				}
				case 2:{
					_self.headermsg = '吃饭统计,Statistics';
					_self.cat_name = '吃饭';
					break;
				}
				case 3:{
					_self.headermsg = '员工统计,Statistics';
					_self.cat_name = '考勤';
					break;
				}
			}
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
				this.sendRequest({
				        url : this.GetCompanyStatisticUrl,
				        method : _self.Method,
				        data : {
							"guid": data.guid,
							"token":data.token,
							"comid":_self.comid,
							"cid":_self.cid,
							"d":_self.d,
							"id":_self.id,
							"t":Math.random()
						},
				        hideLoading : true,
				        success: (res) => {
				        	    if(res){					   
				        			//debugger;
				        			if(parseInt(res.status) == 3){
										if(_self.id==1)	_self.cat_name = res.categorylist.cat_name + _self.cat_name;
				        				var data = res;
				        				if(parseInt(res.status) == 3){
				        					//所有签到记录
				        					let list = [];
				        					let signlist = data['signlist'];
				        					//debugger;
				        					for (var i = 0; i < signlist.length; i++) {
				        						var item = signlist[i];									
				        						list.push(item);
				        					}									
				        					_self.dataList = list;
				        				}								
				        			}else{
				        				uni.showToast({
				        					title: '无数据',
				        					icon: 'none',
				        				});
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
		background:url(@/static/img/etj.png) 10upx 22upx no-repeat;
		-webkit-background-size:50upx 50upx ;
		background-size:50upx 50upx;
		line-height: 60upx;
		height: 60upx;
		padding: 15upx 0upx 15upx 70upx;
	}
	
	.icenter{
		width:100%;
		margin: 0 auto;
		margin-top: 60upx;
	}
	.uni-section{
		background-color: #fff;
	}
	
	.icenter li{
		line-height: 65upx;
		border-bottom: 1upx solid #ccc;
	}
	.nums{
		margin-right: 0upx;
		width:60upx;
		float: right;
		color:green;
		text-align: center;
	}

</style>
