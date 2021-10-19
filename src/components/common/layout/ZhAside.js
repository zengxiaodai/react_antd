import React, { useState } from 'react'
import { useSelector } from 'react-redux'


import { NavLink, useHistory } from 'react-router-dom'
import routes from '@/views'
import { config } from '@/hoc'



import { Menu } from 'antd'
const { SubMenu } = Menu


export default ()=> {
	const [current, setCurrent] = useState(1)
	const userinfo = useSelector(store=>store.user.userinfo)
	// console.log(userinfo);


	// let { collapse, onToggle } = props
	// 作用：生成声明式链接
	const renderNavLinks = ()=> {
		const res = []
		routes.map(ele=>{
			// 处理一级菜单的权限管理
			if(ele.permission.includes(userinfo.roles)) {
				res.push(<SubMenu key={ele.id} title={ele.text} icon={ele.icon}>
					{
						ele.children && ele.children.map(ele=>(
							(!ele.hidden && ele.permission.includes(userinfo.roles))
							&& <Menu.Item key={ele.id}>
								<NavLink
									to={'/dash'+ele.path}
								>
									{ele.text}
								</NavLink>
							</Menu.Item>
						))
					}
				</SubMenu>)
			}
			return ele.id
		})
		return res
	}

	return(
		<div className='qf-aside'>
			<Logo {...userinfo}/>
			<Menu
				onClick={e=>setCurrent(e.key)}
				defaultOpenKeys={['sub1']}
				selectedKeys={[current]}
				mode="inline"
				theme={'dark'}
			>
				{ userinfo.roles && renderNavLinks() }
			</Menu>
		</div>
	)
}


const Logo = config(props=>{
	const h = useHistory()
	// console.log("props",props)
	return (
		<div className="qf-logo">
			<img
				src={props.img.logo}
				// src={props.avatar}
				alt="logo"
				onClick={()=>h.replace('/dash')}
			/>
			{/* {props.name} */}
		</div>
	)
})

