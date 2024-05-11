import React from "react";
import Notifications from "../Components/Notifications";
import { Outlet, useNavigate } from "react-router-dom";
// import Socket from "../utils/Socket.config";
import { useSocket } from "../utils/useSocket";

export default function Home({ setUser, user }) {
  const navigate = useNavigate();
  const socket = useSocket();
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
              socket.disconnect();
              setUser(undefined);
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
        <div>
          <h1>SHOP ID: {user?.shop_id}</h1>
        </div>
        <Outlet />
      </div>
      <div style={{ height: "100vh", width: "30%", borderLeft: "black solid 1px" }}>
        <Notifications user={user} />
      </div>
    </div>
  );
}
