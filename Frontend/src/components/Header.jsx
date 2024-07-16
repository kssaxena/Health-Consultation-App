// import { LocateIcon } from "lucide-react";
// import Lottie from "lottie-web";
import React from "react";
import Lottie from "lottie-web";
import { useRef } from "react";
import { useEffect } from "react";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import Logoanimation from "../assets/LogoAnimation.json";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const NavigateToLoginPage = () => {
    navigate("/login");
  };
  const NavigateToRegisterPage = () => {
    navigate("/register");
  };
  const HomePage = () => {
    navigate("/");
  };

  const words = [
    {
      text: "Your",
    },
    {
      text: "Health",
    },
    {
      text: ", on",
    },
    {
      text: "Tap .",
      className: "text-green-500 dark:text-green-500",
    },
  ];

  const LogoAnimation = useRef(null);

  useEffect(() => {
    Lottie.loadAnimation({
      container: LogoAnimation.current,
      renderer: "svg",
      autoplay: true,
      loop: true,
      animationData: Logoanimation,
    });
  }, []);

  return (
    <div className="fixed flex flex-col justify-evenly items-center  z-50 bg-[#248DAC] shadow-black drop-shadow-md w-full">
      <div
        className={`flex justify-evenly items-center h-20 z-50 bg-[#248DAC] shadow-black drop-shadow-md w-full`}
      >
        <section className="w-1/4 flex justify-evenly items-center ">
          <button
            onClick={HomePage}
            ref={LogoAnimation}
            className="w-20 h-20 overflow-hidden rounded-full"
          ></button>
          <button
            onClick={HomePage}
            className="text-2xl font-sans font-bold drop-shadow-md"
          >
            Health Tap
          </button>
        </section>
        <section className={`w-1/2 flex`}>
          <TypewriterEffectSmooth words={words} />
        </section>
        <section className={`w-[15%] justify-evenly items-center flex `}>
          <button
            onClick={NavigateToLoginPage}
            className={`border p-2 rounded-lg bg-[#E5F8FF] border-blue-500 hover:drop-shadow-md drop-shadow-sm shadow-black hover:scale-105 duration-200 ease-in-out ${
              location.pathname === "/login" ? "bg-green-500 " : ""
            } `}
          >
            Login
          </button>
          <button onClick={NavigateToRegisterPage} 
            className={`border p-2 rounded-lg bg-[#E5F8FF] border-blue-500 hover:drop-shadow-md drop-shadow-sm shadow-black hover:scale-105 duration-200 ease-in-out ${
              location.pathname === "/register" ? "bg-green-500 " : ""
            }`}
          >
            Register
          </button>
        </section>
      </div>
    </div>
  );
};

export default Header;
