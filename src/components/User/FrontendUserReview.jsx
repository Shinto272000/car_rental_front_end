// // import React, { useEffect, useState } from 'react';
// // import { Card, CardHeader, CardBody, Heading, Stack, StackDivider, Box, Text } from '@chakra-ui/react';
// // import axios from 'axios';


// // const FrontendUserReview = () => {

// //     const [review, setReview] = useState([]);
    

// //     useEffect(() => {
// //         const userReview = async () => {
// //             try {
// //                 const res = await axiosInstance.get(
// //                     "/api/v1/review/getreview",
// //                 );
// //                 const data = await res.data;
// //                 console.log(data);
// //                 setReview(data);
// //             } catch (error) {
// //                 console.log(error);
// //             }
// //         };
// //         userReview();
// //     }, []);


// //   return (
// //     <div>
// //     <Card>
// //         {
// //             review.map((reviews,index)=>(
// //                 <>
                
// //                 <CardHeader>
// //         <Heading size='md'>{reviews.fullName} </Heading>
// //       </CardHeader>
    
// //       <CardBody>
// //         <Stack divider={<StackDivider />} spacing='4'>
// //           <Box>
// //             <Heading size='xs' textTransform='uppercase'>
// //               Rating : {reviews.rating}
// //             </Heading>
// //             <Text pt='2' fontSize='sm'>
// //               Review :{reviews.review}
// //             </Text>
// //           </Box>
// //         </Stack>
// //       </CardBody>
                
// //                 </>

// //             ))

// //         }
      
// //     </Card></div>
// //   )
// // }

// // export default FrontendUserReview


// import React, { useEffect, useState } from 'react';
// import { Card, CardHeader, CardBody, Heading, Stack, StackDivider, Box, Text, VStack, useBreakpointValue } from '@chakra-ui/react';
// import axios from 'axios';

// const FrontendUserReview = () => {
//     const [reviews, setReviews] = useState([]);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchReviews = async () => {
//             try {
//                 const res = await axiosInstance.get("/api/v1/review/getreview");
//                 setReviews(res.data);
//             } catch (error) {
//                 console.error(error);
//                 setError("Failed to load reviews. Please try again later.");
//             }
//         };
//         fetchReviews();
//     }, []);

//     return (
//         <VStack spacing={4} align="stretch" p={4}>
//             {error && (
//                 <Text color="red.500" textAlign="center" fontWeight="bold">
//                     {error}
//                 </Text>
//             )}
//             {reviews.length === 0 ? (
//                 <Text textAlign="center" fontSize="lg" color="gray.500">
//                     No reviews available.
//                 </Text>
//             ) : (
//                 reviews.map((review, index) => (
//                     <Card
//                         key={index}
//                         variant="elevated"
//                         boxShadow="md"
//                         borderWidth={1}
//                         borderColor="gray.200"
//                         borderRadius="md"
//                         overflow="hidden"
//                         p={4}
//                         bg="white"
//                         _hover={{ boxShadow: "lg" }}
//                     >
//                         <CardHeader
//                             bg="blue.500"
//                             color="white"
//                             p={3}
//                             borderBottomWidth={1}
//                             borderColor="gray.200"
//                         >
//                             <Heading size='md'>{review.fullName}</Heading>
//                         </CardHeader>
//                         <CardBody>
//                             <Stack divider={<StackDivider />} spacing='4'>
//                                 <Box>
//                                     <Heading size='xs' textTransform='uppercase' color="gray.600">
//                                         Rating: <Text as="span" fontWeight="bold">{review.rating}</Text>
//                                     </Heading>
//                                     <Text pt='2' fontSize='sm' color="gray.700">
//                                         Review: {review.review}
//                                     </Text>
//                                 </Box>
//                             </Stack>
//                         </CardBody>
//                     </Card>
//                 ))
//             )}
//         </VStack>
//     );
// }

// export default FrontendUserReview;

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, Heading, Stack, StackDivider, Box, Text, VStack, useBreakpointValue, Container } from '@chakra-ui/react';
import axios from 'axios';
import { axiosInstance } from '../../Config/AxiosConfig';

const FrontendUserReview = () => {
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);

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

    return (
        <Container maxW="container.md" p={4}>
            <VStack spacing={6} align="stretch">
                {error && (
                    <Text color="red.500" textAlign="center" fontWeight="bold" fontSize="lg">
                        {error}
                    </Text>
                )}
                {reviews.length === 0 ? (
                    <Text textAlign="center" fontSize="lg" color="gray.600">
                        No reviews available.
                    </Text>
                ) : (
                    reviews.map((review, index) => (
                        <Card
                            key={index}
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
                                <Heading size='lg'>{review.fullName}</Heading>
                            </CardHeader>
                            <CardBody>
                                <Stack divider={<StackDivider borderColor="gray.200" />} spacing='4'>
                                    <Box>
                                        <Heading size='sm' textTransform='uppercase' color="blue.500">
                                            Rating: <Text as="span" fontWeight="bold" color="yellow.400">{review.rating}</Text>
                                        </Heading>
                                        <Text pt='2' fontSize='md' color="gray.700">
                                            {review.review}
                                        </Text>
                                    </Box>
                                </Stack>
                            </CardBody>
                        </Card>
                    ))
                )}
            </VStack>
        </Container>
    );
}

export default FrontendUserReview;

