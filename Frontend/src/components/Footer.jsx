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
      <div className={`flex p-10 w-full  justify-evenly items-start `}>
        <section className={`navbar flex flex-col justify-evenly`}>
          <h1 className="font-semibold text-lg mb-2 text-white">Health Tap</h1>
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
        </section>
        <section className={`navbar flex flex-col justify-evenly`}>
          <h1 className="font-semibold text-lg mb-2 text-white">More</h1>
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
        </section>
        <section className={`navbar flex flex-col justify-evenly`}>
          <h1 className="font-semibold text-lg text-white mb-2">Social</h1>
          {NavigationElementsFooter3.map((item) => (
            <Link
              className={`w-fit text-sm hover:text-white  cursor-pointer ease-in-out duration-200 hover:underline hover:underline-offset-1`}
              key={item.id}
              href={item.url}
              // onClick={handleClick}
            >
              {item.title}
            </Link>
          ))}
        </section>
      </div>
    );
  };

  return (
    <div
      className={`flex justify-evenly items-center bg-[#333333] text-gray-500`}
    >
      <section className="text-center text-gray-500 text-sm w-1/4">
        <h1>
          2024 Health Tap <br></br>All rights reserved.
        </h1>
      </section>
      <section className={`w-1/2 flex justify-evenly `}>
        <FooterAllElements />
      </section>
      {/* <h1>
        <img src={LoginPhoto} />
      </h1> */}
    </div>
  );
};

export default Footer;
