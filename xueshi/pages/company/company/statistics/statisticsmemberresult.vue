<template>
	<view class="main_content">
		<headerNav :msg="headermsg"></headerNav>
		<view class="content">
			<view class="title">
				{{tips}}
			</view>					
		    	<view class="bg">
				<view class="qiun-columns">
						
						<view class="qiun-charts">
							<!--#ifdef MP-ALIPAY -->
							<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" :width="cWidth*pixelRatio" :height="cHeight*pixelRatio" :style="{'width':cWidth+'px','height':cHeight+'px'}" disable-scroll=true @touchstart="touchLineA" @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
							<!-- 使用图表拖拽功能时，建议给canvas增加disable-scroll=true属性，在拖拽时禁止屏幕滚动 -->
							<!--#endif-->
							<!--#ifndef MP-ALIPAY -->
							<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" disable-scroll=true @touchstart="touchLineA" @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
							<!-- 使用图表拖拽功能时，建议给canvas增加disable-scroll=true属性，在拖拽时禁止屏幕滚动 -->
							<!--#endif-->
						</view>
						
					</view>
				
			</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	import headerNav from "@/components/header/company_header.vue"
	
	var _self;
	var canvasObj = {};

	export default {	
		components: {
			headerNav
		},
		data() {
			return {
				cWidth: '',
				cHeight: '',
				tips: '',
				pixelRatio: 1,
				serverData: '',
				sliderMax: 50
			}
		},
		onLoad(options) {
			_self = this;
			//#ifdef MP-ALIPAY
			uni.getSystemInfo({
				success: function(res) {
					if (res.pixelRatio > 1) {
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_self.pixelRatio =res.pixelRatio;
						_self.pixelRatio = 2;
					}
				}
			});
			//#endif
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			
			//相关数据
			_self.comid = options['comid']; //公司id
			_self.dateid = options['d'];    //日期
			_self.cid = options['cid'];     //老师id
			_self.id = options['id'];       //类型
			_self.headermsg = '员工统计,Statistics';
		},
		onReady() {
			this.getServerData();
		},
		methods: {
			touchLineA(e) {
				canvasObj['canvasLineA'].scrollStart(e);
			},
			moveLineA(e) {
				canvasObj['canvasLineA'].scroll(e);
			},
			touchEndLineA(e) {
				canvasObj['canvasLineA'].scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				canvasObj['canvasLineA'].showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			},
			getServerData() {
				let ret = this.getUserInfo();				
					this.sendRequest({
				        url : this.GetAllSubCompanyMemberStatisticsUrl,
				        method : _self.Method,
				        data : {
							"token":ret.token,
							"guid":ret.guid,
							"comid":_self.comid,
							"dateid":_self.dateid,
							"cid":_self.cid,
							"id":_self.id
						},
				        hideLoading : true,
				        success:function (res) {
				            //console.log("获取数据:" + JSON.stringify(res));
							let data1 = res.data;
							_self.fillData(data1);
				        }
				    },"1","");				
			},
			fillData(data) {
				this.serverData = data;				
				this.tips = data.tips;
				this.sliderMax = data.Candle.categories.length;
				
				let LineA = {
					categories: [],
					series: []
				};
				
				LineA.categories = data.LineA.categories;
				LineA.series = data.LineA.series;
				
				//this.showColumnMeter("canvasColumnMeter", ColumnMeter);
				this.showLineA("canvasLineA", LineA);
				
			},
			touchIt(e,id) {
				canvasObj[id].touchLegend(e, {
					animation : false
				});
				canvasObj[id].showToolTip(e, {
					format: function (item, category) {
						if(typeof item.data === 'object'){
							return category + ' ' + item.name + ':' + item.data.value 
						}else{
							return category + ' ' + item.name + ':' + item.data 
						}
					}
				});
			},
			showLineA(canvasId, chartData) {
				canvasObj[canvasId] = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'line',
					fontSize: 11,
					padding:[15,15,0,15],
					legend:{
						show:true,
						padding:5,
						lineHeight:11,
						margin:5,
					},
					dataLabel: false,
					dataPointShape: false,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: false,
					enableScroll: true, //开启图表拖拽功能
					xAxis: {
						disableGrid: false,
						type: 'grid',
						gridType: 'dash',
						itemCount: 4, 
						scrollShow: true, 
						scrollAlign: 'left',
						//scrollBackgroundColor:'#F7F7FF',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条背景颜色,默认为 #EFEBEF
						//scrollColor:'#DEE7F7',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条颜色,默认为 #A6A6A6
					},
					yAxis: {
						//disabled:true
						gridType: 'dash',
						splitNumber: 8,
						min: 1, //最小数量
						max: 10, //最大数量
						format: (val) => {
							return val.toFixed(0) + ''
						} //如不写此方法，Y轴刻度默认保留两位小数
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					dataLabel: true,
					dataPointShape: true,
					extra: {
						lineStyle: 'straight'
					},
				});
			
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
		width:80%;
		margin: 0 auto;
		margin-top: 60upx;
	}

	.qiun-padding {
		padding: 2%;
		width: 96%;
	}

	.qiun-wrap {
		display: flex;
		flex-wrap: wrap;
	}

	.qiun-rows {
		display: flex;
		flex-direction: row !important;
	}

	.qiun-columns {
		display: flex;
		flex-direction: column !important;
	}

	.qiun-common-mt {
		margin-top: 10upx;
	}

	.qiun-bg-white {
		background: #FFFFFF;
	}

	.qiun-title-bar {
		width: 96%;
		padding: 10upx 2%;
		flex-wrap: nowrap;
	}

	.qiun-title-dot-light {
		border-left: 10upx solid #0ea391;
		padding-left: 10upx;
		font-size: 32upx;
		color: #000000
	}

	/* 通用样式 */
	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
		padding-bottom: 20upx;
	}

	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	/* 横屏样式 */
	.qiun-charts-rotate {
		width: 700upx;
		height: 1100upx;
		background-color: #FFFFFF;
		padding: 25upx;
	}

	.charts-rotate {
		width: 700upx;
		height: 1100upx;
		background-color: #FFFFFF;
	}

	/* 圆弧进度样式 */
	.qiun-charts3 {
		width: 750upx;
		height: 250upx;
		background-color: #FFFFFF;
		position: relative;
	}

	.charts3 {
		position: absolute;
		width: 250upx;
		height: 250upx;
		background-color: #FFFFFF;
	}

	.qiun-tip {
		display: block;
		width: auto;
		overflow: hidden;
		padding: 15upx;
		height: 30upx;
		line-height: 30upx;
		margin: 10upx;
		background: #ff9933;
		font-size: 30upx;
		border-radius: 8upx;
		justify-content: center;
		text-align: center;
		border: 1px solid #dc7004;
		color: #FFFFFF;
	}
</style>
