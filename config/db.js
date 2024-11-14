
import mongoose from "mongoose";
import colors from 'colors'


const connectDB = async (params) => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to db ${mongoose.connection.host}`.bgMagenta.white);
        
    } catch (error) {
        console.log(`Mongo DB error : ${error}`.bgRed.white);
        
    }
}

export default connectDB;