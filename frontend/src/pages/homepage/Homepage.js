import { useState } from "react";

import SignupForm from "components/Homepage/Signup/SignupForm";
import LoginForm from "components/Homepage/Login/LoginForm";

import "./Homepage.css";
import Button from "components/Button/Button";
import logo from "utils/Heraldlogo/herald_logo.svg";

const activeButtonStyles = { "background-color": "teal" };
const inActiveButtonStyles = { "background-color": "#fff", color: "black" };

export const HomePage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <>
      <div className="form-container">
        <div className="form-header">
          <img src={logo} alt="fireSpot" width="250px" />{" "}
        </div>
        <div className="form-box">
          <div className="button-box">
            <Button
              type="click"
              onClickEvent={toggleForm}
              style={isLogin ? activeButtonStyles : inActiveButtonStyles}
              text="Already have an account"
            />
            <Button
              type="click"
              onClickEvent={toggleForm}
              style={!isLogin ? activeButtonStyles : inActiveButtonStyles}
              text="Register"
            />
          </div>
          {isLogin ? <LoginForm /> : <SignupForm />}
        </div>
      </div>
    </>
  );
};
