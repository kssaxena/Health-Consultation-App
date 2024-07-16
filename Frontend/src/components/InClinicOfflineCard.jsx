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
      <Carousel responsive={responsive} className="p-5 z-10">
        <CardForOffline DoctorType={"Physician "} />
        <CardForOffline DoctorType={"Dentist"} />
        <CardForOffline DoctorType={"Gynecologist"} />
        <CardForOffline DoctorType={"Physiotherapist"} />
        <CardForOffline DoctorType={"Orthopedist"} />
        <CardForOffline DoctorType={"Surgeon"} />
        <CardForOffline DoctorType={"Dietitian"} />
        <CardForOffline DoctorType={"Pediatrician"} />
      </Carousel>
    </section>
  );
};

export default InClinicOfflineCard;
