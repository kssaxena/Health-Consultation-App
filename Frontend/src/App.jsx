// import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Hero from "./components/Hero";
import Header from "./components/Header";
import LoginPage from "./components/Login";
import DoctorLoginPage from "./components/DoctorLogin";
import Footer from "./components/Footer";
import Register from "./components/Register";
import DoctorRegistration from "./components/DoctorRegistration";
import DoctorsListingOnline from "./components/DoctorsListingOnline";
import DoctorsListingOffline from "./components/DoctorsListingOffline";
import PatientProfile from "./components/PatientProfile";
import DoctorProfile from "./components/DoctorProfile";
// import DoctorsListingOffline from "./components/testing";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />

        {/* Register and login area */}
        <Route path="/register" element={<Register />} />
        <Route path="/register_as_doctor" element={<DoctorRegistration />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login_as_doctor" element={<DoctorLoginPage />} />

        {/* profile area */}
        <Route path="/patientProfile" element={<PatientProfile />} />
        <Route path="/doctorProfile" element={<DoctorProfile />} />

        {/* Doctor Listing area */}
        <Route path="/doctors_online" element={<DoctorsListingOnline />} />
        <Route path="/doctors_offline" element={<DoctorsListingOffline />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
