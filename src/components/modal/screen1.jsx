import { Box, Button, Input, Select, SimpleGrid, Text } from "@chakra-ui/react";

function Screen1(props) {
  const max_seats = props.data.max_extra_seats + props.data.num_seats;
  console.log('screen1', props, max_seats);
    return ( 
        <Box 
      width="100%" 
      margin="auto" 
      padding="20px" 
      borderRadius="md" 
      boxShadow="md" 
      bg="purple.50"
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Box>
          <Text fontSize="lg" fontWeight="bold">Select Date</Text>
          <Input type="date" defaultValue={props.bookingDate}
            onChange={(e) => props.setBookingDate(e.target.value)}
          />
        </Box>
        
        <Box>
          <Text fontSize="lg" fontWeight="bold">No. of persons*</Text>
          <Select defaultValue="2" onChange={(e) => props.setNumPersons(e.target.value)}>
            {Array.from({ length: max_seats }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </Select>
        </Box>

        <Box>
          <Text fontSize="lg" fontWeight="bold">Slots*</Text>
          <Select>
            <option value="1:00 PM - 4:00 PM">1:00 PM - 4:00 PM</option>
            {/* Add other slots as needed */}
          </Select>
        </Box>

        <Box>
          <Text fontSize="2xl" fontWeight="bold" color="purple.600">₹ {props.data.pricing_per_slot}</Text>
          <Text fontSize="sm">*inclusive of all taxes</Text>
        </Box>
      </SimpleGrid>

      <Box my="4">
        <Text color="green.500">5 slots available on 31-08-2024 in Platinum Theatre</Text>
      </Box>
    </Box>
     );
}

export default Screen1;