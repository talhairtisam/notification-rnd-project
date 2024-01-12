import React from "react";
import Notifications from "../Components/Notifications";
import { Outlet, useNavigate } from "react-router-dom";

export default function Home({}) {
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex" }}>
      <div style={{ height: "100vh", width: "70%" }}>
        <div style={{ display: "flex" }}>
          MENU:
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            HOME
          </button>{" "}
          <button
            onClick={() => {
              navigate("/products");
            }}
          >
            PRODUCTS
          </button>{" "}
          <button
            onClick={() => {
              navigate("/reservations");
            }}
          >
            RESERVATIONS
          </button>
          <button
            onClick={() => {
              //   navigate("/reservations");
            }}
          >
            Logout
          </button>
        </div>
        <Outlet />
      </div>
      <div style={{ height: "100vh", width: "30%", borderLeft: "black solid 1px" }}>
        <Notifications />
      </div>
    </div>
  );
}
