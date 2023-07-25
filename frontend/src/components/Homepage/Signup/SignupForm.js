import React, { useState } from "react";
import "./SignupForm.css"

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <form className="form">
      <input type="text" className="input-field" placeholder="Full Name" required />
      <input type="email" className="input-field" placeholder="Email" required />
      <div className="password-container">
        <input
          type={showPassword ? "text" : "password"}
          className="input-field"
          placeholder="Password"
          required
        />
        <span className="show-hide" onClick={togglePasswordVisibility}>
          {showPassword ? "Hide" : "Show"}
        </span>
      </div>
      <div className="password-container">
        <input
          type={showPassword ? "text" : "password"}
          className="input-field"
          placeholder="Confirm Password"
          required
        />
        <span className="show-hide" onClick={togglePasswordVisibility}>
          {showPassword ? "Hide" : "Show"}
        </span>
      </div>
      <label htmlFor="profilePicture" className="uploadButtonLabel">Upload a Profile Picture</label>
      <input type="file" className="input-field-file" id="profilePicture" accept="image/*" placeholder="" required />
      <button type="submit" className="submit-btn">Sign Up</button>
    </form>
  );
};

export default SignupForm;
