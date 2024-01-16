import React, { useEffect, useState } from "react";
import Login from "./Pages/Login";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import Dashboard from "./Pages/Dashboard";
import AddProduct from "./Pages/AddProduct";
import Product from "./Pages/Product";
import Reservations from "./Pages/Reservations";
import SignUp from "./Pages/SignUp";

function App() {
  const [logedInUser, setLogedInUser] = useState();

  return (
    <BrowserRouter>
      <Routes>
        {logedInUser ? (
          <Route
            path="*"
            element={
              <Routes>
                <Route path="/" element={<Home setUser={setLogedInUser} user={logedInUser} />}>
                  <Route index element={<Dashboard />} />
                  <Route path="products" element={<Outlet />}>
                    <Route index element={<Products user={logedInUser} />} />
                    <Route path="add" element={<AddProduct user={logedInUser} />} />
                    <Route path=":productId" element={<Product user={logedInUser} />} />
                  </Route>
                  <Route path="reservations" element={<Reservations />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Route>
              </Routes>
            }
          />
        ) : (
          <Route path="*" element={<Outlet />}>
            <Route path="login" element={<Login setUser={setLogedInUser} />} />
            <Route path="signup" element={<SignUp setUser={setLogedInUser} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
