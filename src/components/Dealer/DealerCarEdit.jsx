import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../Config/AxiosConfig";

const schema = yup
  .object({
    model: yup.string().required("Model is required"),
    make: yup.string().required("Make is required"),
    year: yup.string().required("Year is required"),
    description: yup.string().required("Description is required"),
    priceperDay: yup.string(),
    image: yup.mixed(), // Make image validation optional
  })
  .required();

export default function DealerCarEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [carData, setCarData] = useState(null);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const res = await axiosInstance.get(`/api/v1/dealer/get-car/${id}`);
        setCarData(res.data);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchCarData();
  }, [id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (carData) {
      reset({
        model: carData.model || "",
        make: carData.make || "",
        year: carData.year || "",
        description: carData.description || "",
        priceperDay: carData.priceperDay || "",
      });
    }
  }, [carData, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "image" && data[key][0]) {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    });

    try {
      const res = await axiosInstance.put(
        `/api/v1/dealer/cars/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Car updated successfully:", res.data);
      navigate("/dealer/garagge");
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
        {errors.model && <p className="text-red-500">{errors.model.message}</p>}

        <input
          {...register("make")}
          type="text"
          placeholder="Make"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.make && <p className="text-red-500">{errors.make.message}</p>}

        <input
          {...register("year")}
          type="text"
          placeholder="Year"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.year && <p className="text-red-500">{errors.year.message}</p>}

        <input
          {...register("description")}
          type="text"
          placeholder="Description"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}

        <input
          {...register("priceperDay")}
          type="text"
          placeholder="Price per Day"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.priceperDay && <p className="text-red-500">{errors.priceperDay.message}</p>}

        <input
          {...register("image")}
          type="file"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.image && <p className="text-red-500">{errors.image.message}</p>}

        <input
          type="submit"
          value="Update Car"
          className="rounded-md bg-blue-500 py-1 text-white cursor-pointer hover:bg-blue-600"
        />
      </form>
    </div>
  );
}
