import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerWithGoogle, signup } from "../Action/userAction";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [verify, setVerify] = useState(false);
  const [otp, setOtp] = useState();
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);

  useEffect(() => {
    if (userRegister.user) navigate("/");
  }, [userRegister.user]);

  const Submitdata = async (data) => {
    // e.preventDefault();
    // console.log(data);

    dispatch(signup(data));
    // setVerify(true);
  };
  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id:
          "726011363239-7o93llcen2ebmvt542t3039v7b0va7tu.apps.googleusercontent.com",
        callback: (data) => dispatch(registerWithGoogle(data)),
      });
      window.google.accounts.id.renderButton(
        document.getElementById("signUpDiv"),
        {
          theme: "filled_black",
          text: "continue_with",
          shape: "pill",
        }
      );
    }
  }, [dispatch]);

  const verifyHandler = () => {
    alert(otp);
  };

  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: 25 }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        {verify ? "OTP" : "Sign up"}
                      </p>
                      <form
                        className="mx-1 mx-md-4"
                        onSubmit={
                          !verify ? handleSubmit(Submitdata) : verifyHandler
                        }
                      >
                        {!verify ? (
                          <div>
                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-user fa-lg me-3 fa-fw" />
                              <div className="form-outline flex-fill mb-0">
                                <input
                                  type="text"
                                  id="form3Example1c"
                                  className="form-control"
                                  placeholder=" Full Name"
                                  {...register("fullName", { required: true })}
                                />
                                {errors.fullName && (
                                  <p className="text-danger">
                                    {" "}
                                    * Full Name is required.
                                  </p>
                                )}
                              </div>
                            </div>
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
                              have an account?{" "}
                              <a href="/login" className="link-danger">
                                Login
                              </a>
                            </p>
                          </div>
                        ) : (
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="form3Example1c"
                              className="form-control"
                              placeholder=" Full Name"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                              // {...register("fullName", { required: true })}
                            />
                            {/* {errors.fullName && (
                              <p className="text-danger">
                                {" "}
                                * Full Name is required.
                              </p>
                            )} */}
                          </div>
                        )}

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                          >
                            {!verify ? " Register" : "Verify"}
                          </button>
                        </div>
                      </form>
                      <div id="signUpDiv" data-text="signup_with"></div>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://demotix.com/wp-content/uploads/2020/12/Incentivize-Existing-Customers-780x551.jpg"
                        className="img-fluid"
                        alt="Sample"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
