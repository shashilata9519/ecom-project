import axios from "axios";
import { toast } from "react-toastify";

///action creator
export const Type = {
  USER_LOGIN_REQUEST: "user_login_request",
  USER_LOGIN_SUCCESS: "user_login_success",
  USER_LOGIN_FAIL: "user_login_fail",
  USER_LOGOUT: "user_logout",

  USER_REGISTER_REQUEST: "user_register_request",
  USER_REGISTER_SUCCESS: "user_register_success",
  USER_REGISTER_FAIL: "user_register_fail",

  USER_PROFILE_REQUEST: "user_profile_request",
  USER_PROFILE_SUCCESS: "user_profile_success",
  USER_PROFILE_FAIL: "user_profile_fail",
  USER_PROFILE_RESET: "user_profile_reset",

  USER_UPDATE_PROFILE_REQUEST:"user_update_profile_request",
  USER_UPDATE_PROFILE_SUCCESS:"user_update_profile_success",
  USER_UPDATE_PROFILE_FAIL:"user_update_profile_fail"

};
///login action
export const login =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      // console.log(email,password,'emailpassword')
      dispatch({ type: Type.USER_LOGIN_REQUEST });
      await axios
        .post("http://localhost:8000/api/customer/login", {
          email: email,
          password: password,
        })
        .then((res) => {
          dispatch({ type: Type.USER_LOGIN_SUCCESS, payload: res.data });
          // console.log(res.data,'response')
          localStorage.setItem("user", JSON.stringify(res.data));
          toast.success("login successfully")
        });
    } catch (error) {
      // console.log(error);
      dispatch({ type: Type.USER_LOGIN_FAIL, payload: error });
    }
  };

///logout action

export const logout = () => (dispatch) => {
  localStorage.removeItem("user");
  localStorage.removeItem("cartItem");
  dispatch({ type: Type.USER_LOGOUT });
  document.location.href = "/login";
};

///register action

export const signup = (data) => async (dispatch) => {
  // console.log(data)
  try {
    dispatch({ type: Type.USER_REGISTER_REQUEST });
    await axios
      .post("http://localhost:8000/api/customer/register", {
        name: data.fullName,
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        // console.log(res.data);
        dispatch({ type: Type.USER_REGISTER_SUCCESS, payload: res.data });
        dispatch({ type: Type.USER_LOGIN_SUCCESS, payload: res.data });
        localStorage.setItem("user", JSON.stringify(res.data));
        toast.success("Register successfully")
      });
  } catch (error) {
    dispatch({ type: Type.USER_REGISTER_FAIL, payload: error });
  }
};


export const getUserProfile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: Type.USER_PROFILE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: getState().userLogin.user.token,
      },
    };
    const { data } = await axios.get(
      "http://localhost:8000/api/customer/profile",
      config
    );
    // console.log(data,'profile k console')
    dispatch({ type: Type.USER_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: Type.USER_PROFILE_FAILL, payload: error });
  }
};


export const registerWithGoogle = (response) => async (dispatch) => {
  try {
    dispatch({ type: Type.USER_REGISTER_REQUEST });
    await axios
      .post("http://localhost:8000/api/customer/googleregister", {
        credential: response.credential,
      })
      .then((res) => {
        dispatch({ type: Type.USER_REGISTER_SUCCESS, payload: res.data });
        dispatch({ type: Type.USER_LOGIN_SUCCESS, payload: res.data });
        localStorage.setItem("user", JSON.stringify(res.data));
        toast.success("Register successfully")
      });
  } catch (error) {
    // console.log(error, "error");
    dispatch({ type: Type.USER_REGISTER_FAIL, payload: error });
  }
};

export const loginWithGoogle = (response) => async (dispatch) => {
  try {
    dispatch({ type: Type.USER_LOGIN_REQUEST });
    await axios
      .post("http://localhost:8000/api/customer/googlelogin", {
        credential: response.credential,
      })
      .then((res) => {
        dispatch({ type: Type.USER_LOGIN_SUCCESS, payload: res.data });
        // console.log(res.data,'response')
        localStorage.setItem("user", JSON.stringify(res.data));
        toast.success("login successfully")
      });
  } catch (error) {
    // console.log(error, "error");

    dispatch({ type: Type.USER_LOGIN_FAIL, payload: error });
  }
};

export const updateUserProfile=(response)=>async(dispatch,getState)=>{
    try {
      dispatch({type:Type.USER_UPDATE_PROFILE_REQUEST})
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: getState().userLogin.user.token,
        },
      };
      const { data } = await axios.put(
        "http://localhost:8000/api/customer/profile",response,
        config
      );
      dispatch({type:Type.USER_UPDATE_PROFILE_SUCCESS,payload:data})
      dispatch({type:Type.USER_LOGIN_SUCCESS,payload:data})
      localStorage.setItem("user", JSON.stringify(data));
      toast('Profile updated');
      // console.log(data,'update')
      
    } catch (error) {
      dispatch({ type: Type.USER_UPDATE_PROFILE_FAIL, payload: error })
    }
}

// function myApp({ist:hjhghj,hghg})
 // class genric 
