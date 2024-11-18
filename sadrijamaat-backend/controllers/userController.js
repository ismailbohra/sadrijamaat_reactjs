const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const {
  successResponseGenerator,
  errorResponse,
} = require("../utils/ApiHelpers");
const userService = require("../services/userService");
const moment = require("moment");
const { jwtEncode } = require("../middelwares/authorization");

const registerUser = catchAsync(async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);
    res
      .status(httpStatus.CREATED)
      .send(
        successResponseGenerator(
          httpStatus.CREATED,
          "user created successfully",
          user
        )
      );
  } catch (error) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(errorResponse(httpStatus.BAD_REQUEST, error.message));
  }
});
const updateUser = catchAsync(async (req, res) => {
  try {
    const user = await userService.updateUser(req.body);
    res
      .status(httpStatus.CREATED)
      .send(
        successResponseGenerator(
          httpStatus.CREATED,
          "user updated successfully",
          user
        )
      );
  } catch (error) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(errorResponse(httpStatus.BAD_REQUEST, error.message));
  }
});
const login = catchAsync(async (req, res) => {
  const { its, password } = req.body;
  try {
    const user = await userService.loginUserWithItsAndPassword(its, password);
    res
      .status(httpStatus.OK)
      .send(successResponseGenerator(httpStatus.OK, "Login Successful", user));
  } catch (error) {
    res
      .status(error.statusCode)
      .send(errorResponse(error.statusCode, error.message));
  }
});
const forgotPassword = catchAsync(async (req, res) => {
  const { its } = req.body;
  try {
    await userService.forgotPassword(its);
    res
      .status(httpStatus.OK)
      .send(
        successResponseGenerator(
          httpStatus.OK,
          "New Password Send To Your Registered Email"
        )
      );
  } catch (error) {
    res
      .status(error.statusCode)
      .send(errorResponse(error.statusCode, error.message));
  }
});
const changePassword = catchAsync(async (req, res) => {
  const { oldpassword, newpassword } = req.body;
  try {
    const user = req.user;
    const userId = user._id;
    await userService.changePassword(userId, oldpassword, newpassword);
    res
      .status(httpStatus.OK)
      .send(
        successResponseGenerator(httpStatus.OK, "Password Changed Successfully")
      );
  } catch (error) {
    res
      .status(error.statusCode)
      .send(errorResponse(error.statusCode, error.message));
  }
});
const logout = catchAsync(async (req, res) => {
  const user = req.user;
  const userId = user._id;
  try {
    const user = await userService.logout(userId);
    res
      .status(httpStatus.OK)
      .send(
        successResponseGenerator(httpStatus.OK, "logout Successful", user)
      );
  } catch (error) {
    console.log(error);
    res
      .status(error.statusCode)
      .send(errorResponse(error.statusCode, error.message));
  }
});
const getUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await userService.getUser(userId);
    res
      .status(httpStatus.OK)
      .send(
        successResponseGenerator(httpStatus.OK, "fetched Successful", user)
      );
  } catch (error) {
    console.log(error);
    res
      .status(error.statusCode)
      .send(errorResponse(error.statusCode, error.message));
  }
});
const getAllUser = catchAsync(async (req, res) => {
  try {
    const user = await userService.getAllUsers();
    res
      .status(httpStatus.OK)
      .send(
        successResponseGenerator(httpStatus.OK, "fetched Successful", user)
      );
  } catch (error) {
    console.log(error);
    res
      .status(error.statusCode)
      .send(errorResponse(error.statusCode, error.message));
  }
});
const verifyToken = catchAsync(async (req, res) => {
  try {
    const tokenExpiringAt = moment().add(30, "seconds").unix();
    const user = await userService.getUser(req.user._id);
    const token = jwtEncode(user);
    res.status(httpStatus.OK).send(
      successResponseGenerator(httpStatus.OK, "verified Successful", {
        user,
        token,
        tokenExpiringAt,
      })
    );
  } catch (error) {
    console.log(error);
    res
      .status(error.statusCode)
      .send(errorResponse(error.statusCode, error.message));
  }
});

const searchUsers = async (req, res) => {
  try {
    const users = await userService.searchUsers(req.query);
    res.status(200).json({
      status: 200,
      message: "Success",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
      data: {},
    });
  }
};
const assignRole = async (req, res) => {
  try {
    const users = await userService.assignRole(req);
    res.status(200).json({
      status: 200,
      message: "Success",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
      data: {},
    });
  }
};
const removeRole = async (req, res) => {
  try {
    const users = await userService.removeRole(req, res);
    res.status(200).json({
      status: 200,
      message: "Success",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
      data: {},
    });
  }
};
const updateFcmToken = async (req, res) => {
  try {
    const { userId, fcmToken } = req.body;

    const response = await userService.updateFcmToken(userId, fcmToken);
    res.status(200).json({
      status: 200,
      message: "Success",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
      data: {},
    });
  }
};

module.exports = {
  registerUser,
  login,
  getUser,
  getAllUser,
  updateUser,
  forgotPassword,
  changePassword,
  verifyToken,
  searchUsers,
  assignRole,
  removeRole,
  updateFcmToken,
  logout
};
