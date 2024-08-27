// import { Button, ButtonGroup, Card, CardBody, CardFooter, Center, Divider, Heading, Image, Stack, Text } from "@chakra-ui/react";
// import ModalBase from "@/components/modal/base";
// import { useState } from "react";

// function SimpleCardImageTop(props) {
//     // console.log('dcard', props.data.id, props.selected);
//     // const [selected, setSelected] = useState(false);

//     let image = props.data.photo.data[0].attributes.url || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80';
//     if (image.startsWith('/')) {
//         image = `${process.env.NEXT_PUBLIC_API_URL}${image}`;
//     }

//     const handleToggle = () => {
//         // console.log('toggled', props.data.id);
//         props.handleItemSelection(props.data.id, props.serviceName, props.isMultipleAllowed);
//     };


//     // console.log('gs', image);
//     return <>
//     <Card maxW='sm' 
//         boxShadow={props.selected ? 'outline' : 'base'} 
//         onClick={handleToggle}
//         bg={props.selected ? 'purple' : 'white'}
//         color={props.selected ? 'white' : 'black'}
//     >
//         <CardBody display="flex" flexDirection="column" alignItems="center">
//             <Image
//                 src={image}
//                 alt='Green double couch with wooden legs'
//                 borderRadius='lg'
//             />
//             <Stack mt='6' spacing='3'>
//                 <Heading size='md' textAlign="center">{props.data.name}</Heading>
//                 <Text>
//                     Rs {props.data.price}
//                 </Text>
//             </Stack>
//         </CardBody>
//         <Divider />
//         <CardFooter>
//         </CardFooter>
//     </Card>
//     </>;
// }

// export default SimpleCardImageTop;