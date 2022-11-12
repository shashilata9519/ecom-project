import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userProfileReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./Reducers/userReducer";
import {
  productDetailReducer,
  productListReducer,
  productReviewCreateReducer,
} from "./Reducers/productReducer";
import { cartReducer } from "./Reducers/cartReducer";
import { wishListReducer } from "./Reducers/wishlistReducer";
import { CreateListReducer, orderCreateReducer } from "./Reducers/orderReducer";
const Reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  wishlist: wishListReducer,
  productReview: productReviewCreateReducer,
  profile: userProfileReducer,
  order:orderCreateReducer,
  listOrder:CreateListReducer,
  userUpdateProfile:userUpdateProfileReducer
});

const useStorage = localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")): null;
// console.log(useStorage, "from store");

const cartitem = localStorage.getItem("cartItem")? JSON.parse(localStorage.getItem("cartItem")): [];
// console.log(cartitem, "from store");

const wishlistItem = localStorage.getItem("wishlistItem") ? JSON.parse(localStorage.getItem("wishlistItem")): [];

const initialState = {
  cart: {
    cartItem: cartitem,
  },
  userLogin: { user: useStorage },
  wishlist: { wishlistItem },
};
const middleware = [thunk];

const Store = createStore(
  Reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;
