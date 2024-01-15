import express from "express";
// import RedisService from "../utils/redis.config";
// import publisher from "../utils/pubsub/publisher";
import SocketConfig from "../utils/socket.config";
import Users from "../models/users.model";

const app = express();

app.post("/signup", async (req, res, next) => {
  try {
    const { shop_name, ...user } = req.body;
    const result = await Users.signup(shop_name, user);
    res.status(200).send({ message: "User signed up successfully", data: result });
  } catch (err) {
    next(err);
  }
});

app.post("/login", async (req, res, next) => {
  try {
    const { username } = req.body;
    const result = await Users.login(username);
    if (result.length > 0) {
      res.status(200).send({ message: "User Login successfully", status: "success", user: result[0] });
    } else {
      res.status(401).send({ message: "Incorrect username", status: "failed", user: null });
    }
  } catch (err) {
    next(err);
  }
});

export default app;
