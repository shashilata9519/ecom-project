import { Type } from "../Action/orderAction";

export const orderCreateReducer = (state ={}, action) => {
    switch (action.type) {
      case Type.ORDER_CREATE_REQUEST:
        return { loading: true};
      case Type.ORDER_CREATE_SUCCESS:
        // console.log(action.payload,'from reducer')
        return { loading: false,success:true, order: action.payload};
      case Type.ORDER_CREATE_FAIL:
        return { loading: false, error: action.payload};
     
      default:
        return state;
    }
  };
  export const CreateListReducer = (state ={order:[]}, action) => {
    switch (action.type) {
      case Type.ORDER_LIST_REQUEST:
        return { loading: true};
      case Type.ORDER_LIST_SUCCESS:
        // console.log(action.payload,'from reducer')
        return { loading: false, order: action.payload};
      case Type.ORDER_LIST_FAIL:
        return { loading: false, error: action.payload};
     
      default:
        return state;
    }
  };