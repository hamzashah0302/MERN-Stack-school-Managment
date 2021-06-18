import React, {useEffect, useState} from 'react' 
import {useDispatch, useSelector} from 'react-redux'
import {Table,Input,Select,DatePicker, Modal, Button,Space } from 'antd';
import {searchFee , inputFee , addFee,deleteFee} from '../redux/actions/feeActions';
import { Collapse } from 'antd';
import {Form} from 'react-bootstrap'
import '../style/fee.css'
import swal from 'sweetalert'
import moment from 'moment';


const { Column, ColumnGroup } = Table;
const { Option } = Select;
var currentRegNo ='';


export const Fee = () => {

var today = new Date();
var currentDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [paidingFee, setPaidingFee] = useState({regNo :'',amount:'', date:''})
    const {fee,isLoading, regNo} = useSelector(state => state.feeReducers)
    const dispatch = useDispatch()
    useEffect(() => {}, [])

    var columns = [
        {
            title: 'Paid amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Paid date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Fee_id',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title:"Action",
            key: "action",
            render : (text, record) => (
            <Space size="middle">
                <a onClick={()=>handFeeDelete(record._id)}>Delete</a>
            </Space>
            )
        }
    ];

    const handFeeDelete= async(_id)=>{
        let res = await dispatch(deleteFee(_id,currentRegNo))
        {res==1?(
            swal("Fee Deleted ", { icon: "success" }))
            :(swal("Error in Fee data deletion ", { icon: "error" }))
        }
    }
    const search_Fee= async ()=>{
        let res = await dispatch(searchFee(regNo))
        currentRegNo = regNo;
    }
    const add_Fee = async()=>{
        let body = paidingFee
        let res = await dispatch(addFee(body))
        if(res==1){
            setPaidingFee({paidingFee:''})
            handleCancel()

        }
    }
    function handleDate(date, dateString) {
        setPaidingFee({...paidingFee, 'date': dateString})
    }
    const showModal = () => {
        setIsModalVisible(true);
    };
    
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const feeForm = ( 
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Reg.No</Form.Label>
                <Form.Control type="input" value= {setPaidingFee.regNo} placeholder="Reg No" onChange={(e)=>{setPaidingFee({...paidingFee, 'regNo': e.target.value})}} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Amount</Form.Label>
                <Form.Control type="input" value ={paidingFee.amount} placeholder="Amount" onChange={(e)=>{setPaidingFee({...paidingFee, 'amount': e.target.value})}} />
            </Form.Group>
            <Form.Group className="mb-3">
                <DatePicker defaultValue={moment(currentDate, 'YYYY-MM-DD')} onChange={handleDate} />
                {/* <DatePicker allowClear=false onChange={handleDate}/> */}  
            </Form.Group>
            <Form.Group className="classRight">
                <Button key="submit" type="primary" onClick={()=>{add_Fee()}}>
                    Submit
                </Button>
            </Form.Group>
        </Form>
    );
    
    return (
        <>
    <div className="searchBarStyle">
        <div className="searchBarFeeBtn">
        <Button type="primary" onClick={showModal}>
            Add Fee
        </Button>
        <Modal title="Basic Modal" visible={isModalVisible} onCancel={handleCancel} 
        footer={[
            <Button key="back" onClick={handleCancel}>
                Cancel
            </Button>,
            ]}
        >
            <p>{feeForm}</p>
        </Modal>
        </div>
        <div>
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a Class"
                optionFilterProp="children"
            //   value={stdData.Class}
            //   onChange={(e) => handleInput(e, "Class")}
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
        </div>
        <div className="flex-item">
            <Input
                placeholder="Reg no"
                name="regNo"
                value={regNo}
                onChange = {(e)=>{dispatch(inputFee(e.target.value))}}
                type="number"
            />
        </div>
        <div>
            <Button className="searchBtn" type="primary" onClick ={()=>{search_Fee()}}>Search</Button>
        </div>
    </div>
    
    <div className ="tableView">
    <Table dataSource={fee} columns={columns}/>
    </div>
    </>
    )
}




// Fee Form 

{/* <form className="form-inline" id= "fee_form">
            <div className="form-group m-5">
                <label for="Roll No">Roll No</label>
                <Input type="input" clasNames="form-control" placeholder="Roll No" id="RollNo"/>
            </div>
            <div className="form-group m-3">
                <label for="amount">Amount:</label>
                <Input type="input" className="" placeholder="Fee amount"/>
            
            </div>
            <div className="form-group m-3">
            <Input type="date" id="date"/>
            </div>
            <Button type="button" onclick="{add_fee()}" className="primary">Add Fee</Button>
        </form> */}