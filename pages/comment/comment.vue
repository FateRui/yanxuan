<template>
	<view class="content">
		<view class="switch">
			<view class="item">
				<view class="btn" :class="{selected:commentType==0}" @tap.stop="changeIndex(0)">全部({{count}})</view>
			</view>
			<view class="item">
				<view class="btn " :class="{selected:commentType==1}" @tap.stop="changeIndex(1)">有图</view>
			</view>
		</view>
		<view class="comment-item" v-for="item in goods" :key="item.id">
			<view class="time">{{item.add_time}}</view>
			<view class="desc">{{item.content}}</view>
			<view class="images" v-if="item.pic_list&&item.pic_list.length > 0">
				<view class="imagePlace" v-for="(img,index3) in item.pic_list" :key="index3">
					<image :src="img.pic_url"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import Api from '../../api/api.js'
import Fetch from '../../util/fetch.js'
export default {
	data() {
		return {
			comment_id: 0,
			commentType: 0,
			goods:[],
			page: 1,
			size: 10,
			totalPage: 1,
			count: 0
		};
	},
	onLoad(options) {
		this.comment_id = options.id;
		if(!this.comment_id) uni.navigateBack();
	},
	mounted() {
		this.getPage(this.page);
	},
	onReachBottom() {
		if(this.page < this.totalPage){
			this.getPage(this.page + 1);
		}
	},
	methods:{
		changeIndex(index){
			this.commentType = index;
			this.getPage(1);
			this.goods =[];
		},
		getPage(page){
			const that = this;
			Fetch.fetchData(Api.CommentList,{
				valueId: that.comment_id,
				typeId: 0,
				showType: that.commentType,
				page:page,
				size: that.size
			},(res)=>{
				const data = res.data.data;
				that.goods = that.goods.concat(data.data);
				that.page = data.currentPage;
				that.totalPage = data.totalPages;
				that.count = data.count;
			},true);
		}
	}
}
</script>

<style scoped lang="less">
.content{
	background: #fff;
	/* #ifdef H5 */
		padding-top: 80upx;
	/* #endif */
	.switch{
		height: 80upx;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #ccc;
		position: fixed;
		width: 100%;
		background: #fff;
		left: 0;
		top: 0;
		z-index: 1000;
		/* #ifdef H5 */
		top: 80upx;
		/* #endif */
		.item{
			flex: 1;
			display:flex;
			justify-content: center;
			.btn{
				color:#333;
				font-size: 28upx;
				position: relative;
				height: 80upx;
				line-height: 80upx;
				padding: 0 10upx;
			}
			.selected{
				color: #ab2b2b;
				&:after{
				content: "";
				display: block;
				height: 4upx;
				background: #ab2b2b;
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
			}
			}
		}
	}
	.comment-item{
		padding: 0 30upx;
		padding-bottom: 24upx;
		border-bottom: 1px solid #f1f1f1;
		.time{
			font-size: 28upx;
			line-height: 128upx;
			height: 128uxp;
			text-align: right;
			color: #666;
		}
		.desc{
			font-size: 28upx;
			line-height: 46upx;
			color: #333;
		}
		.images{
			margin-top: 24upx;
			white-space: nowrap;
			font-size: 0;
			.imagePlace{
				background: #f1f1f1;
				display: inline-block;
				width: 150upx;
				height: 150upx;
				margin-right: 28upx;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
}
</style>
