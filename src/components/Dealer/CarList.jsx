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

import React, { useEffect, useState } from 'react'

export const CarList = () => {

    const [cars, setCars] = useState([]);

    useEffect(() => {
        const getAllCarss = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:3000/api/v1/dealer/cars",
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
                                        <button
                                        // onClick={async () => {
                                        //   const res = await axios.put(
                                        //     `http://localhost:3000/api/v1/dealer/cars/${car._id}`,
                                        //   );
                                        //   const data = await res.data;
                                        //   console.log(data);
                                        //   if (data === "removed sucessfully") {
                                        //     window.location.reload();
                                        //   }
                                        // }}
                                        // className="rounded-md bg-red-500 px-2 py-1 text-white"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={async () => {
                                                const res = await axios.delete(
                                                    `http://localhost:3000/api/v1/dealer/cars/${car._id}`,
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



