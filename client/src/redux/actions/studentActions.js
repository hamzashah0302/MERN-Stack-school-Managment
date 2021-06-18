/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
import axios from 'axios';

import { GET_STUDENT } from './const';

export const GET_LOADING = 'GET_LOADING';
export const  GET_FAILED = 'GET_FAILED';

export const getStudents = (params,body, cbSuccess) => {
  const url = '/student';
  // do reseacrh on this 
  return async (dispatch) => {
    dispatch(searchLoading());
    try {
      const res = await axios.get(
        url,
      );
      if (res) {
        if (res.status === 200) {
          dispatch(searchSuccess(res.data));
          // nav.navigate('GoTo');
        } else {
          // Alert.alert(res.data?.data?.error || 'System Error');
          dispatch(searchFailed(res));
        }
      }
    } catch (err) {
      dispatch(searchFailed(err));
    }
  };
}

export const addStudent = (body )=>{
  return async (dispatch)=>{
    dispatch(searchLoading());
    try {
      let response  = await axios.post("/student/saveSTD", body)
          if (response.data) { 
            console.log("check res from actions " , response)
            dispatch(getStudents())
            return 1
          }
            
    } catch (err) {
      console.log("Error In Registration catch : ", err);
      dispatch(searchFailed(err));
    }
    
  }
}

export const deleteStudent = (rollno )=>{
  return async(dispatch)=>{
    try {
      let res = await axios.post("/student/delete_std", {rollno})
      if(res.data){
          dispatch(getStudents())
          return 1
          // cbSuccess(res)
        }
    } catch (error) {
      dispatch(searchFailed(error))
    }
  }
}

export const editStudent = (body)=>{
  return async(dispatch) =>{
    try {
      const response = await axios.post("/student/update_std", body)
          if (response.data) {
            dispatch(getStudents())
              return 1
          }
        }
    catch (error) {
      dispatch(searchFailed(error))
    }
  }
}

const searchLoading = () => ({
  type: GET_LOADING,
});

const searchSuccess = (res) =>{ 
  return({
  type: GET_STUDENT,
  payload: res
  }
)};

const searchFailed = (err) => ({
  type: GET_FAILED,
  payload: err,
});