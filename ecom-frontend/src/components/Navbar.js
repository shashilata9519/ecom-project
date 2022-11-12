import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Action/userAction";

function Navbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  console.log(userLogin, "user header");
  const { cartItem } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    console.log("logout");
    dispatch(logout());
  };
  // console.log(cartItem);
  const searchHandler = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/product/${search}`);
    } else {
      navigate(`/product`);
    }

    // product/keyword="iphone"
    // product/category="phone"
    // product/keyword="i' & category=
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <Link className="navbar-brand p-3" to={"/"}>
            MINI SHOP
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
              <li className="nav-item mx-3">
                <Link className="nav-link" aria-current="page" to={"/"}>
                  HOME
                </Link>
              </li>

              <li className="nav-item mx-3">
                <form className="d-flex">
                  <input
                    className="form-control me-2 search-input"
                    type="search"
                    placeholder="Search for products"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button
                    className="search-btn"
                    type="submit"
                    onClick={searchHandler}
                    disabled={search.length >= 1 ? false : true}
                  >
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </form>
              </li>

              {userLogin?.user ? (
                <>
                  <li className="nav-item mx-3">
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to={"/profile"}
                    >
                      MY PROFILE
                    </Link>
                  </li>
                  <li className="nav-item mx-3">
                    <Link className="nav-link" onClick={logoutHandler}>
                      <span className="me-1 text-uppercase">
                        ({userLogin?.user?.name})
                      </span>
                      LOGOUT
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item mx-3">
                    <Link className="nav-link" to={"/login"}>
                      LOGIN
                    </Link>
                  </li>
                  <li className="nav-item mx-3">
                    <Link className="nav-link" to={"/register"}>
                      SIGNUP
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <div className="d-flex">
              <ul className="navbar-nav">
                <li className="nav-item me-3">
                  <Link
                    to={"/wishlist"}
                    className="nav-link"
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    title="Wishlist"
                  >
                    <i className="fa-brands fa-gratipay fs-4 text-danger"></i>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link cart"
                    to={"/cart"}
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    title="Cart"
                  >
                    <i className="fa-solid fa-cart-shopping fs-6"></i>{" "}
                    {cartItem?.length}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
