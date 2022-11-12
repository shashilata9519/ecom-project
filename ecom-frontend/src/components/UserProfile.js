import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { namespace } from "react-reveal/globals";
import { listOrder } from "../Action/orderAction";
import { getUserProfile, updateUserProfile } from "../Action/userAction";

function UserProfile() {
  const { user } = useSelector((state) => state.profile);
  console.log(user, "user");
  const { order, loading } = useSelector((state) => state.listOrder);
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  // console.log(order, "order");
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  // console.log(user, "user profile");
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ name: name, contact: contact }));
  };

  useEffect(() => {
    if (!user || !user?.name) {
      dispatch(getUserProfile());
      dispatch(listOrder());
      
    } else {
      setName(user.name);
    }
  }, [dispatch, user,userUpdateProfile.loading]);

  return (
    <>
      <section className="container my-5 ">
        <div className="d-flex align-items-start userProfile">
          <div
            className="nav flex-column nav-pills me-3 cardleft w-25 py-3"
            id="v-pills-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            <div className="card-body text-center">
              <img
                src="https://th.bing.com/th/id/R.c806589295b732b4d13a5b68bbb560a0?rik=iqhl0u4nOvsjkA&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_184513.png&ehk=SewvAmum19vsY7YXrHHH2ZPm%2bboA4S2ENK7Gypz6c3A%3d&risl=&pid=ImgRaw&r=0"
                alt="avatar"
                className="rounded-circle img-fluid"
                style={{ width: 100 }}
              />
            </div>

            <h6
              className="nav-link active"
              id="v-pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#v-pills-home"
              type="button"
              role="tab"
              aria-controls="v-pills-home"
              aria-selected="true"
            >
              Personal Information
            </h6>
            <h6
              className="nav-link"
              id="v-pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#v-pills-profile"
              type="button"
              role="tab"
              aria-controls="v-pills-profile"
              aria-selected="false"
            >
              Manage Addresses
            </h6>
            <h6
              className="nav-link"
              id="v-pills-messages-tab"
              data-bs-toggle="pill"
              data-bs-target="#v-pills-messages"
              type="button"
              role="tab"
              aria-controls="v-pills-messages"
              aria-selected="false"
            >
              My Orders
            </h6>
          </div>

          <div
            className="tab-content cardRight mt-2 w-75"
            id="v-pills-tabContent"
          >
            {/* personal details */}

            <div
              className="tab-pane fade show active"
              id="v-pills-home"
              role="tabpanel"
              aria-labelledby="v-pills-home-tab"
            >
              <h5 className="text-muted mb-5">Personal Information</h5>
              <form>
                <div className="row mb-4 ">
                  <label className="col-sm-2 col-form-label">Full Name :</label>
                  <div className="col">
                    <div className="form-outline">
                      <input
                        type="text"
                        id="form6Example1"
                        className="form-control"
                        placeholder="first Name"
                        value={name || user?.name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row mb-4 ">
                  <label className="col-sm-2 col-form-label">Email :</label>
                  <div className="col">
                    <div className="form-outline">
                      <input
                        type="email"
                        id="form6Example1"
                        className="form-control"
                        placeholder="Enter your email"
                        disabled={true}
                        value={user?.email}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-4 ">
                  <label className="col-sm-2 col-form-label">Contact :</label>
                  <div className="col">
                    <div className="form-outline">
                      <input
                        type="text"
                        id="form6Example1"
                        className="form-control"
                        placeholder="Enter your number"
                        value={contact || user?.contact}
                        onChange={(e) => setContact(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-4"
                  onClick={submitHandler}
                >
                  Save
                </button>
              </form>
            </div>

            {/* add address */}

            <div
              className="tab-pane fade"
              id="v-pills-profile"
              role="tabpanel"
              aria-labelledby="v-pills-profile-tab"
            >
              <section className="h-100 gradient-custom">
                <h5 className="text-muted mb-0">Manage Addresses</h5>
                <div className="py-5 h-100">
                  <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col">
                      <>
                        <div className="card-body p-4">
                          <div
                            className="card shadow-0 border mb-5 p-3"
                            data-bs-toggle="collapse"
                            href="#multiCollapseExample1"
                            role="button"
                            aria-expanded="false"
                            aria-controls="multiCollapseExample1"
                          >
                            <h6>+ ADD A NEW ADDRESS</h6>
                          </div>
                          <div className="col">
                            <div
                              className="collapse multi-collapse"
                              id="multiCollapseExample1"
                            >
                              <div className="card card-body">
                                <form className="row g-3">
                                  <div className="col-md-6">
                                    <label
                                      htmlFor="inputEmail4"
                                      className="form-label"
                                    >
                                      Email
                                    </label>
                                    <input
                                      type="email"
                                      className="form-control"
                                      id="inputEmail4"
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <label
                                      htmlFor="inputnumber"
                                      className="form-label"
                                    >
                                      Phone Number
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="inputnumber"
                                    />
                                  </div>
                                  <div className="col-12">
                                    <label
                                      htmlFor="inputAddress"
                                      className="form-label"
                                    >
                                      Address
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="inputAddress"
                                      placeholder="1234 Main St"
                                    />
                                  </div>

                                  <div className="col-md-6">
                                    <label
                                      htmlFor="inputCity"
                                      className="form-label"
                                    >
                                      City
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="inputCity"
                                    />
                                  </div>
                                  <div className="col-md-4">
                                    <label
                                      htmlFor="inputState"
                                      className="form-label"
                                    >
                                      State
                                    </label>
                                    <select
                                      id="inputState"
                                      className="form-select"
                                    >
                                      <option selected="">Choose...</option>
                                      <option>...</option>
                                    </select>
                                  </div>
                                  <div className="col-md-2">
                                    <label
                                      htmlFor="inputPincode"
                                      className="form-label"
                                    >
                                      Pincode
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="inputPincode"
                                    />
                                  </div>

                                  <div className="col-12">
                                    <button
                                      type="submit"
                                      className="btn btn-primary"
                                    >
                                      Save
                                    </button>
                                    <button
                                      className="btn btn-outline-primary ms-5"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#multiCollapseExample1"
                                      aria-expanded="false"
                                      aria-controls="#multiCollapseExample1"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                          {order?.map((item) => {
                            console.log(item, "hhhh");
                            return (
                              <>
                                <div className="card shadow-0 border mb-4">
                                  <div className="card-body">
                                    <div className="text-start">
                                      {item.shippingAddress.address}{" "}
                                      <p>{item.shippingAddress.country}</p>
                                      <p>{item.shippingAddress.city}</p>
                                    </div>
                                  </div>
                                </div>
                              </>
                            );
                          })}

                          
                        </div>
                      </>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/*my order */}
            <div
              className="tab-pane fade"
              id="v-pills-messages"
              role="tabpanel"
              aria-labelledby="v-pills-messages-tab"
            >
              <section className="h-100 gradient-custom">
                <h5 className="text-muted mb-0">My Order</h5>
                <div className="py-5 h-100">
                  <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col">
                      <div className="card">
                        <div className="card-body p-4">
                          {!loading ? (
                            <>
                              {order.length > 0 ? (
                                <>
                                  {order?.map((item) => {
                                    console.log(item, "hhhh");
                                    return (
                                      <>
                                        {item.orderItems.map((data) => {
                                          return (
                                            <div className="card shadow-0 border mb-4">
                                              <div className="card-body">
                                                <div className="row">
                                                  <div className="col-md-2">
                                                    <img
                                                      src={
                                                        "http://localhost:8000/" +
                                                        data.image
                                                      }
                                                      className="img-fluid"
                                                      alt="Phone"
                                                    />
                                                  </div>
                                                  <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                    <p className="text-muted mb-0">
                                                      {data.product_name}
                                                    </p>
                                                  </div>

                                                  <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                    <p className="text-muted mb-0 small">
                                                      Qty:{data.qty}
                                                    </p>
                                                  </div>
                                                  <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                    <p className="text-muted mb-0 small">
                                                      {data.price}
                                                    </p>
                                                  </div>
                                                </div>
                                                <hr
                                                  className="mb-4"
                                                  style={{
                                                    backgroundColor: "#e0e0e0",
                                                    opacity: 1,
                                                  }}
                                                />
                                                <div className="row d-flex align-items-center">
                                                  <div className="col-md-2">
                                                    <p className="text-muted mb-0 small">
                                                      Track Order
                                                    </p>
                                                  </div>
                                                  <div className="col-md-10">
                                                    <div
                                                      className="progress"
                                                      style={{
                                                        height: 6,
                                                        borderRadius: 16,
                                                      }}
                                                    >
                                                      <div
                                                        className="progress-bar"
                                                        role="progressbar"
                                                        style={{
                                                          width: "65%",
                                                          borderRadius: 16,
                                                          backgroundColor:
                                                            "#a8729a",
                                                        }}
                                                        aria-valuenow={65}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                      />
                                                    </div>
                                                    <div className="d-flex justify-content-around mb-1">
                                                      <p className="text-muted mt-1 mb-0 small ms-xl-5">
                                                        Out for delivary
                                                      </p>
                                                      <p className="text-muted mt-1 mb-0 small ms-xl-5">
                                                        Delivered
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </>
                                    );
                                  })}
                                </>
                              ) : (
                                <>
                                  <h3>
                                    <strong className="text-info">
                                      Empty ☹ !
                                    </strong>
                                  </h3>
                                </>
                              )}
                            </>
                          ) : (
                            <p>loading....</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default UserProfile;
