import React from "react";
// import React from "react";
import { Apple, Google } from "../assets";

const DoctorRegistration = () => {
  const DoctorForm = () => {
    return (
      <form
        className={`flex flex-col justify-center items-center p-10 rounded-lg border shadow-md`}
      >
        <label className="w-full p-2 mb-10 text-2xl ">
          Email
          <input
            type="email"
            placeholder="Email"
            className="w-full text-base mt-5 p-3 rounded-md border drop-shadow-xl shadow-[#248DAC] hover:drop-shadow-2xl duration-200 ease-in-out"
          />
        </label>
        <section className="Name w-full mb-10 flex p-1 ">
          <label className="w-full m-1 text-2xl">
            First Name
            <input
              type="name"
              placeholder="First Name"
              className="hover:drop-shadow-2xl duration-200 ease-in-out w-full p-3 rounded-md drop-shadow-xl shadow-[#248DAC] border mt-5 text-base"
            />
          </label>
          <label className="w-full m-1 text-2xl">
            Last Name
            <input
              type="last_name"
              placeholder="Last Name"
              className="w-full p-3 hover:drop-shadow-2xl duration-200 ease-in-out rounded-md drop-shadow-xl shadow-[#248DAC] border mt-5 text-base"
            />
          </label>
        </section>
        <label className="w-full p-2 mb-10 text-2xl">
          Contact Number
          <input
            type="tel"
            placeholder="Contact Number"
            className="hover:drop-shadow-2xl duration-200 ease-in-out w-full p-3 rounded-md drop-shadow-xl shadow-[#248DAC] border mt-5 text-base"
          />
        </label>
        <label className="w-full p-2 mb-10 text-2xl">
          Date of birth
          <input
            type="date"
            placeholder="Date of birth"
            className="hover:drop-shadow-2xl duration-200 ease-in-out w-full p-3 rounded-md drop-shadow-xl shadow-[#248DAC] border mt-5 text-base"
          />
        </label>
        <section className="w-full p-2 rounded-md mb-10 ">
          <div className="flex p-3  drop-shadow-xl shadow-black  hover:drop-shadow-2xl duration-200 ease-in-out border border-[#248DAC] rounded-md flex-col w-full">
            <label htmlFor="male">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                className="m-2"
              />
              Male
            </label>
            <label htmlFor="female">
              <input
                type="radio"
                id="female"
                value="female"
                name="gender"
                className="m-2"
              />
              Female
            </label>
            <label htmlFor="others">
              <input
                type="radio"
                id="others"
                name="gender"
                value="others"
                className="m-2"
              />
              Others
            </label>
          </div>
        </section>
        <section className="Name w-full mb-10 flex p-1 ">
          <label className="w-full m-1 text-2xl">
            Experience
            <input
              type="number"
              placeholder="Experience in Years"
              className="hover:drop-shadow-2xl duration-200 ease-in-out w-full p-3 rounded-md drop-shadow-xl shadow-[#248DAC] border mt-5 text-base"
            />
          </label>
          <label className="w-full m-1 text-2xl">
            Consultation Fee Expectation
            <input
              type="number"
              placeholder="Fee Expectations"
              className="w-full p-3 hover:drop-shadow-2xl duration-200 ease-in-out rounded-md drop-shadow-xl shadow-[#248DAC] border mt-5 text-base"
            />
          </label>
        </section>
        <section className="Name w-full mb-10 flex p-1 ">
          <label className="w-full m-1 text-2xl">
            Location
            <input
              type="address"
              placeholder="Location"
              className="hover:drop-shadow-2xl duration-200 ease-in-out w-full p-3 rounded-md drop-shadow-xl shadow-[#248DAC] border mt-5 text-base"
            />
          </label>
          <label className="w-full m-1 text-2xl">
            Specialization
            <input
              type="text"
              placeholder="Your field Specialization"
              className="w-full p-3 hover:drop-shadow-2xl duration-200 ease-in-out rounded-md drop-shadow-xl shadow-[#248DAC] border mt-5 text-base"
            />
          </label>
        </section>
        <label className="w-full p-2 mb-10 text-2xl">
          Clinic / Hospitals
          <input
            type="text"
            placeholder="Your Clinic name or Hospitals name for patient's checkup"
            className="hover:drop-shadow-2xl duration-200 ease-in-out w-full p-3 rounded-md drop-shadow-xl shadow-[#248DAC] border mt-5 text-base"
          />
        </label>
        <label className="w-full p-2 mb-10 text-2xl ">
          Password
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Password"
            className="w-full text-base mt-5 p-3 rounded-md border drop-shadow-xl shadow-[#248DAC] hover:drop-shadow-2xl duration-200 ease-in-out"
          />
        </label>
        <button
          // onClick={submit}
          className="bg-[#248DAC] text-white p-3 rounded-lg w-full mt-5 text-lg hover:scale-105 scale-100 duration-200 ease-in-out hover:drop-shadow-lg"
        >
          Continue
        </button>
      </form>
    );
  };

  return (
    <div className="w-full flex flex-col justify-center items-center pt-28 bg-[#E5F8FF]">
      <div>
        <h1 className="text-3xl m-5 drop-shadow-xl">
          Generate your consultation account here
        </h1>
        <DoctorForm />
      </div>
      <h1 className="m-10 text-lg">Or</h1>
      <div className="w-full flex flex-col justify-center items-center pb-20">
        <div className="cursor-pointer border rounded-md w-1/2 p-4 flex justify-center items-center m-2 hover:drop-shadow-lg hover:shadow shadow-black hover:scale-105 duration-200 ease-in-out ">
          <img src={Google} className="w-10 h-10" />
          <h1 className="w-3/4 items-center flex justify-center text-lg">
            Continue with Google
          </h1>
        </div>
        <div className="border rounded-md w-1/2 p-4 flex justify-center items-center m-2 hover:drop-shadow-lg hover:shadow shadow-black hover:scale-105 duration-200 ease-in-out ">
          <img src={Apple} className="w-10 h-10" />
          <h1 className="w-3/4 items-center flex justify-center text-lg">
            Continue with Apple
          </h1>
        </div>

        <h1 className="text-3xl m-5 drop-shadow-xl">
          Already have an account?
          <a
            href="/login"
            className="text-2xl underline text-blue-500 hover:text-[#248DAC] duration-200 ease-in-out"
          >
            Click here to Login
          </a>
        </h1>
      </div>
    </div>
  );
};

export default DoctorRegistration;
