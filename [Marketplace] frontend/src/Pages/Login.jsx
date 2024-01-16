import React, { useEffect, useState } from "react";
import axios from "axios";
import Socket from "../utils/Socket.config";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ user, setUser }) {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const getUser = async (e) => {
    try {
      e.preventDefault();
      if (username.length > 0) {
        const res = await axios.post("http://localhost:5009/users/signin", { username: username });
        Socket.getConnection(res.data.user.user_id);
        setUser(res.data.user);
        navigate("/");
      }
    } catch (err) {}
  };

  return (
    <div>
      <h2>LOGIN</h2>
      <form onSubmit={getUser}>
        <input type="text" placeholder="username: 'alileo102'" onChange={(e) => setUsername(e.target.value)} value={username} />
        <button type="submit">Login</button>
      </form>
      <Link to="/signup">Signup</Link>
    </div>
  );
}
