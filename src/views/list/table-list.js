import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './style.less'


import { 
	getArticleList
} from '@/store/actions'
import moment from 'moment'

import {
	Row,
	Col,
	Input,
	Table,
	Popover,
	Button
} from 'antd'

import {
	ColumnHeightOutlined,
	PlusOutlined
} from '@ant-design/icons'
import ArticleCateSelect from '@/views/common/ArticleCateSelect'



const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  })
}

export default (props)=> {
	// filter只用于查询
	const [filter, setFilter] = useState({
		text: '',
		cate: '',
		page: 1,
		size: 2
	})
	const [search, setSearch] = useState('')
	const [tableSize, setTableSize] = useState('default')

	const dispatch = useDispatch()
	const article = useSelector(store=>store.article.article)
	// const cates = useSelector(store=>store.article.cates)

	useEffect(()=>{
		dispatch(getArticleList(filter))
		return undefined
	}, [filter])


	// 受控表单
	const searchChange = val => {
		setSearch(val)
		if(val==='') filterChange(val, 'text')
	}

	// 当查询条件变化时，更新filter，进一步触副作用调接口
	const filterChange = (val,key) => {
		// 深复制
		const newFilter = {...filter}
		if(key==='pagination') {
			newFilter['page'] = val.page
			newFilter['size'] = val.size
		}else{
			newFilter[key] = val
		}
		setFilter(newFilter)
	}

	// 跳转到新增页面
	const skipToAdd = () => {
		props.history.push('/dash/article/info')
	}


	

	const customTableHeader = ()=> {
		const changeSize = e => {
			setTableSize(e.target.dataset.size)
		}
		return (
			<div className='qf-table-custom-header'>
				<Row>
					<Col span={2}>博客乐园</Col>
					<Col offset={16} span={3}>
						<Button
							type="primary"
							icon={<PlusOutlined />}
							size='small'
							onClick={()=>skipToAdd()}
						>
							新增
						</Button>
					</Col>
					<Col span={2}>
						<Popover
							placement="bottom"
							content={
								<div onClick={e=>changeSize(e)} style={{width:"120px"}}>
									<p data-size='default'>默认</p>
									<p data-size='middle'>中等</p>
									<p data-size='small'>紧凑</p>
								</div>
							}
							trigger="click"
						>
							<ColumnHeightOutlined />
						</Popover>
					</Col>
				</Row>
			</div>
		)
	}


	const columns = [
		{
		  title: '作者',
		  dataIndex: 'username',
			  align: 'center'
		},
		{
		  title: '缩略图',
		  dataIndex: 'img',
			  align: 'center',
			  render: img=>{
				  return (
					  <div className='qf-table-row-img'>
						  <img src={'http://localhost:8888'+img} />
					  </div>
				  )
			  }
		},
		{
		  title: '标题',
		  dataIndex: 'title',
			  align: 'center'
		},
		  {
		  title: '专区',
		  dataIndex: 'cate',
			align: 'center',
			render: cate=> (<div>{cate}</div> )
			
		},
		  {
		  title: '发布时间',
		  dataIndex: 'create_time',
			  align: 'center',
			  render: t => (moment(t).format('M月DD日'))
		},
		  {
			  title: '状态',
		  	  dataIndex: 'status',
			  align: 'center',
			  render: status=>(status ? '已发布' : '待审核')
		  },
		  {
			  title: '操作',
			  dataIndex: '_id',
			  align: 'center',
			  render: id=>{
				  return (
					  <div className='qf-table-row-handle'>
						  <a
							  className='edit'
							  onClick={()=>props.history.push('/dash/article/info?id='+id)}>编辑</a>
				<a className='del'>删除</a>
					  </div>
				  )
			  }
		  }
	  ]

	return (
		<div className='qf-article-list'>

			{/* 筛选面板 ===> */}
			<div className='qf-filter-wrap'>
				<Row align='middle'>
		      <Col span={2}>
						<span className='label'>搜索:</span>
					</Col>
					<Col span={4}>
						<Input
							allowClear
							placeholder="请输入文章关键字"
							value={search}
							onChange={e=>searchChange(e.target.value)}
							onPressEnter={e=>filterChange(e.target.value, 'text')}
						/>
					</Col>
					<Col span={2}>
						<span className='label'>类别:</span>
					</Col>
					<Col span={3}>
						<ArticleCateSelect
							value={filter.cate}
							onChange={val=>filterChange(val, 'cate')}
							allowClear
							showAll
						/>
					</Col>
		    </Row>
			</div>
			{/* 筛选面板 <=== */}

			{/* 表格面板 ==> */}
			<div className='qf-table-wrap' style={{paddingTop: 0}}>
				<Table
					rowSelection={{
						type: 'checkbox',
						...rowSelection
					}}
					rowKey={'_id'}
					columns={columns}
					dataSource={article.list || []}
					title={customTableHeader}
					size={tableSize}
					pagination={{
						total: article.total || 0,
						showSizeChanger: true,
						pageSizeOptions: [2,3,5,10],
						showTotal: (total, range) => (`第${range[0]}-${range[1]}条 / 总共${total} 条`),
						defaultPageSize: filter.size,
      					defaultCurrent: filter.page,
						current: filter.page,
						onChange: (page,size)=>filterChange({page,size},'pagination')
					}}
				/>
			</div>
			{/* 表格面板 <=== */}

		</div>
	)
}
