import React from "react";
import InClinicOfflineCard from "./InClinicOfflineCard";
import FeatureCards from "./FeatureCard";
import ClinicOnlineCards from "./ClinicOnlineCards";
import { useLocation } from "react-router-dom";
import DoctorCard from "../utils/DoctorCard";
import DoctorCardOnlyOnline from "../utils/DoctorCardOnlyOnline";
import Location from "./Location";
// import DoctorCard from "./DoctorCard";

const Hero = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-[#E5F8FF] pt-20">
      <div className="p-5 rounded-b-2xl bg-[#248DAC] flex w-3/4 ">
        <label className="drop-shadow-md shadow-black rounded-md m-1 w-1/2 h-10 p-3 flex justify-around items-center bg-white ">
          <Location />
          {/* <input placeholder={"Location"} /> */}
        </label>
        <input
          className="drop-shadow-md shadow-black rounded-md m-1 w-1/2 h-10 p-3 flex justify-center items-center "
          placeholder="Search for Doctors, Surgeons, Clinics etc."
        />
      </div>
      {/* <h1>Hello and Welcome</h1> */}
      <FeatureCards />
      <ClinicOnlineCards />
      <InClinicOfflineCard />
    </div>
  );
};

export default Hero;
