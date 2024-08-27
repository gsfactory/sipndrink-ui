import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Grid,
  Box,
  Text,
  Tag,
  Input,
  Button,
  VStack,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import RazorpayButton from '../razorpay/rz_btn';


function Summary(props) {
  console.log('summary', props);
  // console.log('screen2', decorations);


    return ( 
      <Box 
        width="100%" 
        margin="auto" 
        padding="20px" 
        borderRadius="md" 
        boxShadow="md" 
        bg="purple.50"
      >
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            {/* Left Column: Text and Tags */}
            <Box>
              <Text fontSize="lg" mb={4}>Booking Details</Text>
              <VStack align="start" spacing={2}>
                <Text>Total Price: {props.pricing} (inclusive of all taxes)</Text>
                <Text>On {props.bookingDate}</Text>
                <Text>1:00 PM - 4:00 PM</Text>
                {/* <Text>{props.timeSlot.value}</Text> */}
                <Text>person: {props.numPersons}</Text>
                
                <>
                {Object.entries(props.serviceMap).map(([key, value]) => {
                  return value.map((val) => {
                    let desigPropsRef = props.decorationIds;
                    if (key === 'cake') {
                      desigPropsRef = props.cakeIds;
                    } else if (key === 'extra-decorations') {
                      desigPropsRef = props.extraDecoIds;
                    } else if (key === 'flowers') {
                      desigPropsRef = props.flowerIds;
                    } else if (key === 'photography') {
                      desigPropsRef = props.photoIds;
                    }

                    if (desigPropsRef.includes(val.id)) {
                      return <Tag key={val.id} colorScheme="teal">{val.name}</Tag>;
                    }
                  });
                })}
                </>

              </VStack>
            </Box>

            {/* Right Column: Form */}
            <Box as="form">
              <VStack spacing={4}>
                <Input placeholder="Name" />
                <Input placeholder="Mobile" />
                <Input placeholder="Email Address" />
                
                <Alert status='warning'>
                  You need to pay partial payment of Rs {props.data.partial_payment_amount}
                </Alert>

                {/* <Button colorScheme="teal" width="100%">
                  Proceed for Payment
                </Button> */}
                <RazorpayButton 
                  booking={
                    {
                      "date": props.bookingDate,
                      "extra_seat": props.numPersons > props.data.num_seats ? props.numPersons - props.data.num_seats : 0,
                      "total_price": props.pricing,
                      "price_paid": props.data.partial_payment_amount,
                      "customer_email": "gorav.singal@gmail.com",
                      "customer_phone": "9871774731",
                      "customer_name": "Gorav Singal",
                      "theatre": props.theaterId,
                      "timeslot": 3
                    }
                  }
                  services={[...props.decorationIds, ...props.cakeIds, ...props.flowerIds, ...props.extraDecoIds, ...props.photoIds]}
                />
                <Button variant="outline" width="100%" onClick={props.prevStep}>back</Button>
              </VStack>
            </Box>
          </Grid>
      </Box>
     );
}

export default Summary;
