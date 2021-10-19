import React , {useState}from 'react'
import { Editor } from '@tinymce/tinymce-react';
import {  useDispatch } from 'react-redux'
import { writeArticle } from '@/store/actions'
import './style.less'
import {
	Input,
	Button,
	Form
} from 'antd'
import {UploadImage} from '@/components'

const itemLayout = {
	wrapperCol: {
	  span: 14,
	},
  };



export default ()=> {

	const [contents, setContents] = useState('')

	// 表单上各种api操作
	const [form] = Form.useForm()

	const dispatch = useDispatch()


	let rich = ''

	const handleEditorChange = (content, editor) => {
		rich = content
		console.log('Content was updated:', content);
	}





	// 提交
	const submit = (values) => {
		values.content = rich
		console.log('values', values)
		dispatch(writeArticle(values))
	}

	const getRich = (val) => {
		setContents(val)
	}




	return (
		<div className='qf-article-info'>
			<Form
				form={form}
				name="submit"
				onFinish={submit}
				initialValues={{
					cate: ''
				}}
				scrollToFirstError
			>
				<Form.Item
					{...itemLayout}
					name="title"
					label="文章标题"
					rules={[
						{ required: true, message: 'Please input your title!' }
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
						{...itemLayout}
						name='cate'
						label='文章类别'
						rules={[
							{ required: true, message: 'Please input your cate!' }
						]}

					>
					<Input/>
				</Form.Item>
				<Form.Item>
					<Editor
						apiKey='b6n4rrbejv853pshsx30z1s17molqwon95jpddagl5lyt2j5' 
						name='xxx'
						init={{
						
							height: 300,
							width:900,
							menubar: true,
							selector: "textarea", // change this value according to your HTML
							language: "zh_CN", // select language
							language_url: "https://cdn.jsdelivr.net/npm/tinymce-lang/langs/zh_CN.js" ,// site absolute URL
							cloudChannel:'5-stable',
							//图片上传
							image_title: true,
							automatic_uploads: true,
							file_picker_types: 'image',	
							// images_upload_url: '图片上传的路径',
							disabled:false,
							paste_data_images: true, // 允许粘贴图像
							//转成base64格式
							images_upload_handler: function (blobInfo, success, failure) {
								success("data:" + blobInfo.blob().type + ";base64," + blobInfo.base64());
							},
							plugins: [
								'advlist autolink lists link image charmap print preview anchor',
								'searchreplace visualblocks code fullscreen',
								'insertdatetime media table paste code help wordcount'
							],
							toolbar:
								['undo redo | fontselect fontsizeselect bold italic | forecolor backcolor | superscript subscript charmap insertdatetime emoticons| lists image media | numlist | preview code removeformat | alignleft aligncenter alignright alignjustify | bullist outdent indent'],
								fixed_toolbar_container: 'section[data-sidebar-text-controls] > div',
						}}
						onEditorChange={handleEditorChange}
						value={contents}
						onChange={e => getRich(e.target.value)}
					/>
			</Form.Item>
			
			{/* 文章缩略图 */}
			<Form.Item
				name='img'
				label='文章缩略图'
				{...itemLayout}
				style={{marginTop:'25px'}}
			>
				<UploadImage/>
			</Form.Item>
			<Form.Item
				wrapperCol={{offset:4}}
			>
				<Button
					style={{marginTop:'25px',width:"125px"}}
					htmlType="submit"
					type="primary"
				>
					新增文章
				</Button>
			</Form.Item>
			</Form>
		</div>
	)
}
