import express from "express";
import RedisService from "./redis.config";
import publisher from "./publisher";
import db from "./Configs/db";
import SocketConfig from "./socket.config";

const app = express();

app.post("/", async (req, res) => {
  try {
    const { product_id, product_title, user_id, shop_id, username } = req.body;
    const addReservationQuery = `INSERT INTO reservations SET product_id = ?, user_id = ? , status='pending'`;
    const [addReservationResult]: any = await db.query(addReservationQuery, [product_id, user_id]);

    if (addReservationResult.insertId) {
      publisher.publish("newReservation", JSON.stringify({ message: `${product_title} has been reserved by ${username}`, user_id: user_id, product_id: product_id, shop_id: shop_id }));
      res.status(200).send({ message: `${product_title} has been reserved` });
    } else {
      res.status(422).send({ message: "Failed to add reservation" });
    }
  } catch (err) {
    throw err;
  }

  // RedisService.initRedis().then((redisClient: any) => {
  // redisClient.hGetAll("SocketIds").then((socketIds: any) => {
  //   const socket = SocketConfig.getInstance();
  //   publisher.publish("sms", JSON.stringify(message));
  //   socket.io.to(socketIds[userId]).emit("liveNotification", message);
  // });
  // redisClient.sMembers(userId.toString()).then((socketIds: any) => {
  //   const socket = SocketConfig.getInstance();
  //   publisher.publish("sms", JSON.stringify(message));
  //   socket.io.to(socketIds).emit("liveNotification", message);
  // });
  // });
});

export default app;
