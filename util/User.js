class User {
	static saveToken (token){
		uni.setStorageSync('token',token);
	}
	static saveUserInfo (userInfo){
		uni.setStorageSync('userInfo',JSON.stringify(userInfo));
	}
	static getToken (token){
		return uni.getStorageSync('token') || '';
	}
	static getUserInfo (userInfo){
		return JSON.parse(uni.getStorageSync('userInfo')||'{}');
	}
	static saveGoods (goods){
		uni.setStorageSync('goods',JSON.stringify(goods));
	} 
	static getGoods (goods){
		return JSON.parse(uni.getStorageSync('goods')||'[]');
	}
}
export default User;
