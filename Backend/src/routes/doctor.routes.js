// import express from "express";
// import {
//   collectDoctorData,
//   doctorRegister,
//     refreshAccessToken,
//   userDoctorLogin,
//     userDoctorLogout,
//   getDoctorDetails,
// } from "../controllers/doctor.controllers.js";

// const router = express.Router();

// router.route("/register").post(doctorRegister);
// router.route("/login").post(userDoctorLogin);
// router.route("/profile").get(collectDoctorData);
// router.route("/logout").post(userDoctorLogout);
// router.route("/refresh-token").post(refreshAccessToken);
// router.route("/doctor-details").get(getDoctorDetails);

// export default router;

import express from "express";
import {
  doctorRegister,
  userDoctorLogin,
  getDoctorDetails, // Import the new function
} from "../controllers/doctor.controllers.js";

const router = express.Router();

router.route("/register").post(doctorRegister);
router.route("/login").post(userDoctorLogin);
router.route("/doctor-details/:specialization").get(getDoctorDetails); // Use the new controller

export default router;
