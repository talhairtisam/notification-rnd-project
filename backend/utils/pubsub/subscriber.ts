import async from "async";
import channels from "../channels";
import { createClient } from "redis";

class Subscriber {
  client: any;
  constructor() {
    this.client = createClient();
    this.client.on("error", (err: any) => console.log("Redis Client Error", err));
    this.client.connect();
  }

  subscribe = async (channel: string, callback: any) => {
    await this.client.subscribe(channel, callback);
  };
  subscribeAllChannels = async () => {
    await async.eachSeries(channels, async (channel) => {
      console.log(channels, "?????");

      await this.client.subscribe(
        channels,
        (message: string, channel: string) => {
          const c = channel.toString();
          switch (c) {
            case "sms":
              console.log(message.toString(), ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", channel.toString());
              break;
            case "email":
              console.log(message.toString(), ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", channel.toString());
              break;
            case "slack":
              console.log(message.toString(), ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", channel.toString());
              break;
            default:
              console.log(message.toString(), ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", channel.toString());
          }
        },
        true,
      );
    });

    // async.eachSeries(channels, async (channel) => {
    //   await this.client.subscribe(channels, (message: string, channel: string) => {
    //     console.log(message.toString(), ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", channel.toString());
    //   }, true);
    // })
  };
}

export default new Subscriber();
