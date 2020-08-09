<template>
	<view>
		<view class="content">
		<ul>
			<li class="lists fz35" v-for="(item,index) in dataList" :key="index" @tap="bindclick(index,1)">{{item.text}}</li>
		</ul>
		</view>
		<view class="line"></view>
	</view>
</template>

<script>
	var _self;
	export default {
		onLoad(){
			_self = this;
			this.checkLogin(0);
		},		
		data(){
			return{				
				dataList:[				
					{text:'关于学时',url:"./index"},
				]
			}
		},
		methods:{
			bindclick:function(num,pos){
				switch(pos){
					case 1:{
						_self.navigateTo(_self.dataList[num].url);	
						break;
					}
					case 2:{
						_self.navigateTo(_self.dataList2[num].url);
						break;
					}
				}			
			}
		}
	}
</script>

<style>	
	
	
</style>
