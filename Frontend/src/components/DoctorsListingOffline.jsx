import React from "react";
import DentistOffline from "./OfflineConsultation/Dentist.Offline";
import GeneralPhysicianOffline from "./OfflineConsultation/GeneralPhysician.Offline";
import GynecologistOffline from "./OfflineConsultation/Gynecologist.Offline";
import PhysiotherapistOffline from "./OfflineConsultation/Physiotherapist.Offline";
import OrthopedistOffline from "./OfflineConsultation/Orthopedist.Offline";
import GeneralSurgeonOffline from "./OfflineConsultation/GeneralSurgeon.Offline";
import DietitionOffline from "./OfflineConsultation/Dietition.Offline";
import PediatritionOffline from "./OfflineConsultation/Pediatrition.Offline";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const DoctorsListingOffline = () => {
  const DoctorType = [
    {
      id: "0",
      specialization: "Physician",
      consultationMode: "Offline",
      component: <GeneralPhysicianOffline />,
    },
    {
      id: "1",
      specialization: "Dentist",
      consultationMode: "Offline",
      component: <DentistOffline />,
    },
    {
      id: "2",
      specialization: "Gynecologist",
      consultationMode: "Offline",
      component: <GynecologistOffline />,
    },
    {
      id: "3",
      specialization: "Physiotherapist",
      consultationMode: "Offline",
      component: <PhysiotherapistOffline />,
    },
    {
      id: "4",
      specialization: "Orthopedist",
      consultationMode: "Offline",
      component: <OrthopedistOffline />,
    },
    {
      id: "5",
      specialization: "Surgeon",
      consultationMode: "Offline",
      component: <GeneralSurgeonOffline />,
    },
    {
      id: "6",
      specialization: "Dietitian",
      consultationMode: "Offline",
      component: <DietitionOffline />,
    },
    {
      id: "7",
      specialization: "Pediatrician",
      consultationMode: "Offline",
      component: <PediatritionOffline />,
    },
  ];

  const [isVisible, SetIsVisible] = useState("");
  const Dispatch = useDispatch();

  async function FetchDoctor(specialization, consultationMode) {
    const url = `http://localhost:8000/api/v1/doctor/doctor-details/${specialization}/${consultationMode}`;
    console.log(specialization);
    console.log(consultationMode);
    // await dispatch(fetchDoctorDetails(url));

    try {
      const response = await axios.get(url);
      const doctorData = response.data.data;
      Dispatch(removeUser());
      Dispatch(addUser(doctorData));
      console.log(doctorData);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  return (
    <div className="pt-20 bg-[#E5F8FF] ">
      <h1 className="text-xl font-semibold w-full text-center p-10">
        Find your best Offline Consults here
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

export default DoctorsListingOffline;
