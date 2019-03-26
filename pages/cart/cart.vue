<template>
	<view class="content">
		<policy></policy>
		<block v-for="(item,index) in goods">
			<view class="good">
				<view class="left" @tap.stop='switchCheck(index)'>
					 <check :value="item.check" @changeState="switchCheck(index)"></check>
				</view>
				<view class="right">
					<view class="imagePlace">
						<image :src="item.list_pic_url"></image>
					</view>
					<view class="detail"  v-show="isEdit==false">
						<view class="title">{{item.name}}</view>
						<view class="price">&yen; {{item.retail_price}}</view>
					</view>
					<view class="count" v-show="isEdit==false">x{{item.buyCount}}</view>
					<view class="edit-detail" v-show="isEdit==true">
						<view class="detail-top">
							<view class="aleady">已购买</view>
						</view>
						<view class="select">
							<view class="price">&yen; {{item.retail_price}}</view>
							<stepper v-model="item.buyCount" size="min"></stepper>
						</view>
					</view>
				</view>
			</view>
		</block>
		<view class="accounts" v-if="goods.length > 0">
			<view class="radioWarpper" @tap.stop="changeSelectAll">
				<check :value="isCheckAll" @changeState="changeSelectAll"></check><text class="text">全选</text>
			</view>
			<view class="allPrice">&yen; {{goodsAllPrice}}</view>
			<view class="edit" @tap.stop="changeModel">{{editText}}</view>
			<view class="checkout" @click.stop="checkClick">{{checkText}}</view>
		</view>
		<view class="empty" v-if="goods.length ===0">
			<image src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/noCart-a8fe3f12e5.png"></image>
		</view>
	</view>
</template>

<script>
import policy from '../../components/policy.vue'
import {mapState,mapGetters} from 'vuex'
import Stepper from '../../components/Stepper.vue'
import check from '../../components/check.vue'
export default {
	components:{
		policy,check,Stepper
	},
	data() {
		return {
			isEdit: false
		};
	},
	computed:{
		...mapState(['goods']),
		...mapGetters(['goodsAllPrice','isCheckAll']),
		editText(){
			return this.isEdit? '完成': '编辑'
		},
		checkText(){
			return this.isEdit? '删除所选':'下单'
		}
	},
	methods:{
		changeSelectAll(){
			if(!this.isCheckAll){
				this.$store.commit('checkAll');
			}else {
				this.$store.commit('unCheckAll');
			}
		},
		switchCheck(index){
			this.$store.commit('switchCheck',index);
		},
		changeModel(){
			this.isEdit = !this.isEdit;
			if(this.isEdit){
				this.$store.commit('unCheckAll');
			} else {
				this.$store.commit('checkAll');
			}
		},
		checkClick(){
			if(this.isEdit){
				this.$store.commit('deleteCheck');
				this.isEdit = false;
				this.$store.commit('checkAll');
			}
		}
	}
}
</script>

<style scoped lang="less">
.content{
	padding-bottom: 100upx;
	.accounts{
		position: fixed;
		bottom: 0;
		/* #ifdef H5 */
		bottom: 100upx;
		/* #endif */
		left: 0;
		width: 100%;
		height: 100upx;
		background: #fff;
		display: flex;
		.radioWarpper{
			width: 144upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28upx;
			color: #333;
			vertical-align: middle;
			.text{
				margin-left: 10upx;
			}
		}
		.allPrice{
			font-size: 28upx;
			line-height: 100upx;
			flex: 1;
			color: #333;
			box-sizing: border-box;
			padding-left: 6upx;
		}
		.edit{
			font-size: 28upx;
			line-height: 100upx;
			padding: 0 20upx;
		}
		.checkout{
			width: 210upx;
			background: #b4282d;
			line-height: 100upx;
			font-size: 28upx;
			color: #fff;
			text-align: center;
			font-family:PingFangSC-Light,helvetica,'Heiti SC';
		}
	}
	.good{
		background: #fff;
		display: flex;
		height: 164upx;
		.left{
			width: 78upx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.right{
			flex: 1;
			border-bottom: 2upx solid #f1f1f1;
			display: flex;
			position: relative;
			.imagePlace{
				width: 125upx;
				height: 125upx;
				margin-top: 20upx;
				margin-right: 20upx;
				background: #f1f1f1;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.detail{
				.title{
					font-size: 28upx;
					line-height: 28upx;
					margin-top: 26upx;
					font-family:PingFangSC-Light,helvetica,'Heiti SC';
					color: #333;
				}
				.price{
					margin-top: 40upx;
					font-size: 30upx;
					font-family:PingFangSC-Light,helvetica,'Heiti SC';
					color: #333;
				}
			}
			.edit-detail{
				box-sizing: border-box;
				padding-right: 26upx;
				flex: 1;
				.detail-top{
					font-size: 28upx;
					color: #333;
					margin-top: 26upx;
					text-align: right;
				}
				.select{
					margin-top: 24upx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 32upx;
					color: #333;
				}
			}
			.count{
				position: absolute;
				right: 20upx;
				top: 20upx;
				font-family:PingFangSC-Light,helvetica,'Heiti SC';
				color: #333;
				font-size: 28upx;
			}
		}
	}
	.empty{
		margin-top: 150upx;
		display: flex;
		justify-content: center;
		image{
			width: 258upx;
			height: 258upx;
		}
	}
}
</style>
