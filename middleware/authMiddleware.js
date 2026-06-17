const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    // 1. check header exists
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    // 2. extract token safely
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token format invalid" });
    }

    // 3. verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // 4. attach user to request
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};