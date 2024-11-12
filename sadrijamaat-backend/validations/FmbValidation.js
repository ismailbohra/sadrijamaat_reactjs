const Joi = require("joi");

const createMenu = {
  body: Joi.object().keys({
    occasion: Joi.string().required(),
    date: Joi.string().required(),
    menu: Joi.string().required(),
  }),
};

module.exports = {
  createMenu,
};
