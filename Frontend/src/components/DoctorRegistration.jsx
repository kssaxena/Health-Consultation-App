import React, { useState } from "react";
import { Apple, Google } from "../assets";
import { alertOk, alertError } from "../utils/Alert";

const DoctorRegistration = () => {
  const [form, setFormDoctorUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    contact_number: Number,
    dob: Date,
    gender: "",
    experience: Number,
    fee: Number,
    location: "",
    specialization: "",
    clinic_name: "",
    password: "",
  });

  const HandelInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormDoctorUser({ ...form, [name]: value });
  };

  function createFormData(form) {
    const formData = new FormData();

    // Add user data as key-value pairs
    for (const [key, value] of Object.entries(form)) {
      // Handle potential undefined values within user object
      if (value !== undefined) {
        console.log(key, value);
        formData.append(key, value);
      } else {
        console.warn(
          `Skipping key "${key}" in user object due to undefined value.`
        );
      }
    }
    return formData;
  }

  const Register = async () => {
    try {
      const formData = await createFormData(form);

      const requestOption = {
        method: "POST",
        body: formData,
        redirect: "follow",
      };
      await fetch(
        "https://localhost:8000/api/v1/doctor/register",
        requestOption
      )
        .then((response) => response.json())
        .then((result) => {
          console.log("Success:", result);
          alertOk("Registration Successful");
        })
        .catch((error) => {
          console.error("Error:", error);
          alertError("Failed to register");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const DoctorForm = () => {
    return (
      <form
        ref={form}
        className={`flex flex-col justify-center items-center p-10 rounded-lg border shadow-md`}
      >
        <label className="w-full p-2 mb-10 text-2xl ">
          Email
          <input
            onChange={HandelInputChange}
            value={form.email}
            name="email"
            type="email"
            placeholder="Email"
            className="w-full text-base mt-5 p-3 rounded-md border drop-shadow-xl shadow-[#248DAC] hover:drop-shadow-2xl duration-200 ease-in-out"
          />
        </label>
        <section className="Name w-full mb-10 flex p-1 ">
          <label className="w-full m-1 text-2xl">
            First Name
            <input
              value={form.firstName}
              onChange={HandelInputChange}
              name="firstName"
              type="name"
              placeholder="First Name"
              className="hover:drop-shadow-2xl duration-200 ease-in-out w-full p-3 rounded-md drop-shadow-xl shadow-[#248DAC] border mt-5 text-base"
            />
          </label>
          <label className="w-full m-1 text-2xl">
            Last Name
            <input
              value={form.lastName}
              onChange={HandelInputChange}
              name="lastName"
              type="last_name"
              placeholder="Last Name"
              className="w-full p-3 hover:drop-shadow-2xl duration-200 ease-in-out rounded-md drop-shadow-xl shadow-[#248DAC] border mt-5 text-base"
            />
          </label>
        </section>
        <label className="w-full p-2 mb-10 text-2xl">
          Contact Number
          <input
            name="contact_number"
            onChange={HandelInputChange}
            value={form.contact_number}
            type="tel"
            placeholder="Contact Number"
            className="hover:drop-shadow-2xl duration-200 ease-in-out w-full p-3 rounded-md drop-shadow-xl shadow-[#248DAC] border mt-5 text-base"
          />
        </label>
        <label className="w-full p-2 mb-10 text-2xl">
          Date of birth
          <input
            onChange={HandelInputChange}
            name="dob"
            value={form.dob}
            type="date"
            placeholder="Date of birth"
            className="hover:drop-shadow-2xl duration-200 ease-in-out w-full p-3 rounded-md drop-shadow-xl shadow-[#248DAC] border mt-5 text-base"
          />
        </label>
        <section className="w-full p-2 rounded-md mb-10 ">
          <div className="flex p-3  drop-shadow-xl shadow-black  hover:drop-shadow-2xl duration-200 ease-in-out border border-[#248DAC] rounded-md flex-col w-full">
            <label htmlFor="male">
              <input
                // onChange={HandelInputChange}
                type="radio"
                id="male"
                name="gender"
                value={form.gender}
                className="m-2"
              />
              Male
            </label>
            <label htmlFor="female">
              <input
                // onChange={HandelInputChange}
                type="radio"
                id="female"
                value={form.gender}
                name="gender"
                className="m-2"
              />
              Female
            </label>
            <label htmlFor="others">
              <input
                // onChange={HandelInputChange}
                type="radio"
                id="others"
                name="gender"
                value={form.gender}
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
              onChange={HandelInputChange}
              name="experience"
              value={form.experience}
              type="number"
              placeholder="Experience in Years"
              className="hover:drop-shadow-2xl duration-200 ease-in-out w-full p-3 rounded-md drop-shadow-xl shadow-[#248DAC] border mt-5 text-base"
            />
          </label>
          <label className="w-full m-1 text-2xl">
            Consultation Fee Expectation
            <input
              onChange={HandelInputChange}
              name="fee"
              value={form.fee}
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
              onChange={HandelInputChange}
              name="location"
              value={form.location}
              type="address"
              placeholder="Location"
              className="hover:drop-shadow-2xl duration-200 ease-in-out w-full p-3 rounded-md drop-shadow-xl shadow-[#248DAC] border mt-5 text-base"
            />
          </label>
          <label className="w-full m-1 text-2xl">
            Specialization
            <input
              onChange={HandelInputChange}
              name="specialization"
              value={form.specialization}
              type="text"
              placeholder="Your field Specialization"
              className="w-full p-3 hover:drop-shadow-2xl duration-200 ease-in-out rounded-md drop-shadow-xl shadow-[#248DAC] border mt-5 text-base"
            />
          </label>
        </section>
        <label className="w-full p-2 mb-10 text-2xl">
          Clinic / Hospitals
          <input
            onChange={HandelInputChange}
            name="clinic_name"
            value={form.clinic_name}
            type="text"
            placeholder="Your Clinic name or Hospitals name for patient's checkup"
            className="hover:drop-shadow-2xl duration-200 ease-in-out w-full p-3 rounded-md drop-shadow-xl shadow-[#248DAC] border mt-5 text-base"
          />
        </label>
        <label className="w-full p-2 mb-10 text-2xl ">
          Password
          <input
            name="password"
            value={form.password}
            onChange={HandelInputChange}
            type="password"
            placeholder="Password"
            className="w-full text-base mt-5 p-3 rounded-md border drop-shadow-xl shadow-[#248DAC] hover:drop-shadow-2xl duration-200 ease-in-out"
          />
        </label>
        <button
          onClick={Register}
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
