import express from "express";
import cors from "cors";
import { createServer } from "http";
import RedisService from "./redis.config";
// import subscriber from "./subscriber";
import reservation from "./reservation";
import SocketConfig from "./socket.config";

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);

SocketConfig.setSocketApp(httpServer);
const socketInstance = SocketConfig.getInstance();

// subscriber.subscribe("sms", (message: string) => {
//   console.log(message, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
// });

socketInstance.io.on("connection", (socket: any) => {
  const { username } = socket.handshake.query;
  if (username) {
    RedisService.initRedis().then((redisClient: any) => {
      redisClient.sAdd(username, socket.id);
      socket.emit("initiate", "Welcome to Socket Connection");
    });
  }

  socket.on("disconnect", () => {
    if (username) {
      RedisService.initRedis().then((redisClient: any) => {
        redisClient.sRem(username, socket.id);
        console.log("Sockets Disconnected.");
      });
    }
  });
});

app.use("/reserve", reservation);

httpServer.listen(5009, () => {
  console.log("listening on port 5009");
});
