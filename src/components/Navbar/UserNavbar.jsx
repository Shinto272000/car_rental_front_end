import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';

const UserNavbar = ({ isDarkMode, toggleDarkMode }) => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        {
            path: "/user/home",
            value: "Home"
        },
        
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
        <div className="bg-gray-800 shadow-md relative z-50">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="text-white text-2xl font-bold">Car Rental</div>
                <div className="hidden lg:flex items-center space-x-8">
                    {navLinks.map((link, i) => (
                        <NavLink
                            key={i}
                            to={link.path}
                            className={({ isActive }) => 
                                isActive 
                                    ? "text-blue-500 font-semibold border-b-2 border-blue-500"
                                    : "text-gray-300 hover:text-white"
                            }
                        >
                            {link.value}
                        </NavLink>
                    ))}
                </div>
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
                       
            </div>
            {isOpen && (
                <div className="lg:hidden fixed top-0 left-0 w-full h-full bg-gray-800 z-40 flex flex-col items-center justify-center">
                    <button 
                        className="absolute top-4 right-4 p-2 text-gray-400 focus:outline-none"
                        onClick={() => setIsOpen(false)}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d='M6 18L18 6M6 6l12 12' />
                        </svg>
                    </button>
                    <ul className="flex flex-col items-center space-y-8 py-4">
                        {navLinks.map((link, i) => (
                            <li key={i}>
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) => 
                                        isActive 
                                            ? "text-blue-500 text-2xl font-semibold"
                                            : "text-gray-300 text-2xl hover:text-white"
                                    }
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.value}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UserNavbar;
