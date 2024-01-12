import SocketConfig from "../utils/socket.config";
import subscriber from "../utils/pubsub/subscriber";
import RedisService from "../utils/redis.config";

const reservationSubscriber = () => {
  const socketInstance = SocketConfig.getInstance();
  subscriber.subscribe("sms", (responseBody: string) => {
    const body = JSON.parse(responseBody);
    RedisService.initRedis().then((redisClient: any) => {
      redisClient.sMembers(body.userId.toString()).then((socketIds: any) => {
        // console.log(body.userId, socketIds);
        if (socketIds.length > 0) {
          socketInstance.io.to(socketIds).emit("liveNotification", body.message);
        }
      });
    });
    // socketInstance.io.emit("liveNotification", body.message);
    // console.log(body, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  });
};

export default reservationSubscriber;
