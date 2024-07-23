import jwt from "jsonwebtoken";

const fetchuser = (req, res, next) => {
  // Get the user from the jwt token and add id to req object
  const access_token = req.header("access_token");

  if (!access_token) {
    return res
      .status(401)
      .json({ message: "Access token is missing or invalid" });
  }

  jwt.verify(access_token, process.env.SECRET_ACCESS_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    req.user = user; // Attach the user object to the request
    next(); // Proceed to the next middleware or route handler
  });
};

export default fetchuser;
