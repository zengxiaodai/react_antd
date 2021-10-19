import React from 'react'
// import { Layout, Menu } from 'antd';

import {
	Route,
	NavLink,
	Switch
} from 'react-router-dom'

import routes from '@/views'

// const { Header, Sider, Content } = Layout;

export default ()=> {

	// 作用：生成Route规则（路由规则）
	const renderRoutes = ()=> {
		return routes.map(ele=>(
			<Route
				key={ele.id}
				path={ele.path}
				component={ele.component}
			/>
		))
	}

	// 作用：生成声明式链接
	const renderNavLinks = ()=> {
		return routes.map(ele=>(
			<div className='nav' key={ele.id}>
				<NavLink to={ele.path}>{ele.text}</NavLink>
			</div>
		))
	}

	return(
		<div className='qf-layout'>
			<div>header</div>
			<div>{ renderNavLinks() }</div>
			<div>
				<Switch>
					{ renderRoutes() }
				</Switch>
			</div>
		</div>
	)
}
