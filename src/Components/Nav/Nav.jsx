import { Outlet } from "react-router-dom";

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseinit";

const Nav = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Signed out successfully");
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  
  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
        <div className="container">
          <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">
            React Ecommerce
          </NavLink>

          <div className="" id="navbarSupportedContent">
            <div className="buttons text-center">
              {isLoggedIn ? (
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
              <NavLink to="/bought" className="btn btn-outline-dark m-2">
                <i className="fa fa-user-plus mr-1"></i> Bought
              </NavLink>
              <NavLink to="/cart" className="btn btn-outline-dark m-2">
                <i className="fa fa-cart-shopping mr-1"></i> Cart
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Nav;
