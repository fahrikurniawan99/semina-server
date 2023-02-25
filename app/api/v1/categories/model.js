const { Schema, model, Types } = require("mongoose");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      minlength: [3, "panjang nama kategori minimal 3 karakter"],
      maxlength: [20, "panjang nama kategori maksimal 20 karakter"],
      required: [true, "nama kategori harus di isi"],
    },
    organizer: {
      type: Types.ObjectId,
      required: true,
      ref: "Organizer",
    },
  },
  { timestamps: true }
);

module.exports = model("Category", categorySchema);
