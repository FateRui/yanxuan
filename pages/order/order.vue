<template>
	<view class="content">
		<view class="imagePlace" v-if="bannerInfo">
			<image :src="bannerInfo.img_url" mode="aspectFill"></image>
			<view class="titleWarpper">
				<view class="title">{{bannerInfo.name}}</view>
				<view class="under-line"></view>
			</view>
		</view>
		<sift @valueChanged="valueChanged" :config="config"></sift>
		<split ></split>
		<view class="goods">
			<navigator class="good-item" v-for="(item,index) in goods" :key="index" :url="'/pages/goodInfo/goodInfo?id='+item.id">
				<view class="imagePlace">
					<image :src="item.list_pic_url"></image>
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
import split from '../../components/split.vue'
import sift from '../../components/sift/sift.vue'
export default {
	components:{
		split,
		sift
	},
	data() {
		return {
			type: '',
			bannerInfo: '',
			goods: [],
			page: 1,
			size: 10,
			order: 'desc',
			sort: 'default',
			categoryId: 0
		};
	},
	onLoad(options) {
		this.type = options.type;
		if(!this.type) uni.navigateBack();
	},
	methods:{
		valueChanged(val){
			this.categoryId = 0;
			this.sort = 'default';
			this.order = 'desc';
			if(val.name === "综合"){
				
			} else if(val.name === "价格") {
				this.sort = 'price';
				this.order = val.order === 1 ? "asc":"desc";
			} else if(val.name === '分类') {
				this.sort = 'category';
				this.categoryId = val.index;
			}
			this.getGoods();
		},
		getGoods(){
			const that = this;
			let params = {};
			params['page'] = this.page;
			params['size'] = this.size;
			params['order'] = this.order;
			params['categoryId'] = this.categoryId;
			params['sort'] = this.sort;
			if(this.type === 'new'){
				params['isNew'] = 1;
			} else if(this.type === 'hot') {
				params['isHot'] = 1;
			} else {}
			Fetch.fetchData(Api.GoodsList,params,(res)=>{
				const data = res.data.data;
				that.goods = data.data;
			},true);
		}
	},
	mounted() {
		const that = this;
		Fetch.fetchData(this.baseUrl,null,(res)=>{
			const data = res.data.data;
			that.bannerInfo = data.bannerInfo;
			that.getGoods();
		},true);
	},
	computed:{
		config(){
			if(this.type == 'new'){
				return [
					{
						type: 0,
						name: '综合',
						values:[]
					},
					{
						type: 1,
						name: '价格',
						values:[]
					},
					{
						type: 2,
						name: '分类',
						values:['全部','居家','餐厨','婴童','杂货','饮食']
					}
				]
			} else {
				return [
					{
						type: 0,
						name: '综合',
						values:[]
					},
					{
						type: 1,
						name: '价格',
						values:[]
					},
					{
						type: 2,
						name: '分类',
						values:['全部','居家','配件','饮食','志趣']
					}
				]
			}
		},
		baseUrl () {
			if(this.type === "new"){
				return Api.GoodsNew
			} else if(this.type === "hot"){
				return Api.GoodsHot
			} else {
				return ''
			}
		}
	}
}
</script>

<style scoped lang="less">
.content{
	background: #fff;
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
	.goods{
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-flow: wrap;
		box-sizing: border-box;
		padding: 0 8upx;
		background: #f1f1f1;
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
