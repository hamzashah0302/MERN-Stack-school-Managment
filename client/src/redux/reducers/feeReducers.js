import Immutable from 'immutable';
import { Record } from 'immutable';
// import {initialState} from './studentReducers'

const State = {
    regNo : '',
    isLoading: false,
    isError: false,
    isSuccess: false,
    errMsg: null,
    fee: null
};
const initialState = State

function feeReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_LOADING":
            return {
            ...state,
            isLoading: true,
            isError: false,
            isSuccess: false,
            errMsg: null,
            };
        case "GET_FAILED":
            return {
            ...state,
            isLoading: false,
            isError: true,
            isSuccess: false,
            errMsg: action.payload,
            };
        case "GET_FEE":
            return {
            ...state,
            fee: action.payload,
            isLoggedIn: true,
            isLoading: false,
            isSuccess: true,
            isError: false,
            errMsg: null,
            };
        case "INPUT_FEE":
            return{
                ...state,
                regNo : action.payload
            }
        default: return state;
        }
}
export default feeReducer