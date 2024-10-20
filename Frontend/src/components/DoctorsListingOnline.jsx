import React from "react";
import DentistOnline from "./OnlineConsultation/Dentist.Online";
import DietitianOnline from "./OnlineConsultation/Dietition.Online";
import GeneralPhysicianOnline from "./OnlineConsultation/GeneralPhysician.Online";
import GeneralSurgeonOnline from "./OnlineConsultation/GeneralSurgeon.Online";
import GynecologistOnline from "./OnlineConsultation/Gynecologist.Online";
import OrthopedistOnline from "./OnlineConsultation/Orthopedist.Online";
import PediatritionOnline from "./OnlineConsultation/Pediatrition.Online";
import PhysiotherapistOnline from "./OnlineConsultation/Physiotherapist.Online";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const DoctorsListingOnline = () => {
  const DoctorType = [
    {
      id: "0",
      specialization: "Physician",
      consultationMode: "Online",

      component: <GeneralPhysicianOnline />,
    },
    {
      id: "1",
      specialization: "Dentist",
      consultationMode: "Online",
      component: <DentistOnline />,
    },
    {
      id: "2",
      specialization: "Gynecologist",
      consultationMode: "Online",

      component: <GynecologistOnline />,
    },
    {
      id: "3",
      specialization: "Physiotherapist",
      consultationMode: "Online",

      component: <PhysiotherapistOnline />,
    },
    {
      id: "4",
      specialization: "Orthopedist",
      consultationMode: "Online",

      component: <OrthopedistOnline />,
    },
    {
      id: "5",
      specialization: "Surgeon",
      consultationMode: "Online",

      component: <GeneralSurgeonOnline />,
    },
    {
      id: "6",
      specialization: "Dietitian",
      consultationMode: "Online",
      component: <DietitianOnline />,
    },
    {
      id: "7",
      specialization: "Pediatrician",
      consultationMode: "Online",

      component: <PediatritionOnline />,
    },
  ];

  const [isVisible, SetIsVisible] = useState("");
  const Dispatch = useDispatch();

  async function FetchDoctor(specialization, consultationMode) {
    const url = `http://localhost:8000/api/v1/doctor/doctor-details/${specialization}/${consultationMode}`;
    // console.log(specialization);

    try {
      const response = await axios.get(url);
      // Axios automatically parses the response, so no need to call .json()
      // console.log(response.data.data[0]);
      // console.log(response);
      const doctorData = response.data.data; // doctorData is an array of all doctors details
      Dispatch(removeUser());
      Dispatch(addUser(doctorData));
      console.log(doctorData);
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }

  

  return (
    <div className="pt-20 bg-[#E5F8FF] ">
      <h1 className="text-xl font-semibold w-full text-center p-10">
        Find your best Online Consults here
      </h1>
      {DoctorType.map((type) => {
        return (
          <div className="p-1">
            <section className="uppercase border rounded-lg shadow-[#248DAC]  drop-shadow-lg flex p-2 justify-evenly items-center ">
              <div className="w-1/2 flex justify-center items-center">
                <h1 className="text-xl font-semibold">{type.specialization}</h1>
              </div>
              <div className="w-1/2 flex justify-center items-center duration-300 ease-in-out">
                {isVisible === type.specialization ? (
                  <button
                    className="flex w-32 justify-between items-center border p-2 rounded-lg bg-[#22C55E] border-[#22C55E] hover:drop-shadow-md drop-shadow-sm shadow-black hover:scale-105 duration-200 ease-in-out "
                    onClick={() => SetIsVisible("")}
                  >
                    Hide
                    <X className="" />
                  </button>
                ) : (
                  <button
                    className="flex w-32 justify-between items-center border p-2 rounded-lg bg-[#E5F8FF] border-blue-500 hover:drop-shadow-md drop-shadow-sm shadow-black hover:scale-105 duration-200 ease-in-out hover:bg-[#22C55E]"
                    onClick={() => {
                      SetIsVisible(type.specialization);
                      console.log(type.consultationMode);
                      FetchDoctor(type.specialization, type.consultationMode);
                    }}
                  >
                    Show
                    <Plus className="rotate-90" />
                  </button>
                )}
              </div>
            </section>
            <section>
              {isVisible === type.specialization && (
                <div>{type.component} </div>
              )}
            </section>
          </div>
        );
      })}
    </div>
  );
};

export default DoctorsListingOnline;
