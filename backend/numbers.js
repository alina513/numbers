const { Schema, model } = require("mongoose");

const NumberSchema = new Schema(
  {
    number: {
      type: Number,
      required: [true, "Number is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const NumberModel = model("numbers", NumberSchema);

module.exports = { NumberModel };
