import React from "react";
import Socket from "../utils/Socket.config";
import { Outlet, useNavigate } from "react-router";

export default function Home({ setUser, user }) {
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
        </div>
        <div>
          <h1>
            [User:{user.first_name}]{"   "}
            <button
              onClick={() => {
                Socket.disconnect();
                setUser(undefined);
                navigate("/login");
              }}
            >
              Logout
            </button>
          </h1>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
