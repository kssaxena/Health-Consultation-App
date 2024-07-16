import React from "react";
import DoctorCardOnlyOnline from "../../utils/DoctorCardOnlyOnline";

const Physiotherapist = () => {
  return (
    <div className="bg-[#8A88E8] flex flex-col justify-center items-center">
      <h1 className="p-5 text-xl w-full">
        Book appointments with most reputed & verified Physiotherapist
      </h1>
      <section className="w-3/4 p-5 flex flex-col justify-center items-center">
        <DoctorCardOnlyOnline
          clinic={"Dr. Jhatka Clinic"}
          doctor_name={"Dr. Jhatu"}
          doctor_type={"Chut ka Doctor"}
          experience={"24 years"}
          fee={"6000"}
          location={"russia"}
        />
      </section>
    </div>
  );
};

export default Physiotherapist;
