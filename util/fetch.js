const fetchData = function(url,params,callback,showLoading){
					var that = this;
					if(showLoading){
						uni.showLoading({
							title: '加载中...',
							mask: true
						});
					}
					uni.request({
						url:url,
						data:params,
						success(res) {
							callback && callback(res);
						},
						fail() {
							uni.showToast({
								title: '网络错误',
								icon: 'none',
								duration: 2000
							});
						},
						complete() {
							uni.hideLoading();
						}
					})
				}
export default {
	fetchData
}