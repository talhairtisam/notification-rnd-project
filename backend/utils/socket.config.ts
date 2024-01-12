import { Server } from "socket.io";

export default class SocketConfig {
  static _app: any;
  static _instance: SocketConfig;
  io: any;

  constructor() {
    this.io = this.setupConfig();
  }

  static setSocketApp(app: any) {
    console.log("server passed to Socket");
    SocketConfig._app = app;
  }

  static getInstance() {
    if (!SocketConfig._instance && SocketConfig._app) {
      SocketConfig._instance = new SocketConfig();
    }
    return SocketConfig._instance;
  }
  setupConfig() {
    const io = new Server(SocketConfig._app, {
      cors: {
        origin: "*",
      },
    });
    console.log("socket connection up and running");
    return io;
  }
}
