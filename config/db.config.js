const mongoose = require("mongoose")

const connectDB = async() => {
    try{
        await mongoose.connect("mongodb://localhost:27017/expressclass")
        console.log("MONGODB CONNECTED SUCCESSFULLY")
    }catch(error){
        console.log(error.message)
        process.exit(1)
    }
}

module.exports = connectDB