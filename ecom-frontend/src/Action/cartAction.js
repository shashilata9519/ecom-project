import axios from "axios";

export const Type = {
  ADD_CART_ITEM: "add_cart_item",
  CLEAR_CART_ITEM: "clear_cart_item",
  ERROR_CART_ITEM: "error_cart_item",
  REMOVE_CART_ITEM: "remove_cart_item",
  INCREASE_QTY: "increase_qty",
  DECREASE_QTY: "decrease_qty",
};

export const addtocart = (id, qty) => async (dispatch, getState) => {
  //getState help to retrieve the current state from store
  // dispatch({type:Type.ADD_CART_ITEM})
  try {
    await axios.get(`http://localhost:8000/api/product/${id}`).then((res) => {
      // console.log(res.data, "from action");
      
      dispatch({ type: Type.ADD_CART_ITEM, payload: {...res.data, qty } });
      localStorage.setItem(
        "cartItem",
        JSON.stringify(getState().cart.cartItem)
      );
    });
  } catch (error) {
    dispatch({ type: Type.ERROR_CART_ITEM, payload: error });
  }
};

export const removeCartItem = (id) => async (dispatch, getState) => {
  // dispatch({type:Type.ADD_CART_ITEM})
  try {
    dispatch({ type: Type.REMOVE_CART_ITEM, payload: id });
    localStorage.setItem("cartItem", JSON.stringify(getState().cart.cartItem));
  } catch (error) {
    dispatch({ type: Type.ERROR_CART_ITEM, payload: error });
  }
};

export const increaseQty = (index) => async (dispatch, getState) => {
  dispatch({ type: Type.INCREASE_QTY, payload: index });
  localStorage.setItem("cartItem", JSON.stringify(getState().cart.cartItem));
};

export const decreaseQty = (index) => async (dispatch, getState) => {
  dispatch({ type: Type.DECREASE_QTY, payload: index });
  localStorage.setItem("cartItem", JSON.stringify(getState().cart.cartItem));
};
