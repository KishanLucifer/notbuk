import User from "../Schema/User.js";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import express from "express";

const router = express.Router();

// Regex patterns
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

// Utility function to generate unique username
const generateUsername = async (email) => {
  let username = email.split("@")[0];
  const isUsernameNotUnique = await User.exists({
    "personal_info.username": username,
  });
  if (isUsernameNotUnique) {
    username += nanoid().substring(0, 5);
  }
  return username;
};

// Format user data for sending in response
const formatUserDatatoSend = (user) => {
  // let success = false;
  const access_token = jwt.sign(
    { id: user._id },
    process.env.SECRET_ACCESS_KEY
  );
  return {
    success: true,
    access_token,
    profile_img: user.personal_info.profile_img,
    username: user.personal_info.username,
    fullname: user.personal_info.fullname,
    email: user.personal_info.email,
  };
};

//1. Signup route
export const signUp = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(403).json({ error: "Email already exists" });
    }

    // Validate input data
    if (!fullname.length > 3) {
      return res.status(403).json({
        error: "Fullname must be at least 3 letters long",
      });
    }
    if (!email.length || !emailRegex.test(email)) {
      return res.status(403).json({ error: "Enter a valid Email" });
    }
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password should be 6 to 20 characters long with at least one numeric, one lowercase, and one uppercase letter."
      );

      // res.status(403).json({
      //   error:
      //     "Password should be 6 to 20 characters long with at least one numeric, one lowercase, and one uppercase letter",
      // });
    }

    // Hash password and create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const username = await generateUsername(email);
    const newUser = new User({
      personal_info: { fullname, email, password: hashedPassword, username },
    });
    await newUser.save();
    res.status(200).json(formatUserDatatoSend(newUser));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

//2. Signin route
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ "personal_info.email": email });
    if (!user) {
      // alert("Email not found");
      return res.status(403).json({ error: "Email not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.personal_info.password
    );
    if (!isPasswordValid) {
      // alert("Incorerct password");

      return res.status(403).json({ error: "Incorrect password" });
    }
    res.status(200).json(formatUserDatatoSend(user));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

//3. Get user data route
export const getUserData = async (req, res) => {
  try {
    const userId = req.user.id; // Ensure req.user is set by fetchuser middleware
    const user = await User.findById(userId).select("-personal_info.password");

    if (!user) {
      alert("User not found");

      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(formatUserDatatoSend(user));
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

export default router;
