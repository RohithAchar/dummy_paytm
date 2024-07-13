const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

function authMiddleware(req, res, next) {
  try {
    const token = req.headers["authorization"];
    const user = jwt.verify(token, JWT_SECRET);
    req.userId = user.userId;
    next();
  } catch (error) {
    res.status(403).json({
      message: "Unauthorized user",
    });
  }
}

module.exports = {
  authMiddleware,
};
