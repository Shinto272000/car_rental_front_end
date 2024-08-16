import React, { useState } from "react";

export default function PickupLocationSelector() {
  const [pickupLocation, setPickupLocation] = useState("");

  // Array of pickup locations
  const locations = [
    { id: 1, name: "Thrissur" },
    { id: 2, name: "Kochi Airport" },
    { id: 3, name: "Trivandrum Airport" },
    { id: 4, name: "Koxhikode Airport" },
    { id: 5, name: "Varkala Beach" },
  ];

  // Handle change in the dropdown
  const handleChange = (event) => {
    setPickupLocation(event.target.value);
  };

  return (
    <div 
    // className="p-6 bg-gray-100"
    >
      {/* <label htmlFor="pickup-location" className="block mb-2 text-gray-700 font-semibold">
        Select Pickup Location:
      </label> */}
      <label htmlFor="Pickup Location" className="block text-lg font-medium mb-1">Pickup Location</label>
      <select
        id="pickup-location"
        value={pickupLocation}
        onChange={handleChange}
        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="" disabled>
          Choose a location
        </option>
        {locations.map((location) => (
          <option key={location.id} value={location.name}>
            {location.name}
          </option>
        ))}
      </select>

      {pickupLocation && (
        <div className="mt-4 p-3 bg-white rounded-md shadow-md">
          <span className="text-gray-600">Selected Location: </span>
          <span className="font-bold">{pickupLocation}</span>
        </div>
      )}
    </div>
  );
}
