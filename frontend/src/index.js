import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Footer from "Footer/Footer";
// import dotenv from "dotenv";

// require("dotenv").config();
const root = ReactDOM.createRoot(document.getElementById("root"));
export const persistor = persistStore(store);
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
      <Footer/>
    </PersistGate>
  </Provider>
);
