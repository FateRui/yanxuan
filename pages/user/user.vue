<template>
	<view class="content">
		<button @click="login" open-type="getUserInfo">登陆</button>
	</view>
</template>

<script>
import Auth from '../../util/Auth.js'
import Api from '../../api/api.js'
import Fetch from '../../util/fetch.js'
export default {
	methods:{
		login(){
			Auth.loginWithInfo()
			.then((res)=>{
				uni.request({
					url: Api.AuthLoginByWeixin,
					method: "POST",
					data: {
						code: res.token,
						userInfo: {}
					},
					success(res) {
						console.log(res);
					}
				})
			});
		}
	}
}
</script>

<style scoped lang="less">

</style>
