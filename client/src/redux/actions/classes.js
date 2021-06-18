import axios from 'axios'

export const GET_FAILED ="GET_FAILED"
export const GET_FEE ="GET_ClASS"
export const GET_LOADING ="GET_LOADING"


export const addClass =(data)=>{
    let res = axios.post('/classes/add_class')
}