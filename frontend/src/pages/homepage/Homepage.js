import { useState } from "react";

import SignupForm from "components/Homepage/Signup/SignupForm";
import LoginForm from "components/Homepage/Login/LoginForm";

import "./Homepage.css";

export const HomePage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <div className="button-box">
          <button
            type="button"
            className={`toggle-btn ${isLogin ? "active" : ""}`}
            onClick={toggleForm}
          >
            Log In
          </button>
          <button
            type="button"
            className={`toggle-btn ${isLogin ? "" : "active"}`}
            onClick={toggleForm}
          >
            Sign Up
          </button>
        </div>
        {isLogin ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  );
};
