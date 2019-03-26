import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import User from '../util/User.js'
const store = new Vuex.Store({
    state: {
		token: User.getToken(),
		userInfo: User.getUserInfo(),
		goods: User.getGoods()
	},
	getters:{
		getToken(state){
			return state.token;
		},
		getuserInfo (state){
			return state.userInfo;
		},
		goodsCount (state) {
			let count =0;
			state.goods.forEach((item,index)=>{
				count += item.buyCount;
			})
			return count;
		},
		goodsAllPrice(state){
			let sum =0;
			state.goods.forEach((item,index)=>{
				if(item.check){
					sum += item.buyCount * item.retail_price;
				}
			})
			return sum;
		},
		isCheckAll (state){
			let check = true;
			for (var i = 0; i < state.goods.length; i++) {
				if(!state.goods[i].check){
					check = false;
					break;
				}
			}
			return check;
		}
	},
    mutations: {
		addGood(state,good){
			// 在这里进行查重
			let index = -1;
			for (var i = 0; i < state.goods.length; i++) {
				if (state.goods[i].id === good.id) {
					index = i;
					break;
				}
			}
			if(index == -1){
				Vue.set(good,'check',true);
				state.goods.push(good);
			} else {
				state.goods[index].buyCount += good.buyCount;
			}
		},
		checkAll (state){
			state.goods.forEach((item,index)=>{
				item.check = true;
			})
		},
		unCheckAll (state){
			state.goods.forEach((item,index)=>{
				item.check = false;
			})
		},
		switchCheck(state,index){
			state.goods[index].check = !state.goods[index].check;
		},
		deleteCheck(state){
			state.goods = state.goods.filter((item,index)=>{
				return !item.check;
			});
		}
	},
    actions: {
		
	}
})

export default store