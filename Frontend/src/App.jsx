// import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Hero from "./components/Hero";
import Header from "./components/Header";
import LoginPage from "./components/Login";
import Footer from "./components/Footer";
import Register from "./components/Register";
import DoctorRegistration from "./components/DoctorRegistration";
import Dentist from "./components/OnlineConsultation/Dentist";
import Dietitian from "./components/OnlineConsultation/Dietition";
import GeneralPhysician from "./components/OnlineConsultation/GeneralPhysician";
import GeneralSurgeon from "./components/OnlineConsultation/GeneralSurgeon";
import Gynecologist from "./components/OnlineConsultation/Gynecologist";
import Orthopedist from "./components/OnlineConsultation/Orthopedist";
import Pediatrition from "./components/OnlineConsultation/Pediatrition";
import Physiotherapist from "./components/OnlineConsultation/Physiotherapist";

// import NewUser from "../mongo";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />

        {/* Register and login area */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register_as_doctor" element={<DoctorRegistration />} />

        {/* Online consultation area  */}
        <Route path="/dentist_online" element={<Dentist />} />
        <Route path="/dietitian_online" element={<Dietitian />} />
        <Route
          path="/general_physician_online"
          element={<GeneralPhysician />}
        />
        <Route path="/general_surgeon_online" element={<GeneralSurgeon />} />
        <Route path="/gynecologist_online" element={<Gynecologist />} />
        <Route path="/orthopedist_online" element={<Orthopedist />} />
        <Route path="/pediatrition_online" element={<Pediatrition />} />
        <Route path="/physiotherapist_online" element={<Physiotherapist />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
