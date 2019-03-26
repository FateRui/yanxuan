<template>
	<view class="check" @tap.stop="changeStatus" :class="{selected:value}">
		
	</view>
</template>

<script>
export default {
	props:{
		value: {
			type: Boolean,
			default: true
		}
	},
	methods:{
		changeStatus(){
			this.$emit('changeState');
		}
	}
}
</script>

<style scoped lang="less">
.check{
	width: 36upx;
	height: 36upx;
	display: inline-block;
	background-image: url('../static/images/checkbox.png');
	background-size: 100%;
	background-repeat: no-repeat;
	background-clip: border-box;
	border: none;
	border-radius: 36upx;
	background-position: 0 -132upx;
	&.selected{
		background-position: 0 -174upx;
	}
}
</style>
