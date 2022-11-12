import { Type } from "../Action/productAction";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case Type.PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case Type.PRODUCT_LIST_SUCCESS:
      //   console.log(action.payload,'from reducer')
      return { loading: false, products: action.payload.products };
    case Type.PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productDetailReducer = (state = { products: {} }, action) => {
  switch (action.type) {
    case Type.PRODUCT_DETAIL_REQUEST:
      return { ...state, loading: true };
    case Type.PRODUCT_DETAIL_SUCCESS:
      //   console.log(action.payload,'from reducer')
      return { loading: false, products: action.payload };
    case Type.PRODUCT_DETAIL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case Type.PRODUCT_CREATE_REVIEW_REQUEST:
      return { ...state, loading: true };
    case Type.PRODUCT_CREATE_REVIEW_SUCCESS:
      //   console.log(action.payload,'from reducer')
      return { loading: false, success: true };
    case Type.PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
