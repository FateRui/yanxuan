<template>
	<view class="titleBar">
		<view class="line"></view>
		<view class="title">{{title}}</view>
		<view class="line"></view>
	</view>
</template>

<script>
export default {
	props:{
		title: {
			type: String,
			default: '标题'
		}
	}
}
</script>

<style scoped lang="less">
.titleBar{
	display: flex;
	justify-content: center;
	height: 144upx;
	align-items: center;
	.title{
		font-size: 30upx;
		color: #333;
		font-family:PingFangSC-Light,helvetica,'Heiti SC';
		padding: 0 40upx;
	}
	.line{
		width: 72upx;
		height: 2upx;
		background: #ccc;
	}
}
</style>
