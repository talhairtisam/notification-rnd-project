import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Products() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>
        Products <button onClick={() => navigate("/products/add")}>ADD</button>
      </h1>
    </div>
  );
}
