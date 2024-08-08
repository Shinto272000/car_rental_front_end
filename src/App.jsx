import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
// import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <div>
        {/* <nav>
          <Navbar/>
        </nav> */}

        <div className="flex justify-center items-center h-screen">
          <h1 className="font-black text-6xl bg-red-600 w-[200px] md:w-[700px]"> Hello world</h1>
        </div>

      </div>


    </>
  )
}

export default App
