// import React from 'react'

// const DealerDashbord = () => {
//   return (
//     <div>this is dealer Dashbord</div>
//   )
// }

// export default DealerDashbord

import React from 'react';
import { Box, Button, Center, Heading, VStack } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

function DealerDashbord() {

  // const navigate= useNavigate()
  // const handleButtonClick = (action) => {
  //   // Handle button actions here
  //   console.log(`${action} button clicked`);
  // };

  return (
    <Box 
      h="100vh" 
      bgImage="url('https://www.shutterstock.com/image-photo/cars-rows-used-car-sales-600nw-2232049927.jpg')"
      bgSize="cover"
      bgPosition="center"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box 
        p={8} 
        bg="rgba(0, 0, 0, 0.6)" 
        borderRadius="md" 
        boxShadow="lg"
        textAlign="center"
        color="white"
      >
        <Heading mb={6} fontSize="3xl">Dealer Dashboard</Heading>
        <VStack spacing={4}>
          <Button
            colorScheme="blue"
            
            size="lg"
            w="full"
          >
            <Link to="/dealer/add-cars">  Add Car </Link>
           
          </Button>
          <Button
            colorScheme="teal"
           
            size="lg"
            w="full"
          >
            <Link to="/">  Signout </Link>
           
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}

export default DealerDashbord;
