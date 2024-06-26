import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Socket from "../utils/Socket.config";
import { useSocket } from "../utils/useSocket";

export default function SignUp({ setUser }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formInput, setFormInput] = useState({ username: "", first_name: "", last_name: "", shop_name: "" });
  const socket = useSocket();
  const handleInputOnChange = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (formInput.username.length > 0 && formInput.first_name.length > 0 && formInput.last_name.length > 0 && formInput.shop_name.length > 0) {
        const response = await axios.post("http://localhost:5008/users/signup", formInput);
        setUser(response.data.data);
        setError("");
        socket.getConnecion(response.data.data.user_id);
        setFormInput({ username: "", first_name: "", last_name: "", shop_name: "" });
        navigate("/");
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => navigate(-1)}>back to Login</button>
      </div>
      <div>
        <h1>SignUp</h1>
        <p style={{ color: "red" }}>{error.length > 0 && error}</p>
        <form onSubmit={handleSubmit}>
          <input type="text" name="shop_name" placeholder="Shop Name: alpineShop" value={formInput.shop_name} onChange={handleInputOnChange} />
          <br />
          <input type="text" name="username" placeholder="username: alpineshop1" value={formInput.username} onChange={handleInputOnChange} />
          <br />
          <input type="text" name="first_name" placeholder="first name: Ali" value={formInput.first_name} onChange={handleInputOnChange} />
          <br />
          <input type="text" name="last_name" placeholder="last name: Haseeb" value={formInput.last_name} onChange={handleInputOnChange} />
          <br />
          <button type="submit">SignUp</button>
        </form>
      </div>
    </div>
  );
}
