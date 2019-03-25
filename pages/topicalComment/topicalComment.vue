<template>
	<view class="content">
		<view class="comment-item" v-for="item in comment" :key="item.id">
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
import Fetch from '../../util/fetch.js'
import Api from '../../api/api.js'
export default {
	data() {
		return {
			comment:[],
			page:1,
			topical_id:0,
			totalPage: 1,
			size:10
		};
	},
	onLoad(options) {
		this.topical_id = options.id;
		if(!this.topical_id) uni.navigateBack();
	},
	onReachBottom() {
		if(this.page < this.totalPage){
			this.getPage(this.page + 1);
		}
	},
	mounted() {
		this.getPage(this.page);
	},
	methods:{
		getPage(page){
			const that = this;
			Fetch.fetchData(Api.CommentList,{
				valueId: that.topical_id,
				typeId: 1,
				page:page,
				size: that.size
			},(res)=>{
				const data = res.data.data;
				that.comment = that.comment.concat(data.data);
				that.page = data.currentPage;
				that.totalPage = data.totalPages;
			},true);
		}
	}
}
</script>

<style scoped lang="less">
.content{
.comment-item{
		padding: 0 30upx;
		padding-bottom: 24upx;
		border-bottom: 1px solid #f1f1f1;
		background: #fff;
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
