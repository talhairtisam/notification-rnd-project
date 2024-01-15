import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct({ user }) {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [formInput, setFormInput] = useState({ title: "", price: "" });
  const handleInputOnChange = (e) => {
    setFormInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (formInput.title.length > 0 && formInput.price.length > 0 && +formInput.price > 0) {
        const response = await axios.post("http://localhost:5008/products/add/" + user.shop_id, formInput);
        if (response.status === 200) {
          setError("");
          setFormInput({ title: "", price: "" });
          setSuccess(response.data.message);
        } else {
          setError(response.data.message);
          setSuccess("");
        }
      }
    } catch (err) {
      setSuccess("");
      setError(err.response.data.message);
    }
  };
  return (
    <div>
      <div>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
      <div>
        <p style={{ color: error.length > 0 ? "red" : success.length > 0 ? "green" : "black" }}>{(error.length > 0 && error) || (success.length > 0 && success)}</p>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Product Name" value={formInput.title} name="title" onChange={handleInputOnChange} />
          <br />
          <input type="number" placeholder="Price" value={formInput.price} name="price" onChange={handleInputOnChange} />
          <br />
          <button>Add</button>
        </form>
      </div>
    </div>
  );
}
