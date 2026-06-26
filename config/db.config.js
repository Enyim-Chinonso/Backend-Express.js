const mongoose = require("mongoose")

const dotenv = require("dotenv");
dotenv.config();

const url = process.env.MONGO_PROD_URI

const connectDB = async() => {
    try{
        await mongoose.connect(url)
        console.log("MONGODB CONNECTED SUCCESSFULLY")
    }catch(err) {
        console.log("MongoDB connection error:", err.message);
        process.exit(1);
    }
}

module.exports = connectDB