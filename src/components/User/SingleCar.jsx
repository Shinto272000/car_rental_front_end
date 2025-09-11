import React, { useEffect, useState } from 'react';
import {
    Box,
    Container,
    Image,
    Heading,
    Text,
    Button,
    SimpleGrid,
    Flex,
    Icon,
    VStack,
    HStack,
    Divider,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel
} from '@chakra-ui/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DatePickerss from '../Date/DatePicker1';
import PickupLocationSelector from '../Date/PickupLocation';
import { axiosInstance } from '../../Config/AxiosConfig';
import { MdArrowBack, MdCalendarToday, MdLocationOn, MdAttachMoney, MdStar } from 'react-icons/md';

const SingleCar = () => {
    const [scar, setScar] = useState({});
    const [dates, setDates] = useState({ startDate: null, endDate: null, daysBetween: 0 });
    const [location, setLocation] = useState("");
    const { carId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getSingleCar = async () => {
            try {
                const res = await axiosInstance.get(`/api/v1/users/all-cars/${carId}`);
                setScar(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getSingleCar();
    }, [carId]);

    const handleDaysBetweenChange = ({ startDate, endDate, daysBetween }) => {
        setDates({ startDate, endDate, daysBetween });
    };

    const handleLocationChange = (pickupLocation) => {
        setLocation(pickupLocation);
    };

    const paymentHandler = async (event) => {
        const totalAmount = scar.priceperDay * dates.daysBetween;

        const response = await axiosInstance.post("/api/v1/payment/order", { amount: totalAmount });
        const order = response.data.data;

        const options = {
            key: import.meta.env.VITE_SOME_KEY,
            amount: order.amount,
            currency: order.currency,
            name: "Car Rentals",
            description: `Payment for ${scar.model}`,
            image: scar.image,
            order_id: order.id,
            handler: async function (response) {
                const body = { ...response };
                await axiosInstance.post("/api/v1/payment/verify", body);
                navigate('/order-summary', { state: { car: scar, days: dates.daysBetween, startDate: dates.startDate, endDate: dates.endDate, totalAmount, location } });
            },
            prefill: {
                name: "Customer Name",
                email: "customer@example.com",
                contact: "9999999999",
            },
            theme: {
                color: "#3182CE",
            },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response) {
            alert(response.error.reason);
        });
        rzp1.open();
        event.preventDefault();
    };

    const isPayNowButtonDisabled = dates.daysBetween <= 0 || !location;

    // Placeholder data for gallery, features, and reviews
    const gallery = [scar.image, scar.image, scar.image, scar.image];
    const features = ["Automatic Transmission", "Air Conditioning", "Bluetooth", "GPS Navigation"];
    const reviews = [
        { user: "John Doe", rating: 5, comment: "Great car, very clean and comfortable." },
        { user: "Jane Smith", rating: 4, comment: "Good value for money, but the pickup process was a bit slow." },
    ];

    return (
        <Box bg="gray.50" _dark={{ bg: "gray.800" }} minH="100vh">
            <Container maxW="container.xl" py={{ base: 6, md: 10 }}>
                <Button onClick={() => navigate(-1)} leftIcon={<Icon as={MdArrowBack} />} mb={{ base: 6, md: 8 }} variant="outline">
                    Back to Cars
                </Button>
                <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 6, md: 10 }}>
                    <VStack spacing={{ base: 4, md: 6 }} align="stretch">
                        <Heading as="h1" size={{ base: "xl", md: "2xl" }} color="gray.800" _dark={{ color: "white" }}>{scar.model}</Heading>
                        <Image
                            src={scar.image}
                            alt={scar.model}
                            borderRadius="lg"
                            objectFit="cover"
                            w="full"
                            h={{ base: "300px", md: "400px" }}
                            boxShadow="2xl"
                        />
                        <HStack spacing={{ base: 3, md: 4 }} overflowX="auto">
                            {gallery.map((img, index) => (
                                <Image key={index} src={img} alt={`${scar.model} view ${index + 1}`} w={{ base: "100px", md: "120px" }} h={{ base: "70px", md: "80px" }} objectFit="cover" borderRadius="md" cursor="pointer" _hover={{ opacity: 0.8 }} />
                            ))}
                        </HStack>
                    </VStack>
                    <VStack spacing={{ base: 4, md: 6 }} align="stretch">
                        <Box p={{ base: 4, md: 6 }} bg="white" _dark={{ bg: "gray.700" }} borderRadius="lg" shadow="md">
                            <Heading as="h3" size={{ base: "lg", md: "xl" }} mb={{ base: 3, md: 4 }} _dark={{ color: "white" }}>Booking Details</Heading>
                            <VStack spacing={{ base: 4, md: 5 }}>
                                <DatePickerss onDaysBetweenChange={handleDaysBetweenChange} />
                                <PickupLocationSelector pickupLocationChange={handleLocationChange} />
                            </VStack>
                            <Button
                                mt={{ base: 5, md: 6 }}
                                colorScheme="blue"
                                size="lg"
                                w="full"
                                onClick={paymentHandler}
                                isDisabled={isPayNowButtonDisabled}
                            >
                                Pay Now
                            </Button>
                        </Box>
                    </VStack>
                </SimpleGrid>
                <Box mt={{ base: 8, md: 10 }}>
                    <Tabs variant="enclosed-colored" colorScheme="blue">
                        <TabList>
                            <Tab _selected={{ color: 'white', bg: 'blue.500' }} _dark={{ color: 'gray.400', _selected: { color: 'white', bg: 'blue.800' } }}>Details</Tab>
                            <Tab _selected={{ color: 'white', bg: 'blue.500' }} _dark={{ color: 'gray.400', _selected: { color: 'white', bg: 'blue.800' } }}>Features</Tab>
                            <Tab _selected={{ color: 'white', bg: 'blue.500' }} _dark={{ color: 'gray.400', _selected: { color: 'white', bg: 'blue.800' } }}>Reviews</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Text fontSize={{ base: "md", lg: "lg" }} color="gray.600" _dark={{ color: "gray.300" }}>{scar.description}</Text>
                                <Divider my={{ base: 4, md: 6 }} />
                                <VStack spacing={{ base: 3, md: 4 }} align="stretch">
                                    <HStack>
                                        <Icon as={MdCalendarToday} w={5} h={5} color="gray.500" _dark={{ color: "gray.400" }} />
                                        <Text _dark={{ color: "white" }}><b>Make:</b> {scar.make}</Text>
                                    </HStack>
                                    <HStack>
                                        <Icon as={MdCalendarToday} w={5} h={5} color="gray.500" _dark={{ color: "gray.400" }} />
                                        <Text _dark={{ color: "white" }}><b>Year:</b> {scar.year}</Text>
                                    </HStack>
                                    <HStack>
                                        <Icon as={MdAttachMoney} w={5} h={5} color="gray.500" _dark={{ color: "gray.400" }} />
                                        <Text _dark={{ color: "white" }}><b>Price/day:</b> ₹{scar.priceperDay}</Text>
                                    </HStack>
                                </VStack>
                            </TabPanel>
                            <TabPanel>
                                <VStack spacing={{ base: 3, md: 4 }} align="stretch">
                                    {features.map((feature, index) => (
                                        <Text key={index} fontSize={{ base: "md", lg: "lg" }} _dark={{ color: "white" }}>{feature}</Text>
                                    ))}
                                </VStack>
                            </TabPanel>
                            <TabPanel>
                                <VStack spacing={{ base: 4, md: 6 }} align="stretch">
                                    {reviews.map((review, index) => (
                                        <Box key={index} p={{ base: 3, md: 4 }} bg="gray.100" _dark={{ bg: "gray.600" }} borderRadius="md">
                                            <HStack justify="space-between">
                                                <Text fontWeight="bold" _dark={{ color: "white" }}>{review.user}</Text>
                                                <HStack>
                                                    {[...Array(review.rating)].map((_, i) => (
                                                        <Icon key={i} as={MdStar} color="yellow.400" />
                                                    ))}
                                                </HStack>
                                            </HStack>
                                            <Text mt={2} fontSize={{ base: "sm", md: "md" }} _dark={{ color: "gray.300" }}>{review.comment}</Text>
                                        </Box>
                                    ))}
                                </VStack>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Container>
        </Box>
    );
}

export default SingleCar;
