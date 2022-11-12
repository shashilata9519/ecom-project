import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { login, loginWithGoogle } from "../Action/userAction";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoogleLogin from "react-google-login";
import { loadScript, useScript } from "../utils/util";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  // console.log(userLogin);

  React.useEffect(() => {
    if (userLogin.user) {
      console.log("login successfully");
      navigate("/");
    }
  }, [userLogin.user, navigate]);

  const Submitdata = async (data) => {
    // e.preventDefault();
    console.log(login(data));
    dispatch(login(data));
  };
  React.useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id:
          "726011363239-7o93llcen2ebmvt542t3039v7b0va7tu.apps.googleusercontent.com",
        callback: (data) => dispatch(loginWithGoogle(data)),
      });
      window.google.accounts.id.renderButton(
        document.getElementById("loginDiv"),
        {
          theme: "filled_black",
          text: "signin_with",
          shape: "pill",
        }
      );
    }
  }, [dispatch]);

  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: 25 }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://cdn.dribbble.com/users/452635/screenshots/2809164/illu_sign_up.png"
                        className="img-fluid"
                        alt="Sample"
                      />
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Login
                      </p>
                      <form
                        className="mx-1 mx-md-4"
                        onSubmit={handleSubmit(Submitdata)}
                      >
                        <div className="d-flex flex-row align-items-center mb-4"></div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              id="form3Example3c"
                              className="form-control"
                              placeholder="Your Email"
                              {...register("email", { required: true })}
                            />
                            {errors.email && (
                              <p className="text-danger">
                                {" "}
                                * Email is required.
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="form3Example4c"
                              className="form-control"
                              placeholder="Password"
                              {...register("password", { required: true })}
                            />
                            {errors.password && (
                              <p className="text-danger">
                                * Password is required.
                              </p>
                            )}
                          </div>
                        </div>

                        <p className="small fw-bold  pt-1 mb-3">
                          Don't have an account?{" "}
                          <a href="/register" className="link-danger">
                            Register
                          </a>
                        </p>
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                          >
                            Login
                          </button>
                        </div>
                      </form>
                      <div id="loginDiv" data-text="signin_with"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer autoClose={2000} />
      </section>
    </div>
  );
}

export default Login;
