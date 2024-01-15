import React, { useEffect, useState } from "react";
import Socket from "./Socket.config";
import axios from "axios";

export default function Login({user ,setUser }) {
  const [username, setUsername] = useState("");

  // const getUser=async ()=>{
  //   await axios.post('http://localhost:5009/signin',{username:username}).then((res)=>{
  //     Socket.getConnection(username);

  //     setUser(res)
      
  //   }).catch((err)=>{
  //     console.log(err)
  //   })
  // }

  // useEffect(()=>{
  //   getUser()
  // },[])



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
                      }
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
