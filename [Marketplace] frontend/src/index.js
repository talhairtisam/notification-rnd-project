import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Signup";
import Products from "./Products";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/products" element={<Products/>} />



    </Routes>
  </BrowserRouter>
   
  </React.StrictMode>,
);
