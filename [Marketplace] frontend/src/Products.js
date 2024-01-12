import React, { useEffect, useState } from "react";
import Socket from "./Socket.config";
import axios from "axios";

const productList = [
  {
    id: 1,
    name: "Product 1",
    price: 100,
    userId: 1,
  },
  {
    id: 2,
    name: "Product 2",
    price: 200,
    userId: 2,
  },
  {
    id: 3,
    name: "Product 3",
    price: 300,
    userId: 3,
  },
  {
    id: 4,
    name: "Product 4",
    price: 100,
    userId: 1,
  },
  {
    id: 5,
    name: "Product 5",
    price: 200,
    userId: 2,
  },
  {
    id: 6,
    name: "Product 6",
    price: 300,
    userId: 3,
  },
  {
    id: 7,
    name: "Product 7",
    price: 100,
    userId: 1,
  },
  {
    id: 8,
    name: "Product 8",
    price: 200,
    userId: 1,
  },
  {
    id: 9,
    name: "Product 9",
    price: 300,
    userId: 2,
  },
  {
    id: 10,
    name: "Product 10",
    price: 100,
    userId: 3,
  },
  {
    id: 11,
    name: "Product 11",
    price: 200,
    userId: 3,
  },
  {
    id: 12,
    name: "Product 12",
    price: 300,
    userId: 4,
  },
];
export default function Products({ user }) {
  return (
    <div>
      <h2>Products</h2>
      <ul>
        {productList.map((product) => (
          <li key={product.id}>
            {product.name} (of user {product.userId}) - <strong>{product.price}</strong>
            {"    "}
            <button
              onClick={() => {
                axios.post(`http://localhost:5009/reserve`, { userId: product.userId, productId: product.id, productName: product.name, username: user });
              }}
            >
              Reserve
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
