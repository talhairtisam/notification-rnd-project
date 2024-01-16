import React, { useEffect, useState } from "react";
import Socket from "./utils/Socket.config";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

function App() {
  const [logedInUser, setLogedInUser] = useState();

  useEffect(() => {
    if (Socket.socket) {
      Socket.socket.on("initiate", (data) => {
        console.log(data);
      });
    }
    return () => {
      if (Socket.socket) {
        Socket.socket.off("initiate");
      }
    };
  }, [Socket.socket]);

  return (
    <BrowserRouter>
      <Routes>
        {logedInUser ? (
          <Route
            path="*"
            element={
              <Routes>
                <Route path="/" element={<Home setUser={setLogedInUser} user={logedInUser} />}>
                  <Route path="/products" element={<Products user={logedInUser} />} />
                </Route>
              </Routes>
            }
          ></Route>
        ) : (
          <Route
            path="*"
            element={
              <Routes>
                <Route path="/login" element={<Login setUser={setLogedInUser} />} />
                <Route path="/signup" element={<Signup setUser={setLogedInUser} />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
            }
          ></Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
