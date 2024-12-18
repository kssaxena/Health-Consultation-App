import React from "react";
import CardForOnline from "../utils/CardForOnline";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const ClinicOnlineCards = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <section className="In-Clinic_offline_card w-3/4 flex flex-col  p-5 ">
      <h1 className="text-3xl drop-shadow-2xl shadow-black ">
        Book appointment for Online Consultation
      </h1>
      {/* all doctors are listed in some particular fields according to there respective DoctorType  */}
      <Carousel responsive={responsive} className="p-5 z-10">
        <CardForOnline path={"/doctors_online"} DoctorType={"Physician "} />
        <CardForOnline path={"/doctors_online"} DoctorType={"Dentist"} />
        <CardForOnline path={"/doctors_online"} DoctorType={"Gynecologist"} />
        <CardForOnline
          path={"/doctors_online"}
          DoctorType={"Physiotherapist"}
        />
        <CardForOnline path={"/doctors_online"} DoctorType={"Orthopedist"} />
        <CardForOnline path={"/doctors_online"} DoctorType={"Surgeon"} />
        <CardForOnline path={"/doctors_online"} DoctorType={"Dietitian"} />
        <CardForOnline path={"/doctors_online"} DoctorType={"Pediatrician"} />
      </Carousel>
    </section>
  );
};

export default ClinicOnlineCards;
