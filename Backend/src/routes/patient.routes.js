import express from "express";
import { User } from "../models/patient.models.js";
import { userLogin, userRegister } from "../controllers/patient.controllers.js";

const router = express.Router();

router.route("/register").post(userRegister)
router.route("/login").post(userLogin)

export default router;
