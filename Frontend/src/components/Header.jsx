// import { LocateIcon } from "lucide-react";
// import Lottie from "lottie-web";
import React, { useState } from "react";
import Lottie from "lottie-web";
import { useRef } from "react";
import { useEffect } from "react";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import Logoanimation from "../assets/LogoAnimation.json";
import { useNavigate } from "react-router-dom";
import { LogOut, MenuSquare, X } from "lucide-react";
import { useSelector } from "react-redux";
// import { useRef } from "react";

const Header = () => {
  const UserLogOutButton = useSelector((store) => store.user.userDetails);

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

  const [showHamBerger, setShowHaMBerger] = useState(false);

  const HamBerger = ({ onClose }) => {
    const modelRef = useRef();

    const closeModel = (e) => {
      if (modelRef.current === e.target) {
        onClose();
      }
    };

    return (
      <div
        ref={modelRef}
        onClick={closeModel}
        className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-3xl bg-[#17171B] bg-opacity-85 h-screen"
      >
        <div className="flex flex-col bg-opacity-100 w-full items-center justify-evenly h-screen">
          <button className="place-self-start" onClick={onClose}>
            <X className="text-white" />
          </button>
          <div className="rounded-xl lg:w-1/2 w-[90%]  h-3/4">
            {UserLogOutButton.length === 1 ? (
              <section className={`w-[15%] justify-evenly items-center flex `}>
                <button
                  onClick={NavigateToLoginPage}
                  className={`border p-2 rounded-lg bg-[#E5F8FF] border-blue-500 hover:drop-shadow-md drop-shadow-sm shadow-black hover:scale-105 duration-200 ease-in-out flex justify-center items-center`}
                >
                  <h1 className="text-xs text-black">
                    <LogOut />
                  </h1>
                  <h1 className="text-xs text-black">Log Out</h1>
                </button>
              </section>
            ) : (
              <section
                className={`justify-evenly items-center flex flex-col  h-1/2  `}
              >
                <button
                  onClick={NavigateToLoginPage}
                  className={`border p-2 rounded-lg bg-[#E5F8FF] border-blue-500 hover:drop-shadow-md drop-shadow-sm shadow-black hover:scale-105 duration-200 ease-in-out ${
                    location.pathname === "/login" ? "bg-green-500 " : ""
                  } `}
                >
                  Login
                </button>
                <button
                  onClick={NavigateToRegisterPage}
                  className={`border p-2 rounded-lg bg-[#E5F8FF] border-blue-500 hover:drop-shadow-md drop-shadow-sm shadow-black hover:scale-105 duration-200 ease-in-out ${
                    location.pathname === "/register" ? "bg-green-500 " : ""
                  }`}
                >
                  Register
                </button>
              </section>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed flex flex-col justify-evenly items-center  z-50 bg-[#248DAC] shadow-black drop-shadow-md w-full">
      <div
        className={`flex justify-evenly items-center h-20 z-50 bg-[#248DAC] shadow-black drop-shadow-md w-full`}
      >
        <div className="lg:hidden p-3">
          <button onClick={() => setShowHaMBerger(true)}>
            <MenuSquare size={30} />
          </button>
          {showHamBerger && (
            <HamBerger onClose={() => setShowHaMBerger(false)} />
          )}
        </div>
        <section className="lg:w-1/4 w-full flex justify-evenly items-center ">
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
        <section className={`w-1/2 hidden lg:block`}>
          <TypewriterEffectSmooth words={words} />
        </section>

        <div className="hidden lg:block w-[15%]">
          {UserLogOutButton.length === 1 ? (
            <section className={`w-[15%] justify-evenly items-center flex `}>
              <button
                onClick={NavigateToLoginPage}
                className={`border p-2 rounded-lg bg-[#E5F8FF] border-blue-500 hover:drop-shadow-md drop-shadow-sm shadow-black hover:scale-105 duration-200 ease-in-out flex justify-center items-center`}
              >
                <h1 className="text-xs text-black">
                  <LogOut />
                </h1>
                <h1 className="text-xs text-black">Log Out</h1>
              </button>
            </section>
          ) : (
            <section className={`w-full justify-evenly items-center flex `}>
              <button
                onClick={NavigateToLoginPage}
                className={`border p-2 rounded-lg bg-[#E5F8FF] border-blue-500 hover:drop-shadow-md drop-shadow-sm shadow-black hover:scale-105 duration-200 ease-in-out ${
                  location.pathname === "/login" ? "bg-green-500 " : ""
                } `}
              >
                Login
              </button>
              <button
                onClick={NavigateToRegisterPage}
                className={`border p-2 rounded-lg bg-[#E5F8FF] border-blue-500 hover:drop-shadow-md drop-shadow-sm shadow-black hover:scale-105 duration-200 ease-in-out ${
                  location.pathname === "/register" ? "bg-green-500 " : ""
                }`}
              >
                Register
              </button>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
