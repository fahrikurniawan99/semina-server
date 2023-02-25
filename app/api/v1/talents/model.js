const { Schema, Types, model } = require("mongoose");

const talentSchema = new Schema(
  {
    name: {
      type: String,
      required: "nama talent harus di isi",
    },
    role: {
      type: String,
      default: "-",
    },
    image: {
      type: Types.ObjectId,
      ref: "Image",
      required: true,
    },
    organizer: {
      type: Types.ObjectId,
      required: true,
      ref: "Organizer",
    },
  },
  { timestamps: true }
);

module.exports = model("Talent", talentSchema);
