import axios from "axios";

export const Type = {
  ADD_TO_WISHLIST: "add_to_wishlist",
  REMOVE_FROM_WISHLIST: "remove_from_wishlist",
};

export const addToWishlist = (id) => async (dispatch, getState) => {
  try {
    await axios.get(`http://localhost:8000/api/product/${id}`).then((res) => {
      console.log(res.data, "from action");
      dispatch({ type: Type.ADD_TO_WISHLIST, payload: res.data });
      localStorage.setItem(
        "wishlistItem",
        JSON.stringify(getState().wishlist.wishlistItem)
      );
    });
  } catch (error) {
    //   dispatch({ type: Type., payload: error });
  }
};

export const removeToWishlist = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: Type.REMOVE_FROM_WISHLIST, payload: id });
    localStorage.setItem(
      "wishlistItem",
      JSON.stringify(getState().wishlist.wishlistItem)
    );
  } catch (error) {
    //   dispatch({ type: Type., payload: error });
  }
};
