import React from 'react';
import FrontendUserReview from './components/User/FrontendUserReview';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="relative">
        <img className="w-full h-auto object-cover" src="https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?cs=srgb&dl=pexels-mikebirdy-170811.jpg&fm=jpg" alt="Car" />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Car Rentals</h1>
          <p className="text-lg md:text-2xl">Find the perfect car for your next adventure.</p>
        </div>
      </div>
      <div className="p-4 md:p-8">
        <FrontendUserReview />
      </div>
    </div>
  );
}

export default App;
