import { ChevronDown } from "lucide-react";
import React from "react";

const DoctorCardOnlyOnline = ({
  clinic,
  doctor_name,
  doctor_type,
  experience,
  location,
  fee,
}) => {
  return (
    <div className="bg-[#E5F8FF] h-64 w-3/4 flex justify-between items-center m-5 ">
      <div className="w-[25%] flex justify-center items-center  bg-[#248DAC] p-2 h-full ">
        <img
          src="https://via.placeholder.com/200"
          alt="doctor_image"
          className="object-cover h-full w-full"
        />
      </div>
      <div className="w-[50%] h-full flex flex-col justify-around p-10">
        <h1 className="text-4xl font-medium font-sans">{clinic}</h1>
        <h1 className="text-2xl ">{doctor_name}</h1>
        <h1 className="text-base font-light">{doctor_type}</h1>
        <h1 className="text-base font-light">Experience of {experience}</h1>
        <h1 className="text-base font-light">Location {location}</h1>
        <h1 className="text-base font-bold ">Fee {fee}</h1>
      </div>
      <div className="w-[25%] h-full flex flex-col items-center justify-evenly p-10">
        <button className="h-10 w-fit p-4 py-6 flex justify-center items-center button rounded-full bg-[#312D64] font-bold text-white tracking-widest uppercase transform hover:scale-105 ease-in-out transition-colors duration-300 shadow-sm shadow-black">
          Schedule
        </button>
      </div>
    </div>
  );
};

export default DoctorCardOnlyOnline;
