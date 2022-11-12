import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addtocart } from "../Action/cartAction";
import { removeToWishlist } from "../Action/wishlistAction";

function WishList() {
  const { cartItem } = useSelector((state) => state.cart);
  const { wishlistItem } = useSelector((state) => state.wishlist);


  const dispatch = useDispatch();

  const removeWishlistHandler = (id) => {
    // console.log(id)
    dispatch(removeToWishlist(id));
  };
  const addtocartHandler = (id) => {
    dispatch(addtocart(id, 1));
  };
  return (
    <div>
      <div className="card-body container">
        <h5 className="text-start my-3">
          My wishlist <i className="fas fa-heart text-danger" />
        </h5>
        <hr />
        <div>
          {wishlistItem.length !== 0 ? (
            <>
              {wishlistItem.map((item, index) => {
                // console.log(item)

                return (
                  <>
                    <div className="row">
                      <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                        <div className="bg-image w-50 rounded">
                          <img
                            src={"http://localhost:8000/" + item.image}
                            className="w-100"
                            alt="product"
                          />
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-6 mb-4 mb-lg-0 text-start">
                        <div>
                          {item.countInStock > 0 ? (
                            <p className="text-success fw-bold">In Stock</p>
                          ) : (
                            <p className="text-danger fw-bold">Out of Stock</p>
                          )}
                          <div className="fs-5">{item.product_name}</div>
                        </div>
                        <span className="bg-success fw-bold text-light rounded px-1">
                          {item.numReviews}.0{" "}
                          <i className="fas fa-star fa-sm text-light" />
                        </span>
                        {/* <p>{item.category}</p> */}
                        <h5>₹ {item.price}</h5>
                      </div>
                      <div className="col wishlist">
                        <div onClick={() => removeWishlistHandler(item._id)}>
                          <i className="fa-solid fa-trash text-light"></i>
                        </div>
                        <button
                          type="button"
                          className="btn btn-outline-success mt-5"
                          disabled={item.countInStock>0 ?false:true}
                          onClick={() => addtocartHandler(item._id)}
                        >
                          <i className="fa-solid fa-bag-shopping"></i>{" "}
                          
                          {cartItem.find((x) => x._id === item._id)
                            ? "added"
                            : "Go To Cart"}
                        </button>
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
                    src="https://i.imgur.com/dCdflKN.png"
                    width={130}
                    height={130}
                    className="img-fluid mb-4 mr-3"
                  />
                  <h3>
                    <strong className="text-danger">
                      Your WishList is Empty !
                    </strong>
                  </h3>
                  <p>
                    Seems like you don't have wishes here.
                    <br />
                    Make a wish 😊
                  </p>

                  <Link
                    to="/"
                    className="btn btn-info fw-bold text-light m-3"
                    data-abc="true"
                  >
                    Start Shopping
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default WishList;
