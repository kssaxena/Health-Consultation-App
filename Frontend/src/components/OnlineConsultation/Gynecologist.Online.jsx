import React from "react";
import DoctorCardOnlyOnline from "../../utils/DoctorCardOnlyOnline";

const GynecologistOnline = () => {
  return (
    <div className="bg-[#E5F8FF] flex flex-col justify-center items-center">
      <h1 className="p-5 text-xl w-full">
        Book appointments with most reputed & verified Gynecologist
      </h1>
      <section className="w-3/4 p-5 flex flex-col justify-center items-center">
        <DoctorCardOnlyOnline />
      </section>
    </div>
  );
};

export default GynecologistOnline;