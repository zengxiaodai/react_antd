import React from 'react'
import loadable from "@loadable/component"
// IOCN
import {
	AppstoreOutlined
} from '@ant-design/icons'

const Home = loadable(()=>import('./home/home'))
const ShowList = loadable(()=>import('./list/table-list'))
const EditList = loadable(()=>import('./list/edit-table-list'))
const NotFound = loadable(()=>import('./common/NotFound'))


// 考勤管理
const Vacation=loadable(()=>import('./attendance/vacation'))
const VacationShow=loadable(()=>import('./attendance/vacationShow'))

// 无权限的路由
export const constRoutes = [
	{
		id: 1101,
		text: '404',
		hidden: true,
		path: '/404',
		component: NotFound
	}
]

const authorRoutes= [
	{
		id: 10,
		text: '主页',
		icon: <AppstoreOutlined />,
		permission: ['admin', 'shop'],
		children: [
			{
				id: 1001,
				text: '我的',
				path: '/home',
				component: Home,
				permission: ['admin']
			},
			{
				id: 1002,
				text: '表格展示',
				path: '/showlist',
				component: ShowList,
				permission: ['admin',"shop"]
			},
			{
				id: 1003,
				text: '编辑表格',
				path: '/editlist',
				component: EditList,
				permission: ['admin']
			}
		]
	},
	{
		id: 20,
		text: '考勤管理',
		icon: <AppstoreOutlined />,
		permission: ['admin', 'shop'],
		children: [
			{
				id: 2001,
				text: '请假记录',
				path: '/vacationList',
				component: VacationShow,
				permission: ['admin','shop']
			},
			{
				id: 2002,
				text: '请假申请',
				path: '/vacation',
				component: Vacation,
				permission: ['admin','shop']
			},
		]
	}
	
]
export default authorRoutes