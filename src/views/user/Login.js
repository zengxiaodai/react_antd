import React ,{useEffect}from 'react'
import { useHistory } from 'react-router-dom'
import {useDispatch,useSelector}from 'react-redux'
import { Form, Input, Button, Checkbox } from 'antd'
import './style.less'
// 导入action中的向后端请求数据的方法
import { isLogin } from '@/store/actions'

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
}

const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 16,
  },
}


export default props=>{

	const history = useHistory()
	//获取redux中用户的数据
	const dispatch=useDispatch()
	const token=useSelector(store=>store.user.token)

  // 提交form的用户名和密码，判断用户是否登录成功
	const login = (values) => {
	// 1、用户在输入内容完成后，将form内容(dispatch)派发给Redux中的action
	dispatch(isLogin(values))

	}

	useEffect(()=>{
		if(token)history.replace('/dash')
		return undefined
	})

	return (
		<div className='qf-login'>
			<div className='wrap'>
				<Form
					{...layout}
					name="basic"
					initialValues={{
						remember: true
					}}
					onFinish={login}
				>
					<Form.Item
						label="用户名"
						name="username"
						rules={[
							{ required: true, message: '请填写用户名' }
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="密码"
						name="password"
						rules={[
							{ required: true, message: 'Please input your password!' }
						]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item {...tailLayout} name="remember" valuePropName="checked">
						<Checkbox>记住密码</Checkbox>
					</Form.Item>

					<Form.Item {...tailLayout}>
						<Button type="primary" htmlType="submit">
							登录
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	)
}
