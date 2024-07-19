// import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Hero from "./components/Hero";
import Header from "./components/Header";
import LoginPage from "./components/Login";
import Footer from "./components/Footer";
import Register from "./components/Register";
import DoctorRegistration from "./components/DoctorRegistration";
import DoctorsListingOnline from "./components/DoctorsListingOnline";
import DoctorsListingOffline from "./components/DoctorsListingOffline";
// import DoctorsListingOffline from "./components/testing";
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
        {/* Doctor Listing area */}
        <Route path="/doctors_online" element={<DoctorsListingOnline />} />
        <Route path="/doctors_offline" element={<DoctorsListingOffline />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
