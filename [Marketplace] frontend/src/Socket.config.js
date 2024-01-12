import { io } from "socket.io-client";

export default class Socket {
  static socket;

  constructor() {}
  static getConnection(username) {
    Socket.socket = io("http://localhost:5009", {
      query: {
        username: username,
      },
    });
  }

  static disconnect() {
    Socket.socket.disconnect();
    Socket.socket = undefined;
  }
}
