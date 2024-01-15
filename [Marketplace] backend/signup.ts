import express from "express";
import pool from "./Configs/db";

const app=express();


app.post("/", async (req, res) => {
    try {
      const { username,first_name,last_name} = req.body;
      
      const result = await pool.query('INSERT INTO  marketplace_users (username, first_name, last_name) VALUES (?, ?, ?)', [first_name,last_name,username]);
  
      res.status(201).json({ message: "User signed up successfully" });
    } catch (error) {
      console.error("Error in sign-up:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  export default app