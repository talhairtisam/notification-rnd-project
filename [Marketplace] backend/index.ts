import express from "express";
import cors from "cors";
import { createServer } from "http";
import RedisService from "./redis.config";
// import subscriber from "./subscriber";
import reservation from "./reservation";
import SocketConfig from "./socket.config";
import users from "./users";
import product from "./products";

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
  const { userId } = socket.handshake.query;
  if (userId) {
    RedisService.initRedis().then((redisClient: any) => {
      redisClient.sAdd(userId, socket.id);
      socket.emit("initiate", "Welcome to Socket Connection");
    });
  }

  socket.on("disconnect", () => {
    if (userId) {
      RedisService.initRedis().then((redisClient: any) => {
        redisClient.sRem(userId, socket.id);
        console.log("Sockets Disconnected.");
      });
    }
  });
});

app.use("/reserve", reservation);
app.use("/users", users);
app.use("/products", product);

httpServer.listen(5009, () => {
  console.log("listening on port 5009");
});
