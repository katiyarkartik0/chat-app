import React, { useEffect, useState } from "react";
import "./LoginForm.css";
import { emailValidator } from "../../../helpers/validator";
import { authRequest } from "../../../api/auth";
import { useDispatch } from "react-redux";
import { setLogin } from "../../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
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
    const res = await authRequest({
      attempt: "login",
      body: JSON.stringify(userCredentials),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const { isEmailValid, isPasswordValid, userData, msg, accessToken } =
      await res.json();
    if (!isEmailValid) {
      setErrors((prev) => ({ ...prev, email: msg }));
      return;
    }
    if (!isPasswordValid) {
      setErrors((prev) => ({ ...prev, password: msg }));
      return;
    }
    dispatch(setLogin({ accessToken, userData }));
    localStorage.setItem("accessToken", `JWT ${accessToken}`);
    localStorage.setItem("userData", JSON.stringify(userData));

    navigate("/chat");
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
      <button type="submit" className="submit-btn">
        Log In
      </button>
      <button
        type="button"
        onClick={() =>
          setUserCredentials({
            email: "katiyarkartik0@gmail.com",
            password: "qwerty",
          })
        }
        className="guest-btn"
      >
        Generate Guest User Credentials
      </button>
    </form>
  );
};

export default LoginForm;
