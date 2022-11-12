import axios from "axios";
import {Type as _Type}  from "./cartAction";
export const Type={
    ORDER_CREATE_REQUEST:'order_create_request',
    ORDER_CREATE_SUCCESS: "order_create_success",
    ORDER_CREATE_FAIL: "order_create_fail",

    ORDER_LIST_REQUEST:'order_list_request',
    ORDER_LIST_SUCCESS: "order_list_success",
    ORDER_LIST_FAIL: "order_list_fail",
}

export const createOrder= (order) => async (dispatch,getState) =>{
try {
    dispatch({type:Type.ORDER_CREATE_REQUEST})
    const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: getState().userLogin.user.token,
        },
      };
     const {data}= await axios.post(`http://localhost:8000/api/order/addorder`,order, config);
      console.log(data)
      dispatch({type:Type.ORDER_CREATE_SUCCESS,payload:data})
      dispatch({type:_Type.CLEAR_CART_ITEM})
      localStorage.removeItem("cartItem")
    
} catch (error) {
    dispatch({type:Type.ORDER_CREATE_FAIL,payload:error})
}

}
export const listOrder=()=>async (dispatch,getState)=>{
    try {

        dispatch({type:Type.ORDER_LIST_REQUEST})
    const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: getState().userLogin.user.token,
        },
      };
     const {data}= await axios.get(`http://localhost:8000/api/order/getmyorder`, config);
    
      dispatch({type:Type.ORDER_LIST_SUCCESS,payload:data})
        
    } catch (error) {
        dispatch({type:Type.ORDER_LIST_FAIL,payload:error})
    }
    
}