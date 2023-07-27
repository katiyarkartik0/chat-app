import React, { useState } from "react";
import "./SignupForm.css";
import { authRequest } from "../../../api/auth";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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
    const res = await authRequest({
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
      attempt: "signup",
    });

    const { isEmailValid, msg } = await res.json();
    if (!isEmailValid) {
      setErrors({ email: msg });
      return;
    }
    alert("congratulations");
    setUserData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };
  return (
    <form className="form" onSubmit={handleSubmit} onChange={handleUserData}>
      <input
        type="text"
        className="input-field"
        placeholder="Full Name"
        name="name"
        required
        value={userData.name}
      />
      <input
        type="text"
        className="input-field"
        placeholder="Email"
        name="email"
        required
        value={userData.email}
      />
      {errors.email && <span className="input-error">{errors.email}</span>}
      <div className="password-container">
        <input
          type={showPassword ? "text" : "password"}
          className="input-field"
          placeholder="Password"
          required
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
          required
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
      <button type="submit" className="submit-btn">
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
