
import React, {useEffect, useState} from 'react' 
import {useDispatch, useSelector} from 'react-redux'
import {Table,Input,Select, Modal, Button,Space } from 'antd';
import {Form} from 'react-bootstrap'
import swal from 'sweetalert'
import '../style/class.css'

export const Classes = () => {
    
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [addClassInputs , setaddClassInputs] = useState({name:'',fee_amount:''})
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const addClass =() => {
        console.log(addClassInputs)
    }

    const addClassForm =(
        <Form>
            <Form.Group >
                <Form.Label>Class Name</Form.Label>
                <Form.Control type="input"value={addClassInputs.name} onChange={(e)=>{setaddClassInputs({...addClassInputs, 'name': e.target.value})}} placeholder="Enter a Class Name" />
            </Form.Group>
            <Form.Group >
                <Form.Label>Fee Amount for class</Form.Label>
                <Form.Control type="input" value = {addClassInputs.fee_amount} onChange={(e)=>{setaddClassInputs({...addClassInputs, 'fee_amount': e.target.value})}} placeholder="Enter Fee amount" />
            </Form.Group>
            <Button type="primary" onClick={addClass}>
                Save
            </Button>
        </Form> 
    )
    
        

    return (<>
        <div className="navBarStyle">
            <div className ='flex-item'>
            <Button type ='primary' onClick = {showModal}>Add a class</Button>
            </div>
        </div>
            <Modal title="Basic Modal" visible={isModalVisible} onCancel={handleCancel} 
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    ]}
                >
                    <p>{addClassForm}</p>
            </Modal>
        </>
    )

}


    

