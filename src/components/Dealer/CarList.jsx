import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../Config/AxiosConfig';
import { Link } from 'react-router-dom';

export const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const getAllCars = async () => {
      try {
        const res = await axiosInstance.get("/api/v1/dealer/cars");
        setCars(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllCars();
  }, []);

  const handleDelete = async (carId) => {
    try {
      const res = await axiosInstance.delete(`/api/v1/dealer/cars/${carId}`);
      if (res.data === "deleted") {
        setCars(cars.filter(car => car._id !== carId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Car List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <div key={car._id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <img src={car.image} alt={car.model} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800">{car.make} {car.model}</h2>
                <p className="text-gray-600 mt-2">{car.year}</p>
                <p className="text-gray-700 mt-4 h-24 overflow-y-auto">{car.description}</p>
                <div className="mt-4 text-2xl font-bold text-blue-600">${car.priceperDay}/day</div>
                <div className="mt-6 flex justify-between items-center">
                  <Link to={`/admin/cars/edit/${car._id}`} className="text-white bg-blue-600 hover:bg-blue-700 rounded-md px-4 py-2 font-semibold transition-colors duration-300">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(car._id)}
                    className="text-white bg-red-600 hover:bg-red-700 rounded-md px-4 py-2 font-semibold transition-colors duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
