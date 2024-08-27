import { Box, Button, Heading, Input, Select, SimpleGrid, Text } from "@chakra-ui/react";
import DecorationsCard from "@/components/cards/decorations_card";

function Screen4(props) {
  // console.log('screen2', props);
  const extraDecorations = props.serviceMap['extra-decorations'];
  const flowers = props.serviceMap['flowers'];
  const photographies = props.serviceMap['photography'];
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
        <Heading as='h4' size='md'>
          Extra Decorations
        </Heading>
        <SimpleGrid p="10px" spacing={4} minChildWidth="200px">
          {extraDecorations.map(extraDecoration => (
              <DecorationsCard key={extraDecoration.id}
                  data={extraDecoration}

                  handleItemSelection={props.handleItemSelection}
                  serviceName="extra-decorations"
                  isMultipleAllowed={true}
                  selected={props.extraDecoIds.includes(extraDecoration.id)}
              />
          ))}
        </SimpleGrid>

        <Heading as='h4' size='md'>
          Flowers
        </Heading>
        <SimpleGrid p="10px" spacing={4} minChildWidth="200px">
          {flowers.map(flower => (
              <DecorationsCard key={flower.id}
                  data={flower}

                  handleItemSelection={props.handleItemSelection}
                  serviceName="flowers"
                  isMultipleAllowed={true}
                  selected={props.flowerIds.includes(flower.id)}
              />
          ))}
        </SimpleGrid>

        <Heading as='h4' size='md'>
          Photography
        </Heading>
        <SimpleGrid p="10px" spacing={4} minChildWidth="200px">
          {photographies.map(photography => (
              <DecorationsCard key={photography.id}
                  data={photography}

                  handleItemSelection={props.handleItemSelection}
                  serviceName="photography"
                  isMultipleAllowed={true}
                  selected={props.photoIds.includes(photography.id)}
              />
          ))}
        </SimpleGrid>
      </Box>
     );
}

export default Screen4;