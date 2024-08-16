import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PickupLocationSelector from "./PickupLocation";

function DatePickerss() {
  const [startDate, setStartDate] = useState(null); // Initialize as null
  const [endDate, setEndDate] = useState(null); // Initialize as null

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Select Date and PickupLocation</h1>
      <div className="flex space-x-4">
        <div>
          <label htmlFor="startDate" className="block text-lg font-medium mb-1">Start Date</label>
          <DatePicker
            id="startDate"
            selectsStart
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            startDate={startDate}
            endDate={endDate}
            className="p-2 border border-gray-300 rounded-md"
            placeholderText="Select start date"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block text-lg font-medium mb-1">End Date</label>
          <DatePicker
            id="endDate"
            selectsEnd
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="p-2 border border-gray-300 rounded-md"
            placeholderText="Select end date"
          />
        </div>
        <div className="flex">
            <PickupLocationSelector/>
        </div>
      </div>
    </div>
  );
}
export default DatePickerss