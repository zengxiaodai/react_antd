import React from 'react'
import { useSelector } from 'react-redux'

import { Route, Redirect, Switch } from 'react-router-dom'
import authorRoutes, { constRoutes } from '@/views'

const AuthorRoute = ({noMatch, permission, ...rest}) => {
	const userinfo = useSelector(store=>store.user.userinfo)
	return (
		permission.includes(userinfo.roles)
		? <Route {...rest} />
		: <Route {...rest} render={()=>noMatch} />
	)
}

const Content= ()=>{
	// 作用：生成Route规则（路由规则）
	const renderAuthorRoutes = ()=> {
		const res = []
		const recursion = arr => {
			arr.map(ele=>{
				res.push(
					<AuthorRoute
						key={ele.id}
						noMatch={<Redirect to='/dash/404' />}
						path={'/dash'+ele.path}
						permission={ele.permission||[]}
						component={ele.component}
						exact
					/>
				)
				ele.children && recursion(ele.children)
				return ele.children
			})
		}
		authorRoutes.map(ele=>(
			ele.children && recursion(ele.children)
		))
		return res
	}
	// 生成“没有权限”的路由规则
	const renderConstRoutes = ()=> {
		return constRoutes.map(ele=>(
			<Route
				path={'/dash'+ele.path}
				key={ele.id}
				component={ele.component}
				exact
			/>
		))
	}

	return(
		<div className='qf-content'>
			<Switch>
				{renderAuthorRoutes()}
				{renderConstRoutes()}
				<Redirect from='/*' to='/dash/showlist' />
			</Switch>
		</div>
	)
}

export default Content