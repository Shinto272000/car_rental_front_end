import { useState } from 'react'
// import './App.css'
import Navbar from './components/Navbar'
// import Navbar from './components/Navbar'
import react from "react"
import DatePickerss from './components/Date/DatePicker1';
import DatePicker2 from './components/Date/DatePicker2';
import PickupLocationSelector from './components/Date/PickupLocation';
// import DatePicker from './components/Date/DatePicker';
function App() {

  // return (
  //   <>
  //     <div>
  //       <div className="flex justify-center items-center h-screen">
  //         <h1 className="font-black text-6xl bg-red-600 w-[200px] md:w-[700px]"> Hello world</h1>
  //       </div>

  //     </div>


  //   </>
  // )

  return (
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url('https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?cs=srgb&dl=pexels-mikebirdy-170811.jpg&fm=jpg')` }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Car Rentals</h1>
        <p className="text-lg md:text-2xl mb-8">Find the perfect car for your next adventure.</p>
        <a href="/browse" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg text-lg">
          Browse Cars
        </a>
      </div>
      {/* <main className="mt-8"> */}
        

        <div className='flex'><DatePickerss/>
        </div>
      {/* </main> */}
    </div>
  );


}

export default App
