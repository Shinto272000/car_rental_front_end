import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../Config/AxiosConfig";

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6),
  })
  .required();

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post(
        "/api/v1/users/signin",
        data,
        {
          withCredentials: true,
        },
      );
      console.log(res);
      
      const userID = res.data.userId 

      
      if (res.data.message ==="Logged in!"){
        localStorage.setItem('userId',userID); 
        console.log( "user id in storage",userID);
        
        navigate("/user/home")
      }
      console.log(res.data);
     
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-2 rounded-md border p-6"
    >
      <input
        {...register("email")}
        placeholder="email"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      />
      {errors.email && (
        <p className="text-sm text-red-500">{errors.email.message}</p>
      )}
      <input
        {...register("password")}
        type="password"
        placeholder="password"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      />
      {errors.password && (
        <p className="text-sm text-red-500">{errors.password.message}</p>
      )}
      <input type="submit" className="rounded-md bg-blue-500 py-1 text-white ease-in hover:scale-105 hover:transition-all hover:delay-150" />
      <p>
        User not created yet{" "}
        <Link to="/user/signup" className="text-blue-500 underline">
          Signup
        </Link>
      </p>
    </form>
  );
}