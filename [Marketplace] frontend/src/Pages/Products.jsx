import React, { useEffect, useState } from "react";
import Socket from "../utils/Socket.config";
import axios from "axios";
import { Form } from "react-router-dom";
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
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      await axios
        .get(`http://localhost:5009/products`)
        .then((res) => {
          setProducts(res.data.products);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getProduct();
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products?.map((product, index) => (
          <li key={index}>
            <List product={product} user={user} />
          </li>
        ))}
      </ul>
    </div>
  );
}

const List = ({ product, user }) => {
  return (
    <span>
      {product?.title} (of Shop {product?.shop_id}) - <strong>Price:{product?.price}</strong>
      {"    "}
      <button
        onClick={() => {
          axios.post(`http://localhost:5009/reserve`, { product_id: product.product_id, product_title: product.title, user_id: user.user_id, shop_id: product.shop_id, username: user.username });
        }}
      >
        Reserve
      </button>
    </span>
  );
};
