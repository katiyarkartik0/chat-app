import React, { useState, useEffect } from "react";
import "./Toast.css";
import { useSelector } from "react-redux";
import { getToastContent } from "helpers/selectors";

function Toast() {
  const { toastStatus, toastMessage } = useSelector(getToastContent);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (toastStatus && toastMessage) {
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  }, [toastStatus, toastMessage]);

  return (
    <div className={`toast-container ${showToast ? "show" : ""} ${toastStatus}`}>
      <div className={`toast `}>{toastMessage}</div>
    </div>
  );
}

export default Toast;
