import React, { useState } from "react";
import { Modal } from "antd";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import axios from "axios";
import {useDispatch} from 'react-redux'
import {addStudent} from '../../redux/actions/studentActions';
import {useSelector} from 'react-redux'
import swal from 'sweetalert'
import {
  Form,
  Input,
  Tooltip,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  Space,
  InputNumber,
  TreeSelect,
  Switch,
} from "antd";


const { Option } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const modalStyle = {
  height: "90vh",
  backgroundColor: "#c5c5c5",
  paddingLeft: "60px",
};
// const buttonStyle = { "border-radius": "8px" };

export const RegisterationForm = (props) => {
  const {students} = useSelector(state => state.studentReducers)
  const dispatch = useDispatch(); 
  // setting local states with hooks
  const [visible, setVisible] = useState(false);
  const [stdData, setStdData] = useState({
    student_id: "",
    name: "",
    fatherName: "",
    address: "",
    dob: "",
    Class: "",
    contact: "",
  });
  const handleInput = (value, key) => {
    setStdData({ ...stdData, [key]: value });
  };

  const onSubmit = async () => {
    const body = {
      Rollno: stdData.student_id,
      stdname: stdData.name,
      fathername: stdData.fatherName,
      address: stdData.address,
      dob: stdData.dob,
      class: stdData.Class,
      contactNo: stdData.contact,
    };
    const res =await dispatch(addStudent(body));
    if(res === 1){
      setVisible(false);
      setStdData( {stdData :'' });
      swal("Student Registered", "success","success" );
    }
    
  };

  // Setting State here, for Date and Select element cuz it dont have any other option in antd
  function handleDate(date, dateString) {
    setStdData({ ...stdData, dob: dateString });
  }
  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <div>
      <div className="bg-light py-3 float-left">
        <ul navbar-nav mr-auto>
          <ui nav-item>
            <Link
              className="p-1 nav-link"
              onClick={(e) => {
                setVisible(true);
              }}
            >
              Register Student
            </Link>
          </ui>
        </ul>
      </div>
      <Modal
        style={{ top: 10 }}
        visible={visible}
        bodyStyle={modalStyle}
        width={"60%"}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={onSubmit}>
            Submit
          </Button>,
        ]}
      >
        <Form>
          <Row>
            <Col span={12} offset={8}>
              <h1>Student Data</h1>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item label="Roll NO">
                <Input
                  placeholder="Roll No"
                  name="student_id"
                  value={stdData.student_id}
                  onChange={(e) => handleInput(e.target.value, "student_id")}
                  type="number"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Name">
                <Input
                  placeholder="Student Name"
                  value={stdData.name}
                  onChange={(e) => handleInput(e.target.value, "name")}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item label="Father Name">
                <Input
                  placeholder="Father Name"
                  value={stdData.fatherName}
                  onChange={(e) => handleInput(e.target.value, "fatherName")}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Address">
                <Input
                  placeholder="Address"
                  value={stdData.address}
                  onChange={(e) => handleInput(e.target.value, "address")}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Date of birth">
                <Space direction="vertical">
                  <DatePicker onChange={handleDate} />
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
                  placeholder="Select a Class"
                  optionFilterProp="children"
                  value={stdData.Class}
                  onChange={(e) => handleInput(e, "Class")}
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
                  onChange={(e) => handleInput(e.target.value, "contact")}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};


