import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Car Rental</h2>
            <p className="text-gray-400">
              Your trusted partner for car rentals. We offer a wide range of cars to suit your needs.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-gray-300">Home</a></li>
              <li><a href="/user/signup" className="hover:text-gray-300">Sign up</a></li>
              <li><a href="/dealer/signup" className="hover:text-gray-300">Dealer Sign up</a></li>
              {/* <li><a href="/contact" className="hover:text-gray-300">Contact</a></li> */}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-400">123 Main Street, Anytown, USA</p>
            <p className="text-gray-400">Email: info@carrental.com</p>
            <p className="text-gray-400">Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Car Rental. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
