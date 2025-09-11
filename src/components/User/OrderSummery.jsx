import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  ButtonGroup,
  Button,
  SimpleGrid
} from '@chakra-ui/react'
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios'; 
import { axiosInstance } from '../../Config/AxiosConfig';


const OrderSummary = () => {
  const location = useLocation();
  const { state } = location;
  const { car, days, totalAmount,startDate, endDate ,loocation } = state || {};
  const [error, setError] = useState(null);
  const userId=localStorage.getItem('userId')
 
    console.log("userid incarlist",userId);
   useEffect(() => { 
    const saveOrder = async () => { 
      try {
        await axiosInstance.post('/api/v1/orderdata/details', {
          car,
          days,
          totalAmount,
          startDate,
          endDate,
          pickupLocation: loocation,
          userId
        });
      } catch (err) {
        setError('Failed to save order.');
        console.error(err);
      }
    };

    if (car) {
      saveOrder();
    }
  }, [car, days, totalAmount, startDate, endDate, loocation,userId]);
  console.log("order summery of car and its id is",car);
  console.log("order summery dealerid",car.dealer);
  

  if (!car) {
    return <p>No order summary available.</p>;
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      <Heading size='lg' mb={4} color="gray.800" _dark={{ color: "white" }}>Order Summary</Heading>
    <SimpleGrid columns={2} spacing={10} p={4} >
        {
                <>
                    <Card bg="white" _dark={{ bg: "gray.700" }}>
                        <CardBody>
                            <Image
                                src={car.image}
                                alt='Green double couch with wooden legs'
                                borderRadius='lg'
                            />
                            <Stack mt='6' spacing='3'>
                                <Heading size='md' _dark={{ color: "white" }}> User ID:{userId}</Heading>
                                <Text _dark={{ color: "gray.300" }}>
                                     Model :{car.model}
                                </Text>
                                <Text _dark={{ color: "gray.300" }}>
                                     Make :{car.make}
                                </Text>
                                <Text _dark={{ color: "gray.300" }}>
                                     Year :{car.year}
                                </Text>
                                <Text _dark={{ color: "gray.300" }}>
                                     Description :{car.description}
                                </Text>
                                <Text _dark={{ color: "gray.300" }}>
                                     PriceperDay :{car.priceperDay} ₹
                                </Text>

                                <Text _dark={{ color: "gray.300" }}>
                                  Total Amount :
                                    {totalAmount} ₹
                                </Text>
                                <Text _dark={{ color: "gray.300" }}>
                                  StartDate :
                                  {new Date(startDate).toLocaleDateString()}
                                </Text>
                                <Text _dark={{ color: "gray.300" }}>
                                  end Date :
                                  {new Date(endDate).toLocaleDateString()}
                                </Text>
                                <Text _dark={{ color: "gray.300" }}>
                                  Total Days :
                                    {days}
                                </Text>
                                <Text _dark={{ color: "gray.300" }}>
                                  Pickup Location :
                                    {loocation}
                                </Text>
                                {/* <Text color='blue.600' fontSize='2xl'>
                                    {car.priceperDay}
                                </Text> */}
                            </Stack>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <ButtonGroup spacing='2'>
                                {/* <button onClick={() => handleEdit(car._id)}>
                                    Edit
                                </button> */}

                                <button
                                    // onClick={async () => {
                                    //     const res = await axiosInstance.get(
                                    //         `/api/v1/users/all-cars/${car._id}`, 
                                    //     );
                                    //     const data = await res.data;
                                    //     console.log(data);
                                    //     // if (data === singlecar) {
                                    //     //     // window.location.reload();
                                    //     //     navigate
                                    //     // }
                                    // }}
                                    className="rounded-md bg-red-500 px-2 py-1 text-white" 
                                >
        
                                    <Link to = "/user/available-cars" >Back to carList</Link>
                                </button>

                            </ButtonGroup>
                        </CardFooter>
                    </Card>


                </>
            


        }
    </SimpleGrid >
</div>

  );
};

export default OrderSummary;