import express from "express";
import notifications from "../models/notifications.model";
import RedisService from "../utils/redis.config";
import SocketConfig from "../utils/socket.config";

const app = express();

app.get("/:userId/get", async (req, res) => {
  const { userId } = req.params;
  const result = await notifications.getAll(+userId);
  if (result.length > 0) {
    res.status(200).send({ message: "All notifications fetched!", notifications: result });
  } else {
    res.status(204).send({ message: "No notifications available yet!", notifications: null });
  }
});
app.post("/:userId/:notificationId/mark-as-read", async (req, res) => {
  const { userId, notificationId } = req.params;
  const result = await notifications.markAsRead(+notificationId);
  const socket = SocketConfig.getInstance();
  if (result) {
    RedisService.initRedis().then((redisClient: any) => {
      redisClient.sMembers("seller:" + userId).then((socketIds: any) => {
        socket.io.to(socketIds).emit("updateNotification", notificationId);
      });
    });
    res.status(200).send({ message: "Notification marked as Read!" });
  } else {
    res.status(204).send({ message: "Not Updated!" });
  }
});

export default app;
