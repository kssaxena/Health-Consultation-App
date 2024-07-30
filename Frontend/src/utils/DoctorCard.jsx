// import { ChevronDown } from "lucide-react";
import React from "react";

const DoctorCard = ({
  doctorphoto,
  clinic,
  doctor_name,
  doctor_type,
  experience,
  location,
  clinicContactNumber,
  fee,
}) => {
  return (
    <div className="bg-[#E5F8FF] h-64 w-3/4 flex justify-between items-center m-5 drop-shadow-md hover:drop-shadow-xl duration-200 ease-in-out shadow-black border rounded-lg ">
      <div className="w-[30%] flex justify-center p-2 items-center h-full ">
        <img
          src={doctorphoto}
          alt="doctor_image"
          className="object-fill rounded-full drop-shadow-xl"
        />
      </div>
      <div className="w-[50%] h-full flex flex-col justify-around p-10">
        <h1 className="text-4xl font-medium font-sans">{clinic}</h1>
        <h1 className="text-2xl ">{doctor_name}</h1>
        <h1 className="text-base font-light">{doctor_type}</h1>
        <h1 className="text-base font-light">
          Experience of {experience} Years
        </h1>
        <h1 className="text-base font-light">Location :{location}</h1>
        <h1 className="text-base font-light">
          Clinic Contact Number :{clinicContactNumber}
        </h1>
        <h1 className="text-base font-bold ">Fee {fee}</h1>
      </div>
      <div className="w-[15%] h-full flex flex-col items-center justify-evenly p-10">
        <button className="h-10 w-fit p-4 py-6 flex justify-center items-center button rounded-full bg-[#248DAC] font-bold text-white tracking-widest uppercase transform hover:scale-105 transition-colors duration-300 drop-shadow-lg ">
          Offline
        </button>
        <button className="h-10 w-fit p-4 py-6 flex justify-center items-center button rounded-full bg-[#248DAC] font-bold text-white tracking-widest uppercase transform hover:scale-105 transition-colors duration-300 drop-shadow-lg ">
          Online
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
