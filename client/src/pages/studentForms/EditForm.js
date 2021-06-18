import React, { useState,useEffect } from "react";
import { Modal } from "antd";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import moment from 'moment';
import {useDispatch,useSelector} from 'react-redux'
import {editStudent} from '../../redux/actions/studentActions';
import swal from 'sweetalert'
import 'moment/locale/zh-cn';
import {
  Form,
  Input,
  Tooltip,
  Button,
  Alert,
  Select,
  Cascader,
  DatePicker,
  Space,
  InputNumber,
  TreeSelect,
  Switch,
} from "antd";
const { Option } = Select;
const modalStyle = {
    height: "90vh",
    backgroundColor: "#c5c5c5",
    paddingLeft: "60px",
};

function EditForm(props) {
    const {isError , errMsg} = useSelector(state => state.studentReducers)
const dispatch = useDispatch()
const [stdData, setStdData] = useState({student_id:'' ,name : '' , Father_name : '', address : '', class:'', contact:'',dob:''})
const onSave = async () => {
    const body = {
        Rollno : stdData.student_id,
        stdname: stdData.name,
        fathername: stdData.Father_name,
        address: stdData.address,
        dob: stdData.dob,
        class: stdData.class,
        ContactNo: stdData.contact
    };
    const res = await dispatch(editStudent(body))
    if(res===1){
        props.onClose()
        setStdData( {stdData :''});
        swal("Student Updated","","success");
    }
    
};
    useEffect(()=>{
        setStdData(props.data)
    },[props.data])

    return(
        <div>
            <Modal
                style={{ top: 10 }}
                visible={props.show}
                bodyStyle={modalStyle}
                width={"60%"}
                footer={[
                    <Button key="cancel" onClick={props.onClose}>
                    Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={onSave}>
                    Save
                    </Button>,
                    ]}
            >
                <Form>
                    <Row>
                        <Col span={12} offset={8}>
                            <h1>Editing Student Data </h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                        <Form.Item label="Roll NO">
                            <Input
                            placeholder="Roll No"
                            name="student_id"
                            value={stdData.student_id}
                            onChange={(e)=>{setStdData({...stdData, 'student_id': e.target.value})}}
                            type="number"
                            />
                        </Form.Item>
                        </Col>
                        <Col span={8}>
                        <Form.Item label="Name">
                            <Input
                            placeholder="Student Name"
                            value={stdData.name}
                            onChange={(e)=>{setStdData({...stdData, 'name': e.target.value})}}
                            />
                        </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                        <Form.Item label="Father Name">
                            <Input
                            placeholder="Father Name"
                            value={stdData.Father_name}
                            onChange={(e) => {setStdData({...stdData, 'Father_name': e.target.value})}}
                            />
                        </Form.Item>
                        </Col>
                        <Col span={8}>
                        <Form.Item label="Address">
                            <Input
                            placeholder="Address"
                            value={stdData.address}
                            onChange={(e) => {setStdData({...stdData, 'address': e.target.value})}}
                            />
                        </Form.Item>
                        </Col>
                        <Col span={8}>
                        <Form.Item label="Date of birth">
                            <Space direction="vertical">  
                            {/* DatePicker default Fun take 2 params */}
                            <DatePicker defaultValue={stdData.dob} onChange={(e, dateString)=>{setStdData({...stdData, 'dob':dateString})}}/>
                            </Space>
                            ,
                        </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={10}>
                        <Form.Item label="Class">
                            <Select
                            showSearch
                            style={{ width: 200 }}
                            defaultValue= {stdData.class}
                            placeholder="Select a Class"
                            optionFilterProp="children"
                            value={stdData.class}
                            onChange={(e) => {setStdData({...stdData, 'class': e})}}
                            filterOption={(input, option) =>
                                option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                            >
                            <Option name="Class" value="Nusre">
                                Nusre
                            </Option>
                            <Option name="Class" value="1st">
                                1st
                            </Option>
                            <Option name="Class" value="2nd">
                                2nd
                            </Option>
                            <Option name="Class" value="3rd">
                                3rd
                            </Option>
                            </Select>
                        </Form.Item>
                        </Col>

                        <Col span={8}>
                        <Form.Item label="Contact Number">
                            <Input
                            placeholder="Contact"
                            name="contact"
                            value={stdData.contact}
                            onChange={(e) => {setStdData({...stdData, 'contact': e.target.value})}}
                            />
                        </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>    
    )

}

export default EditForm;
