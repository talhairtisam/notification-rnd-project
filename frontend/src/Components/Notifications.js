import React, { useEffect, useState } from "react";
import Socket from "../utils/Socket.config";

export default function Notifications() {
  // const { socket, getConnecion, disconnect } = useSocket();
  // const { socket } = new Socket();

  const [notification, setNotification] = useState([]);

  useEffect(() => {
    if (Socket.socket) {
      Socket.socket.on("liveNotification", (data) => {
        setNotification((prev) => [...prev, data]);
      });
    }
    return () => {
      if (Socket.socket) {
        Socket.socket.off("liveNotification");
      }
    };
  }, [Socket.socket]);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notification.map((noti) => (
          <li>{noti}</li>
        ))}
      </ul>
    </div>
  );
}
