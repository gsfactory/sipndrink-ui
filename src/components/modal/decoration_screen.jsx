import { Box, Button, Input, Select, SimpleGrid, Text } from "@chakra-ui/react";
import DecorationsCard from "@/components/cards/decorations_card";
import { useState } from "react";

function DecorationScreen(props) {
  console.log('decorationScreen decoIds', props.decorationIds);
  const decorations = props.serviceMap['decorations'];

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
        {decorations.map(decoration => (
            <DecorationsCard key={decoration.id}
              handleItemSelection={props.handleItemSelection}
              serviceName="decorations"
              isMultipleAllowed={false}
              selected={props.decorationIds.includes(decoration.id)}
              data={decoration}
            />
        ))}
      </SimpleGrid>
    </Box>
    );
}

export default DecorationScreen;