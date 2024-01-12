import React, { useEffect, useState } from "react";
import Socket from "./Socket.config";

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");

  return (
    <div>
      <h2>LOGIN</h2>
      <form>
        <input type="text" placeholder="username: 'alileo102'" onChange={(e) => setUsername(e.target.value)} value={username} />
        <button
          onClick={(e) => {
            e.preventDefault();
            if (username.length > 0) {
              Socket.getConnection(username);
              setUser(username);
            }
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
