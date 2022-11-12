import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createProductReview, productDetail } from "../Action/productAction";
import Rating from "./Rating";


function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const param = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location.state.id);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productDetail);
  const { success, loading, error } = useSelector((state) => state.productReview);
  const { user } = useSelector((state) => state.userLogin);
  // console.log(products, "product");
  const [rating, setRating] = useState();
  const [comment, setComment] = useState("");
  // console.log(products, "product detail");


  React.useEffect(() => {
    if (success) {
      setRating(0);
      setComment("");
    }
    if (!products?._id || products?._id !== param.id) {
     
      dispatch(productDetail(param.id));
    }
  }, [dispatch, param.id, success]);



  const addToCart = () => {
    navigate(`/cart/${param.id}?qty=${quantity}`);
  };

  const commentHandler = () => {
    dispatch(
      createProductReview({
        productId: products?._id,
        rating,
        comment,
      })
    );
  };

  const If=({show,children})=>{
    return <>
      {show?children:null}
    </>
  }

  return (
    <>
      <section className="container">
        <div className="item_detail d-flex mt-5">
          <div className="item_image">
            <img
              src={"http://localhost:8000/" + products.image}
              className="img-fluid w-75"
              alt="product"
            />
            <section></section>
          </div>
          <div className="item_content p-5">
            <h1>{products.product_name}</h1>
            <span className="d-flex  justify-content-start mt-2">
              <Rating value={products.rating} />
              <span className="bg-success fw-bold text-light rounded px-2 py-1 mx-2">
                {products.numReviews}.0
              </span>
            </span>

            <p className="text-start d-flex mt-3">
              <span className="fs-2">₹ {products.price}</span>
              <span>
                {/* {products.countInStock > 0 ? (
                  <p className="text-success fw-bold">In Stock</p>
                ) : (
                  <p className="text-danger fw-bold">Out of Stock</p>
                )} */}
                <If show={products.countInStock > 0}> 
                <p className="text-success fw-bold">In Stock</p>

                </If>
                <If show={products.countInStock === 0}> 
                <p className="text-danger fw-bold">Out of Stock</p>

                </If>
               
              </span>
            </p>

            <div className="form-outline w-25 mt-5">
              <input
                id="form1"
                min={0}
                value={quantity}
                name="quantity"
                type="number"
                className="form-control"
                onChange={(e) => setQuantity(e.target.value)}
              />
             
            </div>
            <p className="mt-2">{products.discription}</p>
            <button
             disabled={products.countInStock>0 ?false:true}
              className="btn btn-outline-success w-25 mt-5"
              onClick={addToCart}
            >
              ADD TO CART
            </button>
          </div>
        </div>
        <hr />
      </section>
      <section className="d-flex container">
        {user ? (
          <div className="col-6 text-start">
            <h5 className="my-4">
              Customer Rating <i className="fa-solid fa-star text-warning"></i>
            </h5>
            <form>
              <div className=" border-2 border-dark d-flex">
                <div
                  className="d-flex flex-column text-start my-3"
                  onChange={(e) => setRating(e.target.value)}
                >
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      value={"5"}
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      defaultValue="option1"
                    />
                    <label className="form-check-label" htmlFor="inlineRadio1">
                      5 <i className="fa fa-star "></i>
                      <i className="fa fa-star "></i>
                      <i className="fa fa-star "></i>
                      <i className="fa fa-star "></i>
                      <i className="fa fa-star "></i>
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      value={"4"}
                      name="inlineRadioOptions"
                      id="inlineRadio2"
                      defaultValue="option2"
                    />
                    <label className="form-check-label" htmlFor="inlineRadio2">
                      4 <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa-regular fa-star"></i>
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      value={"3"}
                      name="inlineRadioOptions"
                      id="inlineRadio3"
                      defaultValue="option3"
                    />
                    <label className="form-check-label" htmlFor="inlineRadio3">
                      3 <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa-regular fa-star"></i>
                      <i className="fa-regular fa-star"></i>
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      value={"2"}
                      name="inlineRadioOptions"
                      id="inlineRadio4"
                      defaultValue="option4"
                    />
                    <label className="form-check-label" htmlFor="inlineRadio4">
                      2 <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa-regular fa-star"></i>
                      <i className="fa-regular fa-star"></i>
                      <i className="fa-regular fa-star"></i>
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      value={"1"}
                      name="inlineRadioOptions"
                      id="inlineRadio5"
                      defaultValue="option5"
                    />
                    <label className="form-check-label" htmlFor="inlineRadio5">
                      1 <i className="fa fa-star text-warning"></i>
                      <i className="text-warning fa-regular fa-star"></i>
                      <i className="text-warning fa-regular fa-star"></i>
                      <i className="text-warning fa-regular fa-star"></i>
                      <i className="text-warning fa-regular fa-star"></i>
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group mt-4">
                <textarea
                  className="form-control w-50"
                  rows={4}
                  placeholder="Message"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <div className="mt-2">
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={commentHandler}
                >
                  <span>Send feedback</span>
                </button>
              </div>
              <p className="mt-3">Continue without sending feedback</p>
            </form>
          </div>
        ) : (
          <div className="App">
                  <h3>
                    <strong className="text-danger">
                     Please Login 
                    </strong>
                  </h3>
                  </div>
        )}
        <div className="col-6 text-center">
          <div className="row d-flex justify-content-center">
            <div className="col-md-10">
              <div className="my-3">
                <div className="m-3 row">
                  {products?.reviews?.map((item) => {
                    return (
                      <div className="col-12 my-2">
                        
                        <div className="card p-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="user d-flex flex-row align-items-center">
                              <div className="user-image mx-2">
                                <div className="bg-light px-3  my-1 rounded-circle border border-info">
                                  <div className="fs-1 text-uppercase ">
                                    {item.name
                                      .split(" ")
                                      .map((word) => word[0])}
                                  </div>
                                </div>
                              </div>
                              <span>
                                <small className="font-weight-bold text-primary">
                                  {item.name}
                                </small>{" "}
                                <small className="font-weight-bold">
                                  {item.comment}
                                </small>
                              </span>
                            </div>
                            <small>{new Date().toLocaleDateString() + ''}</small>
                          </div>
                          <div className="action d-flex justify-content-between mt-2 align-items-center">
                            <div className="reply px-4">
                              <small>
                                <i className="fa-regular fa-thumbs-up"></i>
                              </small>
                              <span className="dots  px-3" />
                              <small>
                                <i className="fa-solid fa-share"></i>
                              </small>
                              <span className="dots  px-3" />
                              <small>
                                <i className="fa-regular fa-thumbs-down"></i>
                              </small>
                            </div>
                            <div className="icons align-items-center">
                              <div className="d-flex flex-row">
                                <Rating value={item.rating} />
                                
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductDetail;
