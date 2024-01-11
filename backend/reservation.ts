import express from "express";
import RedisService from "./redis.config";
import publisher from "./publisher";
import SocketConfig from "./socket.config";

const app = express();

app.post("/", (req, res) => {
  const { userId, message } = req.body;
  RedisService.initRedis().then((redisClient: any) => {
    // redisClient.hGetAll("SocketIds").then((socketIds: any) => {
    //   const socket = SocketConfig.getInstance();
    //   publisher.publish("sms", JSON.stringify(message));
    //   socket.io.to(socketIds[userId]).emit("liveNotification", message);
    // });
    redisClient.sMembers(userId.toString()).then((socketIds: any) => {
      const socket = SocketConfig.getInstance();
      publisher.publish("sms", JSON.stringify(message));
      socket.io.to(socketIds).emit("liveNotification", message);
    });
  });

  res.send({ message });
});

export default app;
