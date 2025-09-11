import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';

const UserNavbar = ({ isDarkMode, toggleDarkMode }) => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        {
            path: "/user/available-cars",
            value: "Cars"
        },
        {
            path: "/order-details",
            value: "My Orders"
        },
        {
            path: "/order-review",
            value: "Review"
        },
        {
            path: "/",
            value: "Signout"
        },
    ];

    return (
        <div className="bg-gray-800 shadow-md">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="text-white text-2xl font-bold">Car Rental</div>
                <div className="flex items-center">
                    <button onClick={toggleDarkMode} className="text-white mr-4">
                        {isDarkMode ? <Sun /> : <Moon />}
                    </button>
                    <button 
                        className="block lg:hidden p-2 text-gray-400 focus:outline-none"
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
                </div>
                <ul className={`lg:flex lg:items-center lg:space-x-8 ${isOpen ? 'block' : 'hidden'} absolute lg:relative top-16 left-0 lg:top-0 w-full lg:w-auto bg-gray-800 lg:bg-transparent`}>
                    {navLinks.map((link, i) => (
                        <li key={i} className="py-2 lg:py-0 px-4 lg:px-0">
                            <NavLink
                                to={link.path}
                                className={({ isActive }) => 
                                    isActive 
                                        ? "text-blue-500 font-semibold border-b-2 border-blue-500"
                                        : "text-gray-300 hover:text-white"
                                }
                            >
                                {link.value}
                            </NavLink>
                        </li>
                    ))}
                </ul>       
            </div>
        </div>
    );
};

export default UserNavbar;
