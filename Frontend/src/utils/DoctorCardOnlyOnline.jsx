import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import emailjs, { send } from "@emailjs/browser";

const DoctorCardOnlyOnline = () => {
  const UserDetails = useSelector((store) => store.user.userDetails);
  console.log(UserDetails);
  // const [doctorData, setDoctorData] = useState();
  const [isVisible, SetIsVisible] = useState("");

  const formRef = useRef(null);

  const handleSubmitSchedule = (index) => {
    console.log(index);
    const formData = new FormData(formRef.current);

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    formData.append("clinic_name", UserDetails[0][index]?.clinic_name);
    formData.append("location", UserDetails[0][index]?.location);
    formData.append("firstName", UserDetails[0][index]?.firstName);

    const formObject = Object.fromEntries(formData);
    console.log(formObject);
    emailjs
      .send(
        process.env.SERVICE_ID,
        process.env.TEMPLATE_ID,
        {
          from_name: formObject.email,
          Clinic_Name: formObject.clinic_name,
          Doctor_Name: formObject.firstName,
          Date: formObject.date,
          Time: formObject.time,
          Location: formObject.location,
        },
        process.env.PUBLIC_KEY
      )
      .then(() => {
        alert("email sent");
      })
      .catch((err) => {
        console.log("ERROR");
      });
  };

  return UserDetails?.length === 0 ? null : UserDetails[0].length === 0 ? (
    <div>
      <h1 className="text-3xl ">No data found</h1>
    </div>
  ) : (
    UserDetails[0].map((user, index) => {
      return (
        <section className="bg-[#248DAC] h-64 w-3/4 flex flex-col justify-between items-center m-5 drop-shadow-md hover:drop-shadow-xl duration-200 ease-in-out shadow-black border rounded-lg p-1">
          <div className="bg-[#E5F8FF] h-full w-full flex justify-between items-center drop-shadow-md hover:drop-shadow-xl duration-200 ease-in-out shadow-black border rounded-lg">
            {/* <div className="w-[30%] flex justify-center p-2 items-center h-full">
          <img
            src={UserDetails?.doctorphoto}
            alt="doctor_image"
            className="object-fill rounded-full drop-shadow-xl"
          />
        </div> */}
            <div className="w-[80%] h-full flex flex-col justify-around pl-20 p-3">
              <h1 className="text-4xl font-medium font-sans">
                {user?.clinic_name}
              </h1>
              <h1 className="text-2xl">Dr. {user?.firstName}</h1>
              <h1 className="text-base tracking-wider font-bold">
                Doctor Type: {user?.specialization}
              </h1>
              <h1 className="text-base font-semibold">
                Experience of {user?.experience} Years
              </h1>
              <h1 className="text-base font-light">
                Location: {user?.location}
              </h1>
              <h1 className="text-base font-bold">Fee: {user?.fee}</h1>
            </div>
            <div className="w-[20%] h-full flex flex-col items-center justify-evenly p-10">
              {isVisible === index ? (
                <button
                  onClick={() => SetIsVisible(null)}
                  className="h-10 w-fit p-4 py-6 flex justify-center items-center button rounded-full bg-[#248DAC] font-bold text-white tracking-widest uppercase transform hover:scale-105 transition-colors duration-300 drop-shadow-lg"
                >
                  Cancel
                </button>
              ) : (
                <button
                  onClick={() => SetIsVisible(index)}
                  className="h-10 w-fit p-4 py-6 flex justify-center items-center button rounded-full bg-[#248DAC] font-bold text-white tracking-widest uppercase transform hover:scale-105 transition-colors duration-300 drop-shadow-lg"
                >
                  Schedule
                </button>
              )}
            </div>
          </div>
          <div className="w-full p-2">
            {isVisible === index && (
              <form
                ref={formRef}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmitSchedule(index);
                }}
                className="flex justify-evenly items-center w-full"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="h-10 w-1/4 rounded-lg p-5 drop-shadow-lg"
                />
                <input
                  type="date"
                  name="date"
                  className="h-10 w-1/4 rounded-lg p-5 drop-shadow-lg"
                />
                <input
                  type="time"
                  name="time"
                  className="h-10 w-1/4 rounded-lg p-5 drop-shadow-lg"
                />
                <button
                  type="submit"
                  className="border p-2 px-5 rounded-lg bg-[#E5F8FF] border-[#22C55E] hover:drop-shadow-md drop-shadow-sm shadow-black hover:scale-105 duration-200 ease-in-out hover:bg-[#22C55E] uppercase"
                >
                  Confirm
                </button>
              </form>
            )}
          </div>
        </section>
      );
    })
  );
  // <section className="bg-[#248DAC] h-64 w-3/4 flex flex-col justify-between items-center m-5 drop-shadow-md hover:drop-shadow-xl duration-200 ease-in-out shadow-black border rounded-lg p-1">
  //   <div className="bg-[#E5F8FF] h-full w-full flex justify-between items-center drop-shadow-md hover:drop-shadow-xl duration-200 ease-in-out shadow-black border rounded-lg">
  //     {/* <div className="w-[30%] flex justify-center p-2 items-center h-full">
  //       <img
  //         src={UserDetails?.doctorphoto}
  //         alt="doctor_image"
  //         className="object-fill rounded-full drop-shadow-xl"
  //       />
  //     </div> */}
  //     <div className="w-[80%] h-full flex flex-col justify-around pl-20 p-3">
  //       <h1 className="text-4xl font-medium font-sans">
  //         {user?.clinic_name}
  //       </h1>
  //       <h1 className="text-2xl">Dr. {UserDetails[0][0]?.firstName}</h1>
  //       <h1 className="text-base tracking-wider font-bold">
  //         Doctor Type: {UserDetails[0][0]?.specialization}
  //       </h1>
  //       <h1 className="text-base font-semibold">
  //         Experience of {UserDetails[0][0]?.experience} Years
  //       </h1>
  //       <h1 className="text-base font-light">
  //         Location: {UserDetails[0][0]?.location}
  //       </h1>
  //       <h1 className="text-base font-bold">Fee: {UserDetails[0][0]?.fee}</h1>
  //     </div>
  //     <div className="w-[20%] h-full flex flex-col items-center justify-evenly p-10">
  //       {isVisible === "schedule" ? (
  //         <button
  //           onClick={() => SetIsVisible("")}
  //           className="h-10 w-fit p-4 py-6 flex justify-center items-center button rounded-full bg-[#248DAC] font-bold text-white tracking-widest uppercase transform hover:scale-105 transition-colors duration-300 drop-shadow-lg"
  //         >
  //           Cancel
  //         </button>
  //       ) : (
  //         <button
  //           onClick={() => SetIsVisible("schedule")}
  //           className="h-10 w-fit p-4 py-6 flex justify-center items-center button rounded-full bg-[#248DAC] font-bold text-white tracking-widest uppercase transform hover:scale-105 transition-colors duration-300 drop-shadow-lg"
  //         >
  //           Schedule
  //         </button>
  //       )}
  //     </div>
  //   </div>
  //   <div className="w-full p-2">
  //     {isVisible === "schedule" && (
  //       <div className="flex justify-evenly items-center w-full">
  //         <input
  //           type="date"
  //           className="h-10 w-1/4 rounded-lg p-5 drop-shadow-lg"
  //         />
  //         <input
  //           type="time"
  //           className="h-10 w-1/4 rounded-lg p-5 drop-shadow-lg"
  //         />
  //         <button className="border p-2 px-5 rounded-lg bg-[#E5F8FF] border-[#22C55E] hover:drop-shadow-md drop-shadow-sm shadow-black hover:scale-105 duration-200 ease-in-out hover:bg-[#22C55E] uppercase">
  //           Confirm
  //         </button>
  //       </div>
  //     )}
  //   </div>
  // </section>
};

export default DoctorCardOnlyOnline;
