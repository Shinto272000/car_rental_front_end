import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../Config/AxiosConfig";

const schema = yup
  .object({
    email: yup.string().email().required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  })
  .required();

export default function DlSignin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post(
        "/api/v1/dealer/signin",
        data,
        {
          withCredentials: true,
        },
      );
      const datass = await res.data;
      const dealerID = res.data.dealerId;
      localStorage.setItem("dealerId", dealerID);

      if (datass.dealerRole === "admin") {
        navigate("/admin/dashbord");
      }
      if (datass.dealerRole === "dealer") {
        navigate("/dealer/dashbord");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-cover bg-center p-4" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
      <div className="w-full max-w-md bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-8 space-y-6 dark:bg-gray-800 dark:bg-opacity-20">
        <h2 className="text-3xl font-bold text-white text-center">Dealer Sign in</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              Sign in
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-200 dark:text-gray-300">
          Not a dealer?{" "}
          <Link to="/dealer/signup" className="font-medium text-blue-400 hover:text-blue-300">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}