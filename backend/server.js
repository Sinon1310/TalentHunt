const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5002;

 //Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
   .catch(err => console.log(err));
   

// Basic Route
app.get("/", (req, res) => {
    res.send("API is running...");
});

app.post('/student_api/signup', async (req, res) => {
    const { student_name,student_email, student_password ,role} = req.body;

    if (!student_email || !student_password) {
        return res.status(400).json({ error: "Missing email or password" });
    }

    try {
        //const newStudent = new Student({ email: student_email, password: student_password });
        //await newStudent.save();
        res.status(201).json({ message: "Student registered successfully" });
        console.log(student_email+" "+student_password+" "+role+" "+student_name);
    } catch (error) {
        console.error("Error saving student:", error);
        res.status(500).json({ error: "Failed to register student" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
