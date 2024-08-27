// import { Button, ButtonGroup, Card, CardBody, CardFooter, Center, Divider, Heading, Image, Stack, Text } from "@chakra-ui/react";
// import ModalBase from "@/components/modal/base";

// function SimpleCardImageTop(props) {
//     // console.log('ds', props);
//     // image='';//props.attributes.photo.data[0].attributes.url
//     // name={props.attributes.name}

//     let image = props.data.photo.data[0].attributes.url || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80';
//     if (image.startsWith('/')) {
//         image = `${process.env.NEXT_PUBLIC_API_URL}${image}`;
//     }
//     // console.log('gs', image);
//     return <>
//     <Card maxW='sm'>
//         <CardBody display="flex" flexDirection="column" alignItems="center">
//             <Image
//                 src={image}
//                 alt='Green double couch with wooden legs'
//                 borderRadius='lg'
//             />
//             <Stack mt='6' spacing='3'>
//                 <Heading size='md' textAlign="center">{props.data.name}</Heading>
//                 <Text>
//                     Rs {props.data.pricing_per_slot} for {props.data.num_seats} or less people
//                 </Text>
//                 <Text>
//                     (Rs {props.data.extra_seat_cost} per extra person)
//                 </Text>
//                 <ModalBase 
//                     theaterId={props.theaterId}
//                     data={props.data}
//                     serviceMap={props.serviceMap}
//                 />
//                 <Text textAlign="center">
//                     {props.data.min_num_people}-{props.data.num_seats + props.data.max_extra_seats} people
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