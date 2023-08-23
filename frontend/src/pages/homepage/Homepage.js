import React, { useState } from "react";

import SignupForm from "components/Homepage/Signup/SignupForm";
import LoginForm from "components/Homepage/Login/LoginForm";
import Link from "components/Link/Link";

import Button from "components/Button/Button";
import logo from "utils/Heraldlogo/herald_logo.svg";

import "./Homepage.css";

const activeButtonStyles = { "background-color": "teal" };
const inActiveButtonStyles = { "background-color": "#fff", color: "black" };

export const HomePage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <div className="form-container">
        <div className="form-header">
          <img
            src={logo}
            alt="Herald, a chat app"
            loading="lazy"
            width="250px"
          />{" "}
        </div>
        <div className="form-box">
          <div className="button-box">
            <Button
              type="click"
              onClickEvent={()=>setIsLogin(true)}
              style={isLogin ? activeButtonStyles : inActiveButtonStyles}
              text="Already have an account"
            />
            <Button
              type="click"
              onClickEvent={()=>setIsLogin(false)}
              style={!isLogin ? activeButtonStyles : inActiveButtonStyles}
              text="Register"
            />
          </div>
          {isLogin ? <LoginForm /> : <SignupForm />}
          <div className="listOfLinks">
          <Link url="https://github.com/katiyarkartik0/chat-app/blob/main/frontend/README.md" text="for users" emoji="🥂" />
          <Link url="https://github.com/katiyarkartik0/chat-app/blob/main/README.md" text="for developers" emoji="☕" />
        </div>
        </div>
      </div>
    </>
  );
};
