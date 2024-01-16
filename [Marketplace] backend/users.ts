import express from "express";
import pool from "./Configs/db";

const app = express();

// Assuming your user data has an 'id' property
interface User {
  id: number;
  // other properties depending on your actual user data
}

app.post("/signin", async (req, res) => {
  try {
    const { username } = req.body;

    const [user]: any = await pool.query("SELECT * FROM marketplace_users WHERE username = ? ", username);
    if (user.length > 0) {
      res.json({ message: "User signed in successfully", user: user[0] });
    } else {
      res.status(401).json({ error: "Invalid credentials", user: null });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { username, first_name, last_name } = req.body;
    const [result]: any = await pool.query("INSERT INTO  marketplace_users (username, first_name, last_name) VALUES (?, ?, ?)", [username, first_name, last_name]);
    res.status(201).json({ message: "User signed up successfully", user: { user_id: result.insertId, username, first_name, last_name } });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default app;
