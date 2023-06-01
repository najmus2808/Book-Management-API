const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      maxlength: 1000,
      trim: true,
    },
    publishedYear: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true, versionKey: false }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
