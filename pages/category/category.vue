<template>
	<view class="content" v-if="leftMenu.length > 0">
		<view class="searchBar">
			<navigator class="place" url="/pages/search/search">
				<view class="icon"></view>
				<view>商品搜索，共239款好物</view>
			</navigator>
		</view>
		<scroll-view :scroll-y="true" class="left-view">
			<view class="left-view-item" v-for="(item,index2) in leftMenu" :class="{selected: currentIndex === index2 }" @click="changeIndex(index2,item.id)" :key="item.id">{{item.name}}</view>
		</scroll-view>
		<scroll-view :scroll-y="true" class="right-view">
			<view class="brand" >
				<image :src="rightList.banner_url"></image>
			</view>
			<view class="title-warpper">
				<view class="line"></view>
				<view class="title">{{rightList.name}}</view>
				<view class="line"></view>
			</view>
			<view class="brand-good-warpper">
				<navigator class="brand-good" v-for="(item,index5) in rightList.subCategoryList" :key="item.id" :url="'/pages/categoryDetail/categoryDetail?id='+item.id">
					<view class="imagePlace">
						<image :src="item.wap_banner_url"></image>
					</view>
					<view class="title">
						{{item.name}}
					</view>
				</navigator>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import Api from '../../api/api.js'
import Fetch from '../../util/fetch.js'
export default {
	data() {
		return {
			leftMenu: [],
			rightList: [],
			currentIndex: 0
		}
	},
	mounted() {
		const that = this;
		Fetch.fetchData(Api.CatalogList,null,(res)=>{
			const data = res.data.data;
			that.leftMenu = data.categoryList;
			that.rightList = data.currentCategory;
		},true);
	},
	methods:{
		changeIndex(index,id){
			if(this.currentIndex != index){
				this.currentIndex = index;
				const that = this;
				Fetch.fetchData(Api.CatalogCurrent,{
					id: id
				},(res)=>{
					const data = res.data.data;
					that.rightList = data.currentCategory;
				},true);
			}
		}
	}
}
</script>

<style scoped lang="less">
.content{
	position: absolute;
	left: 0;
	top: 0;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	height: calc(100% - 88upx);
	width: 100%;
	background: #fff;
	padding-top: 88upx;
	.searchBar{
		height: 88upx;
		position: fixed;
		width: 100%;
		border-bottom: 4upx solid #f1f1f1;
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
	.left-view{
		width: 169upx;
		border-right: 4upx solid #f1f1f1;
		.left-view-item{
			height: 90rpx;
			line-height: 90rpx;
			font-size: 28upx;
			color: #6A6A6A;
			text-align: center;
		}
		.selected{
			position: relative;
			font-size: 34upx !important;
			color: #b4282d !important;
			&::after{
				position: absolute;
				left: 0;
				top: 0;
				width: 6upx;
				height: 100%;
				background: #b4282d;
				content: "";
			}
		}
	}
	.right-view{
		font-size: 0;
		flex: 1;
		box-sizing: border-box;
		padding: 0 0 0 30upx;
		.brand{
			width:calc(100% -  30upx);
			height: 192upx;
			margin: 30upx 0;
			box-sizing: border-box;
			background-color: #f1f1f1;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.title-warpper{
			height: 44upx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			.line{
				width: 44upx;
				height: 2upx;
				background-color: #999;
				margin: 0 8upx;
			}
			.title{
				font-size: 24upx;
				color: #999;
			}
		}
		.brand-good-warpper{
			overflow: hidden;
			.brand-good{
				width: 144upx;
				height: 216upx;
				background: #fff;
				margin-right: 34upx;
				float: left;
				.imagePlace{
					width: 144upx;
					height: 144upx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.title{
					font-size: 22upx;
					height: 72upx;
					line-height: 22upx;
					text-align: center;
					color: #5A5A5A;
				}
			}
		}
	}
}
</style>
