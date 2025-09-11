import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../Config/AxiosConfig";

const userSchema = yup
  .object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Email must be a valid email").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  })
  .required();

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post(
        "/api/v1/users/signup",
        data,
        {
          withCredentials: true,
        },
      );
      navigate("/user/signin");
      alert("please signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-cover bg-center p-4" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
      <div className="w-full max-w-md bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-8 space-y-6 dark:bg-gray-800 dark:bg-opacity-20">
        <h2 className="text-3xl font-bold text-white text-center">Create your account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input
                id="firstName"
                {...register("firstName")}
                placeholder="First Name"
                className={`w-full bg-transparent border-b-2 ${errors.firstName ? 'border-red-400' : 'border-white'} text-white placeholder-gray-50 focus:outline-none focus:border-blue-400 py-2 dark:text-white dark:placeholder-gray-300`}
              />
              {errors.firstName && <p className="mt-2 text-sm text-red-400">{errors.firstName.message}</p>}
            </div>
            <div>
              <input
                id="lastName"
                {...register("lastName")}
                placeholder="Last Name"
                className={`w-full bg-transparent border-b-2 ${errors.lastName ? 'border-red-400' : 'border-white'} text-white placeholder-gray-50 focus:outline-none focus:border-blue-400 py-2 dark:text-white dark:placeholder-gray-300`}
              />
              {errors.lastName && <p className="mt-2 text-sm text-red-400">{errors.lastName.message}</p>}
            </div>
          </div>
          <div>
            <input
              id="email"
              {...register("email")}
              placeholder="Email address"
              className={`w-full bg-transparent border-b-2 ${errors.email ? 'border-red-400' : 'border-white'} text-white placeholder-gray-300 focus:outline-none focus:border-blue-400 py-2 dark:text-white dark:placeholder-gray-400`}
            />
            {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>}
          </div>
          <div>
            <input
              id="password"
              type="password"
              {...register("password")}
              placeholder="Password"
              className={`w-full bg-transparent border-b-2 ${errors.password ? 'border-red-400' : 'border-white'} text-white placeholder-gray-300 focus:outline-none focus:border-blue-400 py-2 dark:text-white dark:placeholder-gray-400`}
            />
            {errors.password && <p className="mt-2 text-sm text-red-400">{errors.password.message}</p>}
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Sign up
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-200 dark:text-gray-300">
          Already have an account?{" "}
          <Link to="/user/signin" className="font-medium text-blue-400 hover:text-blue-300">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
