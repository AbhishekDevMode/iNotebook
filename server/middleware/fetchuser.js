const jwt = require("jsonwebtoken");

const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ success: false, error: "Access denied: no token provided" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch (err) {
    const msg = err.name === "TokenExpiredError" ? "Token expired, please log in again" : "Invalid token";
    return res.status(401).json({ success: false, error: msg });
  }
};

module.exports = fetchuser;
