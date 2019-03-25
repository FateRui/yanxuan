<template>
	<view class="content">
		<view class="textarea">
			<textarea placeholder="留言经过筛选后,对所有人可见"  class="input" :maxlength="140" v-model="text"/>
			<view class="odd">{{odd}}</view>
		</view>
		<view class="commit">
			<view class="back" @tap.stop="back">取消</view>
			<view class="commit" @tap.stop="submit">发表</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			topical_id: 0,
			text: ''
		};
	},
	computed:{
		odd(){
			return 140 - this.text.length;
		}
	},
	onLoad(options) {
		this.topical_id = options.id;
		if(!this.topical_id) uni.navigateBack();
	},
	methods:{
		submit(){
			
		},
		back(){
			uni.navigateBack();
		}
	}
}
</script>

<style scoped lang="less">
.content{
	.textarea{
		padding: 30upx;
		position: relative;
		.input{
			width: 100%;
			background: #fff;
			height: 300upx;
			font-size: 28upx;
			padding: 20upx;
			box-sizing: border-box;
		}
		.odd{
			position: absolute;
			right: 50upx;
			bottom: 50upx;
			font-size: 28upx;
			height: 28upx;
			color: #333;
		}
	}
	.commit{
		height: 48upx;
		display: flex;
		justify-content: space-between;
		padding: 0 30upx;
		align-items: center;
		.back,.commit{
			font-size: 28upx;
			color: #333;
		}
	}
}
</style>
