import { Box, Button, Modal, ModalBody, ModalCloseButton, 
    ModalContent, ModalFooter, ModalHeader, ModalOverlay, 
    useDisclosure, Lorem, 
    Flex,
    Text} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Screen1 from "./screen1";
import DecorationScreen from "./decoration_screen";
import Cakes from "./cakes";
import Screen4 from "./screen4";
import SummaryScreen from '@/components/modal/summary'
import {getCurrentDate} from '@/components/utils/utils';

const ModalBase = (props) => {
    console.log('modal', props.serviceMap);
    const [step, setStep] = useState(1);
    const [pricing, setPricing] = useState(props.data.pricing_per_slot);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const finalRef = React.useRef(null);

    const [bookingDate, setBookingDate] = useState(getCurrentDate());
    const [timeSlot, setTimeSlot] = useState(null);
    const [numPersons, setNumPersons] = useState(2);

    const [decorationIds, setDecorationIds] = useState([]);
    const [cakeIds, setCakeIds] = useState([]);
    const [extraDecoIds, setExtraDecoIds] = useState([]);
    const [flowerIds, setFlowerIds] = useState([]);
    const [photoIds, setPhotoIds] = useState([]);

    useEffect(() => {
        updatePricing();
    }, [decorationIds, cakeIds, extraDecoIds, flowerIds, photoIds]);

    // helps in tracking which items(decoration, cake, flowers etc) are selected.
    const handleItemSelection = (id, serviceName, isMultipleAllowed=true) => {
        console.log(id, serviceName, isMultipleAllowed);

        let setFuncRef = setDecorationIds;
        let getFuncRef = decorationIds;
        if (serviceName == 'cake') {
            getFuncRef = cakeIds;
            setFuncRef = setCakeIds;
        } else if (serviceName == 'extra-decorations') {
            getFuncRef = extraDecoIds;
            setFuncRef = setExtraDecoIds;
        } else if (serviceName == 'flowers') {
            getFuncRef = flowerIds;
            setFuncRef = setFlowerIds;
        } else if (serviceName == 'photography') {
            getFuncRef = photoIds;
            setFuncRef = setPhotoIds;
        }

        if (!isMultipleAllowed) {
            if (getFuncRef.includes(id)) {
                setFuncRef([]);
            }
            else {
                setFuncRef([id]);
            }
        }
        else {
            if (getFuncRef.includes(id)) {
                let tp = getFuncRef.filter(selectedId => selectedId !== id);
                setFuncRef(tp);
            } else {
                setFuncRef([...getFuncRef, id]);
            }
        }
    };

    const updatePricing = () => {
        let totalPrice = props.data.pricing_per_slot;
        
        props.serviceMap['decorations'].forEach(serviceDetail => {
            if (decorationIds.includes(serviceDetail.id)) {
                totalPrice += serviceDetail.price;
            }
        });
        props.serviceMap['extra-decorations'].forEach(serviceDetail => {
            if (extraDecoIds.includes(serviceDetail.id)) {
                totalPrice += serviceDetail.price;
            }
        });
        props.serviceMap['cake'].forEach(serviceDetail => {
            if (cakeIds.includes(serviceDetail.id)) {
                totalPrice += serviceDetail.price;
            }
        });
        props.serviceMap['photography'].forEach(serviceDetail => {
            if (photoIds.includes(serviceDetail.id)) {
                totalPrice += serviceDetail.price;
            }
        });
        props.serviceMap['flowers'].forEach(serviceDetail => {
            if (flowerIds.includes(serviceDetail.id)) {
                totalPrice += serviceDetail.price;
            }
        });

        setPricing(totalPrice);
    }

    const nextStep = () => {
        setStep(prev => prev + 1)
    };
    const prevStep = () => {
        setStep(prev => prev - 1)
    };
          
    return (
        <>
        <Box ref={finalRef} tabIndex={-1} aria-label='Focus moved to this box'>
            Start Booking
        </Box>
    
        <Button mt={4} onClick={onOpen} variant='solid' colorScheme='blue'>
            Open Modal
        </Button>

        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} isCentered size="xl" zIndex="popover">
            <ModalOverlay />
            <ModalContent maxW={{ base: "90%", md: "800px" }} 
                    maxH="90vh"
                    overflowY="auto">

                <ModalHeader position="sticky"
                    top="0"
                    zIndex="1"
                    bg="white"  // Ensure the background is white or the same as the modal background
                    borderBottom="1px solid #e2e8f0">
                    <Flex justifyContent="space-between" width="100%">
                        <Text>Book {props.data.name}</Text>
                        <Text mr="8">Price - {pricing}</Text>
                    </Flex>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {step === 1 && <Screen1 
                        nextStep={nextStep} 
                        data={props.data}
                        bookingDate={bookingDate}
                        setBookingDate={setBookingDate}
                        timeSlotId={timeSlot}
                        setTimeSlotId={setTimeSlot}
                        numPersons={numPersons}
                        setNumPersons={setNumPersons}
                        />}
                    {step === 2 && <DecorationScreen 
                        nextStep={nextStep} prevStep={prevStep} 
                        handleItemSelection={handleItemSelection}
                        decorationIds={decorationIds}
                        serviceMap={props.serviceMap}/>}
                    {step === 3 && <Cakes 
                        nextStep={nextStep} prevStep={prevStep} 
                        handleItemSelection={handleItemSelection}
                        cakeIds={cakeIds}
                        serviceMap={props.serviceMap}/>}
                    {step === 4 && <Screen4 
                        nextStep={nextStep} prevStep={prevStep} 
                        handleItemSelection={handleItemSelection}
                        extraDecoIds={extraDecoIds}
                        flowerIds={flowerIds}
                        photoIds={photoIds}
                        serviceMap={props.serviceMap}/>}
                    {step === 5 && <SummaryScreen 
                        nextStep={nextStep} prevStep={prevStep}
                        data={props.data}
                        pricing={pricing}
                        serviceMap={props.serviceMap}
                        decorationIds={decorationIds}
                        cakeIds={cakeIds}
                        extraDecoIds={extraDecoIds}
                        flowerIds={flowerIds}
                        photoIds={photoIds}
                        bookingDate={bookingDate}
                        numPersons={numPersons}
                        timeSlotId={timeSlot}
                        theaterId={props.theaterId}
                    />}
                </ModalBody>
        
                {step !== 5 &&
                <ModalFooter>
                    <Button variant='ghost' onClick={prevStep} isdisabled={step===1}>back</Button>
                    <Button colorScheme="purple"  onClick={nextStep} isdisabled={step===5}>Next</Button>
                </ModalFooter>
                }
            </ModalContent>
        </Modal>
        </>
    )
}

export default ModalBase;