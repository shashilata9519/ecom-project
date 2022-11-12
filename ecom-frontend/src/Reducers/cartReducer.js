import { Type } from "../Action/cartAction";

export const cartReducer = (state = { cartItem: [] }, action) => {
  switch (action.type) {
    case Type.ADD_CART_ITEM:
      const item = action.payload;
      // console.log(item,'item')

      const existItem = state.cartItem.find((x) => x._id === item._id); //

      if (existItem) {
        return {
          ...state,
          cartItem: state.cartItem.map((x) =>
            x._id === existItem._id ? item : x
          ),
        };
      } else {
        return { ...state, cartItem: [...state.cartItem, item] };
      }
    case Type.REMOVE_CART_ITEM:
      return {
        ...state,
        cartItem: state.cartItem.filter((x) => x._id !== action.payload),
      };
    case Type.CLEAR_CART_ITEM:
      return { ...state, cartItem: [] };

    case Type.INCREASE_QTY:
      state.cartItem[action.payload].qty++;
/*
const index=3
cartItem=[{qty:0},{qty:2},{qty:2},{qty:3}]
cartItem[index].qty++  ///

*/
      return {
        ...state,
      };
    case Type.DECREASE_QTY:
      const quantity = state.cartItem[action.payload].qty;
      if (quantity > 1) {
        state.cartItem[action.payload].qty--;
      }
      return {
        ...state,
      };

    default:
      return state;
  }
};
