const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const connectDB = require('./config/db.config');
const User = require("./models/user.model")
const authRoute = require("./routes/auth.route")
// const userRoute = require("./routes/user.route")

dotenv.config();

const app = express();
app.use(express.json());


connectDB()

app.use("/api", authRoute)



// Register user
// app.post("/register", async (req, res) => {
   
// });



// Login user
// app.post("/login", async(req, res) => {
    
// })










// Update user
// app.patch("/user/:id", async (req, res) => {
//   const { id } = req.params;
//   const { name, email } = req.body;
// 9
//   try {
//     const user = await User.findByIdAndUpdate(
//       id,
//       { name, email },
//       { new: true }
//     );

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json({
//       message: "User updated successfully",
//       user
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });





// Delete user
// app.delete("/user/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const user = await User.findByIdAndDelete(id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json({ message: "User deleted successfully" });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });



// mongoose.connect('mongodb://localhost:27017/express-class')
//   .then(() => console.log('MongoDB connected successfully'))
//   .catch(error => console.log(error));

  app.listen(6000, () => {
    console.log(`Server is running on http://localhost:6000`);
});