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
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../Config/AxiosConfig';

export const AvailableCar = () => {

    const [cars, setCars] = useState([]);
    const userId=localStorage.getItem("userId")
    console.log("userid incarlist",userId);
    

    useEffect(() => {
        const getAllCarss = async () => {
            try {
                const res = await axiosInstance.get(
                    "/api/v1/users/all-cars",
                );
                const data = await res.data;
                console.log(data);
                setCars(data);
            } catch (error) {
                console.log(error);
            }
        };
        getAllCarss();
    }, []);
    // const navigate = useNavigate()
    // const handleEdit = (carId) => {
    //     navigate(`/admin/cars/${carId}`); // Navigate to edit page with car ID
    // };


    return (
        <div>
            <SimpleGrid columns={3} spacing={10} p={4}>
                {
                    cars.map((car, index) => (
                        <>
                            <Card key={index} maxW='sm'>
                                <CardBody>
                                    <Image
                                        src={car.image}
                                        alt='Green double couch with wooden legs'
                                        borderRadius='lg'
                                    />
                                    <Stack mt='6' spacing='3'>
                                        <Heading size='md'>{car.model}</Heading>
                                        <Text>
                                            {car.description}
                                        </Text>
                                        <Text color='blue.600' fontSize='2xl'>
                                            {car.priceperDay}
                                        </Text>
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
                                            //     const res = await axios.get(
                                            //         `http://localhost:3000/api/v1/users/all-cars/${car._id}`, 
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
                
                                            <Link to = {`/user/singlecar/${car._id}`} >View</Link>
                                        </button>

                                    </ButtonGroup>
                                </CardFooter>
                            </Card>


                        </>
                    ))


                }
            </SimpleGrid >
        </div>
        
    )
}



