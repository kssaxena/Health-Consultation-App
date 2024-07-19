import React from "react";
import DoctorCard from "../../utils/DoctorCard";

const PhysiotherapistOffline = () => {
  return (
    <div className="bg-[#E5F8FF] flex flex-col justify-center items-center">
      <h1 className="p-5 text-xl w-full">
        Book appointments with most reputed & verified Physiotherapist
      </h1>
      <section className="w-3/4 p-5 flex flex-col justify-center items-center">
        <DoctorCard />
      </section>
    </div>
  );
};

export default PhysiotherapistOffline;
