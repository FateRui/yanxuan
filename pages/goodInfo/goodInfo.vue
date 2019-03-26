<template>
	<view class="content">
		<swiper class="gallery" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500">
			<swiper-item v-for="(item,index) in gallery" :key="index">
				<image :src="item.img_url"></image>
			</swiper-item>
        </swiper>
		<policy></policy>
		<view class="info" v-if="info">
			<view class="title">{{info.name}}</view>
			<view class="desc">{{info.goods_brief}}</view>
			<text class="price">&yen; {{info.retail_price}}</text>
			<navigator class="brand" v-if="brand.name" :url="'/pages/brandDetail/brandDetail?brand_id='+ brand.id">
				<view class="text">{{brand.name}}</view>
				<view class="arrow"></view>
			</navigator>
		</view>
		<view class="choice" @tap.stop="showMask = true">
			<view class="title">请选择规格数量</view>
			<view class="arrow-right"></view>
		</view>
		<split></split>
		<view class="comment" v-if="comment&&comment.count>0">
			<view class="title">评价({{comment.count}})</view>
			<navigator class="right" :url="'/pages/comment/comment?id='+good_id">
				<view class="subtitle">查看全部</view>
				<view class="arrow-right"></view>
			</navigator>
		</view>
		<view class="comment-item" v-if="comment&&comment.data&&comment.count>0">
			<view class="time">{{comment.data.add_time}}</view>
			<view class="desc">{{comment.data.content}}</view>
			<view class="images" v-if="comment.data.pic_list&&comment.data.pic_list.length > 0">
				<view class="imagePlace" v-for="(item,index) in comment.data.pic_list" :key="index">
					<image :src="item.pic_url"></image>
				</view>
			</view>
		</view>
		<split></split>
		<view class="attribute" v-if="attribute&&attribute.length>0">
			<view class="title">商品参数</view>
			<view class="attribute-item" v-for="(item,index) in attribute" :key="index">
				<view class="name">
					{{item.name}}
				</view>
				<view class="params">
					{{item.value}}
				</view>
			</view>
		</view>
		<!-- <wxParse :content="goods_desc" :imageProp ="imageProp" v-if="goods_desc" className="goods_desc"/> -->
		<title-bar title="常见问题" v-if="issue&&issue.length >0"></title-bar>
		<view class="issue" v-if="issue&&issue.length >0">
			<view class="issue-item" v-for="(item,index) in issue" :key="index">
				<view class="title">
					<view class="dot"></view>
					<view class="content">{{item.question}}</view>
				</view>
				<view class="answer">
					{{item.answer}}
				</view>
			</view>
		</view>
		<title-bar title="大家都在看" v-if="goods.length >0"></title-bar>
		<view class="goods" v-if="goods.length >0">
			<navigator class="good-item" v-for="(item,index) in goods" :key="index" :url="'/pages/goodInfo/goodInfo?id='+item.id">
				<view class="imagePlace">
					<image :src="isShow[index]? item.list_pic_url: '' " class="grace-img-lazy"></image>
				</view>
				<view class="title">{{item.name}}</view>
				<view class="price">&yen; {{item.retail_price}}</view>
			</navigator>
		</view>
		<view class="buyBar">
			<view class="fav">
				<image class="icon" src="../../static/images/icon_collect.png"></image>
			</view>
			<navigator class="cart" url="/pages/cart/cart" open-type="switchTab">
				<view class="imagePlace">
					<image class="icon" src="../../static/images/ic_menu_shoping_nor.png"></image>
					<text class="count">{{goodsCount}}</text>
				</view>
			</navigator>
			<view class="buy">立即购买</view>
			<view class="addCart" @tap.stop="addCart">加入购物车</view>
		</view>
		<view class="mask" v-show="showMask" v-if="info" @touchstart="cancel($event)">
			<view class="salePane">
				<view class="detailWarpper">
					<view class="imagePlace">
						<image :src="gallery[0].img_url" v-if="gallery.length >0"></image>
					</view>
					<view class="detail">
						<view class="price">价格: &yen; {{info.retail_price}}</view>
						<view class="select">已选择: 请选择规格数量</view>
					</view>
				</view>
				<view class="title">数量</view>
				<Stepper v-model="count" ></Stepper>
				<image class="close" src="../../static/images/icon_close.png" @tap.stop="showMask = false"></image>
			</view>
		</view>
	</view>
</template>

