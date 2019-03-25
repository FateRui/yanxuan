class History{
	constructor() {
	    this.path = 'history';
		this.maxCount = 7;
	}
	getAllHistory(){
		return JSON.parse(uni.getStorageSync(this.path)||'[]');
	}
	removeAll(){
		uni.removeStorageSync(this.path);
	}
	add(val){
		let list = this.getAllHistory();
		if(list.indexOf(val)>-1){
			list = list.splice(list.indexOf(val),1);
		}
		list.unshift(val);
		if(list.length > this.maxCount){
			list.pop();
		}
		uni.setStorageSync(this.path,JSON.stringify(list));
		return list;
	}
}

export default History;
