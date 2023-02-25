const { Schema, model } = require("mongoose");

const imageSchema = new Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

module.exports = model("Image", imageSchema);
