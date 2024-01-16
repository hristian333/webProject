const { Schema, Types, model } = require("mongoose");

const booksSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: [5, "Title should be at least 5 characters long"],
  },
  type: {
    type: String,
    required: true,
    minlength: [3, "Type should be at least 3 characters long"],
  },
  certificate: {
    type: String,
    required: true,
    minlength: [2, "Certificate should be at least 2 characters long"],
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        // Simple http/https URL validation example
        return /^https?:\/\//.test(value);
      },
      message: "Invalid URL format",
    },
  },
  description: {
    type: String,
    required: true,
    minlength: [10, "Description should be at least 10 characters long"],
  },
  price: {
    type: Number,
    required: true,
    min: 1,
    message: "Price should be at least 1",
  },
  signUpList: [
    {
      user: { type: Types.ObjectId, ref: "User", required: true },
    },
  ],
  owner: { type: Types.ObjectId, ref: "User", required: true },
});

const Book = model("Book", booksSchema);

module.exports = Book;
