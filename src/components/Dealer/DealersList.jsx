import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../Config/AxiosConfig";

const DealersList = () => {
  const [dealers, setDealers] = useState([]);
  const [visibleDealers, setVisibleDealers] = useState(6);

  useEffect(() => {
    const getDealers = async () => {
      try {
        const res = await axiosInstance.get("/api/v1/dealer/get-dealers");
        setDealers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getDealers();
  }, []);

  const handleRemove = async (dealerId) => {
    try {
      const res = await axiosInstance.delete(`/api/v1/dealer/${dealerId}`);
      if (res.data === "removed sucessfully") {
        setDealers(dealers.filter((dealer) => dealer._id !== dealerId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const colors = [
    "bg-blue-500",
    "bg-red-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
  ];

  const hoverColors = [
    "hover:text-blue-700",
    "hover:text-red-700",
    "hover:text-green-700",
    "hover:text-yellow-700",
    "hover:text-purple-700",
    "hover:text-pink-700",
  ];

  const handleShowMore = () => {
    setVisibleDealers(dealers.length);
  };

  const handleShowLess = () => {
    setVisibleDealers(6);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-10">Manage Dealers</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {dealers.slice(0, visibleDealers).map((dealer, index) => (
            <div
              key={dealer._id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div
                    className={`w-12 h-12 ${colors[index % colors.length]} rounded-full flex items-center justify-center text-white font-bold text-xl`}>
                    {dealer.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h2 className="text-xl font-bold text-gray-800">{dealer.name}</h2>
                    <p className="text-gray-500 text-sm">{dealer.email}</p>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => handleRemove(dealer._id)}
                    className={`text-sm font-medium text-gray-500 ${hoverColors[index % hoverColors.length]} transition-colors duration-300`}>
                    Remove Dealer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          {visibleDealers < dealers.length ? (
            <button
              onClick={handleShowMore}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
            >
              Show More
            </button>
          ) : (
            dealers.length > 3 && (
              <button
                onClick={handleShowLess}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
              >
                Show Less
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default DealersList;