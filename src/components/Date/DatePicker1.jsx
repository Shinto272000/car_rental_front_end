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
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h1 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Select Date</h1>
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="mb-4 md:mb-0">
          <label htmlFor="startDate" className="block text-lg font-medium mb-1 text-gray-700 dark:text-gray-300">Start Date</label>
          <DatePicker
            id="startDate"
            selectsStart
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            startDate={startDate}
            endDate={endDate}
            minDate={today}
            className="p-2 border border-gray-300 rounded-md text-black w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
            placeholderText="Select start date"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block text-lg font-medium mb-1 text-gray-700 dark:text-gray-300">End Date</label>
          <DatePicker
            id="endDate"
            selectsEnd
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            startDate={startDate}
            endDate={endDate}
            minDate={startDate || today}
            className="p-2 border border-gray-300 rounded-md text-black w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
            placeholderText="Select end date"
          />
        </div>
      </div>
      <div className="mt-4">
        {startDate && endDate ? ( 
          <p className="text-lg font-medium text-gray-800 dark:text-white">Number of days selected: {daysBetween}</p>
        ) : (
          <p className="text-lg font-medium text-gray-800 dark:text-white">Please select both start and end dates.</p>
        )}
      </div>
    </div>
  );
}
export default DatePickerss