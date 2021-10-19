// action生成器的封装
import types from '../actionTypes'
import { 
	fetchLogin ,
	fetchUserInfo,
	fetchArticleWrite,
	fetchArticleList,
	fetchArticleCates,
	fetchVacation,
	fetchVacationList,
	
} from '@/utils/api'
import { fetchVacationlist } from '../../utils/api'

const changeMsg = payload => ({ type: types.MSG_CHANGE, payload })

// 在Redux中，dispatch是同步的，它负责向Store中派发plain action object
// 用于支持异步action的生成器方法，必须 return一个function
const isLogin = data => {
	console.log('payload', data)
	return function(dispatch) {
		fetchLogin(data).then(res=>{
			console.log('登录', res)
			dispatch({
				type: types.POST_LOGIN,
				payload: res
			})
			localStorage.setItem('token',res.token)
		}).catch(()=>{
			dispatch({
				type: types.POST_LOGIN,
				payload: []
			})
		})
	}
}

//用户获取token之后,根据用户的token,去获取用户的权限
const getUserInfo = () => {
	return dispatch=>{
		fetchUserInfo({}).then(res=>{
			// console.log('用户信息', res)
			dispatch({
				type: types.GET_USERINFO,
				payload: res
			})
		}).catch(()=>{
			dispatch({
				type: types.GET_USERINFO,
				payload: []
			})
		})
	}
  }




  // 获取文章列表
const getArticleList = params => {
	return dispatch=>{
		fetchArticleList(params).then(res=>{
			// console.log('文章列表', res)
			dispatch({
				type: types.GET_ARTICLE,
				payload: res
			})
		}).catch(()=>{
			dispatch({
				type: types.GET_ARTICLE,
				payload: []
			})
		})
	}
}

// 文章新增与编辑
 const writeArticle = data => {
	return dispatch=>{
		fetchArticleWrite(data).then(()=>{
			console.log('文章新增/编辑成功')
			dispatch({
				type: types.WRITE_VACATION,
				payload: ''
			})
		})
	}
}

// 获取文章类目
const getArticleCates = params => {
	return dispatch=>{
		fetchArticleCates(params||{}).then(res=>{
			// console.log("类别",res)
			dispatch({
				type: types.GET_ARTICLE_CATES,
				payload: res.list
			})
		})
	}
}



//上传请假

const addVacation = data=>{
	return dispatch=>{
		fetchVacation(data).then(()=>{
			console.log('文章新增/编辑成功')
			dispatch({
				type: types.WRITE_ARTICLE_DONE,
				payload: ''
			})
		})
	}
}
//获取请假数据
const getVacationList= params => {
	return dispatch=>{
		fetchVacationList(params).then(res=>{
			dispatch({
				type: types.GET_VACATION_LIST,
				payload: res
			})
		})
	}
}


// 退出登录
 const logoutSubmit = payload => {
	localStorage.removeItem('token')
	window.location.href = '/#/login'
	// window.location.reload()
	return {
		type: types.LOGOUT_SUBMIT,
		payload: ''
	}
}

// // 获取文章详情
// const getArticle = params => {
// 	return dispatch=> {
// 		fetchArticle(params).then(res=>{
// 			dispatch({
// 				type: types.GET_ARTICLE_INFO,
// 				payload: res.info
// 			})
// 		})
// 	}
// }

export {
	changeMsg,
	isLogin,
	getUserInfo,
	getArticleList,
	writeArticle,
	getArticleCates,
	addVacation,
	getVacationList,
	logoutSubmit
	// getArticle
}
