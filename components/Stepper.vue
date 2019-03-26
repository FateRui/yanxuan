<template>
	<view class="stepper" :class="size">
		<view class="sub" @click.stop.prevent="sub">-</view>
		<view class="value">{{selectValue}}</view>
		<view class="add" @click.stop.prevent="add">+</view>
	</view>
</template>

<script>
export default {
	props:{
		value:{
			type: Number,
			default: 0
		},
		size:{
			type:String,
			default: "max"
		}
	},
	data() {
		return {
			selectValue: 0
		}
	},
	mounted() {
		this.selectValue = this.value;
	},
	methods:{
		add(){
			this.selectValue ++;
			this.$emit('input',this.selectValue);
			this.$emit('add');
		},
		sub(){
			if(this.selectValue > 1){
				this.selectValue --;
				this.$emit('input',this.selectValue);
				this.$emit('sub');
			} 
		}
	}
}
</script>

<style scoped lang="less">
.stepper{
	display: inline-block;
	font-size: 0;
	border: 2upx solid #ccc;
	&.max{
		.add,.sub{
			height: 66upx;
			width: 92upx;
			display: inline-block;
			text-align: center;
			line-height: 66upx;
			font-size: 28upx;
		}
		.value{
			height: 66upx;
			width: 134upx;
			text-align: center;
			line-height: 66upx;
			display: inline-block;
			font-size: 28upx;
			border-left: 2upx solid #ccc;
			border-right: 2upx solid #ccc;
		}
	}
	&.min{
		.add,.sub{
			height: 35upx;
			width: 48upx;
			display: inline-block;
			text-align: center;
			line-height: 35upx;
			font-size: 28upx;
		}
		.value{
			height: 35upx;
			width: 48upx;
			text-align: center;
			line-height: 35upx;
			display: inline-block;
			font-size: 28upx;
			border-left: 2upx solid #ccc;
			border-right: 2upx solid #ccc;
		}
	}
}
</style>
