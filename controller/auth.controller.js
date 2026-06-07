// const User = require("../models/user.model");
// const Token = require("../models/token.model");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const authService = require("../service/auth.service");

// const JWT_SECRETE = "uloease";

// // Register
// const register = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;


//     if (!name || !email || !password) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     await authService.registerUser({ name, email, password, role });

//     res
//       .status(201)
//       .send({ message: "User registration successful", name, email, role });
//   } catch (error) {
//     res
//       .status(500)
//       .json({
//         message: "An error occured while registering user",
//         error: error.message,
//       });
//   }
// };

// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       res.status(400).send({ message: "All fields are required" });
//     }

//     await authService.loginUser({ email, password });

//     return res.status(200).send({ message: "Login successful" });
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// };

// const requestPasswordReset = async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email) {
//       return res.status(400).send({ message: "Email is required" });

//       await authService.requestPasswordReset(email);
//       res.status(200).send({ message: "Password reset email sent" });
//     }
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// };


// const resetPassword = async (req, res) => {
//   try {
//     const { email, code, newPassword } = req.body;
//     if (!email || !code || !newPassword) {
//       return res.status(400).send({ message: "All fields are required" });
//     }

//     await AuthService.resetPassword({ email, code, newPassword });

//     res.status(200).send({ message: "Password reset successful" });
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// };


// // module.exports = {register, login, allUsers, myProfile}
// module.exports = { register, loginUser, requestPasswordReset, resetPassword };





const authService =
  require("../service/auth.service");



// REGISTER
const register =
  async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      role,
    } = req.body;

    if (
      !name ||
      !email ||
      !password
    ) {
      return res.status(400)
      .json({
        error:
          "All fields are required",
      });
    }

    await authService.registerUser({
      name,
      email,
      password,
      role,
    });

    res.status(201).json({
      message:
        "User registered successfully",
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });
  }
};



// LOGIN
const loginUser =
  async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;

    if (
      !email ||
      !password
    ) {
      return res.status(400)
      .json({
        error:
          "All fields are required",
      });
    }

    const result =
      await authService.loginUser({
        email,
        password,
      });

    res.status(200).json({
      message:
        "Login successful",

      token: result.token,

      user: result.user,
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });
  }
};



// REQUEST PASSWORD RESET
const requestPasswordReset =
  async (req, res) => {

  try {

    const { email } =
      req.body;

    if (!email) {
      return res.status(400)
      .json({
        error:
          "Email is required",
      });
    }

    await authService
      .requestPasswordReset(
        email
      );

    res.status(200).json({
      message:
        "Password reset code sent",
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });
  }
};



// RESET PASSWORD
const resetPassword =
  async (req, res) => {

  try {

    const {
      email,
      code,
      newPassword,
    } = req.body;

    if (
      !email ||
      !code ||
      !newPassword
    ) {
      return res.status(400)
      .json({
        error:
          "All fields are required",
      });
    }

    await authService
      .resetPassword(
        email,
        code,
        newPassword
      );

    res.status(200).json({
      message:
        "Password reset successful",
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  register,
  loginUser,
  requestPasswordReset,
  resetPassword,
};