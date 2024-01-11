import { useState } from "react";
import { io } from "socket.io-client";

const useSocket = () => {
  const [socket, setSocket] = useState();
  const getConnecion = (userId) => {
    setSocket(io("http://localhost:5008", { query: { userId: userId } }));
  };

  const disconnect = () => {
    socket.disconnect();
    setSocket(undefined);
  };

  return { socket, getConnecion, disconnect };
};

export default useSocket;
