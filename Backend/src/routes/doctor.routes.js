import express from "express";
import { doctorRegister, refreshAccessToken, userDoctorLogin, userDoctorLogout } from "../controllers/doctor.controllers.js";

const router = express.Router();

router.route("/register").post(doctorRegister);
router.route("/login").post(userDoctorLogin);
// router.route("/logout").post(userDoctorLogout);
// router.route("/refresh-token").post(refreshAccessToken);

export default router;
