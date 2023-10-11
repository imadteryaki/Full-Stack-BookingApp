import express from "express";
import dotenv from "dotenv";
import mongoose, { disconnect } from "mongoose";
import { connect, closeConnection } from "./configs/db.js"; 
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
const app = express();

mongoose.connection.on("disconnected",()=>{
    console.log('MongoDB is disconnected')
});
mongoose.connection.on("connected",()=>{
    console.log('MongoDB is connected')
});

// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err,req,res,next) =>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success:false,
        status: errorStatus,
        message:errorMessage,
        stack: err.stack
    })
})

const port = process.env.PORT;
app.listen(port, () => {
    connect();
    console.log(`Server is running on port ${port}`);
});

