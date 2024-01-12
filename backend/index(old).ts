import express from "express";
const app = express();

import publisher from "./utils/pubsub/publisher";
import subscriber from "./utils/pubsub/subscriber";
subscriber.subscribe();
const port = 3000;

app.get("/", (req: any, res: any) => {
  const { channel, message } = req.query;

  let m = {
    from: "test@example.com",
    type: "investmentRecipiet",
    body: message,
    to: "investor@tld.com",
  };

  // publisher.publish(channel, JSON.stringify(m));
  publisher.publish("sms", JSON.stringify(m));
  // publisher.publish('email', JSON.stringify(m));

  res.send(JSON.stringify(req.query));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
