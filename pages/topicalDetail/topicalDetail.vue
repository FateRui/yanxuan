<template>
	<view class="content">
		<wxParse :content="article" :imageProp ="imageProp" className="goods_desc"/>
		<view class="comment-warpper">
			<view class="edit">
				<view class="tip">精选留言</view>
				<navigator class="btn" :url="'/pages/topicalCommentPost/topicalCommentPost?id='+ topical_id"></navigator>
			</view>
			<view class="comment-item" v-for="item in comment" :key="item.id">
				<view class="time">{{item.add_time}}</view>
				<view class="desc">{{item.content}}</view>
				<view class="images" v-if="item.pic_list&&item.pic_list.length > 0">
					<view class="imagePlace" v-for="(img,index3) in item.pic_list" :key="index3">
						<image :src="img.pic_url"></image>
					</view>
				</view>
			</view>
			<navigator class="more" :url="'/pages/topicalComment/topicalComment?id='+ topical_id" v-if="comment.length >= 5">
				 查看更多
			</navigator>
			<view class="wait" v-if="comment.length == 0">
				<view class="imagePlace">
					<image src="http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/no-comment-560f87660a.png"></image>
				</view>
				<view class="text">等你来留言</view>
			</view>
		</view>
		<view class="title" v-if="command.length > 0">专题推荐</view>
		<navigator class="command" v-for="item in command" :key="item.id" :url="'/pages/topicalDetail/topicalDetail?id='+item.id">
			<view class="imagePlace">
				<image :src="item.scene_pic_url"></image>
			</view>
			<view class="title">{{item.subtitle}}</view>
		</navigator>
	</view>
</template>

<script>
import Api from '../../api/api.js'
import Fetch from '../../util/fetch.js'
import wxParse from '../../components/uParse/src/wxParse.vue'
export default {
	components:{
		wxParse
	},
	data() {
		return {
			topical_id: 0,
			article: '<div></div>',
			command:[],
			comment: [],
			imageProp: {
				lazyLoad: false,
				padding: 0,
				mode: 'aspectFit'
			}
		};
	},
	onLoad(options) {
		this.topical_id = options.id;
		if(!this.topical_id) uni.navigateBack();
	},
	mounted() {
		const that = this;
		Fetch.fetchData(Api.TopicDetail,{
			id: that.topical_id
		},(res)=>{
			const data = res.data.data;
			that.article = data.content;
			this.getComment();
			this.getRelated();
		},true);
	},
	methods:{
		getRelated(){
			const that = this;
			Fetch.fetchData(Api.TopicRelated,{
				id: that.topical_id
			},(res)=>{
				const data = res.data.data;
				that.command = data;
			},true);
		},
		getComment(){
			const that = this;
			Fetch.fetchData(Api.CommentList,{
				valueId: that.topical_id,
				typeId: 1,
				size: 5
			},(res)=>{
				const data = res.data.data;
				that.comment = data.data;
			},true);
		}
	}
}
</script>

<style scoped lang="less">
@import url("../../components/uParse/src/wxParse.css");
.content{
	.comment-warpper{
		padding-left: 30upx;
		background: #fff;
		.edit{
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 92upx;
			border-bottom: 1px solid #f1f1f1;
			padding-right: 30upx;
			.tip{
				font-size: 28upx;
				color: #333;
			}
			.btn{
				width: 40upx;
				height: 40upx;
				background-image: url('http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/comment-add-2aca147c3f.png');
				background-size: 40upx 40upx;
				background-repeat: no-repeat;
				background-position: center center;
			}
		}
		.comment-item{
			padding-right: 30upx;
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
		.more{
			height: 104upx;
			text-align: center;
			line-height: 104upx;
			font-size: 40upx;
			color: #333;
		}
		.wait{
			height: 297upx;
			justify-content: center;
			align-items: center;
			display: flex;
			flex-direction: column;
			.imagePlace{
				width: 115upx;
				height: 130upx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.text{
				font-size: 28upx;
				color: #7f7f7f;
				margin-top: 6upx;
			}
		}
	}
	.title{
		vertical-align: baseline;
		text-align: center;
		font-size: 30upx;
		line-height: 30upx;
		height: 30upx;
		color: #999;
		padding-top: 66upx;
		margin-bottom: 32upx;
	}
	.command{
		margin: 0 32upx 32upx 32upx;
		background: #fff;
		padding: 24upx;
		.imagePlace{
			width: 100%;
			height: 278upx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.title{
			font-size: 28upx;
			margin-top: 30upx;
			margin-bottom: 0upx;
			color: #333;
			height: 28upx;
			line-height: 28upx;
			text-align: left;
			display: --webkit-box;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}
	}
}
</style>
