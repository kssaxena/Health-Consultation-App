import React, { useState } from "react";
import { useRef } from "react";
import { X } from "lucide-react";

const SchedulePopup = ({ onClose }) => {
  const modelRef = useRef();

  const closeModel = (e) => {
    if (modelRef.current === e.target) {
      onClose();
    }
  };

  return (
    <div
      ref={modelRef}
      onClick={closeModel}
      className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-md rounded-xl bg-red-400 w-full "
    >
      <div className="flex flex-col w-full items-center justify-center">
        <button className="place-self-end bg-blue-500" onClick={onClose}>
          <X size={30} />
        </button>
        <div className=" rounded-xl w-3/4 bg-cyan-500">
          <h1>hello Duniya</h1>
          <input type="date" />
          <input type="time" />
        </div>
      </div>
    </div>
  );
};

export { SchedulePopup };
