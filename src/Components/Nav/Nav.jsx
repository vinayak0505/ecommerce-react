import { Outlet } from "react-router-dom";

import React from "react";
import { NavLink } from "react-router-dom";
import { useUserValue } from "../../Logic/auth";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Nav = () => {
  const userId = useUserValue().userId;
  const handleLogout = useUserValue().logout;

  if (userId === 0) return <>loading</>;

  return (
    <>
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
                  onClick={handleLogout}
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
