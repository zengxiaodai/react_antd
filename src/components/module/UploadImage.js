import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Upload } from 'antd'
import ImgCrop from 'antd-img-crop';

const UploadImage= props => {
	let { onChange } = props
	const [list, setList] = useState([])
	// 图片上传
	const imgChange = ({file, fileList}) => {
		// console.log('图片上传 file', file)
		// console.log('图片上传 fileList', fileList)
		setList(fileList)
		// 当图片上传成功时，把图片的访问地址返回给父组件
		if(file.status==='done') {
			if(file.response.err===0) {
				onChange && onChange(file.response.data.img)
			}else{
				console.log('ajax成功，业务失败')
			}
		}
	}
    const onPreview = async file => {
		let src = file.url;
        console.log("图片路由",src)
		if (!src) {
		  src = await new Promise(resolve => {
			const reader = new FileReader();
			reader.readAsDataURL(file.originFileObj);
			reader.onload = () => resolve(reader.result);
		  });
		}
		const image = new Image();
		image.src = src;
		const imgWindow = window.open(src);
		imgWindow.document.write(image.outerHTML);
	  };
	return (
		<div className="qf-upload-image">
			<ImgCrop rotate>
					<Upload
                    name='xxx'
						action="http://localhost:5000/api/v1/upload/img"
						listType="picture-card"//展示样式
						fileList={list}
						onChange={imgChange}
						onPreview={onPreview}
                        maxCount={1}
					>
						{list.length < 5 && '+ Upload'}
					</Upload>
				</ImgCrop>
		</div>
	)
}

UploadImage.propTypes = {
	// 这个属性，是 Form.Item 默认给的属性
	value: PropTypes.string,
	onChange: PropTypes.func
}

export default UploadImage