import { Type } from "../Action/wishlistAction";




export const wishListReducer = (state = { wishlistItem: [] }, action) => {
  switch (action.type) {
    case Type.ADD_TO_WISHLIST:
      const item = action.payload;
     return  { ...state, wishlistItem: [...state.wishlistItem, item] };
      

    case Type.REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlistItem: state.wishlistItem.filter(
          (x) => x._id !== action.payload
        ),
      };

    default:
      return state;
  }
};
