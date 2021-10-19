import React from 'react'
import img from '../utils/img'

// 作用：用于注入一些全局的配置或方法，比如图片模块、交互提示模块等。


const warp =WrapComponent => {
	return props=>(
		<WrapComponent
			{...props}
			img={img}
		/>
	)
}
export default warp