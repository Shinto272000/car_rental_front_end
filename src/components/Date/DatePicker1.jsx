import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PickupLocationSelector from "./PickupLocation";

function DatePickerss({ onDaysBetweenChange }) {
  const [startDate, setStartDate] = useState(null); // Initialize as null
  const [endDate, setEndDate] = useState(null); // Initialize as null
  const today = new Date();


  const getDaysBetweenDates = (start, end) => {
    if (!start || !end) return 0; // Return 0 if either date is not set
    const differenceInTime = end.getTime() - start.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return Math.ceil(differenceInDays); // Use Math.ceil to round up
  };

  const daysBetween = getDaysBetweenDates(startDate, endDate);

  useEffect(() => {
    onDaysBetweenChange({daysBetween,startDate,endDate});
  }, [startDate, endDate, onDaysBetweenChange, daysBetween]);
  return (
    <div className="p-4  bg-gray-100">
      <h1 className="text-xl font-bold mb-4" >Select Date and PickupLocation</h1>
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
            minDate={today}
            className="p-2 border border-gray-300 rounded-md text-black"
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
            minDate={startDate || today}
            className="p-2 border border-gray-300 rounded-md text-black"
            placeholderText="Select end date"
          />
        </div>
        {/* <div className="flex">
            <PickupLocationSelector/>
        </div> */}
         <div className="mt-4">
        {startDate && endDate ? ( 
          <p className="text-lg font-medium">Number of days selected: {daysBetween}</p>
        ) : (
          <p className="text-lg font-medium">Please select both start and end dates.</p>
        )}
      </div>
      </div>
    </div>
  );
}
export default DatePickerss