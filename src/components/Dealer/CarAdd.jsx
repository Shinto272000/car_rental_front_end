import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { axiosInstance } from "../../Config/AxiosConfig";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    model: yup.string().required(),
    make: yup.string().required(),
    year: yup.string().required(),
    description: yup.string().required(),
    priceperDay: yup.string(),
    dealerEmail: yup.string().required(),
    image: yup.mixed().required(),
  })
  .required();

export default function CarAdd() {
  const [dealers, setDealers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const dealersList = async () => {
      const res = await axiosInstance.get("/api/v1/dealer/get-dealers");
      const data = await res.data;
      console.log(data);
      setDealers(data);
    };
    dealersList();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const requestBody = {
      model: data.model,
      make: data.make,
      year: data.year,
      description: data.description,
      priceperDay: data.priceperDay,
      dealerEmail: data.dealerEmail,
      image: data.image[0],
    };
    try {
      const res = await axiosInstance.post(
        "/api/v1/dealer/addcars",
        requestBody,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res) {
        alert("Car added successfully. You can find your car in the garage or car list.");
        navigate(-1);
      }
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center p-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1937&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="w-full max-w-lg bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Add a New Car</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input
                {...register("model")}
                type="text"
                placeholder="Model"
                className="w-full bg-transparent border-b-2 border-white text-white placeholder-gray-300 focus:outline-none focus:border-blue-400 py-2"
              />
              {errors.model && <p className="text-red-400 text-sm mt-1">{errors.model.message}</p>}
            </div>
            <div>
              <input
                {...register("make")}
                type="text"
                placeholder="Make"
                className="w-full bg-transparent border-b-2 border-white text-white placeholder-gray-300 focus:outline-none focus:border-blue-400 py-2"
              />
              {errors.make && <p className="text-red-400 text-sm mt-1">{errors.make.message}</p>}
            </div>
            <div>
              <input
                {...register("year")}
                type="text"
                placeholder="Year"
                className="w-full bg-transparent border-b-2 border-white text-white placeholder-gray-300 focus:outline-none focus:border-blue-400 py-2"
              />
              {errors.year && <p className="text-red-400 text-sm mt-1">{errors.year.message}</p>}
            </div>
            <div>
              <input
                {...register("priceperDay")}
                type="text"
                placeholder="Price per Day"
                className="w-full bg-transparent border-b-2 border-white text-white placeholder-gray-300 focus:outline-none focus:border-blue-400 py-2"
              />
              {errors.priceperDay && <p className="text-red-400 text-sm mt-1">{errors.priceperDay.message}</p>}
            </div>
          </div>
          <div>
            <textarea
              {...register("description")}
              placeholder="Description"
              className="w-full bg-transparent border-b-2 border-white text-white placeholder-gray-300 focus:outline-none focus:border-blue-400 py-2 h-24 resize-none"
            />
            {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>}
          </div>
          <div>
            <select
              {...register("dealerEmail")}
              className="w-full bg-transparent border-b-2 border-white text-white placeholder-gray-300 focus:outline-none focus:border-blue-400 py-2"
            >
              <option value="" className="text-black">Select a Dealer</option>
              {dealers.map((dealer, index) => (
                <option key={index} value={dealer.email} className="text-black">
                  {dealer.email}
                </option>
              ))}
            </select>
            {errors.dealerEmail && <p className="text-red-400 text-sm mt-1">{errors.dealerEmail.message}</p>}
          </div>
          <div>
            <label className="text-white">Car Image</label>
            <input
              {...register("image")}
              type="file"
              className="w-full text-white mt-2"
            />
            {errors.image && <p className="text-red-400 text-sm mt-1">{errors.image.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Add Car
          </button>
        </form>
      </div>
    </div>
  );
}
