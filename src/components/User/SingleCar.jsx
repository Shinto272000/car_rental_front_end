import React, { useEffect, useState } from 'react'
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
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import DatePickerss from '../Date/DatePicker1'
import PickupLocationSelector from '../Date/PickupLocation'

const SingleCar = () => {
  const [scar,setScar] = useState([])
  // const [daysBetween, setDaysBetween] = useState(0);
  const [dates,setDates] = useState({startDate: null, endDate: null, daysBetween: 0})
  const [loocation,setLoocation] = useState("")
  const {carId} = useParams()
  const navigate =useNavigate()
useEffect(()=>{
  const getSingleCar = async () => {
    try {
        const res = await axios.get(
            `http://localhost:3000/api/v1/users/all-cars/${carId}`,
        );
        const data = await res.data;
        console.log(data);
        setScar(data);
    } catch (error) {
        console.log(error);
    }
};
getSingleCar();

},[carId])

const handleDaysBetweenChange = ({startDate,endDate,daysBetween}) => {
  // setDaysBetween(days);
  setDates({startDate,endDate,daysBetween})
};

const handlelocationChange = (pickupLocation)=>{
  setLoocation(pickupLocation)
}



const paymentHandler = async (event, carId) => {
  //  console.log("Selected car ID:", carId);
  const selectedCar = scar
  const totalAmount = (selectedCar.priceperDay)*dates.daysBetween
  //  cars.find((car) => car._id === carId);
  // console.log("Selected Car:", selectedCar); // Debugging: Log the selected car data
  // console.log("Price per Day:", selectedCar.priceperDay); // Debugging: Log the price per day

  const response = await axios.post(
    "http://localhost:3000/api/v1/payment/order",
    { amount: totalAmount  },
  );
  console.log(response);
  

  const order = await response.data.data;
  console.log(order);
  const option = {
    key: import.meta.env.VITE_SOME_KEY,
    amount: order.amount,
    currency: order.currency,
    name: "Anu Codder",
    description: "Test Transaction",
    image: "https://i.ibb.co/5Y3m33n/test.png",
    order_id: order.id,
    handler: async function (response) {
      const body = { ...response };

      const validateResponse = await axios.post(
        "http://localhost:3000/api/v1/payment/verify",
        body,
      );

      const jsonResponse = await validateResponse;

      console.log("jsonResponse", jsonResponse);
      console.log(jsonResponse.data.message);
      
      navigate('/order-summary', { state: { car: selectedCar, days: dates.daysBetween, startDate:dates.startDate, endDate:dates.endDate, totalAmount ,loocation } });
    },
    prefill: {
      name: "Anu Coder",
      email: "anucoder@example.com",
      contact: "00000000",
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
  };

  const rzp1 = new window.Razorpay(option);

  rzp1.on("payment.failed", function (response) {
    alert(response.error.code);
  });

  rzp1.open();
  event.preventDefault();
};


const isPayNowButtonDisabled = dates.daysBetween <= 0;
  const buttonColorScheme = isPayNowButtonDisabled ? 'green' : 'green';



  return (
    <div>
        <Card 
    direction={{ base: 'column', sm: 'row' }}
    overflow='hidden'
    variant='outline'
  >
    <Image
      objectFit='cover'
      maxW={{ base: '100%', sm: '50vw' }}
      src={scar.image}
      alt='Caffe Latte'
    />
  
    <Stack className=' bg-gray-100'>
      <CardBody>
        <Heading size='md'>Model :{scar.model}</Heading>
        <Text py='2'> <b>Make :</b> {scar.make} </Text>
        <Text py='2'> <b>year of manufacture :</b>{scar.year} </Text>
        <Text py='2'> <b>Price/day :</b> {scar.priceperDay} </Text>
        <Text py='2'> <b>Description :</b>
          {scar.description}
        </Text>
      </CardBody>
      <div>
      <DatePickerss onDaysBetweenChange={handleDaysBetweenChange}/>
      <PickupLocationSelector pickupLocationChange={handlelocationChange}/>
      </div>
      
  
      <CardFooter className='justify-between'>

      <Button variant='solid' colorScheme={buttonColorScheme}
       onClick={(event) => paymentHandler(event,carId)}
       isDisabled={isPayNowButtonDisabled}>
        
          Pay Now
        </Button>
        <Button  variant='solid' colorScheme='blue'>
           <Link to="/user/available-cars"> Back</Link>
        </Button>

        
      </CardFooter>
    </Stack>
  </Card></div>
  )
}

export default SingleCar


