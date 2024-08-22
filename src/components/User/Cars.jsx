import axios from "axios";
import { useEffect, useState } from "react";

function Cars() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const getAllCars = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/cars",
        );
        const data = await res.data;
        console.log(data);
        setCars(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllCars();
  }, []);

  const paymentHandler = async (event, carId) => {
    //  console.log("Selected car ID:", carId);
    const selectedCar = cars.find((car) => car._id === carId);
    // console.log("Selected Car:", selectedCar); // Debugging: Log the selected car data
    // console.log("Price per Day:", selectedCar.priceperDay); // Debugging: Log the price per day

    const response = await axios.post(
      "http://localhost:3000/api/v1/payment/order",
      { amount: selectedCar.priceperDay },
    );
    console.log(response);
    

    const order = await response.data.data;
    console.log(order);
    const option = {
      key: import.meta.env.VITE_SOME_KEY,
      amount: order.amount,
      currency: order.currency,
      name: "Anu Codder",
      description: "Test Transaction",
      image: "https://i.ibb.co/5Y3m33n/test.png",
      order_id: order.id,
      handler: async function (response) {
        const body = { ...response };

        const validateResponse = await axios.post(
          "http://localhost:3000/api/v1/payment/verify",
          body,
        );

        const jsonResponse = await validateResponse;

        console.log("jsonResponse", jsonResponse);
      },
      prefill: {
        name: "Anu Coder",
        email: "anucoder@example.com",
        contact: "00000000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(option);

    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
    });

    rzp1.open();
    event.preventDefault();
  };

  return (
    <>
      <div className="grid grid-cols-3 px-4">
        {cars.map((car, index) => (
          <div key={index} className="flex h-[300px] w-[600px]">
            <section>
              <img
                src={car.image}
                alt="car image"
                className="w-[200px] border-none bg-center"
              />
            </section>
            <section className="space-y-4 px-3">
              <h3 className="text-xl font-semibold">{car.model}</h3>
              <p className="font-light text-gray-500">{car.description}</p>
              <h3>{car.priceperDay}</h3>
              <button
                onClick={(event) => paymentHandler(event,car._id)}
                className="rounded-lg bg-blue-500 px-2 py-1 text-white"
              >
                Pay now
              </button>
            </section>
          </div>
        ))}
      </div>
    </>
  );
}

export default Cars;
