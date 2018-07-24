/**
 * 登录或登出相关
 * */
import bs from '@/service/base'

let url="/account"

export default{
	/**
	 * 登录
	 * */
	login(username,password){
		return bs.http.body(url+'/login',{
			userName:username,
			password:password
		});
	},
	/**
	 * 刷新登录
	 * */
	refreshToken(username,token,refreshToken){
		return bs.http.post(url+"/refresh/token",{
			userName:username,
			token:token,
			refreshToken:refreshToken
		});
	}
}
