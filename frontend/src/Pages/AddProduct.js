import React from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
      <div>
        <form>
          <input type="text" placeholder="Product Name" />
        </form>
      </div>
    </div>
  );
}
