import React, { useEffect, useState } from "react";
import Socket from "../utils/Socket.config";
import axios from "axios";

export default function Notifications({ user }) {
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    if (Socket.socket) {
      Socket.socket.on("initiate", (data) => {
        setNotification(data.notifications);
      });
      Socket.socket.on("liveNotification", (data) => {
        setNotification((prev) => [...prev, data]);
      });
      Socket.socket.on("updateNotification", (data) => {
        console.log("dddddd", data);
        setNotification((prev) => prev.map((noti) => (+noti.notification_id === +data ? { ...noti, is_read: true } : noti)));
      });
    }
    return () => {
      if (Socket.socket) {
        Socket.socket.off("liveNotification");
        Socket.socket.off("initiate");
        Socket.socket.off("updateNotification");
      }
    };
  }, [Socket.socket]);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notification.map((noti, index) => (
          <li key={index}>
            <List data={noti} shopId={user.shop_id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

const List = ({ data, shopId }) => {
  const markAsRead = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5008/notifications/${shopId}/${data.notification_id}/mark-as-read`);
    } catch (err) {}
  };
  return (
    <span>
      {data.message}
      {data.is_read ? <></> : <button onClick={markAsRead}>Mark as read</button>}
    </span>
  );
};
