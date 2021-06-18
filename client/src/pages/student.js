import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { RegisterationForm } from "./studentForms/RegisterationForm";
import { Table, Tag, Space ,Spin, Alert } from "antd";
import axios from "axios";
import { useHistory } from "react-router-dom";
import EditForm from "./studentForms/EditForm";
import swal from 'sweetalert'
import {useDispatch} from 'react-redux'
import {deleteStudent, getStudents} from '../redux/actions/studentActions';
import {useSelector} from 'react-redux';  


const { Column, ColumnGroup } = Table;

// Setting styles
const h1Sytle ={
      "color": "white",
      "background-color": "#98a39a",
      "text-align" : "center",
      "padding" : "13px"
}
const styleBtn = {
  height: "35px",
};

// handling  Functions 


  const Student = () => {
  const [editModalShow , setEditModalShow] = useState(false)
  const dispatch = useDispatch();
  const { isLoading, students } = useSelector(
    (state) => state.studentReducers
  );
  // const student = useSelector(state=> state.app.students)
  const [stds , setStds] = useState([{
    student_id:'' ,name : '' , Father_name : '', address : '', class:'', contact:'',dob:''}])
  
    const [editStd, SetEditStd] = useState({student_id:'' ,name : '' , Father_name : '', address : '', class:'', contact:'',dob:''})
  
  const handleStudentDelete = (id, name)=>{
    swal({
      title: "Are you sure?",
      text: `To delete ${name} ID of : ${id}`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
          const cbSuccess =(res)=>{
            swal("Student Deleted ", {
            icon: "success" });}
          const rollno = id
          dispatch(deleteStudent(rollno,cbSuccess))
      } else {
        return
      }
    });
  }

  const handleEdit =(data)=>{
    setEditModalShow(true)
    SetEditStd(data)
  }
  const editModalClose = ()=>{
    setEditModalShow(!editModalShow)
  }
  // const getStudentsData = ()=>{
  //     axios.get('/student').then((res) => {
  //       let data =[]
  //       res.data.map(e => {
  //           data.push({ 'student_id':e.student_id,'name':e.name , 'Father_name':e.Father_name, 'address': e.address,'class': e.class ,'dob': e.dob, 'contact': e.contact })
  //         });
  //     setStds(data)})
  //       }
  // get Student Data from Data base 
  useEffect(() => {
    dispatch(getStudents())
  }, [])
  return (
      <div>
        <RegisterationForm/>
        <h1 style={h1Sytle} className="text-align-center">Students List</h1>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
            {isLoading == false ? (
              <Table dataSource={students}>
                <ColumnGroup>
                  <Column title="Reg.no" dataIndex="regNo" key= "regNo"/>
                  <Column title="Rollno" dataIndex="student_id" key= "student_id"/>
                  <Column title="Name" dataIndex="name" key="Name" />
                  <Column title="Father_name" dataIndex="Father_name" key="Father_name"/>
                  <Column title="Class" dataIndex="class" key="class" />
                  <Column title="Address" dataIndex="address" key="address" />
                  <Column title="Date of birth" dataIndex="dob" key="dob" />
                  <Column title="Contact No" dataIndex="contact" key="contact" />
                </ColumnGroup>
                <Column title="Action" key="action"  
                  render={(text, record) => (
                    <Space size="middle">
                      <a onClick={()=>handleEdit(record)}>Edit </a>
                      <a onClick={()=>handleStudentDelete(record.student_id, record.name)}>Delete</a>
                    </Space>
                  )}
                />
              </Table>
            ) : (
              <Spin tip="Loading...">
                <Alert
                  message="Please Wait"
                  description="Data are Loading in a while."
                  type="info"
                />
              </Spin>
        )}
              
              <EditForm show={editModalShow} onClose={editModalClose} data= {editStd}/>
            </div>
          </div>
        </div>
      </div>
      
  );
};

export default Student;

// <form className="form-inline">
//             <input className="form-control" type="search" placeholder="ID Search Student" aria-label="Search"/>
//             <button className="btn btn-outline-success" type="submit">Search</button>
//           </form>
