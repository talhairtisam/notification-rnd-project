import { io } from "socket.io-client";

export default class Socket {
  static socket;

  constructor() {}
  static getConnection(userId) {
    Socket.socket = io("http://localhost:5009", {
      query: {
        userId: "marketplace:" + userId,
      },
    });
  }

  static disconnect() {
    Socket.socket.disconnect();
    Socket.socket = undefined;
  }
}
