const { Schema, model, Types } = require("mongoose");

const ticketCategoriesSchema = new Schema({
  type: {
    type: String,
    required: [true, "Tipe tiket harus di isi"],
  },
  price: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    default: 0,
  },
  statusTicketCategories: {
    type: Boolean,
    enum: [true, false],
    default: true,
  },
  expired: {
    type: Date,
  },
});

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "judul harus di isi"],
      minlength: 3,
      maxlength: 50,
    },
    date: {
      type: Date,
      required: [true, "tanggal dan waktu harus di isi"],
    },
    about: {
      type: String,
    },
    tagline: {
      type: String,
      required: [true, "tagline harus di isi"],
    },
    keyPoint: {
      type: [String],
    },
    venueName: {
      type: String,
      required: [true, "tempat acara harus di isi"],
    },
    statusEvent: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },
    tickets: {
      type: [ticketCategoriesSchema],
      required: true,
    },
    image: {
      type: Types.ObjectId,
      ref: "Image",
      required: true,
    },
    category: {
      type: Types.ObjectId,
      ref: "Category",
      required: true,
    },
    talent: {
      type: Types.ObjectId,
      ref: "Talent",
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

module.exports = model("Event", eventSchema);
