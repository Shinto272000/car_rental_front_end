import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { axiosInstance } from "../../Config/AxiosConfig";

const schema = yup
  .object({
    fullName: yup.string().required(),
    rating: yup
      .number()
      .required("Rating is required")
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot be more than 5"),
    review: yup.string().required(),
  })
  .required();

export default function UserReview() {
  const [users, setUsers] = useState([]);
  const [existingReview, setExistingReview] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const usersList = async () => {
      const res = await axiosInstance.get(`/api/v1/users/username/${userId}`);
      const data = await res.data;
      setUsers(data);
    };

    const fetchExistingReview = async () => {
      const res = await axiosInstance.get(
        `/api/v1/review/getreoneview/${userId}`
      );
      const data = await res.data;
      setExistingReview(data);
    };
    usersList();
    fetchExistingReview();
  }, [userId]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const requestBody = {
      userId: userId,
      fullName: data.fullName,
      rating: data.rating,
      review: data.review,
    };

    try {
      await axiosInstance.post("/api/v1/review/reviewdatas", requestBody, {
        withCredentials: true,
      });
      navigate("/user/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-lg rounded-lg bg-white dark:bg-gray-800 p-8 shadow-lg">
        {existingReview ? (
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">Your Review</h2>
            <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-700 dark:text-white">
                  {existingReview.fullName}
                </h3>
                <div className="flex items-center">
                  <span className="mr-1 text-lg font-bold text-yellow-500">
                    {existingReview.rating}
                  </span>
                  <svg
                    className="h-5 w-5 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{existingReview.review}</p>
            </div>
            <p className="mb-6 text-red-600">
              You have already submitted a review.
            </p>
            <Link
              to="/user/home"
              className="rounded-md bg-green-500 px-4 py-2 text-white transition duration-300 hover:bg-green-600"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 dark:text-white">
              Create a Review
            </h2>
            <div>
              <label
                htmlFor="fullName"
                className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Full Name
              </label>
              <select
                id="fullName"
                {...register("fullName")}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 p-2.5 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500"
              >
                {users.map((user, index) => (
                  <option key={index} value={user.firstName}>
                    {user.firstName}
                  </option>
                ))}
              </select>
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="rating"
                className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Rating
              </label>
              <select
                id="rating"
                {...register("rating")}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 p-2.5 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select Rating
                </option>
                {[1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              {errors.rating && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.rating.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="review"
                className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Review
              </label>
              <textarea
                id="review"
                {...register("review")}
                placeholder="Write your review here..."
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 p-2.5 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.review && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.review.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-blue-500 py-2 text-white transition duration-300 hover:bg-blue-600"
            >
              Submit Review
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
