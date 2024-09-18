import React from "react";
import CardForOffline from "../utils/CardForOffline";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const InClinicOfflineCard = () => {
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
        Book appointment with top listed In-Clinic Doctors{" "}
      </h1>
      {/* all doctors are listed in some particular fields according to there respective DoctorType  */}
      <Carousel responsive={responsive} className="p-5 z-10">
        <CardForOffline path={"/doctors_offline"} DoctorType={"Physician "} />
        <CardForOffline path={"/doctors_offline"} DoctorType={"Dentist"} />
        <CardForOffline path={"/doctors_offline"} DoctorType={"Gynecologist"} />
        <CardForOffline
          path={"/doctors_offline"}
          DoctorType={"Physiotherapist"}
        />
        <CardForOffline path={"/doctors_offline"} DoctorType={"Orthopedist"} />
        <CardForOffline path={"/doctors_offline"} DoctorType={"Surgeon"} />
        <CardForOffline path={"/doctors_offline"} DoctorType={"Dietitian"} />
        <CardForOffline path={"/doctors_offline"} DoctorType={"Pediatrician"} />
      </Carousel>
    </section>
  );
};

export default InClinicOfflineCard;
