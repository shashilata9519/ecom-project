import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import { addtocart } from "../Action/cartAction";
import { productList } from "../Action/productAction";
import { addToWishlist, removeToWishlist } from "../Action/wishlistAction";
import category1 from "../Images/category1.webp";
import category2 from "../Images/category2.webp";
import category3 from "../Images/category3.webp";
import category4 from "../Images/category4.webp";
import category5 from "../Images/category5.webp";
import category6 from "../Images/category6.webp";
import slide1 from "../Images/category1.png";
import slide2 from "../Images/category2.png";
import slide3 from "../Images/category3.png";
import glasses from "../Images/glasses.png";
import jacket from "../Images/jacket.png";
import watch from "../Images/watch.png";
import clothes from "../Images/clothes.jpg";
import Rating from "./Rating";
import { Utils } from "../utils/util";
import { useFirstName } from "../Hooks/useFirstName";
// import Slide from 'react-reveal/Slide';

function Home() {

  const {first,setFirst}=useFirstName()
  const userLogin = useSelector((state) => state.userLogin);
  const { cartItem } = useSelector((state) => state.cart);
  const productState = useSelector((state) => state.productList);
  const { wishlistItem } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const param = useParams();

  // const [categories, setCategory] = useState("");


  React.useEffect(() => {
    dispatch(productList(param.search));
    // setFirst("vijay")
  }, [dispatch, param.search]);
  
  // console.log(productState, "from home");

  const addtocartHandler = (id) => {
    dispatch(addtocart(id, 1));
  };

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
  // console.log(wishlistItem,'wishlist')
 

  const category=[{
    name:"Mobile",
    imgPath:category1
  },{
    name:"Clothes",
    imgPath:category2
  },{
    name:"Electronics",
    imgPath:category3
  },{
    name:"Home",
    imgPath:category4
  },{
    name:"furniture",
    imgPath:category5
  },{
    name:"Grocery",
    imgPath:category6
  }]
  return (
    <div>
      <p>{first}</p>
      <section className="my-3 container">
        <div className="row">
          {
            category.map((item)=>{
              return (
                <div className="col" type="button" onClick={(e)=>navigate(`product?category=${item.name}`)}>
                <img src={item.imgPath} className="img-fluid w-50" alt="..." />
                <h6>{item.name}</h6>
              </div>

              )
            })
          }
          
        </div>
      </section>

      <div>
        <div className="carousel-image p-2 bg-light">
          <section className="my-4 col">
            <div
              id="carouselExampleInterval"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval={10000}>
                  <img src={slide1} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item" data-bs-interval={2000}>
                  <img src={slide2} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                  <img src={slide3} className="d-block w-100" alt="..." />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleInterval"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleInterval"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </section>
        </div>
      </div>
      <h2 className="my-5 arrival">
        <strong>NEW ARRIVAL</strong>
      </h2>

      <section className="d-flex container">
        <div className="row my-5">
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="popular-item">
              <img src={Utils.images.glasses} className=" img-fluid" alt="glasses" />
              <div className="fadedbox">
                <span className="glasses-text glasses-title">GLASSES</span>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="popular-item">
              <img src={jacket} className=" img-fluid" alt="glasses" />
              <div className="fadedbox">
                <span className="glasses-text glasses-title">JACKET</span>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="popular-item">
              <img src={watch} className=" img-fluid" alt="glasses" />
              <div className="fadedbox">
                <span className="glasses-text glasses-title">WATCH</span>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="popular-item">
              <img src={clothes} className=" img-fluid" alt="glasses" />
              <div className="fadedbox">
                <span className="glasses-text glasses-title">CLOTHES</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <h2 className="my-5 arrival">
        <strong>TOP PRODUCTS</strong>
      </h2>
      <div className="main-section">
        <div className="row main_section_row">
         
          <section className="mt-2 products col-10 mx-auto">
            <div className="text-center">
              <div className="row my-5">
                {productState?.products?.products?.map((item) => {
                  const itemInWishlist = wishlistItem.some(
                    (x) => x._id === item._id
                  );
                  return (
                    <div
                      className="col-sm-6 col-md-4 col-lg-3 my-5"
                      key={item._id}
                    >
                      <div
                        className="product-grid"
                       
                      >
                        <div className="product-image">
                          <div className="product_grid_image">
                            <img
                              src={"http://localhost:8000/" + item.image}
                             
                            
                            />
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
                          <div className="product-content my-3">
                          <h3 className="title">
                            <div>{item.product_name}</div>
                          </h3>
                          <div className="price">
                            ₹ {item.price}
                            {/* <span className="product-discount-label">
                              <Rating value={item.rating} />
                            </span> */}
                          </div>
                        </div>
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
                       
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </div>
      
      {/* newsletter */}
      <section className="bg-light">
        <div className="newsletter-subscribe mt-5 container bg-light">
          <div className="container">
            <div className="intro">
              <h2 className="text-center newsletter">
                Subscribe to our Newsletter
              </h2>
              <p className="text-center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.{" "}
              </p>
            </div>
            <form className="form-inline ">
              <div className="form-group">
                <input
                  className="form-control w-50 mx-auto"
                  type="email"
                  name="email"
                  placeholder="Your Email"
                />
              </div>
              <div className="form-group mt-3">
                <button className="btn btn-primary" type="button">
                  Subscribe{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
     
     

      
    </div>
  );
}

export default Home;
