import React, { useState } from "react";
import { Apple, Google } from "../assets";
import { alertOk, alertError } from "../utils/Alert";
import { useRef } from "react";

const DoctorRegistration = () => {
  const DoctorForm = () => {
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
      consultationMode: "",
      password: "",
    });

    const formRef = useRef(null);

    const HandelInputChange = (e) => {
      const { name, value } = e.target;
      setFormDoctorUser((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    };

    const createFormData = (form) => {
      const formData = new FormData();

      for (const [key, value] of Object.entries(form)) {
        if (value !== undefined) {
          formData.append(key, value);
        }
      }
      return formData;
    };

    const Register = async (e) => {
      e.preventDefault();

      const isMultipart = false; // Set to true if you have file inputs or other multipart needs

      const requestOptions = {
        method: "POST",
        headers: isMultipart ? {} : { "Content-Type": "application/json" },
        body: isMultipart ? createFormData(form) : JSON.stringify(form),
      };

      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/doctor/register",
          requestOptions
        );

        const result = await response.json();

        if (response.ok) {
          console.log("Success:", result);
          alertOk("Registration Successful");
        } else {
          console.error("Error:", result);
          alertError("Failed to register");
        }
      } catch (error) {
        console.error("Error:", error);
        alertError("Failed to register");
      }
    };
    return (
      <form
        onSubmit={Register}
        ref={formRef}
        className={`flex flex-col justify-center items-center p-10 rounded-lg border shadow-md`}
      >
        <label className="w-full p-2 mb-10 text-2xl ">
          Email
          <input
            required={true}
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
              required={true}
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
              required={true}
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
            required={true}
            name="contact_number"
            onChange={HandelInputChange}
            value={form.contact_number}
            type="number"
            placeholder="Contact Number"
            className="hover:drop-shadow-2xl duration-200 ease-in-out w-full p-3 rounded-md drop-shadow-xl shadow-[#248DAC] border mt-5 text-base"
          />
        </label>
        <label className="w-full p-2 mb-10 text-2xl">
          Date of birth
          <input
            required={true}
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
                required={true}
                onChange={HandelInputChange}
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
                required={true}
                onChange={HandelInputChange}
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
                required={true}
                onChange={HandelInputChange}
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
              required={true}
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
              required={true}
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
              required={true}
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
            <select
              required={true}
              name="specialization"
              onChange={HandelInputChange}
              value={form.specialization}
              className="hover:drop-shadow-2xl duration-200 ease-in-out w-full p-3 rounded-md drop-shadow-xl shadow-[#248DAC] border mt-5 text-base"
            >
              <option value={"Physician"}>Physician</option>
              <option value={"Dentist"}>Dentist</option>
              <option value={"Gynecologist"}>Gynecologist</option>
              <option value={"Physiotherapist"}>Physiotherapist</option>
              <option value={"Orthopedist"}>Orthopedist</option>
              <option value={"Surgeon"}>Surgeon</option>
              <option value={"Dietitian"}>Dietitian</option>
              <option value={"Pediatrician"}>Pediatrician</option>
            </select>
          </label>
        </section>
        <label className="w-full p-2 mb-10 text-2xl">
          Clinic / Hospitals
          <input
            required={true}
            onChange={HandelInputChange}
            name="clinic_name"
            value={form.clinic_name}
            type="text"
            placeholder="Your Clinic name or Hospitals name for patient's checkup"
            className="hover:drop-shadow-2xl duration-200 ease-in-out w-full p-3 rounded-md drop-shadow-xl shadow-[#248DAC] border mt-5 text-base"
          />
        </label>
        <label className="w-full p-2 mb-10 text-2xl">
          Consultation Mode
          <select
            required={true}
            name="consultationMode"
            onChange={HandelInputChange}
            value={form.consultationMode}
            className="hover:drop-shadow-2xl duration-200 ease-in-out w-full p-3 rounded-md drop-shadow-xl shadow-[#248DAC] border mt-5 text-base"
          >
            <option value={"Online"} name="Online">
              Online (Only)
            </option>
            <option value={"Online&Offline"} name="Online&Offline">
              Online and Offline (Both)
            </option>
          </select>
        </label>
        <label className="w-full p-2 mb-10 text-2xl ">
          Password
          <input
            required={true}
            name="password"
            value={form.password}
            onChange={HandelInputChange}
            type="password"
            placeholder="Password"
            className="w-full text-base mt-5 p-3 rounded-md border drop-shadow-xl shadow-[#248DAC] hover:drop-shadow-2xl duration-200 ease-in-out"
          />
        </label>
        <button
          type="submit"
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
