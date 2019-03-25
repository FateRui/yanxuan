<template>
	<view class="sift">
		<view class="sift-item" @tap.stop="tapIndex(index)" v-for="(item,index) in selectConfig">
			<view class="title" :class="{selected: selectIndex === index}">{{item.name}}</view>
			<image class="avatar" :class="{'arraw-none':item.order==0,'arraw-down': item.order==-1, 'arraw-up': item.order==1}" v-if="item.type === 1"></image>
			<view class="options"  v-if="item.type === 2" v-show="item.show">
				<view class="options-item" :class="{selected: item.index === index2}" v-for="(value,index2) in item.values" @click.stop="itemClick(index2)">{{value}}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default{
	data(){
		return {
			selectIndex: 0,
			selectConfig: []
		}
	},
	props:{
		config: {
			type: Array,
			default(){
				return [
					{
						type: 0,
						name: '综合',
						values:[]
					},
					{
						type: 1,
						name: '价格',
						values:[]
					},
					{
						type: 2,
						name: '分类',
						values:['全部','居家','餐厨','婴童','杂货','饮食']
					}
				]
			}
		}
	},
	mounted() {
		const that = this;
		this.config.forEach((item,index)=>{
			that.selectConfig.push({
				type: item.type,
				name: item.name,
				order: 0,
				index: 0,
				values: item.values || [],
				show: false
			});
		});
	},
	methods:{
		itemClick(index){
			const selectVal = this.selectConfig[this.selectIndex];
			selectVal.index = index;
			selectVal.show = false;
			this.$emit('valueChanged',selectVal);
		},
		tapIndex(index){
			
			// 在这里要做一件事－－－ 清楚没被选中的选项状态
			this.selectConfig.forEach((item,cindex)=>{
				if(index !== cindex){
					item.show = false;
					item.order = 0;
				}
			})
			
			const selectVal = this.selectConfig[index];
			if(selectVal.type === 0){
				if(this.selectIndex !== index){
					this.selectIndex = index;
					this.$emit('valueChanged',selectVal);
				}
			} else if (selectVal.type === 1){
				// 在这里要进行判断，因为箭头有两种情况
				if(this.selectIndex == index){
					selectVal.order = -1 * selectVal.order;
				} else {
					this.selectIndex = index;
					selectVal.order = 1;
				}
				this.$emit('valueChanged',selectVal);
			} else if (selectVal.type === 2){
				// 在这里要进行判断，因为有显示隐藏两种情况
				if(this.selectIndex == index){
					selectVal.show = !selectVal.show;
				} else {
					selectVal.show = true;
					this.selectIndex = index;
				}
			}
		}
	},
	computed:{
		doubleStyle(order){
			return function(order){
				if(order === 0){
					return "https://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/no-3127092a69.png";
				} else if(order === 1){
					return 'http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/up-636b92c0a5.png';
				} else if(order === -1){
					return 'http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/down-95e035f3e5.png';
				} else{
					return ''
				}
			}
		}
	}
}
</script>

<style scoped lang="less">
.sift{
	display: flex;
	flex-wrap: nowrap;
	height: 80upx;
	background-color: #fff;
	position: relative;
	border-bottom: 1px solid #d9d9d9;
	.sift-item{
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: 1px solid #d9d9d9;
		.title{
			font-size: 28upx;
			line-height: 28upx;
			height: 28upx;
			text-align: center;
			color: #333;
			&.selected{
				color: #b4282d;
			}
		}
		.avatar{
			height: 28upx;
			width: 21upx;
			background-size: 21upx 28upx;
			margin-left: 8upx;
		}
		.arraw-up{
			background-image: url('http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/up-636b92c0a5.png') !important;
		}
		.arraw-down{
			background-image: url('http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/down-95e035f3e5.png') !important;
		}
		.arraw-none{
			background-image: url('https://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/no-3127092a69.png') !important;
		}
	}
	.options{
		position: absolute;
		left: 0;
		top: 80upx;
		background: #fff;
		width: 100%;
		font-size: 0;
		z-index: 1000;
		box-sizing: border-box;
		padding: 20upx;
		border-bottom: 1px solid #f1f1f1;
		.options-item{
			display: inline-block;
			font-size: 24upx;
			line-height: 54upx;
			border: 1px solid transparent;
			padding: 0 16upx;
			margin-left: 20upx;
			margin-bottom: 20upx;
			&.selected{
				border: 1px solid #b4282d;
			}
		}
	}
}
</style>
