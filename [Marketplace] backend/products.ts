import express from "express";
import pool from "./Configs/db";

const app = express();
app.get("/", async (req, res) => {
  try {
    const [products]: any = await pool.query("SELECT * FROM products");
    if (products.length === 0) {
      return res.status(204).send({ error: "No products found", products: null });
    } else {
      return res.status(200).send({ error: "Products fetched Successfully", products: products });
    }
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// app.post("/",  (req, res) => {
//   try {
//     const { title, price } = req.body;

//     if (!title || !price) {
//       return res.status(400).json({ error: "Product name and price are required" });
//     }

//      pool.query('INSERT INTO products (title, price) VALUES (?, ?)', [title, +price]);

//     res.status(201).json({ message: "Product added successfully" });
//   } catch (err) {
//     console.error("Error adding product:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

export default app;
