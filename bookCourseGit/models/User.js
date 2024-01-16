const { Schema, Types, model } = require("mongoose");

const usersSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: [2, "Username should be at least 2 characters long."],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [10, "Email should be at least 10 characters long."],
  },
  password: {
    type: String,
    required: true,
    minlength: [4, "Password should be at least 4 characters long."],
  },
});

usersSchema.index(
  { email: 1 },
  {
    unique: true,
    collation: {
      locale: "en",
      strength: 2,
    },
  }
);

const User = model("User", usersSchema);

module.exports = User;
