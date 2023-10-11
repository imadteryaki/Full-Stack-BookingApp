import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("connected to MongoDB")
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const closeConnection = async () => {mongoose.connection.close()}

export {connect, closeConnection}