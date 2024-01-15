import express from "express";
import pool from "./Configs/db";


const app=express();

// Assuming your user data has an 'id' property
interface User {
    id: number;
    // other properties depending on your actual user data
  }
  

app.post("/", async (req, res) => {
    try {
      const { username } = req.body;
  
      const user: any = await pool.query('SELECT * FROM marketplace_users WHERE username = ? ', [username]);
  
      if (user.length > 0) {
        res.json({ message: "User signed in successfully" });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
      
    } catch (error) {
      console.error("Error in sign-in:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  export default app