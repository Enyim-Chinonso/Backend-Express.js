// const User = require("../models/user.model")
// const Token = require("../models/token.model")
// const mailService = require("./mail.service")

// const requestAccountDeletion = async (userId) => {
//     const user = await User.findById(userId);

//     if (!user) {
//         throw new Error("User not found")

//     }
// await Token.deleteMany({ userId: user._id })       

//     const deleteToken = ("" + Math.floor(1000 + Math.random() * 9000))

//     await Token.create({
//         userId: user._id,
//         code: deleteToken
//     })

//     await mailService.requestAccountDeletion(user.email, user.name, deleteToken)

//     return;

// }

// module.exports = {requestAccountDeletion}


const User = require("../models/user.model");
const Token = require("../models/token.model");
const mailService = require("./mail.service");
const bcrypt = require("bcrypt");



// REQUEST ACCOUNT DELETION
const requestAccountDeletion =
  async (userId) => {

  // FIND USER
  const user =
    await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // DELETE OLD TOKENS
  await Token.deleteMany({
    userId: user._id,
  });

  // GENERATE CODE
  const deleteCode =
    Math.floor(
      1000 + Math.random() * 9000
    ).toString();

  // HASH CODE
  const hashedCode =
    await bcrypt.hash(deleteCode, 10);

  // SAVE HASHED TOKEN
  await Token.create({
    userId: user._id,
    code: hashedCode,
  });

  // SEND EMAIL
  await mailService
  .sendAccountDeletionEmail(
    user.email,
    user.name,
    deleteCode
  );

  return;
};




// CONFIRM ACCOUNT DELETION
const confirmAccountDeletion =
  async (userId, code) => {

  // FIND USER
  const user =
    await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // FIND TOKEN
  const token =
    await Token.findOne({
      userId: user._id,
    });

  if (!token) {
    throw new Error(
      "Deletion code expired or not found"
    );
  }

  // COMPARE CODE
  const isValidCode =
    await bcrypt.compare(
      code,
      token.code
    );

  if (!isValidCode) {
    throw new Error(
      "Invalid deletion code"
    );
  }

  // DELETE USER
  await User.findByIdAndDelete(
    user._id
  );

  // DELETE TOKEN
  await Token.deleteMany({
    userId: user._id,
  });

  return {
    message:
      "Account deleted successfully",
  };
};