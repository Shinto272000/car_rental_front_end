// import React from 'react'
// import { Link } from 'react-router-dom'

// const UserNavbar = () => {
//     const navLinks = [
//     //     {
//     //     path:"/user/home",
//     //     value:"Home"
//     // },
//     // {
//     //     path:"/user/cars",
//     //     value:"BookNow"
//     // },
    
//     // {
//     //     path:"/user/available-cars",
//     //     value:"CarList"
//     // },
    
//     {
//         path:"/order-details",
//         value:"Order-details"
//     },
//     {
//         path:"/order-review",
//         value:"Review"
//     },
//     {
//         path:"/",
//         value:"signout"
//     },
    

    
// ]
//   return (
//     <div>
//         <ul className='flex justify-between shadow-lg p-5'>
//             {
//                 navLinks.map((link,i)=>
//                 (<Link key={i} to={link.path}>
//                     <li>{link.value}</li>
//                   </Link>))
//             }
//         </ul>
//     </div>
//   )
// }

// export default UserNavbar





import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        // {
        //     path:"/user/home",
        //     value:"Home"
        // },
        // {
        //     path:"/user/cars",
        //     value:"BookNow"
        // },
        // {
        //     path:"/user/available-cars",
        //     value:"CarList"
        // },
        {
            path:"/order-details",
            value:"Order-details"
        },
        {
            path:"/order-review",
            value:"Review"
        },
        {
            path:"/",
            value:"Signout"
        },
    ];

    return (
        <div className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-2 flex items-center justify-between">
                <div className="text-xl font-semibold">Rent a Car  </div>
                <button 
                    className="block lg:hidden p-2 text-gray-500 focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
                    </svg>
                </button>
                <ul className={`lg:flex lg:items-center lg:space-x-6 ${isOpen ? 'block' : 'hidden'} lg:block`}>
                    {navLinks.map((link, i) => (
                        <li key={i} className="py-2 lg:py-0">
                            <Link
                                to={link.path}
                                className="text-gray-800 hover:text-blue-500"
                            >
                                {link.value}
                            </Link>
                        </li>
                    ))}
                </ul>       
            </div>
        </div>
    );
};

export default UserNavbar;
