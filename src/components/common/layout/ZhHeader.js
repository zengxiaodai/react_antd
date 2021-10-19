import React from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined,LogoutOutlined } from '@ant-design/icons'
import { useDispatch ,useSelector} from 'react-redux'

import { logoutSubmit } from '@/store/actions'
import {
	Row,
	Col
} from 'antd'

const Hearder=props=>{
	//用户信息
	const userinfo = useSelector(store=>store.user.userinfo)
	// console.log("头部",userinfo)
	let { collapse, onToggle } = props
	const dispatch = useDispatch()
	const logout = () => {
		dispatch(logoutSubmit())
	}
	return(
		<div className='qf-header'>
			<Row>
				<Col span={1}>
					{
						collapse
						? < MenuUnfoldOutlined onClick={()=>onToggle(false)} />
						: <MenuFoldOutlined onClick={()=>onToggle(true)} />
					}
				</Col>
				<Col span={1} offset={21}>
					<div className='user-logo'>
						<img src={userinfo.avatar}/>
					</div>
				</Col>
				<Col span={1}>
					
					<LogoutOutlined onClick={logout}  className='clearLogin'/>
				</Col>
			</Row>
		</div>
	)
}
export default Hearder