import React from "react";
import { BestDoctors, OnClinicVisit, VideoCallDoctor } from "../assets";

export const FeatureCard = ({ Facility, description, photo }) => {
  return (
    <div className="bg-[#248DAC] lg:m-4 m-3 lg:h-96 h-20 lg:w-72 w-[90%] flex lg:flex-col flex-row lg:justify-between items-center drop-shadow-xl rounded-xl shadow-inner-md  justify-center">
      <div className="hidden lg:block">{photo}</div>
      <div className="w-1/2 lg:w-full flex justify-center items-center">
        <h1 className="lg:text-2xl text-center w-full font-semibold drop-shadow-lg">
          {Facility}
        </h1>
      </div>
      <div className="w-1/2 lg:w-full flex justify-center items-center">
        <h1 className="text-lg font-light lg:pb-5 drop-shadow-md lg:pr-5 lg:pl-5 text-center w-full ">
          {description}
        </h1>
      </div>
    </div>
  );
};

const FeatureCards = () => {
  return (
    <section className="flex flex-col w-full justify-center items-center p-5 ">
      <h1 className="lg:text-3xl drop-shadow-2xl shadow-black ">
        We provide best Consultation for your Health
      </h1>
      <section className="feature_section flex flex-col lg:flex-row">
        {/* all features of health tap in form of single cards */}
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
