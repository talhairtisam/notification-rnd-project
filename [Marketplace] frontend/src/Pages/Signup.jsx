import React, { useEffect, useState } from "react";
import Socket from "../utils/Socket.config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup({ setUser }) {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [Last_name, setLastName] = useState("");
  const navigate = useNavigate();

  const createUser = async (e) => {
    try {
      e.preventDefault();
      if (username.length > 0) {
        const res = await axios.post(`http://localhost:5009/users/signup`, { username: username, first_name: firstName, last_name: Last_name });
        setUser(res.data.user);
        Socket.getConnection(res.data.user.user_id);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={createUser}>
        <input type="text" placeholder="username'" onChange={(e) => setUsername(e.target.value)} value={username} />
        <br />
        <input type="text" placeholder="first name'" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
        <br />
        <input type="text" placeholder="last name'" onChange={(e) => setLastName(e.target.value)} value={Last_name} />
        <br />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}