<script>
import Api from '../../api/api.js'
import Fetch from '../../util/fetch.js'
import policy from '../../components/policy.vue'
import split from '../../components/split.vue'
import titleBar from '../../components/titleBar.vue'
import wxParse from '../../components/uParse/src/wxParse.vue'
import Stepper from '../../components/Stepper.vue'
import Vue from 'vue'
let graceLazyload = require('../../util/graceLazyload.js')
import {mapGetters} from 'vuex'
export default {
	components:{
		policy,split,titleBar,wxParse,Stepper
	},
	data() {
		return {
			good_id:0,
			goods_desc: '',
			gallery:[],
			info: null,
			brand: null,
			comment: null,
			attribute: [],
			issue: [],
			goods:[],
			imageProp: {
				lazyLoad: false,
				padding: 0,
				mode: 'aspectFit'
			},
			count: 1,
			showMask: false,
			isShow:[]
		};
	},
	onLoad(options) {
		this.good_id = options['id'];
		if(!this.good_id) uni.navigateBack();
	},
	computed:{
		...mapGetters(['goodsCount'])
	},
	onPageScroll:function(e){
		graceLazyload.load(e.scrollTop, this);
	},
	mounted() {
		const that = this;
		Fetch.fetchData(Api.GoodsDetail,{ id: that.good_id},(res)=>{
			const data = res.data.data;
			that.goods_desc = data.info.goods_desc.replace(/style=\"\"/gi,'style=\"width:100%\"');
			that.gallery = data.gallery;
			that.info = data.info;
			that.brand = data.brand;
			that.comment = data.comment;
			that.attribute = data.attribute;
			that.issue = data.issue;
			that.getReleated();
		},true);
	},
	methods:{
		getReleated(){
			const that = this;
			Fetch.fetchData(Api.GoodsRelated,{ id: that.good_id },(res)=>{
				const data = res.data.data;
				that.goods = data.goodsList;
				graceLazyload.load(0, that);
			},false);
		},
		addCart(){
			if(!this.showMask){
				this.showMask = true;
			} else {
				this.info.buyCount = this.count;
				this.$store.commit('addGood',{
					id: this.info.id,
					buyCount: this.count,
					name: this.info.name,
					list_pic_url: this.info.list_pic_url,
					retail_price: this.info.retail_price
				});
				this.showMask = false;
				uni.showToast({
					icon: 'success',
					title: '添加成功',
					duration: 500
				});
			}
		},
		cancel(e){
			e.stopPropagation();
			e.preventDefault();
			return false;
		}
	}
}
</script>

<style scoped lang="less">
@import url("../../components/uParse/src/wxParse.css");
.content{
	background: #fff;
	padding-bottom: 100upx;
	.gallery{
		width: 100%;
		height: 750upx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.goods_desc{
		font-size: 0;
		width: 100%;
		overflow: hidden;
		margin: 0;
		padding: 0;
	}
	.info{
		padding: 32upx 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #fff;
		.title{
			font-size: 40upx;
			height: 40upx;
			line-height: 40upx;
			text-align: center;
			font-weight: 400;
			font-family:PingFangSC-Light,helvetica,'Heiti SC';

		}
		.desc{
			font-size: 20upx;
			line-height: 20upx;
			height: 20upx;
			margin-top: 10upx;
			color: #999;
		}
		.price{
			font-size: 34upx;
			line-height: 34upx;
			height:34upx;
			color: #b4282d;
			margin-top: 40upx;
		}
		.brand{
			font-size: 24upx;
			line-height: 24upx;
			margin-top: 24upx;
			padding: 4px 10upx;
			border: 1px solid #f48f18;
			border-radius: 6upx;
			display: flex;
			flex-direction: row;
			align-items: center;
			color: #f48f18;
			.arrow{
				width: 10upx;
				height: 18upx;
				margin-left: 8upx;
				background-image: url('http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/detailTagArrow-18bee52dab.png');
				background-position: center center;
				background-size: 10upx 18upx;
				background-repeat: no-repeat;
			}
		}
	}
	.choice{
		height: 108upx;
		border-top: 1px solid #f1f1f1;
		margin-left: 30upx;
		background: #fff;
		align-content: center;
		padding-right: 30upx;
		justify-content: space-between;
		align-items: center;
		display: flex;
		.title{
			font-size: 28upx;
			line-height: 28upx;
			height: 28upx;
		}
		.arrow-right{
			background: url('../../static/images/address_right.png') no-repeat center center;
			background-size: 38upx 38upx;
			width: 38upx;
			height: 38upx;
			
		}
	}
	.comment{
		height: 102upx;
		border-bottom: 1px solid #f1f1f1;
		margin-left: 30upx;
		background: #fff;
		align-content: center;
		padding-right: 30upx;
		justify-content: space-between;
		align-items: center;
		display: flex;
		.title{
			font-size: 38upx;
			font-family:PingFangSC-Light,helvetica,'Heiti SC';
		}
		.arrow-right{
			background: url('../../static/images/address_right.png') no-repeat center center;
			background-size: 38upx 38upx;
			width: 38upx;
			height: 38upx;
			
		}
		.right{
			display: flex;
			flex-direction: row;
			font-size: 28upx;
			color: #333;
		}
	}
	.comment-item{
		padding: 0 30upx;
		padding-bottom: 24upx;
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
	.attribute{
		padding: 0 32upx 25upx 32upx;
		.title{
			height: 104upx;
			line-height: 104upx;
			font-size: 40upx;
			font-family:PingFangSC-Light,helvetica,'Heiti SC';
		}
		.attribute-item{
			height: 68upx;
			background: #f7f7f7;
			margin-bottom: 12upx;
			display: flex;
			align-items: center;
			padding: 0 20upx;
			.name{
				width: 134upx;
				overflow: hidden;
				font-size: 24upx;
				color: #999;
				display: inline-block;
				margin-right: 20upx;
			}
			.params{
				flex: 1;
				font-size: 36upx;
				color: #333;
				white-space: pre-wrap;
				overflow:hidden;
				text-overflow: ellipsis;//显示省略号
				display:-webkit-box;
				-webkit-line-clamp:1;//块元素显示的文本行数
				-webkit-box-orient:vertical;
			}
		}
	}
	.issue{
		padding: 0 30upx;
		background: #fff;
		.issue-item{
			margin-bottom: 26upx;
			.title{
				display: flex;
				align-items: center;
				.dot{
					width: 8upx;
					height: 8upx;
					border-radius: 4upx;
					background: #b4282d;
				}
				.content{
					margin-left: 8upx;
					font-size: 26upx;
					line-height: 26upx;
					height: 26upx;
					color: #303030;
					padding: 0;
				}
			}
			.answer{
				font-size: 26upx;
				line-height: 36upx;
				color: #787878;
				padding-left: 16upx;
				margin-top: 20upx;
			}
		}
	}
	.goods{
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-flow: wrap;
		box-sizing: border-box;
		padding: 0 8upx;
		background: #f1f1f1;
		border-top: 8upx solid #f1f1f1;
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
	.buyBar{
		height: 100upx;
		border-top: 2upx solid #f1f1f1;
		display: flex;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #fff;
		.fav{
			width: 160upx;
			display: flex;
			justify-content: center;
			align-items: center;
			border-right: 2upx solid #f1f1f1;
			image{
				width: 44upx;
				height: 44upx;
			}
		}
		.cart{
			width: 160upx;
			display: flex;
			justify-content: center;
			align-items: center;
			border-right: 2upx solid #f1f1f1;
			margin-top: 10upx;
			.imagePlace{
				position: relative;
				image{
					width: 44upx;
					height: 44upx;
				}
				.count{
					position: absolute;
					width: 28upx;
					height: 28upx;
					top: -10upx;
					right: -14upx;
					font-size: 18upx;
					text-align: center;
					line-height: 28upx;
					color: #fff;
					background: #b4282d;
					border-radius: 14upx;
				}
			}
		}
		.addCart{
			flex: 1;
			font-size: 28upx;
			line-height: 100upx;
			text-align: center;
			color: #fff;
			background: #b4282d;
		}
		.buy{
			flex: 1;
			font-size: 28upx;
			line-height: 100upx;
			text-align: center;
			color: #333;
			background: #fff;
		}
	};
	.mask{
		position: fixed;
		width: 100%;
		background: rgba(0, 0, 0, .5);
		z-index: 100;
		left: 0;
		top: 0;
		/* #ifdef H5 */
		top: 88upx;
		/* #endif */
		bottom: 100upx;
		border-bottom: 1px solid #f1f1f1;
		.salePane{
			position: absolute;
			bottom: 0;
			left: 0;
			padding: 32upx;
			background: #fff;
			width: 100%;
			box-sizing: border-box;
			z-index: 101;
			.detailWarpper{
				display: flex;
				align-items: center;
				.imagePlace{
					width: 176upx;
					height: 176upx;
					background: #f4f4f4;
					image{
						width: 100%;
						height: 100%;
					}
					margin-right: 32upx;
				}
				.detail{
					flex: 1;
					.price{
						font-size: 32upx;
						line-height: 32upx;
						color: #333;
					}
					.select{
						margin-top: 10upx;
						font-size: 28upx;
						line-height: 28upx;
						color: #333;
					}
				}
			}
			.title{
				margin-top: 42upx;
				font-size: 28upx;
				height: 28upx;
				color: #333;
				margin-bottom: 22upx;
			}
			.close{
				position: absolute;
				right: 20upx;
				top: 20upx;
				width: 60upx;
				height: 60upx;
			}
		}
	}
}
</style>
