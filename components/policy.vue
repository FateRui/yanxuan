<template>
	<view class="policy">
		<view class="policy-item">
			<view class="dot"></view>
			<view class="text">30天无忧退货</view>
		</view>
		<view class="policy-item">
			<view class="dot"></view>
			<view class="text">48小时快速退款</view>
		</view>
		<view class="policy-item">
			<view class="dot"></view>
			<view class="text">满88元免运费</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped lang="less">
.policy{
	height: 72upx;
	display: flex;
	justify-content: space-between;
	padding: 0 20upx;
	align-items: center;
	background: #f4f4f4;
	.policy-item{
		font-size: 28upx;
		color: #333;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.dot{
			width: 25upx;
			height: 25upx;
			background-image: url('http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/servicePolicyRed-518d32d74b.png');
			background-size: 12upx 12upx;
			background-repeat: no-repeat;
			background-position: center center;
		}
	}
}
</style>
