const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
  try {
    // Get token from Authorization header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = adminAuth;
