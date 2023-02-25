const { Schema, model } = require("mongoose");

const organizerSchema = new Schema(
  {
    organizer: {
      type: String,
      rerquired: [true, "penyelengara harus di isi"],
    },
  },
  { timestamps: true }
);

module.exports = model("Organizer", organizerSchema);
