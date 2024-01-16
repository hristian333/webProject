const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_KEY = "9a328ncaiowjsa";

async function register(email, username, password) {
  const existing = await User.findOne({ email });

  if (existing) {
    throw new Error("User already registered.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email: email,
    username: username,
    password: hashedPassword,
  });

  const token = createSession(user);

  return token;
}

async function login(email, password) {
  const existing = await User.findOne({ email });

  if (!existing) {
    throw new Error("Wrong email or password");
  }

  const match = await bcrypt.compare(password, existing.password);

  if (!match) {
    throw new Error("Wrong email or password");
  }

  const token = createSession(existing);

  return token;
}

function createSession(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    username: user.username,
  };

  const token = jwt.sign(payload, JWT_KEY);

  return token;
}

function verifyToken(token) {
  return jwt.verify(token, JWT_KEY);
}

module.exports = {
  register,
  login,
  createSession,
  verifyToken,
};
