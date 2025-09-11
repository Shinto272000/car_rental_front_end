import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, Heading, Stack, StackDivider, Box, Text, VStack, Container, Flex, Avatar, Button } from '@chakra-ui/react';
import { axiosInstance } from '../../Config/AxiosConfig';

const Star = ({ filled }) => (
  <svg
    height="20"
    width="20"
    viewBox="0 0 24 24"
    fill={filled ? "#FFD700" : "#E0E0E0"}
    stroke={filled ? "#FFD700" : "#E0E0E0"}
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const Rating = ({ rating }) => {
  const totalStars = 5;
  return (
    <Flex>
      {[...Array(totalStars)].map((_, index) => (
        <Star key={index} filled={index < rating} />
      ))}
    </Flex>
  );
};

const FrontendUserReview = () => {
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axiosInstance.get("/api/v1/review/getreview");
                setReviews(res.data);
            } catch (error) {
                console.error(error);
                setError("Failed to load reviews. Please try again later.");
            }
        };
        fetchReviews();
    }, []);

    const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

    return (
        <Container maxW="container.lg" p={8}>
            <Heading as="h2" size="xl" mb={8} textAlign="center" color="gray.800" _dark={{ color: "white" }}>Customer Reviews</Heading>
            <VStack spacing={8} align="stretch">
                {error && (
                    <Text color="red.500" textAlign="center" fontWeight="bold" fontSize="lg">
                        {error}
                    </Text>
                )}
                {reviews.length === 0 ? (
                    <Text textAlign="center" fontSize="lg" color="gray.600" _dark={{ color: "gray.400" }}>
                        No reviews available.
                    </Text>
                ) : (
                    displayedReviews.map((review, index) => (
                        <Card
                            key={index}
                            variant="outline"
                            boxShadow="xl"
                            borderRadius="lg"
                            overflow="hidden"
                            bg="white" 
                            _dark={{ bg: "gray.700" }}
                            _hover={{ boxShadow: "2xl", transform: "translateY(-5px)" }}
                            transition="all 0.3s ease"
                        >
                            <CardHeader>
                                <Flex alignItems="center">
                                    <Avatar name={review.fullName} mr={4} />
                                    <Box>
                                        <Heading size='md' _dark={{ color: "white" }}>{review.fullName}</Heading>
                                        <Rating rating={review.rating} />
                                    </Box>
                                </Flex>
                            </CardHeader>
                            <CardBody>
                                <Text fontSize='md' color="gray.700" _dark={{ color: "gray.300" }}>
                                    {review.review}
                                </Text>
                            </CardBody>
                        </Card>
                    ))
                )}
                {reviews.length > 3 && (
                    <Flex justifyContent="center">
                        <Button onClick={() => setShowAll(!showAll)} colorScheme="blue">
                            {showAll ? "Show Less" : "Show More"}
                        </Button>
                    </Flex>
                )}
            </VStack>
        </Container>
    );
}

export default FrontendUserReview;
