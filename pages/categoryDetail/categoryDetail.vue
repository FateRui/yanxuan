<template>
	<view class="content">
		<scroll-view class="top-view" :scroll-x="true" :scroll-into-view="currentLog" :scroll-with-animation="true">
			<view :id="'menu'+index" class="top-view-item" v-for="(item,index) in topMenu" :key="index" 
			:class="{selected: currentIndex == index}" @tap="tapIndex(index)">
				{{item.name}}
			</view>
		</scroll-view>
		<view class="tips" v-if="brotherCategory.length >0">
			<view class="title">{{brotherCategory[currentIndex].name}}</view>
			<view class="subtitle">{{brotherCategory[currentIndex].front_desc}}</view>
		</view>
		<view class="goods">
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
import Fetch from '../../util/fetch.js';
import Api from '../../api/api.js';
let graceLazyload = require('../../util/graceLazyload.js');
export default {
	data() {
		return {
			category_id: 0,
			topMenu: [],
			currentCategory: null,
			brotherCategory: [],
			currentIndex: 0,
			currentLog: '',
			page:1,
			pageSize:10,
			totolPage: 1,
			goods:[],
			isShow:[]
		};
	},
	onLoad(options) {
		this.category_id = options.id;
		if(!this.category_id) uni.navigateBack();
	},
	methods:{
		tapIndex(index){
			if(this.currentIndex != index){
				this.category_id = this.topMenu[index]['id'];
				this.currentIndex = index;
				this.page = 0;
				this.currentLog = 'menu' + (index-2);
				this.goods = [];
				this.totolPage = 1;
				this.getGoods();
			}
		},
		getGoods(page){
			const that = this;
			Fetch.fetchData(Api.GoodsList,{
				categoryId: that.category_id,
				page: page,
				size: that.pageSize
			},
			(res)=>{
				const data = res.data.data;
				that.goods = that.goods.concat(data.goodsList);
				that.page = data.currentPage;
				that.totolPage = data.totalPages;
				graceLazyload.load(0, that);
			}, true);
		},
		fetchData (){
			const that = this;
			Fetch.fetchData(Api.GoodsCategory,{ id: that.category_id },
				(res)=>{
					const data = res.data.data;
					that.topMenu = data.brotherCategory;
					that.brotherCategory = data.brotherCategory;
					//在这里找到初始化位置, 最好用id 匹配，currentCategory有排序关键字,为啥用下面方法，数据貌似有错，刚进来时
					const currentCategory = data.currentCategory;
					that.currentCategory = currentCategory;
					that.topMenu.forEach((item,index)=>{
						if(item.name === currentCategory.name){
							that.currentIndex = index;
							that.currentLog = 'menu' + index;
						}
					});
					that.getGoods(that.page);
				},
			true);
		}
	},
	onReachBottom() {
		if(this.page < this.totolPage){
			this.getGoods(this.page + 1);
		}
	},
	onPageScroll:function(e){
		graceLazyload.load(e.scrollTop, this);
	},
	mounted() {
		this.fetchData();
	}	
}
</script>

<style scoped lang="less">
.content{
	.top-view{
		height: 84upx;
		white-space: nowrap;
		font-size: 0;
		background: #fff;
		position: fixed;
		top: 0;
		/* #ifdef H5 */
			top: 84upx;
		/* #endif */
		left: 0;
		width: 100%;
		z-index: 1000;
		.top-view-item{
			display: inline-block;
			font-size: 30upx;
			height: 84upx;
			line-height: 84upx;
			padding: 0 20upx;
			color: #666;
			&.selected{
				color: #ab2b2b;
				position: relative;
				&::after{
					position: absolute;
					left: 0;
					bottom: 0;
					width: 100%;
					height: 6upx;
					background: #ab2b2b;
					content: "";
				}
			}
		}
	}
	.tips{
		background: #f1f1f1;
		height: 145upx;
		margin-top: 84upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		.title{
			width: 100%;
			text-align: center;
			font-size: 34upx;
			line-height: 34upx;
			height: 34upx;
			color: #333;
		}
		.subtitle{
			text-align: center;
			font-size: 24upx;
			line-height: 24upx;
			height: 24upx;
			color: #999;
			margin-top: 18upx;
		}
	}
	.goods{
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-flow: wrap;
		box-sizing: border-box;
		padding: 0 8upx;
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
