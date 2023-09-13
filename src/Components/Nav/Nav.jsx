import { Outlet } from "react-router-dom";

import React from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, logoutUser } from "../../redux/reducer/authReducer";

// top navigation bar to make it easy for user to navigate
const Nav = () => {
  const userId = useSelector(authSelector).userId;
  const dispatch = useDispatch();
  return (
    <>
      {/* Toast container to show taost  */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
      {/* nav bar */}
      <nav className="navbar navbar-expand-lg navbar-light  py-3 sticky-top nav">
        <div className="container ">
          <NavLink className="navbar-brand text-light fw-bold fs-4 px-2" to="/">
            React Ecommerce
          </NavLink>

          <div className="" id="navbarSupportedContent">
            <div className="buttons text-center">
              <NavLink to="/" className="btn btn-outline-dark m-2">
                <i className="fa fa-user-plus mr-1"></i> Home
              </NavLink>
              <NavLink to="/bought" className="btn btn-outline-dark m-2">
                <i className="fa fa-user-plus mr-1"></i> Bought
              </NavLink>
              <NavLink to="/cart" className="btn btn-outline-dark m-2">
                <i className="fa fa-cart-shopping mr-1"></i> Cart
              </NavLink>
              {userId ? (
                <div
                  onClick={() => dispatch(logoutUser())}
                  className="btn btn-outline-dark m-2"
                >
                  <i className="fa fa-sign-in-alt mr-1"></i> Logout
                </div>
              ) : (
                <NavLink to="/login" className="btn btn-outline-dark m-2">
                  <i className="fa fa-sign-in-alt mr-1"></i> Login
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Nav;
