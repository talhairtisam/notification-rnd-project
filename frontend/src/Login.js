import React, { useEffect, useState } from "react";
import Socket from "./Socket.config";

export default function Login({ setUser }) {
  const [userId, setUserId] = useState("");

  return (
    <div>
      <h2>LOGIN</h2>
      <form>
        <input type="number" placeholder="ID: 1" onChange={(e) => setUserId(e.target.value)} value={userId} />
        <button
          onClick={(e) => {
            e.preventDefault();
            if (userId.length > 0) {
              Socket.getConnection(userId);
              setUser(userId);
            }
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
