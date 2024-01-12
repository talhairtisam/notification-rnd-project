import { createClient } from "redis";
const initRedis = () => {
  const client = createClient({ url: "redis://localhost:6379" });
  client.connect();
  return new Promise((res, rej) => {
    client.on("connect", function () {
      console.log("Connected to redis");
      res(client);
    });
    client.on("error", function (err) {
      console.log("Error while Connecting to redis: ", err);
      rej(err);
    });
  });
};

export default { initRedis };
