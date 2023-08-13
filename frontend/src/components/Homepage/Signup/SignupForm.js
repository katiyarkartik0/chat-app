import React, { useState } from "react";
import { authRequest, userSignup } from "api/auth";

import "./SignupForm.css";
import Button from "components/Button/Button";
import { useDispatch } from "react-redux";
import { setToast } from "store/slices/toastSlice";

const defaultUserData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const defaultError = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState(defaultUserData);
  const [errors, setErrors] = useState(defaultError);
  const dispatch = useDispatch();
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleUserData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = userData;
    if (password !== confirmPassword) {
      setErrors({
        password: "make sure to match the password with confirm password",
        confirmPassword:
          "make sure to match the password with confirm password",
      });
      return;
    }

    await userSignup({ name, email, password })
      .then(async (res) => {
        console.log(res);
        if (res.ok) {
          dispatch(
            setToast({
              status: "success",
              displayMessage:
                "congratulations! your account has been created. Try signing in",
            })
          );
          setUserData(defaultUserData);
          setErrors(defaultError);
          return;
        }
        if (!res.ok) {
          const { msg } = await res.json();
          dispatch(setToast({ status: "failure", displayMessage: msg }));
          return;
        }
      })
      .catch((err) =>
        dispatch(
          setToast({ status: "failure", displayMessage: JSON.stringify(err) })
        )
      );
  };
  return (
    <form className="form" onSubmit={handleSubmit} onChange={handleUserData}>
      <input
        type="text"
        className="input-field"
        placeholder="Full Name"
        name="name"
        value={userData.name}
      />
      <input
        type="text"
        className="input-field"
        placeholder="Email"
        name="email"
        value={userData.email}
      />
      {errors.email && <span className="input-error">{errors.email}</span>}
      <div className="password-container">
        <input
          type={showPassword ? "text" : "password"}
          className="input-field"
          placeholder="Password"
          name="password"
          value={userData.password}
        />
        <span className="show-hide" onClick={togglePasswordVisibility}>
          {showPassword ? "Hide" : "Show"}
        </span>
      </div>
      {errors.password && (
        <span className="input-error">{errors.password}</span>
      )}
      <div className="password-container">
        <input
          type={showPassword ? "text" : "password"}
          className="input-field"
          placeholder="Confirm Password"
          value={userData.confirmPassword}
          name="confirmPassword"
        />
        <span className="show-hide" onClick={togglePasswordVisibility}>
          {showPassword ? "Hide" : "Show"}
        </span>
      </div>
      {errors.confirmPassword && (
        <span className="input-error">{errors.confirmPassword}</span>
      )}

      {/* <label htmlFor="profilePicture" className="uploadButtonLabel">Upload a Profile Picture</label>
      <input type="file" className="input-field-file" id="profilePicture" accept="image/*" placeholder="" required /> */}
      <Button type="submit" text="Sign Up" />
    </form>
  );
};

export default SignupForm;
