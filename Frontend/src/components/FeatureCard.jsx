import React from "react";
import { BestDoctors, OnClinicVisit, VideoCallDoctor } from "../assets";

export const FeatureCard = ({ Facility, description, photo }) => {
  return (
    <div className="bg-[#248DAC] m-4 h-96 w-72 flex flex-col justify-between items-center drop-shadow-xl rounded-xl shadow-inner-md ">
      <div>{photo}</div>
      <h1 className="text-2xl font-semibold drop-shadow-lg">{Facility}</h1>
      <h1 className="text-lg font-light pb-5 drop-shadow-md pr-5 pl-5 text-center">
        {description}
      </h1>
    </div>
  );
};

const FeatureCards = () => {
  return (
    <section className="flex flex-col w-full justify-center items-center p-5 ">
      <h1 className="text-3xl drop-shadow-2xl shadow-black ">
        We provide best Consultation for your Health
      </h1>
      <section className="feature_section flex ">
        <FeatureCard
          photo={
            <img
              src={VideoCallDoctor}
              className=" drop-shadow-xl rounded-t-xl"
            />
          }
          Facility={"Online Consultation"}
          description={"Get advices online"}
        />
        <FeatureCard
          photo={
            <img src={OnClinicVisit} className=" drop-shadow-xl rounded-t-xl" />
          }
          Facility={"On Clinic Visit"}
          description={"Book Your appointment online"}
        />
        <FeatureCard
          photo={
            <img src={BestDoctors} className=" drop-shadow-xl rounded-t-xl" />
          }
          Facility={"Top Experts"}
          description={"No need to worry about unsatisfactory Advice"}
        />
      </section>
    </section>
  );
};

export default FeatureCards;
