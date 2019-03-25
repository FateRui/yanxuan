<template>
	<view class="content">
		<view class="searchInput">
			<input class="input" focus :placeholder='placeholder' v-model="searchVal"/>
			<view class="cancel" @tap.stop="back">取消</view>
			<view class="search-icon"></view>
			<view class="clear" v-show="searchVal.length > 0" @click="clear"></view>
		</view>
		<view class="history" v-show="history.length > 0 && searchVal.length == 0">
			<view class="Bar">
				<view class="title">搜索历史</view>
				<view class="clear" @tap.stop="claerHistory"></view>
			</view>
			<block v-for="(item,index) in history" :key="index">
				<text class="hot-item" :class="{selected: item === placeholder}" @tap.stop="hotClick(item)">{{item}}</text>
			</block>
		</view>
		<split v-show="history.length > 0 && searchVal.length == 0"></split>
		<view class="hot" v-show="hot.length > 0 && searchVal.length == 0">
			<view class="Bar">
				<view class="title">热门搜索</view>
			</view>
			<block v-for="(item,index) in hot" :key="index">
				<text class="hot-item" :class="{selected: item.keyword === placeholder}" @tap.stop="hotClick(item.keyword)">{{item.keyword}}</text>
			</block>
		</view>
	</view>
</template>

<script>
import Api from '../../api/api.js'
import Fetch from '../../util/fetch.js'
import History from '../../util/history.js'
import split from '../../components/split.vue'
export default {
	components:{
		split
	},
	data() {
		return {
			searchVal: '',
			hot: [],
			placeholder: '请输入要搜索的商品',
			hsTool: null,
			history: []
		};
	},
	mounted() {
		this.hsTool = new History();
		this.history = this.hsTool.getAllHistory();
		const that = this;
		Fetch.fetchData(Api.SearchIndex,null,(res)=>{
			const data = res.data.data;
			that.hot = data.hotKeywordList;
			that.placeholder = that.hot[0]['keyword'];
		},false);
	},
	methods:{
		back(){
			uni.navigateBack();
		},
		clear(){
			this.searchVal = '';
		},
		hotClick(val){
			this.searchVal = val;
			this.history = this.hsTool.add(val);
		},
		claerHistory(){
			this.hsTool.removeAll();
			this.history = [];
		}
	}
}
</script>

<style scoped lang="less">
.content{
	.searchInput{
		height: 90upx;
		background: #fff;
		display: flex;
		align-items: center;
		padding: 0 30upx;
		position: relative;
		border-bottom: 2upx solid #f1f1f1;
		.input{
			height: 58upx;
			flex: 1;
			border: 2upx solid #f1f1f1;
			font-size: 28upx;
			color: #333;
			padding-left: 56upx;
		}
		.cancel{
			font-size: 28upx;
			padding-left: 30upx;
		}
		.search-icon{
			width: 30upx;
			height: 30upx;
			background: url('http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/search2-2fb94833aa.png');
			background-size: 30upx 30upx;
			background-position: center center;
			background-repeat: no-repeat;
			position: absolute;
			left: 46upx;
			top: 32upx;
		}
		.clear{
			width: 50upx;
			height: 50upx;
			background: url('http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/clearIpt-f71b83e3c2.png');
			background-size: 50upx 50upx;
			background-position: center center;
			background-repeat: no-repeat;
			position: absolute;
			right: 116upx;
			top: 20upx;
			z-index: 1000;
		}
	}
	.hot,.history{
		padding: 30upx;
		background: #fff;
		.Bar{
			height: 30upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.clear{
				width: 56upx;
				height: 56upx;
				background-size: 56upx 56upx;
				background-position: center center;
				background-image: url('http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/del1-93f0a4add4.png');
			}
			.title{
				font-size: 28upx;
				color: #333;
			}
		}
		.hot-item{
			color: #333;
			font-size: 24upx;
			padding: 10upx 15upx;
			border: 2upx solid #ccc;
			display: inline-block;
			margin-right: 32upx;
			margin-top: 30upx;
			&.selected{
				color: #b4282d;
				border-color: #b4282d;
			}
		}
	}
}
</style>
