import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Products({ user }) {
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5008/products/${user.shop_id}/get`);
        setProducts(response.data.data);
      } catch (err) {
        setError(err.response.data.message);
      }
    };
    if (user && user.shop_id) {
      fetchProducts();
    }
  }, [user]);
  return (
    <div>
      <h1>
        Products <button onClick={() => navigate("/products/add")}>ADD</button>
      </h1>
      <div>
        <ul>
          {products.length > 0 &&
            products.map((product, index) => (
              <li key={index}>
                <List product={product} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

const List = ({ product }) => {
  const navigate = useNavigate();

  return (
    <span>
      {product.title}
      {"  "}
      <button onClick={() => navigate(`/products/${product.product_id}`)}>View</button> <button>Remove</button>
    </span>
  );
};
