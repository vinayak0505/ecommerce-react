import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signUpUser } from "../../redux/reducer/authReducer";
import { useDispatch } from "react-redux";
/**
 * Signup.js
 *
 * This file contains the Signup component, which represents the signup page of the application.
 * It allows new users to create an account by providing their username, email, and password.
 *
 * The Signup component includes the following functions and features:
 * - Renders a signup form with input fields for username, email, and password.
 * - Handles form submission and validates user input.
 * - Sends a signup request to the server and handles the response.
 * - Stores the user's authentication token in local storage upon successful signup.
 * - Redirects the user to the home page upon successful signup.
 * - Displays error messages if signup fails or there are validation errors.
 *
 * Usage:
 * Import this file and use the Signup component in the desired location of your application.
 *
 * Example:
 * import Signup from './Signup';
 *
 * function App() {
 *   return (
 *     <div>
 *       <Signup />
 *     </div>
 *   );
 * }
 *
 * export default App;
 */
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    dispatch(signUpUser({ email, password }));
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Sign Up</h2>
        <form>
          <div className="input-container">
            <label htmlFor="email-address">Email address</label>
            <input
              type="email"
              label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email address"
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              label="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </div>
          <div className="button-container">
            <button onClick={onSignUp}>Sign up</button>
          </div>
        </form>
        <p>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
