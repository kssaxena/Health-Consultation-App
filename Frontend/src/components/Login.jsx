import React from "react";
import { LoginPhoto } from "../assets";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="flex pt-24 pb-24 bg-[#E5F8FF] justify-evenly items-center h-full">
      <section className="w-1/2 hidden lg:block ">
        <img src={LoginPhoto} />
      </section>
      <form className="bg-[#E5F8FF] lg:w-1/4 w-[90%] drop-shadow-xl shadow-black border rounded-xl flex flex-col justify-center items-center h-fit p-5">
        <label className="flex flex-col text-base w-full font-light p-2 m-2">
          Email Address
          <input
            type="email "
            className="border p-2 rounded-lg mt-2 w-full text-base drop-shadow-xl shadow-black "
            placeholder="Email Address"
          />
        </label>
        <label className="flex flex-col text-base w-full font-light p-2 m-2">
          Password
          <input
            type="password"
            className="border p-2 rounded-lg mt-2 w-full text-base drop-shadow-xl shadow-black "
            placeholder="Password"
          />
        </label>
        <button
          type="submit"
          className="bg-[#248DAC] text-white p-2 rounded-lg w-fit mt-5"
        >
          Login
        </button>
        <div className="p-5 w-full justify-center items-center flex">
          <Link
            to={"/login_as_doctor"}
            className="text-blue-500 hover:underline text-lg flex justify-center items-center"
          >
            Login as Doctor <ExternalLink />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
