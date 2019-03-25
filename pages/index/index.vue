<template>
	<view class="content">
		<view class="searchBar">
			<navigator class="place" url="/pages/search/search">
				<view class="icon"></view>
				<view>商品搜索，共239款好物</view>
			</navigator>
		</view>
         <swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="5000" :duration="500" :circular='true'>
			<swiper-item v-for="(item,index) in banner" :key="index">
				<image :src="item.image_url" class="banner-img"></image>
			</swiper-item>
		</swiper>
		<view class="channel">
			<navigator :url="item.url" class="channel-item" v-for="(item,index) in exec_chanel" :key="item.id">
				<view class="imagePlace">
					<image :src="chanelImages[index]"></image>
				</view>
				<view class="title">{{item.name}}</view>
			</navigator>
		</view>
		<split v-if="brandList.length > 0"></split>
		
		<view class="title" v-if="brandList.length > 0">
			<navigator url="/pages/brand/brand" class="link">
				<view>品牌制造商特供</view>
				<image src="../../static/images/address_right.png" class="go"></image>
			</navigator>
		</view>
		
		<view class="brand-container">
			<navigator class="brand-item" v-for="(item,index) in brandList" :key="index" :url="'/pages/brandDetail/brandDetail?brand_id='+item.id">
				<image class="brand-img grace-img-lazy" :src="isShow[index]? item.new_pic_url: '' "></image>
				<view class="detail-warpper">
					<view class="title">{{item.name}}</view>
					<view class="floor">{{item.floor_price}}元起</view>
				</view>
			</navigator>
		</view>
		
		<navigator class="title" v-if="newGoodsList.length > 0" url="/pages/order/order?type=new">
			<view>周一到周四 新品首发</view>
			<image src="../../static/images/address_right.png" class="go"></image>
		</navigator>
		<view class="simple-list">
			<navigator class="simple-list-item" v-for="(item,index3) in newGoodsList" :key="item.id" :url="'/pages/goodInfo/goodInfo?id='+item.id">
				<view class="imagePlace">
					<image :src="isShow[index3]? item.list_pic_url: '' " class="grace-img-lazy"></image>
				</view>
				<view class="title">{{item.name}}</view>
				<view class="price">&yen; {{item.retail_price}}</view>
			</navigator>
		</view>
		
		<split v-if="hotGoodsList.length > 0"></split>
		<navigator class="title" v-if="hotGoodsList.length > 0" url="/pages/order/order?type=hot">
			<view>人气推荐</view>
			<image src="../../static/images/address_right.png" class="go"></image>
		</navigator>
		
		<view class="verticle-list">
			<navigator class="verticle-list-item" v-for="(item,index4) in hotGoodsList" :key="item.id" :url="'/pages/goodInfo/goodInfo?id='+item.id">
				<view class="image-place">
					<image :src="isShow[index4]? item.list_pic_url: '' " class="grace-img-lazy"></image>
				</view>
				<view class="detail">
					<view class="title">{{item.name}}</view>
					<view class="desc">{{item.goods_brief}}</view>
					<view class="price">&yen; {{item.retail_price}}</view>
				</view>
			</navigator>
		</view>
	
		<navigator class="title" v-if="topicList.length > 0" url="/pages/topical/topical" open-type="switchTab">
			<view>专题精选</view>
			<image src="../../static/images/address_right.png" class="go"></image>
		</navigator>
		<scroll-view class="horizon-list" :scroll-x="true">
			<navigator class="horizon-list-item" v-for="(item,index3) in topicList" :key="item.id" :url="'/pages/topicalDetail/topicalDetail?id='+item.id">
				<view class="imagePlace">
					<image :src="isShow[index3]? item.item_pic_url: '' " class="grace-img-lazy"></image>
				</view>
				<view class="top">
					<view class="title">{{item.title}}</view>
					<view class="price">&yen;{{item.price_info}}元起</view>
				</view>
				<view class="desc">{{item.subtitle}}</view>
			</navigator>
		</scroll-view>
			
		<view v-for="(item,index4) in categoryList" :key="item.id">
			<split></split>
			<view class="title">
				<view>{{item.name}}</view>
			</view>
			<view class="simple-list">
				<navigator class="simple-list-item" v-for="good in item.goodsList" :key="good.id" :url="'/pages/goodInfo/goodInfo?id='+good.id">
					<view class="imagePlace bgColor">
						<image :src="isShow[index4]? good.list_pic_url: ''" class="grace-img-lazy"></image>
					</view>
					<view class="title">{{good.name}}</view>
					<view class="price">&yen; {{good.retail_price}}</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
import Api from '../../api/api.js'
import split from '../../components/split.vue'
import Fetch from '../../util/fetch.js'
let graceLazyload = require('../../util/graceLazyload.js')
export default {
	components:{
		split
	},
	data() {
		return {
			isShow:[],
			banner: [],
			channel: [],
			newGoodsList: [],
			hotGoodsList:[],
			brandList: [],
			topicList: [],
			categoryList: [],
			chanelImages: [
				'https://yanxuan.nosdn.127.net/4f00675caefd0d4177892ad18bfc2df6.png',
				'https://yanxuan.nosdn.127.net/4aab4598017b5749e3b63309d25e9f6b.png',
				'https://yanxuan.nosdn.127.net/93168242df456b5f7bf3c89653b3db76.png',
				'https://yanxuan.nosdn.127.net/288b0e864a24763bade8e22c0c39ff02.png',
				'https://yanxuan.nosdn.127.net/f0698297aaac41b778c1ea65eefb8b34.png'
			]
		}
	},
	onLoad() {
		const that = this;
		Fetch.fetchData(Api.IndexUrl,null,(res)=>{
			const data = res.data.data;
			that.banner = data['banner'];
			that.channel = data['channel'];
			that.newGoodsList = data['newGoodsList'];
			that.hotGoodsList = data['hotGoodsList'];
			that.brandList = data['brandList'];
			that.topicList = data['topicList'];
			that.categoryList = data['categoryList'];
			graceLazyload.load(0, that);
		},true);
	},
	onPageScroll:function(e){
		graceLazyload.load(e.scrollTop, this);
	},
	computed:{
		exec_chanel(){
			this.channel.forEach((item,index)=>{
				item.url = '../categoryDetail/categoryDetail?id='+item.url.split('=')[1];
			})
			return this.channel;
		}
	}
}
</script>

