import { useState } from "react";
import "./Homepage.css";
import LoginForm from "../../components/Homepage/Login/LoginForm";
import SignupForm from "../../components/Homepage/Signup/SignupForm";

export const HomePage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <div className="container">
      <div className="form-box">
        <div className="button-box">
          <button
            type="button"
            className={`toggle-btn ${isLogin ? "active" : ""}`}
            onClick={handleToggle}
          >
            Log In
          </button>
          <button
            type="button"
            className={`toggle-btn ${isLogin ? "" : "active"}`}
            onClick={handleToggle}
          >
            Sign Up
          </button>
        </div>
        {isLogin ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  );
};
