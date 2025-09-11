import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../Config/AxiosConfig';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Retrieve user ID from cookies
        
        if (!userId) {
          throw new Error('User not logged in');
        }
        
        const response = await axiosInstance.get(`/api/v1/orderdata/orders/${userId}`);
        console.log("response is given",response );
        
        // Assuming response.data directly contains the array of orders
        setOrders(response.data);
        console.log(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  const ordersToShow = showAll ? orders : orders.slice(0, 3);

  return (
    <div className="p-6 md:p-12 lg:p-16 max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800 dark:text-white">My Orders</h1>
      
      {orders.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {ordersToShow.map(order => ( 
            <div key={order._id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm flex flex-col md:flex-row items-center md:items-start bg-white dark:bg-gray-800">
              {/* Car Details */}
              <div className="md:w-1/3 flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-3">Car Details</h2>
                {order.car && (
                  <>
                    <img src={order.car.image} alt={order.car.model} className="w-full h-48 object-cover rounded-lg shadow-md mb-3" />
                    <p className="text-md text-gray-600 dark:text-gray-400"><strong>Make:</strong> {order.car.make}</p>
                    <p className="text-md text-gray-600 dark:text-gray-400"><strong>Model:</strong> {order.car.model}</p>
                    <p className="text-md text-gray-600 dark:text-gray-400"><strong>Year:</strong> {order.car.year}</p>
                    <p className="text-md text-gray-600 dark:text-gray-400"><strong>Capacity:</strong> {order.car.capacity}</p>
                    <p className="text-md text-gray-600 dark:text-gray-400"><strong>Price per Day:</strong> ₹{order.car.priceperDay}</p>
                  </>
                )}
              </div>

              {/* Order Details */}
              <div className="md:flex-1">
                <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-3">Order Details</h2>
                <p className="text-md text-gray-600 dark:text-gray-400"><strong>Order ID:</strong> {order._id}</p>
                <p className="text-md text-gray-600 dark:text-gray-400"><strong>Car Model:</strong> {order.car ? order.car.model : 'N/A'}</p>
                <p className="text-md text-gray-600 dark:text-gray-400">
                  <strong>Start Date:</strong> {new Date(order.startDate).toLocaleDateString()}
                </p>
                <p className="text-md text-gray-600 dark:text-gray-400">
                  <strong>End Date:</strong> {new Date(order.endDate).toLocaleDateString()}
                </p>
                <p className="text-md font-semibold text-gray-800 dark:text-white"><strong>Total Days:</strong> {order.days}</p>
                <p className="text-md font-semibold text-gray-800 dark:text-white"><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
                <p className="text-md font-semibold text-gray-800 dark:text-white"><strong>Pickup Location:</strong> {order.pickupLocation}</p>
                <p className="text-md font-semibold text-gray-800 dark:text-white"><strong>Status:</strong> {order.status}</p>
              </div>
            </div>
          ))}
          {orders.length > 3 && (
            <div className="text-center mt-6">
              <button
                onClick={() => setShowAll(!showAll)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {showAll ? 'Show Less' : 'Show More'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserOrders;
