import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
	getVacationList
} from '@/store/actions'
import{
    Table
}from 'antd'
import moment from 'moment';


export default()=>{
  const dispatch = useDispatch()
  const data = useSelector(store=>store.vacation.vacationList)
	console.log("数据",data)
// filter只用于查询
// const [filter, setFilter] = useState({

//   page: 1,
//   size: 2
// })


  useEffect(()=>{
		dispatch(getVacationList())
		return undefined
	}, [])

    const columns = [
        {
          title: '请假人',
          dataIndex: 'username',
        //   render: text => <a>{text}</a>,
          align: 'center'
        },
        {
          title: '部门',
          dataIndex: 'department',
          align: 'center'
        },
        {
          title: '请假类型',
          dataIndex: 'vacationType',
        //   key: 'address',
        align: 'center'
        },
        {
          title: '请假时间',
          dataIndex: 'vacation_time',
          align:'center'
        },
        {
          title: '时长',
          dataIndex: 'duration',
          align:'center'
        },
        {
            title: '创建时间',
            dataIndex: 'create_time',
            align:'center'
          },
          {
            title: '备注',
            dataIndex: 'remarks',
            align:'center'
          },
          {
            title: '审批人',
            dataIndex: 'approver',
            align:'center'
          },
          {
            title: '状态',
            dataIndex: 'status',
			  align: 'center',
			  render: status=>(status ? '已批准' : '待审核')
          },
          {
            title: '操作',
            dataIndex: '_id',
            align: 'center',
            render: id=>{
                return (
                    <div className='qf-vacationShow-row-handle'>
                        <a className='addapprover'>追加审批人</a>
                    </div>
                )
            }
        }

      ];
    return(
        <div className='qf-vacation-info'>
            <h3>请假日志</h3>
            <Table 
            rowKey={'_id'}
            columns={columns} 
            dataSource={data} 
            />
        </div>
    )
}