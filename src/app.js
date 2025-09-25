import express from "express";
import dotenv from "dotenv";
import cors from "cors";    

import connectDB from "./config/connectDB.js";
import apiRouter from "./routes/index.route.js";

const app=express();
dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const PORT=process.env.PORT || 5000;

app.use("/api",apiRouter)


app.listen(PORT,()=>{
   console.log(`Server is running on port ${PORT}`);
})

