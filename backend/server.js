import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors({
    // origin: "https://authentication-web-1c2r.onrender.com", 
    origin: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }));

app.use("/uploads", express.static("uploads"));
import userRoute from "./routes/web/userRoute.js";

const connectDB = async () => {
	try{
       await mongoose.connect(process.env.MONGO_URI);
       console.log("MongoDB Connected...")
	}catch(error){
	   console.log("Mongoose Connection Failed!", error);
	}
}
connectDB();

app.get('/', (req, res) => {
	res.send("Welcome to Authentication Home!");
});

app.use('/api', userRoute); 

const PORT  = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running at: http://localhost:${PORT}/`);
})
