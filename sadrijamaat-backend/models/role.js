const { Schema, model } = require("mongoose");

const Rolemodel = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    routes: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const Role = model("Role", Rolemodel);

module.exports = { Role };
