import React, { useState, useEffect } from "react";
import { LocationPhoto } from "../assets";
import { JharkhandLocation } from "../constants/AllConstants";

// const Location = () => {
//   const [position, setPosition] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const onSuccess = (position) => {
//       setPosition(position);
//     };

//     const onError = (error) => {
//       setError(error);
//     };

//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(onSuccess, onError);
//     } else {
//       setError("Geolocation is not supported");
//     }
//   }, []);

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   } else if (!position) {
//     return <div>Loading...</div>;
//   } else {
//     return (
//       <div className="flex w-full justify-around items-center">
//         <img src={LocationPhoto} className="w-5 h-5" />
//         <h1>Latitude: {position.coords.latitude}</h1>
//         <h1>Longitude: {position.coords.longitude}</h1>
//       </div>
//     );
//   }
// };

const Location = () => {
  const [value, setValue] = useState("");

  const onchange = (e) => {
    setValue(e.target.value);
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    console.log(searchTerm);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col w-full justify-around items-center ">
        <section className="w-full flex justify-around items-center  ">
          <img src={LocationPhoto} className="w-5 h-5" alt="Location" />

          <input
            type="text"
            value={value}
            onChange={onchange}
            placeholder="Enter your location"
            className="border w-full h-full p-2 "
          />
          <button
            className="border p-2 rounded-lg bg-[#E5F8FF] border-blue-500 hover:drop-shadow-md drop-shadow-sm shadow-black hover:scale-105 duration-200 ease-in-out"
            onClick={() => onSearch(value)}
          >
            Search
          </button>
        </section>
        <div className=" flex w-full  rounded-xl ">
          {JharkhandLocation.filter((item) => {
            const searchTerm = value.toLowerCase();
            const City = item.city.toLowerCase();

            return (
              searchTerm && City.startsWith(searchTerm) && City !== searchTerm
            );
          }).map((JharkhandLocation) => (
            <div
              onClick={() => onSearch(JharkhandLocation.city)}
              key={JharkhandLocation.id}
              className="w-full flex"
            >
              <div className="flex w-full border bg-neutral-400 p-2">
                <h1 className="m-1">{JharkhandLocation.city}</h1>
                <p className="m-1">{JharkhandLocation.state}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Location;
