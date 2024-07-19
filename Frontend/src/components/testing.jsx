import React from "react";
import { useState } from "react";
import DentistOffline from "./OfflineConsultation/Dentist.Offline";

const DoctorsListingOffline = () => {
  const DoctorType = [
    { id: "0", specialization: "Physician", component: <DentistOffline /> },
    { id: "1", specialization: "Dentist", component: <DentistOffline /> },
    { id: "2", specialization: "Gynecologist", component: <DentistOffline /> },
    {
      id: "3",
      specialization: "Physiotherapist",
      component: <DentistOffline />,
    },
    { id: "4", specialization: "Orthopedist", component: <DentistOffline /> },
    { id: "5", specialization: "Surgeon", component: <DentistOffline /> },
    { id: "6", specialization: "Dietitian", component: <DentistOffline /> },
    { id: "7", specialization: "Pediatrician", component: <DentistOffline /> },
  ];

  const [isVisible, SetIsVisible] = useState("account");
  return (
    <div className="pt-20">
      {DoctorType.map((type) => {
        return (
          <div className="p-1">
            <section className="uppercase bg-red-400 flex p-2 justify-evenly items-center ">
              <div className="w-1/2 flex justify-center items-center">
                <h1>{type.specialization}</h1>
              </div>
              <div className="w-1/2 flex justify-center items-center">
                {isVisible === type.specialization ? (
                  <button
                    className="bg-gray-600 text-white w-16 font-extralight rounded-2xl"
                    onClick={() => SetIsVisible("")}
                  >
                    Hide
                  </button>
                ) : (
                  <button
                    className="bg-gray-600 text-white w-16 font-extralight rounded-2xl"
                    onClick={() => SetIsVisible(type.specialization)}
                  >
                    Show
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
