import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../Config/AxiosConfig";

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6),
  })
  .required();

export default function DlSignup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const navigate=useNavigate()
  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post(
        "/api/v1/dealer/signup",
        data,
        {
          withCredentials: true,
        },
      );
      console.log(res.data);
      navigate("/dealer/signin")
      alert("please singin")
     
    } catch (error) {
      console.log(error);
    }
  };
  return (

    
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-2 rounded-md border p-6"
    >
      <input
        {...register("name")}
        placeholder="name"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      />
      {errors.name && <p>{errors.name.message}</p>}
      <input
        {...register("email")}
        placeholder="email"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      />
      {errors.email && <p>{errors.email.message}</p>}
      <input
        {...register("password")}
        type="password"
        placeholder="password"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      />
      {errors.password && <p>{errors.password.message}</p>}
      <input type="submit" className="rounded-md bg-blue-500 py-1 text-white" />
      <p>
        Dealer already exist{" "}
        <Link to="/dealer/signin" className="text-blue-500 underline">
          Signin
        </Link>
      </p>
    </form>
  );
}
