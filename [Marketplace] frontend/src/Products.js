import React, { useEffect, useState } from "react";
import Socket from "./Socket.config";
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
  const [Pname, setPName] = useState("");
  const [price, setPrice] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [data,setData]=useState()
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Use name to distinguish between different input fields
    if (name === "productName") {
      setPName(value);
    } else if (name === "price") {
      setPrice(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:5009/products`, { title: Pname, price: price,shop_id: 2});
    setIsSubmitted(true)
  };

  const getProduct=async()=>{
    await axios.get(`http://localhost:5009/products`).then((res)=>{
      setData(res.data[0])
    }).catch((err)=>{
      console.log(err)
    })
    
  }
  useEffect(()=>{
  
    getProduct()
  },[isSubmitted])


  console.log(data);

  return (
    <div>
      <h2>Products</h2>
      <ul>
    
        {data?.map((product) => (
          <li key={product.id}>
            {product?.title} (of user {product?.shop_id}) - <strong>{product?.price}</strong>
            {"    "}
            <button
              onClick={() => {
                axios.post(`http://localhost:5009/reserve`, { userId: product.shop_id, productId: product.id, productName: product.title, username: user });
              }}
            >
              Reserve
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="product name" name="productName" value={Pname} onChange={handleChange} />
        <input type="number" placeholder="price" name="price" value={price} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
