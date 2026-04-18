import User from "../Schema/User.js";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";

// Regex patterns
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

// Utility: generate unique username from email
const generateUsername = async (email) => {
  let username = email.split("@")[0];
  const exists = await User.exists({ "personal_info.username": username });
  if (exists) {
    username += nanoid().substring(0, 5);
  }
  return username;
};

// Utility: generate JWT with expiry
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      profile_img: user.personal_info.profile_img,
      username: user.personal_info.username,
      fullname: user.personal_info.fullname,
      email: user.personal_info.email,
    },
    process.env.SECRET_ACCESS_KEY,
    { expiresIn: "7d" }
  );
};

// Utility: format user response
const formatUserResponse = (user) => {
  const access_token = generateToken(user);
  return {
    success: true,
    access_token,
    id: user._id,
    profile_img: user.personal_info.profile_img,
    username: user.personal_info.username,
    fullname: user.personal_info.fullname,
    email: user.personal_info.email,
  };
};

// 1. Signup
export const signUp = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // Validate inputs
    if (!fullname || fullname.length < 3) {
      return res.status(400).json({
        success: false,
        error: "Full name must be at least 3 characters long",
      });
    }
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Please enter a valid email address",
      });
    }
    if (!password || !passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        error:
          "Password must be 6-20 characters with at least one uppercase, one lowercase, and one number",
      });
    }

    // Check duplicate email
    const existingUser = await User.findOne({
      "personal_info.email": email.toLowerCase(),
    });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: "An account with this email already exists",
      });
    }

    // Create user
    const hashedPassword = await bcrypt.hash(password, 12);
    const username = await generateUsername(email);
    const userIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    const newUser = new User({
      personal_info: {
        fullname,
        email: email.toLowerCase(),
        password: hashedPassword,
        username,
        ip_address: userIp,
      },
    });

    await newUser.save();
    return res.status(201).json(formatUserResponse(newUser));
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        error: "An account with this email already exists",
      });
    }
    return res.status(500).json({
      success: false,
      error: "Server error. Please try again later.",
    });
  }
};

// 2. Signin
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email and password are required",
      });
    }

    const user = await User.findOne({
      "personal_info.email": email.toLowerCase(),
    });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.personal_info.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }

    // Update IP on login
    const userIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    user.personal_info.ip_address = userIp;
    await user.save();

    return res.status(200).json(formatUserResponse(user));
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server error. Please try again later.",
    });
  }
};

// 3. Get current user data
export const getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-personal_info.password"
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }
    return res.status(200).json(formatUserResponse(user));
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server error. Please try again later.",
    });
  }
};

// 4. Change password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        error: "Current password and new password are required",
      });
    }

    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        success: false,
        error:
          "New password must be 6-20 characters with at least one uppercase, one lowercase, and one number",
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    const isValid = await bcrypt.compare(
      currentPassword,
      user.personal_info.password
    );
    if (!isValid) {
      return res.status(401).json({
        success: false,
        error: "Current password is incorrect",
      });
    }

    user.personal_info.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server error. Please try again later.",
    });
  }
};
