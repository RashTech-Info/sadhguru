let admin = require("../../model/Admin");

exports.Sign_Out = async (req, res) => {
  try {
    let token = req.cookies.devjwt;
    // Clear the JWT cookie
    res.clearCookie("devjwt", { httpOnly: true });

    let data = await admin.findOneAndUpdate(
      { auth_key: token },
      { auth_key: null }
    );
    return res.status(200).json({
      message: "Logout successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred during logout.",
      success: false,
      status: 500,
    });
  }
};
