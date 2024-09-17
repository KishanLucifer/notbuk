import express from "express";
import fetchuser from "../middleware/fetchuser.js";

import {
  signUp,
  signIn,
  getUserData,
  // googleAuth,
} from "../controllers/user.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/getuserdata", fetchuser, getUserData);
// router.post("/google-auth", googleAuth);

export default router;
