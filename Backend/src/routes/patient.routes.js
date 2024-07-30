import express from "express";
import { User } from "../models/patient.models.js";
import {
  refreshAccessToken,
  userLogin,
  userLogout,
  userRegister,
} from "../controllers/patient.controllers.js";

const router = express.Router();

router.route("/register").post(userRegister);
router.route("/login").get(userLogin);
// router.route("/logout").post(userLogout);
// router.route("/refresh-token").post(refreshAccessToken);

export default router;
