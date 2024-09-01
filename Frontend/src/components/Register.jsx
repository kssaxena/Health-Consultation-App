import React, { useState, useRef } from "react";
import { Apple, Google } from "../assets";
import { Link } from "react-router-dom";
import { alertError, alertOk } from "../utils/Alert";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { addUser, removeUser } from "../utils/userSlice";
import { alertInfo } from "../utils/Alert";

const Register = () => {
  const navigate = () => {
    Navigate("/");
  };
  const [form, setForm] = useState({
    email: "",
    first_name: "",
    last_name: "",
    date_of_birth: Date,
    gender: "",
    password: "",
  });

  const formRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const Dispatch = useDispatch();

  const userRegister = async (e) => {
    e.preventDefault();

    const isMultipart = false; // Set to true if you have file inputs or other multipart needs

    const requestOptions = {
      method: "POST",
      headers: isMultipart ? {} : { "Content-Type": "application/json" },
      body: isMultipart ? createFormData(form) : JSON.stringify(form),
    };

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/patient/register",
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

      // Storing the tokens into browser's local storage
      localStorage.setItem("AccessToken", result.data.AccessToken);
      localStorage.setItem("RefreshToken", result.data.RefreshToken);

      // Storing data inside redux store
      Dispatch(removeUser());
      Dispatch(addUser(result.data.User));

      // console.log(result);
      alertInfo(result.message);
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      alertError("Failed to register");
    }
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

  return (
    <div className="w-full flex flex-col justify-center items-center pt-28 bg-[#E5F8FF]">
      <h1 className="text-lg">
        Are you a Doctor?
        <Link
          to={"/register_as_doctor"}
          className="text-blue-600 hover:underline"
        >
          Register Here
        </Link>
      </h1>
      <div>
        <h1 className="text-3xl m-5 drop-shadow-xl">
          Create your account here
        </h1>
        <form
          ref={formRef}
          className="flex flex-col justify-center items-center p-10 rounded-lg border shadow-md"
          onSubmit={userRegister}
        >
          <label className="w-full p-2 mb-10 text-2xl ">
            Email
            <input
              onChange={handleInputChange}
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
                onChange={handleInputChange}
                value={form.first_name}
                name="first_name"
                type="text"
                placeholder="First Name"
                className="hover:drop-shadow-2xl duration-200 ease-in-out w-full p-3 rounded-md drop-shadow-xl shadow-[#248DAC] border mt-5 text-base"
              />
            </label>
            <label className="w-full m-1 text-2xl">
              Last Name
              <input
                onChange={handleInputChange}
                value={form.last_name}
                name="last_name"
                type="text"
                placeholder="Last Name"
                className="w-full p-3 hover:drop-shadow-2xl duration-200 ease-in-out rounded-md drop-shadow-xl shadow-[#248DAC] border mt-5 text-base"
              />
            </label>
          </section>
          <label className="w-full p-2 mb-10 text-2xl">
            Date of birth
            <input
              onChange={handleInputChange}
              name="date_of_birth"
              value={form.date_of_birth}
              type="date"
              placeholder="Date of birth"
              className="hover:drop-shadow-2xl duration-200 ease-in-out w-full p-3 rounded-md drop-shadow-xl shadow-[#248DAC] border mt-5 text-base"
            />
          </label>
          <section className="w-full p-2 rounded-md mb-10 ">
            <div className="flex p-3 drop-shadow-xl shadow-black hover:drop-shadow-2xl duration-200 ease-in-out border border-[#248DAC] rounded-md flex-col w-full">
              <label htmlFor="male">
                <input
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  className="m-2"
                />
                Female
              </label>
              <label htmlFor="others">
                <input
                  onChange={handleInputChange}
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
          <label className="w-full p-2 mb-10 text-2xl ">
            Password
            <input
              onChange={handleInputChange}
              value={form.password}
              name="password"
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
      </div>
      <h1 className="m-10 text-lg">Or</h1>
      <div className="w-full flex flex-col justify-center items-center pb-20">
        <div className="cursor-pointer border rounded-md w-1/2 p-4 flex justify-center items-center m-2 hover:drop-shadow-lg hover:shadow shadow-black hover:scale-105 duration-200 ease-in-out">
          <img src={Google} className="w-10 h-10" alt="Google" />
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

export default Register;
