import { Box, Button, Input, Select, SimpleGrid, Text } from "@chakra-ui/react";
import DecorationsCard from "@/components/cards/decorations_card";

function Cakes(props) {
  // console.log('screen2', props);
  const cakes = props.serviceMap['cake'];
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
      <SimpleGrid p="10px" spacing={4} minChildWidth="200px">
        {cakes.map(cake => (
            <DecorationsCard key={cake.id}
                data={cake}
                handleItemSelection={props.handleItemSelection}
                serviceName="cake"
                isMultipleAllowed={true}
                selected={props.cakeIds.includes(cake.id)}
            />
        ))}
      </SimpleGrid>
    </Box>
     );
}

export default Cakes;