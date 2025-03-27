const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const User = require("./models/users");
// const connectDB = require("./connectiondb");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5002;

 const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("MongoDB Connected Successfully!");
    } catch (error) {
      console.error("MongoDB Connection Error:", error);
      process.exit(1); // Exit process if connection fails
    }
  };

  connectDB();
   
app.post("/register", async (req, res) => {
    const { name, email, password,role } = req.body;
    try {
        const user = new User({ name, email, password,role });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