<style scoped lang="less">	
.bgColor{
	background: #F1F1F1;
}
.content{
	/* #ifdef H5 */
		padding-top: 88upx;
	/* #endif */
	.searchBar{
		height: 88upx;
		position: fixed;
		width: 100%;
		left: 0;
		top: 0;
		/* #ifdef H5 */
		top: 88upx;
		/* #endif */
		z-index: 1000;
		box-sizing: border-box;
		padding: 0 30upx;
		background: #fff;
		display: flex;
		align-items: center;
		.place{
			background: #ededed;
			width: 100%;
			height: 56upx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 30upx;
			color: #666;
			.icon{
				width: 28upx;
				height: 28upx;
				background-size: 28upx 28upx;
				background-image: url('http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/search2-2fb94833aa.png');
				background-repeat: no-repeat;
				background-position: center center;
				margin-right: 8upx;
			}
			
		}
	}
	.swiper{
		width: 100%;
		height: 420upx;
		.banner-img{
			width: 100%;
			height: 100%;
		}
	}
	.title{
		height: 130upx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fff;
		.link{
			display: flex;
			align-items: center;
			justify-content: center;
		}
		view{
			font-size: 32upx;
			line-height: 32upx;
			text-align: center;
			color: #333;
		}
		.go{
			width: 36upx;
			height: 36upx;
			color: #333;
		}
	}
	.channel{
		height: 180upx;
		background: #fff;
		display: flex;
		flex-direction: row;
		align-items: center;
		.channel-item{
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.imagePlace{
				width: 58upx;
				height: 58upx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.title{
				font-size: 22upx;
				line-height: 22upx;
				height: 22upx;
				margin-top: 8upx;
				color: #808080;
				text-align: center;
			}
		}
	}
	.brand-container{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		background: #fff;
		.brand-item{
			height: 250upx;
			width: 374upx;
			margin-bottom: 1px;
			position: relative;
			box-sizing: border-box;
			.brand-img{
				width: 100%;
				height: 100%;
			}
			.detail-warpper{
				position: absolute;
				left: 30upx;
				top: 30upx;
				.title{
					font-size: 32upx;
					line-height: 32upx;
					height: 32upx;
					color: #333;
					font-weight: 400;
					background: transparent;
				}
				.floor{
					font-size: 24upx;
					line-height: 24upx;
					height: 24upx;
					color: #AAACAF;
					margin-top: 14upx;
				}
			}
		}
	}
	.verticle-list{
		background: #fff;
		.verticle-list-item{
			border-top: 1px solid #F1F1F1;
			margin: 0 20upx;
			height: 264upx;
			display: flex;
			align-items: center;
			.image-place{
				width: 240upx;
				height: 240upx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.detail{
				flex: 1;
				.title{
					line-height: 50upx;
					font-size: 30upx;
					color: #333;
					height: 50upx;
					display: block;
				}
				.desc{
					font-size: 26upx;
					line-height: 50upx;
					height: 50upx;
					color: #999;
				}
				.price{
					font-size: 32upx;
					line-height: 50upx;
					color: #b4282d;
				}
			}
		}
	}
	.horizon-list{
		background: #fff;
		white-space: nowrap;
		width: 100%;
		height: 533upx;
		font-size: 0;
		box-sizing: border-box;
		.horizon-list-item{
			width: 680upx;
			height: 533upx;
			margin-left: 24upx;
			display: inline-block;
			.imagePlace{
				width: 100%;
				height: 387upx;
				background: #f1f1f1;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.top{
				display: block;
				margin-top: 30upx;
				.title{
					color: #333;
					font-size: 32upx;
					height: 32upx;
					line-height: 32upx;
					display: inline-block;
				}
				.price{
					display: inline-block;
					color: #b4282d;
					font-size: 32upx;
					height: 32upx;
					line-height: 32px;
					margin-left: 20upx;
				}
			}
			.desc{
				line-height: 30upx;
				height: 30upx;
				font-size: 24upx;
				width: 100%;
				color: #999;
				margin-top: 10upx;
				overflow:hidden;
				text-overflow: ellipsis;//显示省略号
				display:-webkit-box;
				-webkit-line-clamp:1;//块元素显示的文本行数
				-webkit-box-orient:vertical;
				white-space: nowrap;
			}
		}
	}
	.simple-list{
		background: #fff;
		display: flex;
		flex-flow: wrap;
		padding: 0 20upx;
		justify-content: space-between;
		.simple-list-item{
			width: 345upx;
			margin-bottom: 30upx;
			.imagePlace{
				width: 345upx;
				height: 345upx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.title{
				font-size: 30upx;
				line-height: 40upx;
				text-align: center;
				height: 40upx;
				white-space: nowrap;
				overflow:hidden;
				text-overflow: ellipsis;//显示省略号
				display:-webkit-box;
				-webkit-line-clamp:1;//块元素显示的文本行数
				-webkit-box-orient:vertical;
			}
			.price{
				color: #b4282d;
				font-size: 28upx;
				line-height: 28upx;
				text-align: center;
			}
		}
	}
}
</style>
