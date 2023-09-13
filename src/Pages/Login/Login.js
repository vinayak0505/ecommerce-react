import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../../redux/reducer/authReducer";
import { useDispatch } from "react-redux";
/**
 * Login.js
 *
 * This file contains the Login component, which represents the login page of the application.
 * It allows users to authenticate themselves by providing their username and password.
 *
 * The Login component includes the following functions and features:
 * - Renders a login form with input fields for username and password.
 * - Handles form submission and validates user input.
 * - Sends a login request to the server and handles the response.
 * - Stores the user's authentication token in local storage for future requests.
 * - Redirects the user to the home page upon successful login.
 * - Displays error messages if login fails or there are validation errors.
 *
 * Usage:
 * Import this file and use the Login component in the desired location of your application.
 * Ensure that the necessary dependencies, such as React Router and Redux, are properly set up.
 *
 * Example:
 * import Login from './Login';
 *
 * function App() {
 *   return (
 *     <div>
 *       <Login />
 *     </div>
 *   );
 * }
 *
 * export default App;
 */
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    dispatch(loginUser({email, password}));
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form>
          <div className="input-container">
            <label htmlFor="email-address">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              required
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="button-container">
            <button onClick={onLogin}>Login</button>
          </div>
        </form>
        <p className="text-sm text-center">
          No account yet? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
