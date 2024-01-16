const {
  getCurUserEmail,
  getAllCreatedProfileCourses,
  getAllSignedProfileCourses,
} = require("../services/bookServices");

const profileController = require("express").Router();

profileController.get("/myProfile", async (req, res) => {
  const email = await getCurUserEmail(req.user._id);
  const createCourses = await getAllCreatedProfileCourses(req.user._id);
  const lengthOfCourse = createCourses.length;
  const signedCourses = await getAllSignedProfileCourses(req.user._id);
  const lengthOfSignedCourse = signedCourses.length;

  res.render("profile", {
    title: "Profile",
    email,
    lengthOfCourse,
    createCourses,
    lengthOfSignedCourse,
    signedCourses,
  });
});

module.exports = profileController;
