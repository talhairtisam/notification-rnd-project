import React, { useEffect, useState } from "react";
import Socket from "./Socket.config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup({ setUser }) {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [Last_name, setLastName] = useState("");
  const navigate = useNavigate();

  const createUser = async () => {
    const res = await axios
      .post(`http://localhost:5009/signup`, { username: username, first_name: firstName, last_name: Last_name })
      .then((res) => {
        console.log(res);
        navigate("/products");
      })
      .catch((err) => {
        console.log(err);
      });
      return res
  };
  

  return (
    <div>
      <h2>Signup</h2>
      <form>
      <input type="text" placeholder="username'" onChange={(e) => setUsername(e.target.value)} value={username} />
      <input type="text" placeholder="first name'" onChange={(e) => setFirstName(e.target.value)} value={firstName} />

        <input type="text" placeholder="last name'" onChange={(e) => setLastName(e.target.value)} value={Last_name} />

        <button
          onClick={(e) => {
            e.preventDefault();
            if (username.length > 0) {
              Socket.getConnection(username);
              createUser();
            }

          }}
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
