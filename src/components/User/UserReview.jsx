import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card,Button, CardHeader, CardBody, Heading, Stack, StackDivider, Box, Text, VStack, useBreakpointValue, Container } from '@chakra-ui/react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { axiosInstance } from "../../Config/AxiosConfig";


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
  
  const [users,setUsers] =useState([])
  const [existingReview, setExistingReview] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const usersList = async () => {
      const res = await axiosInstance.get(`/api/v1/users/username/${userId}`);
      const data = await res.data;
      console.log(data);
      setUsers(data);
    };

    const fetchExistingReview = async () => {
      const res = await axiosInstance.get(`/api/v1/review/getreoneview/${userId}`);
      const data = await res.data;
      setExistingReview(data);
    };
    usersList();
    fetchExistingReview();
  }, [userId]);

  console.log("fulldata of user is hihihi",users);
  // console.log("fulldata of user nameavailable is",users.firstName);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate()
  const onSubmit = async (data) => {
    const requestBody = {
      userId: userId,
      fullName: data.fullName,
      rating: data.rating,
      review: data.review,
    };
    console.log("reqused sending body is",requestBody);
    
    try {
      const res = await axiosInstance.post(
        "/api/v1/review/reviewdatas",
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
  console.log("existing review is",existingReview);
  return (
    <div className="flex w-[100vw] h-[50vh]  items-center justify-center ">
      
      

{existingReview ? (
        <div className="w-[50vw] h-[50vh]">
          {/* <h2>Your Review:</h2>
          <p>Rating: {existingReview.rating}</p>
          <p>Review: {existingReview.review}</p>
          <p>You have already submitted a review.</p> */}
           <Container maxW="container.md" p={4}>
            <VStack spacing={6} align="stretch">
                {/* {error && (
                    <Text color="red.500" textAlign="center" fontWeight="bold" fontSize="lg">
                        {error}
                    </Text>
                )} */}
                {/* {reviews.length === 0 ? (
                    <Text textAlign="center" fontSize="lg" color="gray.600">
                        No reviews available.
                    </Text>
                ) : ( */}
                    {/* reviews.map((review, index) => ( */}
                        <Card
                            // key={index}
                            variant="outline"
                            boxShadow="lg"
                            borderWidth={1}
                            borderColor="gray.300"
                            borderRadius="lg"
                            overflow="hidden"
                            p={4}
                            bg="white"
                            _hover={{ boxShadow: "xl", transform: "scale(1.02)" }}
                            transition="all 0.3s ease"
                        >
                            <CardHeader bg="blue.600" color="white" p={4}>
                                <Heading size='lg'>{existingReview.fullName}</Heading>
                            </CardHeader>
                            <CardBody>
                                <Stack divider={<StackDivider borderColor="gray.200" />} spacing='4'>
                                    <Box>
                                        <Heading size='sm' textTransform='uppercase' color="blue.500">
                                            Rating: <Text as="span" fontWeight="bold" color="yellow.400">{existingReview.rating}</Text>
                                        </Heading>
                                        <Text pt='2' fontSize='md' color="gray.700">
                                            {existingReview.review}
                                        </Text>
                                    </Box>

                                    <Text pt='2' fontSize='md' color="red.700">
                                    You have already submitted a review.    
                                        </Text>
                                    <Button  variant='solid' colorScheme='green'>
                                        <Link to="/user/home"> back to home</Link>
                                    </Button>
                                </Stack>
                            </CardBody>
                        </Card>
                    ))
                {/* )} */}
            </VStack>
        </Container>
        </div>
      ) : (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-2 rounded-md border p-6"
      >
        <select
          {...register("fullName")}> 
          {users.map((user, index) => (
            <option key={index} value={user.firstName}>
              {user.firstName}
            </option>
          ))}  
          {/* type="text"   */}
          {/* defaultValue={users.firstName} */}
          {/* // placeholder="fullName"  */}
          {/* className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" */}
          </select>
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
      )}
    </div>
  );
}
