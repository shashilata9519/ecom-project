import { Type } from "../Action/userAction";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case Type.USER_LOGIN_REQUEST:
      return { loading: true, isAuthenticated: false };
    case Type.USER_LOGIN_SUCCESS:
      // console.log(action.payload,'from reducer')
      return { loading: false, user: action.payload, isAuthenticated: true };
    case Type.USER_LOGIN_FAIL:
      return { loading: false, error: action.payload, isAuthenticated: false };
    case Type.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case Type.USER_REGISTER_REQUEST:
      return { loading: true, isAuthenticated: false };
    case Type.USER_REGISTER_SUCCESS:
      return { loading: false, user: action.payload, isAuthenticated: true };
    case Type.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload, isAuthenticated: false };

    default:
      return state;
  }
};
export const userProfileReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case Type.USER_PROFILE_REQUEST:
      return { loading: true, isAuthenticated: false };
    case Type.USER_PROFILE_SUCCESS:
      return { loading: false, user: action.payload, isAuthenticated: true };
    case Type.USER_PROFILE_FAIL:
      return { loading: false, error: action.payload, isAuthenticated: false };
    case Type.USER_PROFILE_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case Type.USER_UPDATE_PROFILE_REQUEST:
      return { loading: true};
    case Type.USER_REGISTER_SUCCESS:
      // console.log(action.payload,'from reducer')
      return { loading: false, user: action.payload};
    case Type.USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload};
   
    default:
      return state;
  }
};