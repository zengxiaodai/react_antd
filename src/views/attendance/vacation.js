import React from 'react'
import { Form, 
    Input, 
    Select, 
    Button,
    DatePicker
 } from 'antd';
 import {  CheckOutlined} from '@ant-design/icons'

 import moment from 'moment';
 import { useDispatch } from 'react-redux'
 import { addVacation } from '@/store/actions'


 const { RangePicker } = DatePicker;


 
  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  function approverChange(value) {
    console.log(`selected ${value}`);
  }
  function departmentChange(value) {
    console.log(`selected ${value}`);
  }

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
  };
  const { Option } = Select;


export default()=>{

    // 表单上各种api操作
	// const [form] = Form.useForm()

	const dispatch = useDispatch()

    function onChange(dates) {
        console.log('From: ', dates);
      }


        const onFinish = (values) => {
            const time=((+values.vacation_time[1]._d)-(+values.vacation_time[0]._d))
            values.vacation_time[0]=moment(values.vacation_time[0]).format('YYY-MM-DD HH:mm:ss')
            values.vacation_time[1]=moment(values.vacation_time[1]).format('YYY-MM-DD HH:mm:ss')
            const hour=Math.floor(time/60/60/1000)
            values.duration=hour
            dispatch(addVacation(values))
            console.log("上传",values)
        };

    return(
        <div className='qf-vacation-info'>
            <h3>请假申请</h3>
            <Form {...layout} onFinish={onFinish}>
                <Form.Item label="姓名" name='username' >
                <Input/>
                </Form.Item>
                <Form.Item label="部门"name='department' >
                <Select onChange={departmentChange} allowClear>
                        <Option value="开发部">开发部</Option>
                        <Option value="后勤部">后勤部</Option>
                        <Option value="教学部">教学部</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="审批人" name='approver'>
                    <Select onChange={approverChange} allowClear>
                        <Option value="CTO">CTO</Option>
                        <Option value="CEO">CEO</Option>
                        <Option value="董事长">董事长</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="时间" name='vacation_time'>
                        <RangePicker
                            ranges={{
                                Today: [moment(), moment()],
                                'This Month': [moment().startOf('month'), moment().endOf('month')],
                            }}
                            showTime
                            format="YYYY/MM/DD HH:mm:ss"
                            onChange={onChange}
                        />
                </Form.Item>
                {/* <Form.Item label="时长" name='duration'>
                </Form.Item> */}
                <Form.Item label="请假事由" name='vacationType'>
                    <Select onChange={handleChange}>
                        <Option value="婚嫁">婚嫁</Option>
                        <Option value="私事">私事</Option>
                        <Option value="法定节假日">法定节假日</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="备注" name='remarks'>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit" icon={<CheckOutlined />} >
                    提交
                    </Button>
                    {/* <Button htmlType="submit" icon={<UndoOutlined />} >
                    返回
                    </Button> */}
                </Form.Item>
                </Form>

        </div>
    )
}