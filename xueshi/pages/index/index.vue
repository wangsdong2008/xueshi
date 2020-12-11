<template>
	<view class="content">
		
	</view>
</template>

<script>
	var _self;
	export default {
		data() {
			return {
				title: 'Hello-123'
			}
		},
		onLoad() {
			_self = this;
			this.checkLogin(0);
			_self.show();
		},
		onReady(){
			//_self.getsession();
			
		},
		methods: {
			/* getsession(){
				_self.getcurrentsession();	
			} */
			show(){
				//debugger;
				let ret = _self.getUserInfo();				
				if(!ret){
					return false;
				}else{					
					var identity = ret.identity;					
					var url = "";
					switch(identity){
						case 1:{ //家长
							url = "../parents/parents/index";							
							break;
						}
						case 2:{ //机构
							url = "../company/company/index/index";
							break;
						}
						case 3:{				        					
				        	url = "../teacher/teacher/index/index";				        						
				        	break;
				        }
					}
					console.log(url);
					uni.reLaunch({
						url:url
					});
				}
				
			}
		}
	}
</script>

<style>	
	navigator{
		color: #f00;
	}
	
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
