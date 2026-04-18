import jwt from "jsonwebtoken";

const fetchuser = (req, res, next) => {
  // Support both "Authorization: Bearer <token>" and legacy "access_token" header
  let token = req.header("access_token");

  if (!token) {
    const authHeader = req.header("Authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.slice(7);
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Access denied. No authentication token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_ACCESS_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        error: "Token has expired. Please sign in again.",
      });
    }
    return res.status(403).json({
      success: false,
      error: "Invalid authentication token.",
    });
  }
};

export default fetchuser;
