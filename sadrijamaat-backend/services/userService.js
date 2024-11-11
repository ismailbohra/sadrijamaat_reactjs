const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { jwtEncode } = require("../middelwares/authorization");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const User = require("../models/user"); // Assuming this is your Mongoose User model
const sendEmail = require("../middelwares/email");

const registerUser = async (userBody) => {
  try {
    const { name, email, role, hof, is_hof, its,address,is_mehman,contact,sector } = userBody;

    // const existingUser = await User.findOne({ email });
    // if (existingUser) {
    //   throw new ApiError(httpStatus.CONFLICT, "Email is already registered");
    // }
    const existingITS = await User.findOne({ its });
    if (existingITS) {
      throw new ApiError(httpStatus.CONFLICT, "ITS is already registered");
    }

    const hashedPassword = await bcrypt.hash(String(its), 10);

    const newUser = await User.create({
      name,
      email,
      role,
      hof,
      is_hof,
      its,
      password: hashedPassword,
      address,
      is_mehman,
      contact,
      sector
    });

    const templatePath = "./EmailTemplates/UserRegistration.html";
    const replacements = {
      "{{USERNAME}}": name,
    };

    // const send = await sendEmail(
    //   email,
    //   "User Registration",
    //   templatePath,
    //   replacements
    // );
    // if (!send.status) {
    //   throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, send.msg);
    // }

    return { newUser, emailStatus: "Email sent successfully" };
  } catch (error) {
    console.error("User create service has error", error.message);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const updateUser = async (userBody) => {
  try {
    const { data, id } = userBody;

    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "User Not Found");
    }

    // Update user and return updated document
    const updatedUser = await User.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });

    return updatedUser;
  } catch (error) {
    // Log and throw error for error handling
    console.error("User update service has error", error.message);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const loginUserWithItsAndPassword = async (its, password) => {
  try {
    const tokenExpiringAt = moment().add(30, "seconds").unix();
    const user = await User.findOne({ its });
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not exist");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ApiError(httpStatus.NOT_FOUND, "Invalid its or password");
    }

    const token = jwtEncode(user);

    return {
      user,
      token,
      tokenExpiringAt,
    };
  } catch (error) {
    console.error("Login by ITS service has error", error.message);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const forgotPassword = async (its) => {
  try {
    const user = await User.findOne({ its });
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not exist");
    }
    const password = Math.random().toString(36).slice(-8);
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    await user.save();
    const templatePath = "./EmailTemplates/ForgotPassword.html";
    const replacements = {
      "{{USERNAME}}": user.name,
      "{{TEMPORARY_PASSWORD}}": password,
    };

    const send = await sendEmail(
      user.email,
      "Forgot Password",
      templatePath,
      replacements
    );
    if (!send.status) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, send.msg);
    }
  } catch (error) {
    console.error("Login by email service has error", error.message);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const changePassword = async (id, oldPassword, newPassword) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not exist");
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid old password");
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;

    await user.save();

    const templatePath = "./EmailTemplates/PasswordChange.html";
    const replacements = {
      "{{USERNAME}}": user.name,
    };

    const send = await sendEmail(
      user.email,
      "Password Change Confirmation",
      templatePath,
      replacements
    );
    if (!send.status) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, send.msg);
    }
  } catch (error) {
    console.error("Login by email service has error", error.message);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getUser = async (userId) => {
  try {
    if (!userId) {
      throw new ApiError(httpStatus.NOT_FOUND, "userId Not Found");
    }
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    return user;
  } catch (error) {
    console.error("get user service has error", error.message);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find();
    if (!users) {
      throw new ApiError(httpStatus.NOT_FOUND, "Users not found");
    }

    return { users };
  } catch (error) {
    console.error("get users service has error", error.message);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const searchUsers = async (query) => {
  const { name, its, role } = query;
  const filter = {};

  if (name) {
    filter.name = { $regex: name, $options: "i" }; // Case-insensitive search for name
  }
  if (its) {
    filter.its = Number(query.its);
  }
  if (role) {
    filter.role = {
      $in: [role],
    };
  }
  return await User.find(filter);
};
const assignRole = async (req) => {
  const { userids, rolename } = req.body;

  if (!userids || !rolename) {
    throw new Error("User IDs and role name are required");
  }

  await Promise.all(
    userids.map(async (userId) => {
      const user = await User.findById(userId);

      if (user) {
        if (!user.role.includes(rolename)) {
          user.role.push(rolename);
          await user.save();
        }
      } else {
        console.error(`User with ID ${userId} not found`);
      }
    })
  );
  console.log(userids, rolename);

  return { message: "Roles assigned successfully" };
};

const removeRole = async (req, res) => {
  try {
    const { userid, rolename } = req.query;

    if (!userid || !rolename) {
      throw new ApiError(httpStatus.NOT_FOUND, "User ID and role name are required");
    }
    
    const user = await User.findById(userid);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, `User with ID ${userid} not found`);
    }
    
    const roleIndex = user.role.indexOf(rolename);
    if (roleIndex === -1) {
      throw new ApiError(httpStatus.NOT_FOUND, `Role ${rolename} not found for this user`);
    }
    
    user.role.splice(roleIndex, 1);
    await user.save(); // Save the updated user document
    
    return { message: `Role ${rolename} removed successfully from user` };
  } catch (error) {
    console.error("Error removing role:", error);
    throw new ApiError(httpStatus.NOT_FOUND, "Internal server error");
  }
};

const updateFcmToken = async (userId, fcmToken) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND,"User not found")
    }

    user.fcmToken = fcmToken;
    await user.save();

    return user;
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, "Internal server error");
  }
};

module.exports = {
  registerUser,
  loginUserWithItsAndPassword,
  getUser,
  getAllUsers,
  updateUser,
  forgotPassword,
  changePassword,
  searchUsers,
  assignRole,
  removeRole,
  updateFcmToken
};
