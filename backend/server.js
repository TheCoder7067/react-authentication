import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors({
    origin: "https://authentication-web-1c2r.onrender.com", 
    // origin: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }));

const uploadPath = path.join(process.cwd(), "uploads", "users");

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
    console.log("✅ Uploads/users folder created successfully!");
} else {
    console.log("📂 Uploads folder already exists.");
}
app.use("/uploads", express.static("uploads"));
import userRoute from "./routes/web/userRoute.js";

const connectDB = async () => {
	try{
       await mongoose.connect(process.env.MONGO_URI);
       console.log("MongoDB Connected...")
	}catch(error){
	   console.log("Mongoose Connection Failed!", error);
	   process.exit(1);
	}
}
connectDB();

app.get('/', (req, res) => {
	res.send("Welcome to Authentication Home! Server is Live 🚀");
});

app.use('/api', userRoute); 

const PORT  = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running at: http://localhost:${PORT}/`);
})
