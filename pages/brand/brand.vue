<template>
	<view class="contain">
		<navigator :url="'/pages/brandDetail/brandDetail?brand_id='+item.id" class="brand-item" v-for="(item,index) in brandList" :key="item.id">
			<view class="imagePlace">
				<image :src="isShow[index]? item.app_list_pic_url: ''" class="grace-img-lazy"></image>
			</view>
			<view class="title-wapper">
				<view class="title">{{item.name}}</view>
				<view class="split"></view>
				<view class="price">{{item.floor_price}}元起</view>
			</view>
		</navigator>
	</view>
</template>

<script>
import Api from '../../api/api.js'
import Fetch from '../../util/fetch.js'
let graceLazyload = require('../../util/graceLazyload.js')
export default{
	data (){
		return {
			brandList: [],
			isShow:[],
			page: 1,
			totalPage: 1
		}
	},
	onPageScroll:function(e){
		graceLazyload.load(e.scrollTop, this);
	},
	mounted() {
		var that = this;
		Fetch.fetchData(Api.BrandList,{
			page: that.page
		},(res)=>{
			const data = res.data.data;
			that.page = data.currentPage;
			that.brandList = that.brandList.concat(data.data);
			that.totalPage = data.totalPages;
			graceLazyload.load(0, that);
		},true);
	},
	onReachBottom (){
		var that = this;
		if(this.page < this.totalPage){
			Fetch.fetchData(Api.BrandList,{
				page: that.page + 1
			},(res)=>{
				const data = res.data.data;
				that.page = data.currentPage;
				that.brandList = that.brandList.concat(data.data);
				that.totalPage = data.totalPages;
				graceLazyload.load(0, that);
			},true);
		}
	}
}
</script>

<style scoped lang="less">
.contain{
	.brand-item{
		position: relative;
		.imagePlace{
			width: 100%;
			height: 416rpx;
			margin-bottom: 4upx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.title-wapper{
			position:absolute;
			 top: 50%;
			 width: 100%;
			 transform: translateY(-50%);
			 display: flex;
			 align-items: center;
			 justify-content: center;
			 color: #fff;
			 font-size: 48upx;
			 .split{
				 height: 56upx;
				 width: 6upx;
				 margin: 0 10upx;
				 background-color: #fff;
			 }
		}
	}
}
</style>
