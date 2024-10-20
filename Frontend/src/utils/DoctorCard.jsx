import React, { useState } from "react";
import { useSelector } from "react-redux";

const DoctorCard = () => {
  const UserDetails = useSelector((store) => store.user.userDetails);

  // State to track which contact number was copied
  const [copiedIndex, setCopiedIndex] = useState(null);

  // Function to copy the contact number of the specific doctor
  const handleCopy = (contactNumber, index) => {
    // Fallback to older clipboard API (execCommand)
    const textarea = document.createElement("textarea");
    textarea.value = contactNumber;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      setCopiedIndex(index); // Update copied state for the specific item
      setTimeout(() => setCopiedIndex(null), 5000); // Reset after 5 seconds
    } catch (err) {
      console.error("Unable to copy", err);
    }
    document.body.removeChild(textarea); // Remove temporary textarea
  };

  return UserDetails?.length === 0 ? null : UserDetails[0].length === 0 ? (
    <div>
      <h1 className="text-3xl">No data found</h1>
    </div>
  ) : (
    UserDetails[0].map((user, index) => {
      return (
        <div
          key={index}
          className="bg-[#E5F8FF] h-64 w-3/4 flex justify-between items-center m-5 drop-shadow-md hover:drop-shadow-xl duration-200 ease-in-out shadow-black border rounded-lg"
        >
          <div className="w-[50%] h-full flex flex-col justify-around p-10">
            <h1 className="text-4xl font-medium font-sans">
              {user?.clinic_name}
            </h1>
            <h1 className="text-2xl">Dr. {user?.firstName}</h1>
            <h1 className="text-base font-light">
              Experience of {user?.experience} Years
            </h1>
            <h1 className="text-base font-light">Location: {user?.location}</h1>
            <h1 className="text-base font-light">
              Clinic Contact Number: {user?.contact_number}
            </h1>
            <h1 className="text-base font-bold">Fee: {user?.fee}</h1>
          </div>
          <div className="h-full flex flex-col items-center justify-evenly p-10">
            <button
              onClick={() => handleCopy(user?.contact_number, index)}
              className="h-10 w-fit p-4 py-6 flex justify-center items-center button rounded-full bg-[#248DAC] font-bold text-white tracking-widest uppercase transform hover:scale-105 transition-colors duration-300 drop-shadow-lg"
            >
              {copiedIndex === index ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      );
    })
  );
};

export default DoctorCard;
