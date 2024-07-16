import express from "express";
import { doctorRegister } from "../controllers/doctor.controllers.js";

const router = express.Router();

router.route("/register").post(doctorRegister);

export default router;
