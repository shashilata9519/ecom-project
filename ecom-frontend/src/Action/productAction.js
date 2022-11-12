import axios from "axios";

export const Type = {
  PRODUCT_LIST_REQUEST: "product_list_request",
  PRODUCT_LIST_SUCCESS: "product_list_success",
  PRODUCT_LIST_FAIL: "product_list_fail",
  PRODUCT_DETAIL_REQUEST: "product_detail_request",
  PRODUCT_DETAIL_SUCCESS: "product_detail_success",
  PRODUCT_DETAIL_FAIL: "product_detail_fail",
  PRODUCT_CREATE_REVIEW_REQUEST: "product_create_review_request",
  PRODUCT_CREATE_REVIEW_SUCCESS: "product_create_review_success",
  PRODUCT_CREATE_REVIEW_FAIL: "product_create_review_fail",
};

/*
-->showProduct 
   -keyword search, ->done
   -price search, -> done
   -page,
   -category
   http://localhost:8000/api/product/showproduct?name="vijay"&lastname="gupta"
*/


export const productList =
  (keyword = "", categories,price=[0,50000],currentPage=1) =>
  async (dispatch) => {
    dispatch({ type: Type.PRODUCT_LIST_REQUEST });
    try {
    
      let url = `http://localhost:8000/api/product/showproduct?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&page=${currentPage}`;
      if (categories) {
        url = `http://localhost:8000/api/product/showproduct?keyword=${keyword}&category=${categories}&price[gte]=${price[0]}&price[lte]=${price[1]}&page=${currentPage}`;
      }
      await axios.get(url).then((res) => {
        // console.log(res.data);
        dispatch({
          type: Type.PRODUCT_LIST_SUCCESS,
          payload: { products: res.data },
        });
      });
    } catch (error) {
      dispatch({ type: Type.PRODUCT_LIST_FAIL, payload: error });
    }
  };

export const productDetail = (id) => async (dispatch) => {
  dispatch({ type: Type.PRODUCT_DETAIL_REQUEST });
  try {
    await axios.get(`http://localhost:8000/api/product/${id}`).then((res) => {
      // console.log(res.data, "from action");
      dispatch({ type: Type.PRODUCT_DETAIL_SUCCESS, payload: res.data });
    });
  } catch (error) {
    dispatch({ type: Type.PRODUCT_DETAIL_FAIL, payload: error });
  }
};

export const createProductReview = (data) => async (dispatch, getState) => {
  dispatch({ type: Type.PRODUCT_CREATE_REVIEW_REQUEST });

  try {
    // console.log(,"from action");
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: getState().userLogin.user.token,
      },
    };

    await axios.post(`http://localhost:8000/api/product/review`, data, config);
    dispatch({ type: Type.PRODUCT_CREATE_REVIEW_SUCCESS });
  } catch (error) {
    dispatch({ type: Type.PRODUCT_CREATE_REVIEW_FAIL, payload: error });
  }
};
