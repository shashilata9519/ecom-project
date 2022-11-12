import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { addtocart } from "../Action/cartAction";
import { productList } from "../Action/productAction";
import { addToWishlist, removeToWishlist } from "../Action/wishlistAction";
import Rating from "./Rating";
import { Pagination } from "@mui/material";

function SearchProduct() {
  const [price, setPrice] = useState([0, 60000]);
  const { cartItem } = useSelector((state) => state.cart);
  const productState = useSelector((state) => state.productList);
  const { wishlistItem } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const param = useParams();

  const [page, setPage] = useState(1);
  const [categories, setCategory] = useState(
    location.search ? location.search.split("=")[1] : ""
  );
  // console.log(location, "location");

  React.useEffect(() => {
    dispatch(productList(param.keyword, categories, price, page));
  }, [dispatch, param.keyword, categories, price, page]);

  const addtocartHandler = (id) => {
    dispatch(addtocart(id, 1));
  };

  // console.log(productState, "productState.resultPerPage ");

  const detailHandler = (id) => {
    navigate(`/productdetail/${id}`);
  };

  const addToWishlistHandler = (id) => {
    const itemInWishlist = wishlistItem.some((x) => x._id === id);
    // setWishlist(itemInWishlist)
    if (itemInWishlist) {
      dispatch(removeToWishlist(id));
    } else {
      dispatch(addToWishlist(id));
    }
  };
  const priceHandler = (e) => {
    // console.log(e)
    const parseintoInteger = parseInt(e);
    setPrice([0, parseintoInteger]);
  };

  return (
    <>
      <div className="main-section mt-4">
        <div className="row main_section_row">
          <section className="col-3">
            <div className="side-bar h-100 pt-2">
              <div className="m-5 text-start side_bar_item">
                <h6>CATEGORIES</h6>

                <div>
                  <div
                    className="form-check"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {["Electronics", "furniture", "shoes", "Clothes"].map(
                      (item) => {
                        return (
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              value={item}
                              id="flexCheckDefault"
                              name="category"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexCheckDefault"
                            >
                              {item}
                            </label>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>

              <hr />
              <div className="m-5 text-start side_bar_item">
                <h6>PRICE</h6>
                <div className="card-body">
                  <input
                    type="range"
                    className="custom-range w-100 text-center"
                    min={0}
                    max={60000}
                    name=""
                    onChange={(e) => priceHandler(e.target.value)}
                  />
                  <div className="form-row d-flex justify-content-around">
                    <div className="form-group text-right">
                      <label>Min</label>
                      <input
                        className="form-control "
                        placeholder={price[0]}
                        type="number"
                      />
                    </div>
                    <div className="form-group">
                      <label>Max</label>
                      <input
                        className="form-control"
                        placeholder={price[1]}
                        type="number"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          </section>
          <section className="mt-2 products col-8 mx-auto">
            <div className="d-flex justify-content-end mb-5">
              <div className="product_option">
                <select className="select">
                  <option value={1}>Sort by:</option>
                  <option value={2}>Price low to high</option>
                  <option value={3}>Price high to low</option>
                </select>
              </div>
            </div>
            <div className="text-center">
              <div className="row">
                { productState.products.filteredProductCount!==0?(
                  <>
                  {productState.products?.products?.map((item) => {
                  const itemInWishlist = wishlistItem.some(
                    (x) => x._id === item._id
                  );
                    
                  return (
                    
                    <div
                      className="col col-md-4 col-sm-4 col-xs-6 mb-3"
                      key={item._id}
                    >
                      <div className="product-grid">
                        <div className="product-image">
                          <div className="product_grid_image ">
                            <img src={"http://localhost:8000/" + item.image} />
                          </div>

                          <ul className="product-links">
                            <li>
                              <a
                                type="button"
                                className={`btn ${
                                  itemInWishlist ? "text-danger" : "text-light"
                                } fs-3`}
                                data-mdb-toggle="tooltip"
                                title="Move to the wish list"
                                onClick={() => addToWishlistHandler(item._id)}
                              >
                                <i className="fa fa-heart" />
                              </a>
                            </li>
                            <li>
                              <a
                                type="button"
                                onClick={() => detailHandler(item?._id)}
                              >
                                <i className="fa-solid fa-eye"></i>
                              </a>
                            </li>
                          </ul>
                          <div
                            type="button"
                            className="add-to-cart"
                            onClick={() => addtocartHandler(item._id)}
                          >
                            <i className="fa-solid fa-bag-shopping"></i>{" "}
                            {cartItem.find((x) => x._id === item._id)
                              ? "added"
                              : "ATC"}
                          </div>
                        </div>
                        <div className="product-content my-3">
                          <h3 className="title">
                            <div>{item.product_name}</div>
                          </h3>
                          <div className="price">
                            ₹ {item.price}
                            <span className="product-discount-label">
                              <Rating value={item.rating} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                  </>
                ):(
                  <>
                  <div className="App">
                  <h3>
                    <strong className="text-danger">
                      No Product Found !
                    </strong>
                  </h3>
                  </div>
                  </>
                )}
                
              </div>
              <div className="my-5 d-flex justify-content-center">
                {productState.products.filteredProductCount >
                  productState.products.resultPerPage && (
                  <Pagination
                    page={page}
                    onChange={(e, p) => setPage(p)}
                    count={Number(
                      (
                        productState.products.filteredProductCount /
                        productState.products.resultPerPage
                      ).toFixed()
                    )}
                    variant="outlined"
                  />
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default SearchProduct;
