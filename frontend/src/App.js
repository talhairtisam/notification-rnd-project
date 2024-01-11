import React, { useEffect, useState } from "react";
// import socket from "./radis.config";
import useSocket from "./useSocket";
// import io from "socket.io-client";

function App() {
  const { socket, getConnecion, isConnected, disconnect } = useSocket();
  const [notifications, setNotifications] = useState([]);
  const [status, setStatus] = useState("Disconnected");
  const [userId, setUserId] = useState("");
  const [logedIn, setLogedIn] = useState(false);

  useEffect(() => {
    if (socket) {
      socket.on("initiate", (data) => {
        setStatus("Connected");
        console.log(data);
      });
      socket.on("liveNotification", (data) => {
        console.log(data);
        setNotifications((prevNotifications) => [...prevNotifications, data]);
      });
    }
    return () => {
      if (socket) {
        socket.off("initiate");
        socket.off("liveNotification");
      }
    };
  }, [socket]);

  return (
    <div>
      <h2>Notifications[{status}]</h2>
      {!logedIn ? (
        <form>
          <input
            type="number"
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
            }}
          />
          <button
            onClick={(e) => {
              getConnecion(userId);
              setLogedIn(true);
            }}
          >
            Login
          </button>
        </form>
      ) : (
        <>
          <h1>User LogedIn with ID: {userId}</h1>{" "}
          <button
            onClick={(e) => {
              setLogedIn(false);
              setUserId("");
              disconnect();
            }}
          >
            Logout
          </button>
        </>
      )}
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
