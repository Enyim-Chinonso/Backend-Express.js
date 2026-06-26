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