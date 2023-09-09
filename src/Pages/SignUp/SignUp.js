import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserValue } from "../../Logic/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = useUserValue().signIn;

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
            <button onClick={(e) => signIn(e,email,password)}>Sign up</button>
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
