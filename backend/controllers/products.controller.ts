import express from "express";
// import RedisService from "../utils/redis.config";
// import publisher from "../utils/pubsub/publisher";
import SocketConfig from "../utils/socket.config";
import products from "../models/products.model";

const app = express();

app.get("/:shopId/get", async (req, res, next) => {
  try {
    const { shopId } = req.params;
    const result = await products.getAll(+shopId);
    if (result.length > 0) {
      res.status(200).send({ message: "All products fetched successfully!", data: result });
    } else {
      res.status(204).send({ message: "No products found for this shop", data: null });
    }
  } catch (err) {
    next(err);
  }
});
app.get("/:shopId/:productId", async (req, res, next) => {
  try {
    const { shopId, productId } = req.params;
    const result = await products.getById(+shopId, +productId);
    if (result) {
      res.status(200).send({ message: "Product fetch successfully!", product: result });
    } else {
      res.status(204).send({ message: "Invalid Product ID", product: null });
    }
  } catch (err) {
    next(err);
  }
});
app.post("/add/:shopId", async (req, res, next) => {
  try {
    const { shopId } = req.params;
    const { title, price } = req.body;
    const result = await products.add(title, +price, +shopId);
    if (result) {
      res.status(200).send({ message: "Product added successfully!", id: result });
    } else {
      res.status(204).send({ message: "Product not added!", id: null });
    }
  } catch (err) {
    next(err);
  }
});

// app.post("/login", async (req, res, next) => {
//   try {
//     const { username } = req.body;
//     const result = await Users.login(username);
//     if (result.length > 0) {
//       res.status(200).send({ message: "User Login successfully", status: "success", user: result[0] });
//     } else {
//       res.status(401).send({ message: "Incorrect username", status: "failed", user: null });
//     }
//   } catch (err) {
//     next(err);
//   }
// });

export default app;
