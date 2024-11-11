const Joi = require("joi");
const { validEmail, passwordValidation } = require("./custom.validation");

const registerUser = {
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(0)
      .max(60)
      .pattern(/^[a-zA-Z\s]*$/)
      .message(
        "name should be less than 30 characters and no special characters"
      ),
    email: Joi.string().required().email().messages(validEmail("Email")),
    role: Joi.string().valid("MUMINEEN", "ADMIN", "AMILSAHEB", "JAMAAT"),
    its: Joi.number().required(),
    hof: Joi.number().required(),
    is_hof: Joi.boolean().required(),
    is_mehman:Joi.boolean(),
    address:Joi.string(),
    contact:Joi.number().min(1111111111).max(9999999999),
    sector:Joi.string()
  }),
};

const login = {
  body: Joi.object().keys({
    its: Joi.number().required().min(11111111).max(99999999).messages(validEmail("ITS")),
    password: Joi.string().required(),
  }),
};
const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().required().email().messages(validEmail("Email")),
  }),
};
const changePassword = {
  body: Joi.object().keys({
    oldpassword: Joi.string().required(),
    newpassword: Joi.string().required(),
  }),
};
const updateUser = {
  body: Joi.object().keys({
    id: Joi.string(),
    data:Joi.object()
  }),
};
const getUser = Joi.object({
  params: Joi.object({
    userId: Joi.string().required(),
  }),
});

module.exports = {
  registerUser,
  getUser,
  login,
  updateUser,
  forgotPassword,
  changePassword,
};
