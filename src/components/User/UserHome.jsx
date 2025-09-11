import { Link } from "react-router-dom";

function UserHome() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="relative h-96">
        <img className="w-full h-full object-cover" src="https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?cs=srgb&dl=pexels-mikebirdy-170811.jpg&fm=jpg" alt="Car" />
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4">Welcome to Car Rentals</h1>
          <p className="text-xl md:text-3xl">Find the perfect car for your next adventure.</p>
        </div>
      </div>
      <div className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl dark:text-white">
            Ready to hit the road?
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Browse our collection of cars and find the one that suits you best.
          </p>
          <div className="mt-8">
            <Link to="/user/available-cars" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              Browse Cars
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHome;