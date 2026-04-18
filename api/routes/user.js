import express from "express";
import fetchuser from "../middleware/fetchuser.js";
import {
  signUp,
  signIn,
  getUserData,
  changePassword,
} from "../controllers/user.js";

const router = express.Router();

// All routes are prefixed with /api/v1/auth in index.js
router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/me", fetchuser, getUserData);
router.put("/change-password", fetchuser, changePassword);

export default router;
