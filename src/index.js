
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from "react-redux";

import productReducer from "./features/products"
import dbproductReducer from "./features/databaseProducts"
import adminReducer from "./features/admin"

const store = configureStore({
  reducer: {
    products: productReducer,
    dbproducts: dbproductReducer,
    admin: adminReducer
  },
});


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
