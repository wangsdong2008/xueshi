<template>
	<div class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<div class="content">
			<div class="title">
				我的报名
			</div>
			<div>
				<div class="searchlist">
					<div class="icenter">
						<ul>
							<li class="bm" v-for="(item,index) in dataList" :index="index" :key="item.e_id">{{'【'+item.cat_name+'】-'+item.com_name}}
								<div class="statuslist">
									<span v-if="item.v_status == '0'">审核中</span>
									<span v-if="item.v_status == '1'">未通过</span>
									<span v-if="item.v_status == '2'">课程安排中</span>
									<span v-if="item.v_status == '3'" @tap="showenlist(item.e_id)">查看课程</span>
								</div>
							</li>
						</ul>						
					</div>
				</div>
			</div>
			<div class="footer">
				<footerNav :msg="footer"></footerNav>
			</div>
		</div>
	</div>
</template>

<script>
	import service from '@/service.js';
	import mInput from '@/components/m-input.vue';
	import headerNav from "@/components/header/users_header.vue"
	import footerNav from "@/components/footer/footer_nav.vue"
	var _self;
	export default {
	    components: {
			service,
			headerNav,
			footerNav,
			mInput
		},
		onLoad(){
			_self = this;
			_self.checkLogin(1);
			_self.headermsg = "我的报名,Enlist";
		},
		onReady(){
			_self.show();
		},
		data(){
			return{					
				headermsg:'',
				footer:'',
				dataList:[],
			}
		},
		methods:{
			showenlist(){
				
			},
			show(){
				//if(_self.child_id == 0 ) return;  //考虑添加功能,允许等于0
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
				    url : _self.AllEnlistUrl,
				    method : _self.Method,
				    data : {
				    	"guid": data.guid,
				    	"token":data.token,
				    	"id":data.id,
				    	"t":Math.random()					
				    },
				    hideLoading : true,
				    success:function (res) {
				    	if(res){
				    		if(parseInt(res.status) == 3){
								var data = res.enlistlist.list; 
				    			let list = [];
				    			for (var i = 0; i < data.length; i++) {
				    				var item = data[i];
				    				list.push(item);
				    			}								
				    			_self.dataList = list;
				    		}
				    	}
				    }
				 },"1","");
			}
		}
		
	}
</script>

<style lang="scss">
	.bm{
		background:url(/static/img/bm.png) 10upx 25upx no-repeat;
		-webkit-background-size: 40upx 40upx;
		background-size: 40upx 40upx;
		padding-left: 40upx;
		line-height: 100upx;
		position: relative;
		border-bottom: 1upx solid $uni-border-color;
	}
	.statuslist{
		position:absolute;
		right: 40upx;
		font-size: 30upx;
		width: auto;
		top:0;
	}
	.statuslist span{
		margin-right: 10upx;
	}
	
	.content .title{
		background:url(/static/img/baoming.png) 10upx 25upx no-repeat;
		-webkit-background-size: 40upx 40upx;
		background-size: 40upx 40upx;
		padding-left: 60upx;
		line-height: 80upx;
	}
	
	
	.uni-list-item{
		font-size: inherit;
	}
	.uni-list-item .uni-view{
		padding: 10upx;
		border: 0upx;
	}
	.uni-list{
		padding-bottom: 50upx;
	}
</style>