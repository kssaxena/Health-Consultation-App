import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./utils/store.js";
import { ToastContainer } from "react-custom-alert";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ToastContainer floatingTime={3000} />
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
