import React, { useEffect, useState } from "react";
import Socket from "../utils/Socket.config";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <h2>LOGIN</h2>
      <form>
        <input type="text" placeholder="username: alpineShop" onChange={(e) => setUsername(e.target.value)} value={username} />
        <button
          onClick={(e) => {
            e.preventDefault();
            if (username.length > 0) {
              Socket.getConnection(username);
              setUser(username);
              navigate("/");
            }
          }}
        >
          Login
        </button>
      </form>
      <Link to="/signup">Signup</Link>
    </div>
  );
}
