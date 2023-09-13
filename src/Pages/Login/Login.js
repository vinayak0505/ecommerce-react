import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../redux/reducer/authReducer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault();
    if (await login(email, password)) navigate("/");
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
