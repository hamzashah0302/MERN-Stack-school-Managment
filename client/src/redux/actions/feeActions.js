import axios from 'axios'
import {formatDate} from '../../helper/helper'

export const GET_FAILED ="GET_FAILED"
export const GET_FEE ="GET_FEE"
export const GET_LOADING ="GET_LOADING"

export const searchFee = (regNo)=>{
    return async (dispatch)=>{
        let res = await axios.post("/fee/find_fee" , {regNo})
        if(res.status==200){
            res.data.forEach(e => {
                e.date = formatDate(e.date)
            });
            dispatch(searchSuccess(res.data))
            return 1
        }
        else{
            console.log("error in fee search : ", res)
            dispatch(searchFailed("No Fee Data Found"))
        }
    }
}

export const addFee = (body)=>{
    return async (dispatch)=>{
        let data = body
        let res = await axios.post("/fee/add_fee" , data)
        if(res.status==200){
            dispatch(searchFee(data.regNo))
            return 1
        }
        else{
            alert("Error in adding Fee")
        }
    }
}

export const deleteFee =(_id,regNo)=>{
    let body ={_id,regNo}
    return async (dispatch)=>{
        let res = await axios.post("/fee/delete_fee" , body)
        if(res.status==200){
            dispatch(searchFee(regNo))
            return 1
        }
        else{
            alert("Error in adding Fee")
        }
    }
}


const searchLoading = () => ({
    type: GET_LOADING,
});

const searchSuccess = (res) =>{ 
    return({
    type: GET_FEE,
    payload: res
    }
)};

const searchFailed = (err) => ({
    type: GET_FAILED,
    payload: err,
});

export const inputFee =(regNo)=>({
    type : "INPUT_FEE",
    payload : regNo
})