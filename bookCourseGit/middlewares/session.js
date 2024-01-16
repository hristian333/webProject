const { verifyToken } = require("../services/authService");

module.exports = () => (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    try {
      const data = verifyToken(token);
      req.user = data;
    } catch (err) {
      res.clearCookie("jwt");
      res.redirect("/auth/login");
    }
  }
  next();
};
