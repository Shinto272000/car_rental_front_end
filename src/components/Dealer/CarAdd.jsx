import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

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
  
  useEffect(() => {
    const dealersList = async () => {
      const res = await axios.get(
        "http://localhost:3000/api/v1/dealer/get-dealers",
      );
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
      image: data.image[0]
    };
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/dealer/addcars",
        requestBody,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex h-screen w-screen items-center justify-center ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-2 rounded-md border p-6"
      >
        <input
          {...register(" model")}
          type="text"
          placeholder=" model"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors. model && <p>{errors. model.message}</p>}

        <input
          {...register("make")}
          type="text"
          placeholder="make"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.make && <p>{errors.make.message}</p>}

        <input
          {...register("year")}
          type="text"
          placeholder="year"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.year && <p>{errors.year.message}</p>}
        <input
          {...register("description")}
          type="text"
          placeholder="description"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.description && <p>{errors.description.message}</p>}
        <input
          {...register("priceperDay")}
          type="text"
          placeholder="priceperDay"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.priceperDay && <p>{errors.priceperDay.message}</p>}
        <input
          {...register("image")}
          type="file"
          placeholder="image"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.image && <p>{errors.image.message}</p>}
        <select {...register("dealerEmail")}>
          {dealers.map((dealer, index) => (
            <option key={index} value={dealer.email}>
              {dealer.email}
            </option>
          ))}
        </select>
        <input
          type="submit"
          className="rounded-md bg-blue-500 py-1 text-white"
        />
      </form>
    </div>
  );
}
