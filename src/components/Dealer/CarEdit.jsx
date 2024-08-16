import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useParams, useNavigate } from "react-router-dom";

const schema = yup
  .object({
    model: yup.string().required("Model is required"),
    make: yup.string().required("Make is required"),
    year: yup.string().required("Year is required"),
    description: yup.string().required("Description is required"),
    priceperDay: yup.string(),
    dealerEmail: yup.string().required("Dealer email is required"),
    image: yup.mixed().required("Image is required"),
  })
  .required();

export default function CarEdit() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [dealers, setDealers] = useState([]);
//   const [carData, setCarData] = useState(null);

  useEffect(() => {
    const fetchDealers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/dealer/get-dealers");
        setDealers(res.data);
      } catch (error) {
        console.error("Error fetching dealers:", error);
      }
    };

    // const fetchCarData = async () => {
    //   try {
    //     const res = await axios.get(`http://localhost:3000/api/v1/dealer/get-car/${carId}`);
    //     setCarData(res.data);
    //   } catch (error) {
    //     console.error("Error fetching car data:", error);
    //   }
    // };

    fetchDealers();
    // fetchCarData();
  }, [carId]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
//   useEffect(() => {
//     if (carData) {
//       reset(carData);
//     }
//   }, [carData, reset]);

  const onSubmit = async (data) => {
    const requestBody = {
      ...data,
      image: data.image[0], // Handle image file correctly
    };

    try {
      const res = await axios.put(
        `http://localhost:3000/api/v1/dealer/cars/${carId}`,
        requestBody,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Car updated successfully:", res.data);
      navigate("/admin/carlist"); // Navigate to the cars list or any other page
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-2 rounded-md border p-6"
      >
        <input
          {...register("model")}
          type="text"
          placeholder="Model"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.model && <p>{errors.model.message}</p>}

        <input
          {...register("make")}
          type="text"
          placeholder="Make"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.make && <p>{errors.make.message}</p>}

        <input
          {...register("year")}
          type="text"
          placeholder="Year"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.year && <p>{errors.year.message}</p>}

        <input
          {...register("description")}
          type="text"
          placeholder="Description"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.description && <p>{errors.description.message}</p>}

        <input
          {...register("priceperDay")}
          type="text"
          placeholder="Price per Day"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.priceperDay && <p>{errors.priceperDay.message}</p>}

        <input
          {...register("image")}
          type="file"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.image && <p>{errors.image.message}</p>}

        <select
          {...register("dealerEmail")}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        >
          {dealers.map((dealer, index) => (
            <option key={index} value={dealer.email}>
              {dealer.email}
            </option>
          ))}
        </select>
        {errors.dealerEmail && <p>{errors.dealerEmail.message}</p>}

        <input
          type="submit"
          className="rounded-md bg-blue-500 py-1 text-white"
        />
      </form>
    </div>
  );
}
