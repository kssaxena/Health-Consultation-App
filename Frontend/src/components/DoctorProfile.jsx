import React from "react";
import { doctorphoto } from "../assets";

const DoctorProfile = () => {
  const InputDataArray = [
    { id: "0", text: "Email" },
    { id: "1", text: "Name" },
    { id: "2", text: "Contact_Number" },
    { id: "3", text: "DOB" },
    { id: "4", text: "Gender" },
    { id: "5", text: "Experience" },
    { id: "6", text: "Fee" },
    { id: "7", text: "Address" },
    { id: "8", text: "Specialization" },
    { id: "9", text: "Clinic_name" },
  ];

  const InputData = () => {
    return (
      <div className="w-full">
        {InputDataArray.map((data) => {
          return (
            <div key={data.id}>
              <h1 className="border-b w-full border-[#248DAC] m-1 p-2 font-semibold text-xl">
                {data.text}
              </h1>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="pt-20 bg-[#E5F8FF]">
      <section className="flex justify-evenly items-center p-5 shadow-lg ">
        <h1 className="text-5xl font-bold">My Profile..</h1>
        <button className="border p-2 rounded-lg bg-[#E5F8FF] border-[#248DAC] hover:drop-shadow-md drop-shadow-sm shadow-black hover:scale-105 duration-200 ease-in-out hover:bg-green-500">
          Log out
        </button>
      </section>
      <section className="flex items-center">
        <div className="flex flex-col w-1/4 justify-start items-end p-2">
          <h1 className="m-1 p-2 font-semibold text-xl">Email</h1>
          <h1 className="m-1 p-2 font-semibold text-xl">Name</h1>
          <h1 className="m-1 p-2 font-semibold text-xl">Contact Number</h1>
          <h1 className="m-1 p-2 font-semibold text-xl">Date of Birth</h1>
          <h1 className="m-1 p-2 font-semibold text-xl">Gender</h1>
          <h1 className="m-1 p-2 font-semibold text-xl">Experience</h1>
          <h1 className="m-1 p-2 font-semibold text-xl">Fee</h1>
          <h1 className="m-1 p-2 font-semibold text-xl">Address</h1>
          <h1 className="m-1 p-2 font-semibold text-xl">Specialization</h1>
          <h1 className="m-1 p-2 font-semibold text-xl">
            Clinic / Hospital Name
          </h1>
        </div>
        <div className="flex flex-col w-1/2 justify-start items-center p-2">
          <InputData />
        </div>
        <div className="w-1/4 p-5">
          <section className="p-5 w-full rounded-xl bg-[#248DAC] h-fit flex flex-col justify-center items-center">
            <img src={doctorphoto} className="rounded-full m-10" />
            <button className="border p-2 rounded-lg bg-[#E5F8FF] border-[#248DAC] hover:drop-shadow-md drop-shadow-sm shadow-black hover:scale-105 duration-200 ease-in-out hover:bg-green-500">
              Edit Profile
            </button>
          </section>
        </div>
      </section>
    </div>
  );
};

export default DoctorProfile;
