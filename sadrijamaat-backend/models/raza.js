const { Schema, model } = require("mongoose");

const FormDataSchema = new Schema(
  {
    razatype: {
      type: String,
      required: true,
    },
    submitted_by: {
      type: String,
      required: true,
    },
    isConflictedRaza: {
      type: Boolean,
    },
    fmbThali: {
      type: Boolean,
    },
    jaman: {
      type: Boolean,
    },
    darees: {
      type: Boolean,
    },
    marasiyah: {
      type: Boolean,
    },
    shitabi: {
      type: Boolean,
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
    data: [
      {
        name: {
          type: String,
        },
        type: {
          type: String,
        },
        value: {
          type: String,
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
        approver: {
          type: String,
        },
        status: {
          type: String,
          enum: ["PENDING", "APPROVED", "REJECTED"],
          default: "PENDING",
        },
        comment: {
          type: String,
          default: "",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const RazaData = model("RazaData", FormDataSchema);

module.exports = RazaData;
