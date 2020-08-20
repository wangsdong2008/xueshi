<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				帮助文档
			</view>	
		</view>
		<view class="line"></view>
		<view class="content">
			<ul>
				<li class="t2" v-for="(item,index) in dataList"  :index="index" :key="item.help_id">
					<view class="fz35" @tap="bindclick(item.guid)" >{{item.article_title}}</view>
				</li>
			</ul>
				
				<view>
					<uni-pagination class="pagination" @change="handlePage" :show-icon="true" :total="total" :current="page" :pageSize="pagesize" />
				</view>			
				</view>
				<view class="footer">
					<footerNav :msg="footer"></footerNav>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import headerNav from "@/components/header/company_header.vue"
	import footerNav from "@/components/footer/footer_nav.vue"
	import uniPagination from '@/components/uni-pagination/uni-pagination.vue'
	
	var _self;
	export default {
		components: {			
			uniPagination,
			headerNav,
			footerNav
		},
		data(){
			return{
				page:1,
				current: 1,
				total: 0,
				pagesize: 5,
				dataList:[
					
				],
				headermsg:'帮助,Help',
				footer: 'help'
			}
		},
		onLoad:function() {
			_self = this;
			_self.checkLogin(2);
		},
		onReady:function(){
			_self.show();
		},
		methods:{
			handlePage(params){
				//debugger;
				_self.page = params.current;
				_self.show();
			},
			bindclick:function(id){
				//debugger;
				_self.navigateTo('helpshow?id='+id+"&page="+_self.page);
				
			},		
			show:function(){
				let ret = _self.getUserInfo();
				if(!ret){
					return;
				}
				const data = {
				    guid: ret.guid,
				    token: ret.token
				};
				_self.getData(data);
			},
			getData(data){
				_self.sendRequest({
				       url : _self.ArticleListUrl,
				       method : _self.Method,
				       data : {
							"guid": data.guid,
							"token":data.token,
							"page":_self.page,
							"pagesize":_self.pagesize,
							"cat_id":1,
							"t":Math.random()
					   },
				       hideLoading : true,
				       success:function (res) {
						if(res){
							var data = res.articlelist; 
							if(parseInt(res.status)==3){
								let data1 = data.list;
								let list = [];
								for (var i = 0; i < data1.length; i++) {
									var item = data1[i];
									list.push(item);
								}								
								_self.dataList = list;
								_self.total =  data.count;
							}					    	
						}
				       }
				   },"1","");
			}
		},
	}
</script>

<style>
	.t2{
		line-height: 75upx;
		border-bottom: 1upx solid #eee;
		background-color: #fff;
		padding-left: 40upx;
	}
	.content .title{
	  		background:url(@/static/img/help.png) 10upx 25upx no-repeat;
	  		-webkit-background-size:50upx 50upx ;
	  		background-size:50upx 50upx;
	  		line-height: 60upx;
	  		height: 60upx;
	  		padding: 15upx 0upx 15upx 70upx;
	  	}	
	
	
	.uni-pagination{
		width:100%;
		margin-top: 40upx;
	}
	.ulist{
		padding-left: 0upx;
	}
	
</style>
