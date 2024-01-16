import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Product({ user }) {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5008/products/${user.shop_id}/${productId}`);
        console.log(response.data);
        setProduct(response.data.product);
      } catch (err) {}
    };

    if (user && user.shop_id && productId) {
      fetchProduct();
    }
  }, [user, productId]);

  return (
    <div>
      <div style={{ padding: "10px 0" }}>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          Back to All Products
        </button>
      </div>
      {product ? (
        <div style={{ padding: "0 100px" }}>
          <h1>{product.title}</h1>
          <h3>{product.price}</h3>
          <button>Remove</button>
        </div>
      ) : (
        <h1 style={{ color: "green" }}>Product not found</h1>
      )}
    </div>
  );
}
