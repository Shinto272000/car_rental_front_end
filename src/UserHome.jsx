import { Link } from "react-router-dom";

function UserHome() {

    return (
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url('https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?cs=srgb&dl=pexels-mikebirdy-170811.jpg&fm=jpg')` }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Car Rentals</h1>
        <p className="text-lg md:text-2xl mb-8">Find the perfect car for your next adventure.</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg text-lg">
            <Link to="/user/available-cars"> 
            Browse Cars   
            </Link>
        </button>
        {/* <Link to="/user/cars"> */}
         {/* <input type="submit" value={"browse Car"} className="bg-blue-800 rounded-md"/> */}
           {/* </Link> */}
      </div>
    </div>
  );


}

export default UserHome
