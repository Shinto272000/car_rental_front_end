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

export const DealerGarage = () => {

    const [cars, setCars] = useState([]);
    const dealerId =localStorage.getItem('dealerId')
    console.log(dealerId);
    

    useEffect(() => {
        const getDealerCarss = async () => {
            try {
                const res = await axiosInstance.get(
                    `/api/v1/dealer/dealercar/${dealerId}`,
                );
                
                const data = await res.data;
                console.log(data);
                setCars(data);
                console.log(typeof cars);
            } catch (error) {
                console.log(error);
            }
        };
        getDealerCarss();
    }, []);
    const navigate = useNavigate()
    // const handleEdit = (carId) => {
    //     navigate(`/admin/cars/${carId}`); // Navigate to edit page with car ID
    // };


    return (
        <div>
            <SimpleGrid columns={3} spacing={10} p={4}>
                {
                    cars &&  cars.map((car, index) => ( 
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
                                        <button
                                        //  onClick={() => handleEdit(car._id)}
                                         >
                                    
                                            <Link to={`/dealer/cars/edit/${car._id}`}>Edit</Link>
                                            
                                        </button>

                                        <button
                                            onClick={async () => {
                                                const res = await axiosInstance.delete( 
                                                    `/api/v1/dealer/cars/${car._id}`,  
                                                );
                                                const data = await res.data; 
                                                console.log(data);
                                                if (data === "deleted") {
                                                    window.location.reload();
                                                }
                                            }}
                                            className="rounded-md bg-red-500 px-2 py-1 text-white"
                                        >
                                            delete
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



