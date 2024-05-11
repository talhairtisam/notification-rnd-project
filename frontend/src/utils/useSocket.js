import { io } from "socket.io-client";

let socket = null;

export const useSocket = () => {
  const getConnecion = (userId) => {
    if (!userId) {
      throw new Error("userId is required");
    }
    if (!socket) {
      socket = io("http://localhost:5008", {
        query: {
          userId: "seller:" + userId,
        },
      });
    }
    return socket;
  };
  const disconnect = () => {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  };
  return { getConnecion, disconnect };
};
