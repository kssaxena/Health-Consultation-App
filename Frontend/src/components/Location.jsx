import React, { useState, useEffect } from "react";
import { LocationPhoto } from "../assets";

const Location = () => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const onSuccess = (position) => {
      setPosition(position);
    };

    const onError = (error) => {
      setError(error);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
      setError("Geolocation is not supported");
    }
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!position) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="flex w-full justify-around items-center">
        <img src={LocationPhoto} className="w-5 h-5" />
        <h1>Latitude: {position.coords.latitude}</h1>
        <h1>Longitude: {position.coords.longitude}</h1>
      </div>
    );
  }
};

export default Location;
