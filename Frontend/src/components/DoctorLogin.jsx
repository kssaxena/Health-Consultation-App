// import React from "react";
import React from "react";
import { LoginPhoto } from "../assets";
import { useState } from "react";

const DoctorLoginPage = () => {
  const [user, setDoctorUser] = useState({
    email: "",
    password: "",
  });

  const HandelInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    // console.log(name, value);
    setDoctorUser({ ...user, [name]: value });
    // console.log(user);
  };

  const DoctorLogin = async () => {
    const requestOptions = {
      method: "GET",
    };

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/doctor/login",
        requestOptions
      );

      const result = await response.json();

      if (response.ok) {
        console.log("Success:", result);
        alertOk("Login Successful");
      } else {
        console.error("Error:", result);
        alertError("Failed to Failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alertError("Failed to Failed");
    }
  };

  return (
    <div className="flex pt-24 pb-24 bg-[#E5F8FF] justify-evenly items-center h-full">
      <form
        onSubmit={DoctorLogin}
        className="bg-[#E5F8FF] lg:w-1/4 w-[90%] drop-shadow-xl shadow-black border rounded-xl flex flex-col justify-center items-center h-fit p-5"
      >
        <label className="flex flex-col text-base w-full font-light p-2 m-2">
          Email Address
          <input
            onChange={HandelInputChange}
            name="email"
            value={user.email}
            type="email "
            className="border p-2 rounded-lg mt-2 w-full text-base drop-shadow-xl shadow-black "
            placeholder="Email Address"
          />
        </label>
        <label className="flex flex-col text-base w-full font-light p-2 m-2">
          Password
          <input
            onChange={HandelInputChange}
            name="password"
            value={user.password}
            type="password"
            className="border p-2 rounded-lg mt-2 w-full text-base drop-shadow-xl shadow-black "
            placeholder="Password"
          />
        </label>
        <button
          onClick={DoctorLogin}
          type="submit"
          className="bg-[#248DAC] text-white p-2 rounded-lg w-fit mt-5"
        >
          Login
        </button>
      </form>
      <section className="w-1/2 hidden lg:block">
        <img src={LoginPhoto} />
      </section>
    </div>
  );
};

export default DoctorLoginPage;
