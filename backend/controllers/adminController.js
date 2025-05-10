const jwt = require("jsonwebtoken");

// Admin login
exports.login = (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (username === adminUsername && password === adminPassword) {
      // Generate token
      const token = jwt.sign({ username }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      return res.status(200).json({
        message: "Login successful",
        token,
      });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify token
exports.verifyToken = (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }

      return res.status(200).json({
        message: "Token is valid",
        username: decoded.username,
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
