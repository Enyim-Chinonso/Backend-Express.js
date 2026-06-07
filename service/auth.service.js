// const User = require("../models/user.model");
// const tokenModel = require("../models/token.model");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const mailService = require("./mail.service");

// const JWT_SECRETE = "uloease";

// // Register new user
// const registerUser = async ({ name, email, password, role }) => {
//   const existingUser = await User.findOne({ email });

//   if (existingUser) {
//     throw new Error(`User with this email (${email}) already exists`);
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const code = Math.floor(1000 + Math.random() * 9000).toString();

//   // Create new user
//   const user = await User.create({
//     name,
//     email,
//     password: hashedPassword,
//     role,
//   });

//   tokenModel.create({
//     userId: user._id,
//     code,
//   });
//   await user.save();
//   return user;

//   await mailService.sendVerificationEmail(email, name, code);
// };

// // Login user

// const loginUser = async ({ email, password }) => {
//   const user = await User.findOne({ email });

//   if (!user) {
//     throw new Error("User not found!");
//   }

//   const isMatch = await bcrypt.compare(password, user.password);

//   if (!isMatch) {
//     throw new Error("Invalid credentials");
//   }

//   if (user.isVerified !== true) {
//     throw new Error("Verify your email to login");
//   }

//   const token = jwt.sign({ userId: user._id }, JWT_SECRETE, {
//     expiresIn: "1d",
//   });
//   return { user, token };
// };

// const requestPasswordReset = async (email) => {
//   const user = await User.findOne({ email });
//   if (!user) {
//     throw new Error("User not found");
//   }

//   await tokenModel.deleteMany({ userId: user._id });

//   const code = Math.floor(1000 + Math.random() * 9000).toString();

//   await Token.create({
//     userId: user._id,
//     code,
//   });
//   await mailService.sendPasswordResetEmail(email, user.name, code);

//   return;
// };


// const resetPassword = async (email, code, newPassword) => {
//   const user = await User.findOne({ email });
//   if (!user) {
//     throw new Error("User not found");
//   }

//   const token = await Token.findOne({ userId: user._id, code });
//   if (!token) {
//     throw new Error("Invalid or expired password reset code");
//   }

//   const hashedPassword = await bcrypt.hash(newPassword, 10);
//   user.password = hashedPassword;
//   await user.save();

//   await Token.deleteOne({ userId: user._id, code });
// };





// // get allUser
// // const allUser = async () => {
// //   const user = await User.find().select("-password");
// //   return user;
// // };

// // profile
// // const myProfile = async (userId) => {
// //   const user = await User.findById(userId).select("-password");

// //   if (!user) {
// //     throw new Error("User not found");
// //   }
// //   return user;
// // };

// module.exports = { registerUser, loginUser, requestPasswordReset, resetPassword };
// //  allUser, myProfile,








const User = require("../models/user.model");
const Token = require("../models/token.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailService = require("./mail.service");

const JWT_SECRET = "uloease";



// REGISTER USER
const registerUser = async ({
  name,
  email,
  password,
  role,
}) => {

  const existingUser =
    await User.findOne({ email });

  if (existingUser) {
    throw new Error(
      `User with this email already exists`
    );
  }

  // HASH PASSWORD
  const hashedPassword =
    await bcrypt.hash(password, 10);

  // CREATE USER
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  // GENERATE CODE
  const code =
    Math.floor(
      1000 + Math.random() * 9000
    ).toString();

  // HASH CODE
  const hashedCode =
    await bcrypt.hash(code, 10);

  // SAVE TOKEN
  await Token.create({
    userId: user._id,
    code: hashedCode,
  });

  // SEND EMAIL
  await mailService.sendVerificationEmail(
    email,
    name,
    code
  );

  return user;
};



// LOGIN USER
const loginUser = async ({
  email,
  password,
}) => {

  const user =
    await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isMatch) {
    throw new Error(
      "Invalid credentials"
    );
  }

  if (!user.isVerified) {
    throw new Error(
      "Verify your email first"
    );
  }

  const token = jwt.sign(
    { userId: user._id },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { user, token };
};



// REQUEST PASSWORD RESET
const requestPasswordReset =
  async (email) => {

  const user =
    await User.findOne({ email });

  if (!user) {
    throw new Error(
      "User not found"
    );
  }

  // DELETE OLD TOKENS
  await Token.deleteMany({
    userId: user._id,
  });

  // GENERATE CODE
  const code =
    Math.floor(
      1000 + Math.random() * 9000
    ).toString();

  // HASH CODE
  const hashedCode =
    await bcrypt.hash(code, 10);

  // SAVE TOKEN
  await Token.create({
    userId: user._id,
    code: hashedCode,
  });

  // SEND EMAIL
  await mailService
    .sendPasswordResetEmail(
      email,
      user.name,
      code
    );

  return;
};



// RESET PASSWORD
const resetPassword =
  async (
    email,
    code,
    newPassword
  ) => {

  const user =
    await User.findOne({ email });

  if (!user) {
    throw new Error(
      "User not found"
    );
  }

  // FIND TOKEN
  const token =
    await Token.findOne({
      userId: user._id,
    });

  if (!token) {
    throw new Error(
      "Reset code expired"
    );
  }

  // COMPARE HASHED CODE
  const isValidCode =
    await bcrypt.compare(
      code,
      token.code
    );

  if (!isValidCode) {
    throw new Error(
      "Invalid reset code"
    );
  }

  // HASH NEW PASSWORD
  const hashedPassword =
    await bcrypt.hash(
      newPassword,
      10
    );

  user.password =
    hashedPassword;

  await user.save();

  // DELETE TOKEN
  await Token.deleteMany({
    userId: user._id,
  });

  return;
};

module.exports = {
  registerUser,
  loginUser,
  requestPasswordReset,
  resetPassword,
};