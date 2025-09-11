import {
    Card,
    CardBody,
    Image,
    Stack,
    Heading,
    Text,
    Divider,
    CardFooter,
    ButtonGroup,
    Button,
    SimpleGrid,
    Box,
    Flex,
    Icon
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../Config/AxiosConfig';
import { MdLocationOn, MdArrowBack } from 'react-icons/md';

export const AvailableCar = () => {
    const [cars, setCars] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getAllCars = async () => {
            try {
                const res = await axiosInstance.get("/api/v1/users/all-cars");
                setCars(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getAllCars();
    }, []);

    const goBack = () => {
        navigate("/user/home");
    };

    return (
        <Box bg="gray.50" _dark={{ bg: "gray.800" }} minH="100vh" py={10}>
            <Box maxW="7xl" mx="auto" px={{ base: 4, sm: 6, lg: 8 }}>
                <Flex mb={8} align="center">
                    <Button onClick={goBack} leftIcon={<Icon as={MdArrowBack} />} colorScheme="gray" variant="outline">
                        Back
                    </Button>
                </Flex>
                <Heading as="h1" size="2xl" textAlign="center" mb={12} color="gray.800" _dark={{ color: "white" }}>
                    Available Cars
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
                    {cars.map((car, index) => (
                        <Card key={index} maxW='sm' borderWidth="1px" borderRadius="lg" overflow="hidden" transition="all 0.3s" _hover={{ boxShadow: '2xl', transform: 'translateY(-5px)' }} bg="white" _dark={{ bg: "gray.700" }}>
                            <CardBody p={0}>
                                <Image
                                    src={car.image}
                                    alt={car.model}
                                    borderTopRadius='lg'
                                    objectFit="cover"
                                    h="200px"
                                    w="full"
                                />
                                <Stack p={6} spacing={3}>
                                    <Heading size='lg' fontWeight="bold" color="gray.700" _dark={{ color: "white" }}>{car.model}</Heading>
                                    <Text noOfLines={2} color="gray.600" _dark={{ color: "gray.400" }}>
                                        {car.description}
                                    </Text>
                                    <Flex align="center" color="gray.500" _dark={{ color: "gray.300" }}>
                                        <Icon as={MdLocationOn} w={4} h={4} mr={2} />
                                        <Text fontSize="sm">{car.location || "Not specified"}</Text>
                                    </Flex>
                                    <Text color='blue.600' _dark={{ color: "blue.400" }} fontSize='3xl' fontWeight="extrabold">
                                        ₹{car.priceperDay}<Text as="span" fontSize="md" color="gray.500" _dark={{ color: "gray.400" }}>/day</Text>
                                    </Text>
                                </Stack>
                            </CardBody>
                            <Divider />
                            <CardFooter p={6}>
                                <ButtonGroup w="full">
                                    <Button as={Link} to={`/user/singlecar/${car._id}`} w="full" colorScheme="blue" variant="solid">
                                        View Details
                                    </Button>
                                </ButtonGroup>
                            </CardFooter>
                        </Card>
                    ))}
                </SimpleGrid>
            </Box>
        </Box>
    );
}
