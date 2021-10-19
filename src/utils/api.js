import axios from './axios'

// 登录接口
const fetchLogin= data=> {
	return axios({
		url: '/user/login',
		method: 'POST',
		data
	})
}
// 用于获取用户的数据
const fetchUserInfo = params => axios({
	url: '/user/getUserInfo',
	method: 'GET',
	params
  })
// 文章新增与编辑
const fetchArticleWrite=data=>{
	return axios({
		url:"/article/write",
		method:'POST',
		data
	})
}
// 查询文章列表
const fetchArticleList=params=>axios({
	url:'/article/list',
	method:'GET',
	params
})

// 文章类目
const fetchArticleCates=params=>axios({
	url: '/article/cates',
	method: 'GET',
	params
})

//上传请假信息
const fetchVacation=data=>{
	return axios({
		url:"/vacation/vacation",
		method:'POST',
		data
	})
}
//上传请假信息
const fetchVacationList=params=>{
	return axios({
		url:"/vacation/vacationList",
		method:'get',
		params
	})
}

export {
	fetchLogin,
	fetchUserInfo,
	fetchArticleWrite,
	fetchArticleList,
	fetchArticleCates,
	fetchVacation,
	fetchVacationList
}