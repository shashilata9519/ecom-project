import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import {
  addtocart,
  decreaseQty,
  increaseQty,
  removeCartItem,
} from "../Action/cartAction";
import { createOrder } from "../Action/orderAction";
import { loadScript } from "../utils/util";

function AddToCart() {
  const location = useLocation();
  const param = useParams();
  const dispatch = useDispatch();
  const qty = location.search ? location.search.split("=")[1] : 1;

  console.log(location.search.split("="),'kkkkkk');
  const { cartItem } = useSelector((state) => state.cart);
  React.useEffect(() => {
    if (param.id) {
      dispatch(addtocart(param.id, qty));
      // console.log(param.id)
    }
  }, [param.id, dispatch, qty]);

  const removeQty = (index) => {
    dispatch(decreaseQty(index));
  };
  const addQty = (index) => {
    // console.log(index,'index')
    dispatch(increaseQty(index));
  };

  const removeHandler = (id) => {
    dispatch(removeCartItem(id));
  };

  const paymentHandler = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const data = await fetch("http://localhost:8000/api/payment/razorpay", {
      method: "POST",
    }).then((t) => t.json());
    console.log(data);

    const options = {
      key: "rzp_test_0tpemkHKm5K1Bc",
      currency: data.currency,
      amount: cartItem?.reduce((x, y) => x + y.qty * y.price, 0),
      // order_id: data.id,
      name: "Donation",
      description: "Thank you for nothing. Please give us some money",
      // image: "http://localhost:1337/logo.svg",
      handler: function (response) {
        dispatch(createOrder({
          orderItems:cartItem,
          shippingAddress: { 
            address:'sulem sarai',
          city:'allahabad',
          pinCode:211011,
          country:'India'
        },
        paymentMethod:'razorpay',
        totalPrice:cartItem?.reduce((x, y) => x + y.qty * y.price, 0),


        }))

        // alert("Transaction successful");
      },
      prefill: {
        name: "Shashi",
        email: "shashilata9519@gmail.com",
        phone_number: "7905507713",
      }, 
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="container">
      <section className="h-100 gradient-custom">
        <div className="container py-5">
          <div className="row d-flex justify-content-center my-4">
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0 ">
                    Shopping Cart - {cartItem?.length} items
                  </h5>
                </div>
                <div className="card-body">
                  {cartItem&& cartItem?.length !== 0 ? (
                    <>
                      {cartItem &&cartItem?.map((item, index) => {
                        // console.log(item)
                        return (
                          <>
                            <div className="row" key={item._id}>
                              <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                                <div
                                  className="bg-image hover-overlay hover-zoom ripple rounded"
                                  data-mdb-ripple-color="light"
                                >
                                  <img
                                    src={"http://localhost:8000/" + item.image}
                                    className="w-100"
                                    alt="product"
                                  />
                                </div>
                              </div>
                              <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                                <p>
                                  <strong>{item.product_name}</strong>
                                </p>
                                <p>{item.category}</p>
                                {/* <p>Size: M</p> */}
                                <button
                                  type="button"
                                  className="btn btn-primary btn-sm me-1 mb-2"
                                  data-mdb-toggle="tooltip"
                                  title="Remove item"
                                  onClick={() => removeHandler(item._id)}
                                >
                                  <i className="fas fa-trash" />
                                </button>
                              </div>
                              <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                                <div className="d-flex mb-4">
                                  <button
                                    className="btn btn-primary px-3 me-2 h-50"
                                    onClick={() => removeQty(index)}
                                  >
                                    <i className="fas fa-minus" />
                                  </button>
                                  <div className="form-outline">
                                    <input
                                      id="form1"
                                      value={item.qty}
                                      name="quantity"
                                      type="number"
                                      className="form-control"
                                      // onChange={(e)=>quantityHandler(e.target.value)}
                                    />
                                    <label
                                      className="form-label"
                                      htmlFor="form1"
                                    >
                                      Quantity
                                    </label>
                                  </div>
                                  <button
                                    className="btn btn-primary px-3 ms-2 h-50"
                                    onClick={() => addQty(index)}
                                  >
                                    <i className="fas fa-plus" />
                                  </button>
                                </div>

                                <p className="text-start text-md-center">
                                  <strong>₹ {item.price}</strong>
                                </p>
                              </div>
                            </div>
                            <hr />
                          </>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <div className="card-body cart">
                        <div className="col-sm-12 empty-cart-cls text-center">
                          <img
                            src="https://www.pavejewelers.com/assets/images/empty-wishlist.png"
                            width={130}
                            height={130}
                            className="img-fluid mb-4 mr-3"
                          />
                          <h6>
                            <strong className="text-danger">
                              Your Cart is Empty !
                            </strong>
                          </h6>
                          <p>
                            Look like you haven't added anything to your cart
                          </p>

                          <Link
                            to="/"
                            className="btn shop-button"
                            data-abc="true"
                          >
                            <span>Start Shopping</span>
                          </Link>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              
            </div>

            {/* product summary details */}
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products
                      <span>
                        {cartItem?.reduce((x, y) => x + y.qty * y.price, 0)}
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Shipping
                      <span>details</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                        <strong>
                          <p className="mb-0">(TAX)</p>
                        </strong>
                      </div>
                      <span>
                        <strong>$50</strong>
                      </span>
                    </li>
                  </ul>
                  <button
                    type="button"
                    onClick={paymentHandler}
                    className="btn btn-primary btn-lg btn-block"
                    disabled={cartItem?.length === 0 ? true : false}
                  >
                    Go to checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AddToCart;
