import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const schema = yup
  .object({
    fullName: yup.string().required(),
    rating: yup.number()
    .required('Rating is required')
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating cannot be more than 5'),  
    review: yup.string().required(),
  })
  .required();

export default function UserReview() {
  
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate()
  const onSubmit = async (data) => {
    const requestBody = {
      fullName: data.fullName,
      rating: data.rating,
      review: data.review,
    };
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/review/reviewdatas",
        requestBody,
        {
          withCredentials: true,
        },
        navigate("/user/home")
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
          {...register("fullName")}  
          type="text"
          placeholder="fullName" 
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors. fullName && <p className="text-red-500">{errors. fullName.message}</p>}

        {/* <input
          {...register("rating")}
          type="text"
          placeholder="rating"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.rating && <p>{errors.rating.message}</p>} */}

        <select
          {...register("rating")}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="" disabled>Select Rating</option>
          {[1, 2, 3, 4, 5].map(value => (
            <option key={value} value={value}>{value}</option>
          ))}
        </select>
        {errors.rating && <p className="text-red-500">{errors.rating.message}</p>}

        <input
          {...register("review")}
          type="text"
          placeholder="review"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.review && <p className="text-red-500">{errors.review.message}</p>}
        
        <input
          type="submit"
          className="rounded-md bg-blue-500 py-1 text-white"
        />
      </form>
    </div>
  );
}
