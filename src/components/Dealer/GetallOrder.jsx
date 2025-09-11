import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../Config/AxiosConfig';

const AllOrderss = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/orderdata/allorders');
        setOrders(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-10">All Orders</h1>
        <div className="space-y-8">
          {orders.map(order => (
            <div key={order._id} className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6 md:flex md:items-start">
                <img src={order.car.image} alt={order.car.model} className="w-full md:w-1/3 rounded-lg shadow-md mb-4 md:mb-0 md:mr-8" />
                <div className="md:w-2/3">
                  <h2 className="text-2xl font-bold text-gray-800">{order.car.make} {order.car.model}</h2>
                  <p className="text-gray-500 text-sm mt-1">User ID: {order.userId}</p>
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700">Order Details</h3>
                      <p className="mt-2 text-gray-600">Start Date: {new Date(order.startDate).toLocaleDateString()}</p>
                      <p className="text-gray-600">End Date: {new Date(order.endDate).toLocaleDateString()}</p>
                      <p className="text-gray-600">Total Days: {order.days}</p>
                      <p className="text-gray-600">Pickup Location: {order.pickupLocation}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700">Payment Details</h3>
                      <p className="mt-2 text-gray-600">Price per Day: ${order.car.priceperDay}</p>
                      <p className="text-lg font-bold text-blue-600 mt-2">Total Amount: ${order.totalAmount}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllOrderss;
