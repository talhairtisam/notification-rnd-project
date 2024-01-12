import { createClient } from "redis";

class Publisher {
  client: any;
  constructor() {
    this.client = createClient();
    this.client.on("error", (err: any) => console.log("Redis Client Error", err));
    this.client.connect();
  }

  publish(channel: string, message: string) {
    console.log(`Publishing on ${channel}`);
    return this.client.publish(channel, message);
  }
}

export default new Publisher();
