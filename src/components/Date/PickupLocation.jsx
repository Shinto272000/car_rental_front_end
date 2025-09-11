import React, { useEffect, useState } from "react";

export default function PickupLocationSelector({pickupLocationChange}) {
  const [pickupLocation, setPickupLocation] = useState("");

  // Array of pickup locations
  const locations = [
    { id: 1, name: "Thrissur" },
    { id: 2, name: "Kochi Airport" },
    { id: 3, name: "Trivandrum Airport" },
    { id: 4, name: "Kozhikode Airport" },
    { id: 5, name: "Varkala Beach" },
  ];

  // Handle change in the dropdown
  const handleChange = (event) => {
    setPickupLocation(event.target.value);
  };

  useEffect(() => {
    pickupLocationChange(pickupLocation);
  }, [pickupLocation]);

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <label htmlFor="Pickup Location" className="block text-lg font-medium mb-1 text-gray-800 dark:text-white">Pickup Location</label>
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="mb-4 md:mb-0">
          <select
            id="pickup-location"
            value={pickupLocation}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
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
        </div>

        {pickupLocation && (
          <div className="mt-4 md:mt-0 bg-white rounded-md shadow-md p-2 dark:bg-gray-700">
            <span className="text-gray-600 dark:text-gray-300">Selected Location: </span>
            <span className="font-bold dark:text-white">{pickupLocation}</span>
          </div>
        )}
      </div>
    </div>
  );
}
