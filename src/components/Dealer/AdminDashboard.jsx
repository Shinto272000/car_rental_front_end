import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://www.shutterstock.com/image-photo/cars-rows-used-car-sales-600nw-2232049927.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 p-6 md:p-8 lg:p-12 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl text-white text-center w-11/12 max-w-md md:max-w-lg lg:max-w-xl">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 tracking-wider">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/adminssss/add-cars" className="w-full">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105">
              Add Car
            </button>
          </Link>
          <Link to="/admin/carlist" className="w-full">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105">
              Car List
            </button>
          </Link>
          <Link to="/admin/dealersList" className="w-full">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105">
              Dealers List
            </button>
          </Link>
          <Link to="/dealer/signin" className="w-full">
            <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105">
              Sign Out
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;