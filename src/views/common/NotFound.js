import React from 'react'
import {Link} from 'react-router-dom'
import './style.less'

export default ()=>{
	return (
		<div styleName="root error404">
		<div styleName="container">
			<div styleName="header">
				<h3>页面不存在</h3>
			</div>
			<p styleName="intro">
				跳转到<Link to="/"> 首页 </Link>
				{/* {history.length >= 2 ? <span>或者返回 <a onClick={this.handleGoBack}>上一步（{time}）</a></span> : null} */}
			</p>
		</div>
	</div>
	)
}
