const Book = require("../models/Book");
const User = require("../models/User");

async function getAll() {
  const data = await Book.find({}).lean();
  return data;
}

async function getById(id) {
  const data = await Book.findById(id).lean();
  return data;
}

async function createBook(book, id) {
  await Book.create({
    title: book.title,
    type: book.type,
    certificate: book.certificate,
    image: book.image,
    description: book.description,
    price: book.price,
    owner: id,
  });
}

async function edit(body, id) {
  const book = await Book.findById(id);

  book.title = body.title;
  book.type = body.type;
  book.certificate = body.certificate;
  book.image = body.image;
  book.description = body.description;
  book.price = body.price;

  if (
    book.title === "" ||
    book.type === "" ||
    book.certificate === "" ||
    book.image === "" ||
    book.description === "" ||
    book.price === ""
  ) {
    throw new Error("All fields are required");
  }

  await book.save();
}

async function deleteBook(id) {
  await Book.findByIdAndDelete(id);
}

async function signUp(id, userId) {
  const book = await Book.findById(id);

  book.signUpList.push({ user: userId });

  await book.save();
}

async function getSigned(id, userId) {
  const book = await Book.findById(id).lean();

  for (const element of book.signUpList) {
    if (element.user.toString() === userId.toString()) {
      return true;
    }
  }

  return false;
}

async function getSignedPeople(id) {
  const book = await Book.findById(id).lean();
  let arr = [];

  for (const element of book.signUpList) {
    let curId = element.user.toString();
    let curPerson = await User.findById(curId);
    arr.push(curPerson.username);
  }

  return arr;
}

async function getOwner(id) {
  const curOwner = await User.findById(id);
  return curOwner.email;
}

async function getAllCreatedProfileCourses(userId) {
  const allCourses = await getAll();
  let arr = [];

  for (const course of allCourses) {
    if (course.owner.toString() === userId.toString()) {
      arr.push(course);
    }
  }

  return arr;
}

async function getAllSignedProfileCourses(userId) {
  const allCourses = await getAll();
  let arr = [];

  for (const course of allCourses) {
    for (const element of course.signUpList) {
      if (element.user.toString() === userId.toString()) {
        arr.push(course);
      }
    }
  }

  return arr;
}

async function getCurUserEmail(userId) {
  const curUser = await User.findById(userId).lean();
  return curUser.email;
}

module.exports = {
  getAll,
  getById,
  createBook,
  edit,
  deleteBook,
  signUp,
  getSigned,
  getSignedPeople,
  getOwner,
  getAllCreatedProfileCourses,
  getAllSignedProfileCourses,
  getCurUserEmail,
};
