import React from "react";
import { LoginPhoto } from "../assets";
import {
  NavigationElementsFooter1,
  NavigationElementsFooter2,
  NavigationElementsFooter3,
} from "../constants/AllConstants";
import { Link } from "react-router-dom";

const Footer = () => {
  const handleClick = (event) => {
    event.preventDefault();
  };

  const FooterAllElements = () => {
    return (
      <div
        className={`flex p-10 w-full flex-col lg:flex-row justify-evenly items-start`}
      >
        <section
          className={` navbar flex flex-col w-full lg:w-fit justify-evenly items-center lg:items-start`}
        >
          <h1 className="font-semibold text-lg mb-2 text-white">Health Tap</h1>
          <div className="w-full flex lg:flex-col justify-evenly items-center lg:items-start">
            {NavigationElementsFooter1.map((item) => (
              <Link
                className={`w-fit text-sm hover:text-white cursor-pointer ease-in-out duration-200 hover:underline hover:underline-offset-1`}
                key={item.id}
                href={item.url}
                // onClick={handleClick}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </section>
        <section className="hidden lg:block">
          <section
            className={` navbar flex flex-col w-full lg:w-fit justify-evenly items-center lg:items-start`}
          >
            <h1 className="font-semibold text-lg mb-2 text-white">More</h1>
            <div className="w-full flex lg:flex-col justify-evenly items-center lg:items-start">
              {NavigationElementsFooter2.map((item) => (
                <Link
                  className={`w-fit text-sm hover:text-white cursor-pointer ease-in-out duration-200 hover:underline hover:underline-offset-1`}
                  key={item.id}
                  to={item.url}
                  // onClick={handleClick}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </section>
        </section>

        <section
          className={` navbar flex flex-col w-full lg:w-fit justify-evenly items-center lg:items-start`}
        >
          <h1 className="font-semibold text-lg mb-2 text-white">Social</h1>
          <div className="w-full flex lg:flex-col justify-evenly items-center lg:items-start">
            {NavigationElementsFooter3.map((item) => (
              <Link
                className={`w-fit text-sm hover:text-white cursor-pointer ease-in-out duration-200 hover:underline hover:underline-offset-1`}
                key={item.id}
                href={item.url}
                // onClick={handleClick}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </section>
      </div>
    );
  };

  return (
    <div
      className={`flex flex-col lg:flex-row lg:justify-evenly justify-start lg:items-center items-start bg-[#333333] text-gray-500`}
    >
      <section className="text-center text-gray-500 text-sm lg:w-1/4 lg:p-0 p-5 w-full ">
        <h1>
          2024 Health Tap <br></br>All rights reserved.
        </h1>
      </section>
      <section className={`lg:w-1/2 w-full flex justify-evenly `}>
        <FooterAllElements />
      </section>
      {/* <h1>
        <img src={LoginPhoto} />
      </h1> */}
    </div>
  );
};

export default Footer;
