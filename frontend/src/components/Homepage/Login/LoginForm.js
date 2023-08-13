import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { userLogin } from "api/auth";
import { setLogin } from "store/slices/authSlice";

import "./LoginForm.css";
import Button from "components/Button/Button";
import { Loader } from "utils/Loader/Loader";
import { setToast } from "store/slices/toastSlice";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleEmail = (e) => {
    setUserCredentials((prev) => ({ ...prev, email: e.target.value }));
  };
  const handlePassword = (e) => {
    setUserCredentials((prev) => ({ ...prev, password: e.target.value }));
  };

  const hanldeSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await userLogin(userCredentials)
      .then(async (res) => {
        if (res.ok) {
          const { userData, accessToken, msg } = await res.json();
          dispatch(setLogin({ accessToken, userData }));
          dispatch(setToast({ status: "success", displayMessage: msg }));
          navigate("/chat");
          return;
        }
        if (!res.ok) {
          const { msg } = await res.json();
          dispatch(setToast({ status: "failure", displayMessage: msg }));
        }
      })
      .catch((error) => {
        dispatch(setToast({ status: "failure", displayMessage: error }));
      });
    setIsLoading(false);
  };

  return (
    <form className="form" onSubmit={hanldeSubmit}>
      <input
        type="text"
        value={userCredentials.email}
        onChange={handleEmail}
        className={`input-field${errors.email ? "-error" : ""}`}
        placeholder="Email"
        required
      />
      {errors.email && <span className="input-error">{errors.email}</span>}
      <br></br>
      <div className="password-container">
        <input
          onChange={handlePassword}
          type={showPassword ? "text" : "password"}
          className={`input-field${errors.password ? "-error" : ""}`}
          placeholder="Password"
          required
          value={userCredentials.password}
        />
        <span className="show-hide" onClick={togglePasswordVisibility}>
          {showPassword ? "Hide" : "Show"}
        </span>
      </div>
      {errors.password && (
        <span className="input-error">{errors.password}</span>
      )}
      <br></br>

      {!isLoading && (
        <Button type="submit" text="Log In" style={{ width: "100%" }} />
      )}
      {isLoading && <Loader />}
      <br></br>
      {/* <br></br> */}
      <Button
        type="button"
        onClickEvent={() =>
          setUserCredentials({
            email: "katiyarkartik0@gmail.com",
            password: "qwerty",
          })
        }
        text="Generate User Credentials"
        style={{ width: "100%" }}
      />
    </form>
  );
};

export default LoginForm;
