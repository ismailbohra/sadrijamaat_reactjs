const Joi = require("joi");

const applyForRaza = {
  body: Joi.object().keys({
    razaType: Joi.string().required(),
    data: Joi.array(),
  }),
};
const approveRaza = {
  body: Joi.object().keys({
    razaId: Joi.string().required(),
    comment: Joi.string(),
    fmb: Joi.boolean(),
    date: Joi.string(),
    time: Joi.string(),
    jaman: Joi.bool(),
    darees: Joi.boolean(),
    shitabi: Joi.boolean(),
    marasiyah: Joi.boolean(),
    status: Joi.string(),
    approve_as:Joi.string()
  }),
};

module.exports = {
  applyForRaza,
  approveRaza,
};
