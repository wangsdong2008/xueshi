<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				续费记录
			</view>	
		</view>
		<view class="line"></view>
		<view class="content">			
			<view class="main-body write lists">
				<ul>
					<li :class="{
						'lists':true,
						'fz35':true,						
					}" v-for="(item,index) in dataList" :key="index">{{item.addtime}} {{item.payid}} 续费 {{item.order_month}}个月 {{item.pay_status}}</li>
				</ul>
				
			</view>
			<view>
				<uni-pagination @change="handlePage" :show-icon="true" :total="total" :current="page" :pageSize="pagesize" />
			</view>
		
		</view> 
		<view class="footer">
			<footerNav :msg="footer"></footerNav>
		</view>
	</view>
</template>

<script>
	import headerNav from "@/components/header/users_header.vue"
	import footerNav from "@/components/footer/footer_nav.vue"	
	import uniPagination from '@/components/uni-pagination/uni-pagination.vue'
	
	var _self;
	
	export default {
	    components: {
			headerNav,footerNav,uniPagination
		},
		onLoad(){ 
			_self = this;
			this.checkLogin(0);
		},
		onReady() {
			this.show();
		},
		data(){
			return{
				page:1,
				current: 1,
				total: 0,
				pagesize: 6,
				headermsg:'续费记录,Renewal record',
				footer:'',
				dataList:[					
				],
				dataList2:[
					
				]
			}
		},
		methods:{			
			show(){
				let ret = this.getUserInfo();
				const data = {
				    guid: ret.guid,
				    token: ret.token
				};
				this.getData(data);
			},
			handlePage(params){
				_self.page = params.current;
				_self.show();
			},
			getData(data){
				this.sendRequest({
				    url : _self.BilllistUrl,
				    method : _self.Method,
				    data : {"token":data.token,"guid":data.guid,"page":_self.page,"pagesize":_self.pagesize,"t":Math.random()},
				    hideLoading : false,
				    success:function (res) {
						if(res){
							let data = res.billlist;
							if(res.status == 3){
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
		}
	}
		
</script>

<style>	
	.content .title{
		background:url(@/static/img/xf.png) 10upx 22upx no-repeat;
		-webkit-background-size:50upx 50upx ;
		background-size:50upx 50upx;
		line-height: 60upx;
		height: 60upx;
		padding: 15upx 0upx 15upx 70upx;
	}
	
	li.lists{
		height: 75upx;
		line-height: 75upx;
		border-bottom: 1upx solid #ccc;	
		padding: 15upx 0 15upx 20upx;
		background:none;
	}
	li image{
		height: 55upx;
		width: 45upx;
		margin-right: 20upx;
	}
	.uni-pagination{
		margin: 0 auto;
		margin-top: 40upx;
	}	


	
	
</style>