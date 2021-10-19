import React,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'

import { Layout } from 'antd'
import './style.css'

import { getUserInfo } from '@/store/actions'


import ZhAside from './ZhAside'
import ZhContent from './ZhContent'
import ZhHeader from './ZhHeader'

const { Header, Sider, Content } = Layout


export default ()=>{
	const [ collapse, setCollapse ] = useState(false)
	
	const dispatch=useDispatch()
	useEffect(()=>{
		dispatch(getUserInfo())
		return undefined
	},[])

	return(
		<div className='qf-layout'>
			<Layout>

				<Sider width={180} collapsed={collapse}>
					<ZhAside collapse={collapse} onToggle={e=>setCollapse(e)} />

				</Sider>
				<Layout>
					<Header>
						<ZhHeader collapse={collapse} onToggle={e=>setCollapse(e)}/>
					</Header>
					<Content>
						<ZhContent />
					</Content>
				</Layout>
			</Layout>
		</div>
	)
}



