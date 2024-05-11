import React, { useEffect, useState } from "react";
// import Socket from "../utils/Socket.config";
import { useSocket } from "../utils/useSocket";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login({ setUser }) {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const socket = useSocket();
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      if (username.length > 0) {
        const response = await axios.post("http://localhost:5008/users/login", { username });
        if (response.data.user) {
          socket.getConnecion(response.data.user.user_id);
          setUser(response.data.user);
          setUsername("");
          navigate("/");
        } else {
          setError(response.data.message);
        }
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  return (
    <div>
      <h2>LOGIN</h2>
      <p style={{ color: "red" }}>{error.length > 0 && error}</p>
      <form>
        <input type="text" placeholder="username: alpineShop" onChange={(e) => setUsername(e.target.value)} value={username} />
        <button onClick={handleLogin}>Login</button>
      </form>
      <Link to="/signup">Signup</Link>
    </div>
  );
}
