const { Schema, model } = require("mongoose");

const RazaTypeSchema = new Schema(
  {
    tempId: {
      type: Number,
      required: true,
      unique:true
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["EVENT_RAZA", "UMOOR_RAZA"],
      default: "EVENT_RAZA",
    },
    umoorName: {
      type: String,
    },
    isConflictedRaza: {
      type: Boolean,
    },
    fields: [
      {
        name: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
        options: [
          {
            value: String,
            label: String,
          },
        ],
        is_required: {
          type: Boolean,
          default: false,
        },
      },
    ],
    approval_status: [
      {
        type: String,
      }
    ],
  },
  {
    timestamps: true,
  }
);

const RazaType = model("RazaType", RazaTypeSchema);

module.exports = { RazaType };
