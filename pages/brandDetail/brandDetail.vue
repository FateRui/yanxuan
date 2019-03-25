<template>
	<view class="content" v-if="brandInfo">
		<view class="imagePlace">
			<image :src="brandInfo.app_list_pic_url" mode="aspectFill"></image>
			<view class="titleWarpper">
				<view class="title">{{brandInfo.name}}</view>
				<view class="under-line"></view>
			</view>
		</view>
		<view class="desc" v-if="brandInfo">
			{{brandInfo.simple_desc}}
		</view>
		<view class="goods" v-if="goods">
			<navigator class="good-item" v-for="(item,index) in goods" :key="index" :url="'/pages/goodInfo/goodInfo?id='+item.id">
				<view class="imagePlace">
					<image :src="isShow[index]? item.list_pic_url: ''" class="grace-img-lazy"></image>
				</view>
				<view class="title">{{item.name}}</view>
				<view class="price">&yen; {{item.retail_price}}</view>
			</navigator>
		</view>
	</view>
</template>

<script>
import Api from '../../api/api.js'
import Fetch from '../../util/fetch.js'
let graceLazyload = require('../../util/graceLazyload.js')
export default {
	data() {
		return {
			brand_id: 0,
			brandInfo: null,
			page: 1,
			size: 10,
			totalPage: 1,
			goods: [],
			isShow:[]
		};
	},
	onLoad(options) {
		this.brand_id = options['brand_id'];
		if(!this.brand_id) uni.navigateBack();
	},
	mounted() {
		var that = this;
		Fetch.fetchData(Api.BrandDetail,{
			id: that.brand_id
		},(res)=>{
			that.brandInfo = res.data.data.brand;
			that.getPage(that.page);
		},true);
	},
	onReachBottom() {
		if(this.page < this.totalPage){
			this.getPage(this.page + 1);
		}
	},
	onPageScroll:function(e){
		graceLazyload.load(e.scrollTop, this);
	},
	methods:{
		getPage(page){
			const that = this;
			Fetch.fetchData(Api.GoodsList,{
				brandId: that.brand_id,
				page:page,
				size: that.size
			},(res)=>{
				const data = res.data.data;
				that.goods = that.goods.concat(data.goodsList);
				that.page = data.currentPage;
				that.totalPage = data.totalPages;
				graceLazyload.load(0,that);
			},true);
		}
	}
	
}
</script>

<style scoped lang="less">
.content{
	.imagePlace{
		width: 100%;
		height: 290upx;
		font-size: 0;
		position: relative;
		image{
			width: 100%;
			height: 100%;
		}
		.titleWarpper{
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			width: 100%;
			.title{
				display: block;
				color: #fff;
				font-size: 38upx;
				line-height: 38upx;
				height: 38upx;
				text-align: center;
			}
			.under-line{
				margin: 0 auto;
				margin-top: 16upx;
				display: block;
				height: 4upx;
				width: 144upx;
				background: #fff;
				
			}
		}
	}
	.desc{
		background: #fff;
		padding: 42upx 32upx;
		font-size: 30upx;
		line-height: 42upx;
		color:#666;
		text-align: center;
	}
	.goods{
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-flow: wrap;
		box-sizing: border-box;
		padding: 0 8upx;
		margin-top: 8upx;
		.good-item{
			width:365upx;
			background: #fff;
			margin-bottom: 8upx;
			display: flex;
			align-items: center;
			flex-direction: column;
			padding: 0 10upx;
			box-sizing: border-box;
			overflow: hidden;
			.imagePlace{
				width: 302upx;
				height: 302upx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.title{
				font-size: 30upx;
				line-height: 34upx;
				height: 34upx;
				width: 100%;
				box-sizing: border-box;
				padding-right: 10upx;
				overflow: hidden;
				text-align: center;
				white-space: nowrap;
				text-overflow: ellipsis;//显示省略号
				display:-webkit-box;
				-webkit-line-clamp:1;//块元素显示的文本行数
				-webkit-box-orient:vertical;
				margin-top: 6upx;
			}
			.price{
				font-size: 30upx;
				line-height: 30upx;
				height: 30upx;
				text-align: center;
				color: #b4282d;
				margin: 22upx 0 34upx 0;
			}
		}
	}
}
</style>
