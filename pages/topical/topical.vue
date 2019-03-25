<template>
	<view class="content">
		<navigator class="top-item" v-for="(item,index5) in goods" :key="item.id" :url="'/pages/topicalDetail/topicalDetail?id='+item.id">
			<view class="imagePlace">
				<image :src="isShow[index5]? item.scene_pic_url: ''" class="grace-img-lazy"></image>
			</view>
			<view class="title">{{item.title}}</view>
			<view class="desc">{{item.subtitle}}</view>
			<view class="price">{{item.price_info}}元起</view>
			<split ></split>
		</navigator>
		<view class="pager" v-if="goods.length > 0 && totalPage > 1">
			<view :class="preClass" class="page" @click="getPreData">上一页</view>
			<view class="split"></view>
			<view :class="nextClass" class="page" @click="getNextData">下一页</view>
		</view>
		<split v-if="goods.length > 0"></split>
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
			goods: [],
			isShow:[],
			page: 1,
			totalPage: 0
		};
	},
	onPageScroll:function(e){
		graceLazyload.load(e.scrollTop, this);
	},
	mounted(){
		this.getData();
	},
	onShow() {
		uni.pageScrollTo({
			scrollTop:0,
			duration:0
		})
	},
	computed:{
		preClass(){
			if(this.page > 1 && this.totalPage > 1){
				return ''
			} else {
				return 'disabled'
			}
		},
		nextClass(){
			if(this.page < this.totalPage){
				return ''
			} else {
				return 'disabled'
			}
		}
	},
	methods:{
		getData (page) {
			var that = this;
			Fetch.fetchData(Api.TopicList,{
				page: page
			},(res)=>{
				const data = res.data.data;
				that.page = data.currentPage;
				that.goods = data.data;
				that.totalPage = data.totalPages;
				uni.pageScrollTo({
					scrollTop: 0,
					duration:0
				});
				graceLazyload.load(0, that);
			},true)
		},
		getNextData () {
			if(this.page < this.totalPage){
				this.getData(this.page+1);
			}
		},
		getPreData () {
			if(this.page > 1 && this.totalPage > 1){
				this.getData(this.page-1);
			}
		}
	}
}
</script>

<style scoped lang="less">
.content{
	.top-item{
		background: #fff;
		.imagePlace{
			width: 100%;
			height: 415upx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.title{
			font: 32upx;
			line-height: 32upx;
			height: 32upx;
			text-align: center;
			color: #414141;
			margin-top: 38upx;
		}
		.desc{
			font-size: 26upx;
			line-height: 26upx;
			height: 26upx;
			text-align: center;
			color: #999;
			margin-top: 16upx;
			white-space: nowrap;
			overflow:hidden;
			text-overflow: ellipsis;//显示省略号
			display:-webkit-box;
			-webkit-line-clamp:1;//块元素显示的文本行数
			-webkit-box-orient:vertical;
		}
		.price{
			font-size: 26upx;
			line-height: 26upx;
			height: 26upx;
			text-align: center;
			color: #BD515A;
			margin-top: 30upx;
			margin-bottom: 50upx;
		}
	}
	.pager{
		display: flex;
		height: 108upx;
		.page{
			flex: 1;
			text-align: center;
			line-height: 108upx;
			font-size: 26upx;
			background: #fff;
		}
		.disabled{
			color: #ccc !important;
		}
		.split{
			width: 4upx;
			background-color: #f1f1f1;
		}
	}
}
</style>
