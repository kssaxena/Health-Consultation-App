import React from "react";
import { doctorphoto, reactphoto } from "../assets";
import Lottie from "lottie-web";
import { useRef } from "react";
import { useEffect } from "react";
import CardForDoctorJson from "../assets/CardForDoctor.json";

const CardForOffline = ({ DoctorType }) => {
  const CardForDoctor = useRef(null);

  useEffect(() => {
    Lottie.loadAnimation({
      container: CardForDoctor.current,
      renderer: "svg",
      autoplay: true,
      loop: true,
      animationData: CardForDoctorJson,
    });
  }, []);

  return (
    <button className="offline bg-[#248DAC] flex flex-col justify-center items-center w-48 h-48 rounded-lg drop-shadow-xl shadow-black m-2 hover:drop-shadow-xl hover:shadow-black duration-200 ease-in-out">
      <div
        ref={CardForDoctor}
        className="w-60 h-w-60 overflow-hidden rounded-full "
      ></div>
      {/* <img
          src={doctorphoto}
          className="w-28 rounded-lg shadow-sm shadow-black object-cover align-middle"
        /> */}
      <h1 className="text-2xl font-semibold">{DoctorType}</h1>
    </button>
  );
};

export default CardForOffline;
