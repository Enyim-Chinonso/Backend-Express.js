// const userService = require("../service/user.service")

// const requestAccountDeletion = async (req, res) => {
//   const userId = req.user._id

//   try {
//     await userService.requestAccountDeletion(userId)
//     res.status(200).json({ message: "A deletion token has been sent to your email" })
//   } catch (error) {
//     res.status(400).json({ error: error.message })
//   }
// }




// const confirmAccountDeletion =
//   async (req, res) => {

//   try {

//     const userId =
//       req.user._id;

//     const { code } =
//       req.body;

//     const result =
//       await userService
//       .confirmAccountDeletion(
//         userId,
//         code
//       );

//     return res.status(200)
//     .json(result);

//   } catch (error) {

//     return res.status(400)
//     .json({
//       error: error.message,
//     });
//   }
// };


// module.exports = {
//   requestAccountDeletion,
//   confirmAccountDeletion,
// };





const userService =
require("../service/user.service");



// REQUEST DELETE
const requestAccountDeletion =
  async (req, res) => {

  try {

    const userId =
      req.user._id;

    await userService
      .requestAccountDeletion(
        userId
      );

    res.status(200).json({
      message:
        "Deletion code sent to email",
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });
  }
};



// CONFIRM DELETE
const confirmAccountDeletion =
  async (req, res) => {

  try {

    const userId =
      req.user._id;

    const { code } =
      req.body;

    if (!code) {
      return res.status(400)
      .json({
        error:
          "Code is required",
      });
    }

    const result =
      await userService
      .confirmAccountDeletion(
        userId,
        code
      );

    res.status(200)
    .json(result);

  } catch (error) {

    res.status(500)
    .json({
      error: error.message,
    });
  }
};

module.exports = {
  requestAccountDeletion,
  confirmAccountDeletion,
};