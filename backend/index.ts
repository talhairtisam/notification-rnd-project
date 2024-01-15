import express from "express";
import cors from "cors";
import { createServer } from "http";
import RedisService from "./utils/redis.config";
// import subscriber from "./subscriber";
// import reservation from "./reservation";
import SocketConfig from "./utils/socket.config";
import reservationSubscriber from "./subscribers/reservation.subscriber";
import users from "./controllers/users.controller";
import products from "./controllers/products.controller";

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);

SocketConfig.setSocketApp(httpServer);
const socketInstance = SocketConfig.getInstance();

// subscriber.subscribe("sms", (message: string) => {
//   console.log(message, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
// });

reservationSubscriber();

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

app.use("/users", users);
app.use("/products", products);

app.use((err: any, req: any, res: any, next: any) => {
  // if (err.code === 401) {
  //   err.status = 401;
  //   const origin = req.get("origin");
  //   if (!origin) {
  //     res.clearCookie("accessToken", domain(process.env.NODE_ENV.replace(" ", "")));
  //   } else {
  //     res.clearCookie(process.env.SELLER_ACCESS_TOKEN, domain(process.env.NODE_ENV.replace(" ", "")));
  //   }
  // }
  // if (err.isJoi) err.status = 422;
  return res.status(err.status || 500).send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

httpServer.listen(5008, () => {
  console.log("listening on port 5008");
});
