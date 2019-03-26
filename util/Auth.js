import User from './User.js'
class Auth{
	 static  login (){
		return new Promise((resolve,reject)=>{
			uni.login({
			  provider: 'weixin',
			  success: function (loginRes) {
				  resolve(loginRes);
			  },
			  fail: function (err) {
				  reject(err);
			  }
			});
		});
	}
	static  getUserInfo(){
		return new Promise((resolve,reject)=>{
			uni.getUserInfo({
				provider: 'weixin',
				success: function (infoRes) {
					resolve(infoRes);
				},
				fail: function(err){
					reject(err)
				}
			});
		});
	}
	static loginWithInfo () {
		return new Promise((resolve,reject)=>{
			uni.login({
			  provider: 'weixin',
			  success: function (loginRes) {
				 const token = loginRes.code;
				 User.saveToken(token);
				// 获取用户信息
				uni.getUserInfo({
					  provider: 'weixin',
					  success: function (infoRes) {
						User.saveUserInfo(infoRes.userInfo);
						const userInfo = infoRes.userInfo;
						resolve({token,userInfo});
					  },
					fail(err) {
						reject(err)				  
					}
				});
			  }
			});
		})
	}
}
export default Auth;
