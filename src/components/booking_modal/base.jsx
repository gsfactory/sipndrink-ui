import Welcome from "@/components/booking_screens/welcome";
import { useEffect, useRef, useState } from 'react';
import {getCurrentDate} from '@/components/utils/utils';
import PaymentSummary from "../booking_screens/payment_summary";
import Theaters from '../booking_screens/theaters';
import Time from '../booking_screens/time';
import Celebrations from "../booking_screens/celebrations";
import Cakes from "../booking_screens/cakes";
import ExtraDecorations from "../booking_screens/extradeco";
import Flowers from "../booking_screens/flowers";
import Photography from "../booking_screens/photography";
import CustomerDetailsFinalScreen from "../booking_screens/customer_details_final";

function BaseModal(props) {
    // console.log('basemodal', props);

    const modalRef = useRef(null);

    const [step, setStep] = useState(1);
    const [theater, setTheater] = useState(null);
    const [theaterTimeSlots, setTheaterTimeSlots] = useState(null);
    const [slotsAvailability, setSlotsAvailability] = useState([]);
    const [pricing, setPricing] = useState(0);//props.data.pricing_per_slot);

    const [bookingDate, setBookingDate] = useState(getCurrentDate());
    const [timeSlot, setTimeSlot] = useState(null);
    const [numPersons, setNumPersons] = useState(2);

    const [decorationIds, setDecorationIds] = useState([]);
    const [cakeIds, setCakeIds] = useState([]);
    const [extraDecoIds, setExtraDecoIds] = useState([]);
    const [flowerIds, setFlowerIds] = useState([]);
    const [photoIds, setPhotoIds] = useState([]);

    const [isEggless, setIsEggless] = useState(false);
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");

    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");

    useEffect(() => {
        updatePricing();

        const modalElement = modalRef.current;

        console.log('debug 1');
        // Add jQuery event listener for modal close event
        $(modalRef.current).on('hidden.bs.modal', function () {
            console.log('Modal closed');
            clearState();
            // Clear your data or perform any other actions here
        });
    
        // Cleanup the event listener when the component unmounts
        return () => {
            $(modalRef.current).off('hidden.bs.modal');
        };
    }, [decorationIds, cakeIds, extraDecoIds, flowerIds, photoIds, theater, numPersons, timeSlot]);

    const clearState = () => {
        setStep(1);
        setTheater(null);
        setTheaterTimeSlots(null);
        setSlotsAvailability([]);
        setPricing(0);
        setBookingDate(getCurrentDate());
        setTimeSlot(null);
        setNumPersons(2);
        setDecorationIds([]);
        setCakeIds([]);
        setExtraDecoIds([]);
        setFlowerIds([]);
        setPhotoIds([]);    
        setIsEggless(false);
        setName("");
        setMobile("");
        setEmail("");
        setFirstName("");
        setSecondName("");
    }

    const nextStep = () => {
        setStep(prev => prev + 1)
    };
    const prevStep = () => {
        setStep(prev => prev - 1)
    };

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
        //set timeslot if null
        if (timeSlot === null) {
            if (theaterTimeSlots != null && theaterTimeSlots.length > 0) {
                setTimeSlot(theaterTimeSlots[0].id);
            }
        }

        let totalPrice = 0;
        if (theater) {
            // console.log(theater);
            totalPrice = theater.attributes.pricing_per_slot;
            
            const extra_seats = numPersons > theater.attributes.num_seats ? numPersons-theater.attributes.num_seats : 0;
            totalPrice += extra_seats * theater.attributes.extra_seat_cost;
        }
        
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

    return ( 
        <div id="myModal" className="modal fade" role="dialog" ref={modalRef}>
            <button type="button" className="close" data-dismiss="modal">&times;</button>
            <div className="modal-dialog">
            <div className="modal-content">   
            <div className="modal-body">
                <div className="welcomearea">
                <div className="row">
                <div className="col-md-9 col-sm-12">
                    <div className="welcometext">
                  <form action="" method="post" className="form">       

                    {step === 1 && 
                        <Welcome 
                            bookingDate={bookingDate}
                            setBookingDate={setBookingDate}
                            nextStep={nextStep}
                            step={step}
                        />}

                    {step === 2 && 
                        <Theaters 
                            nextStep={nextStep}
                            prevStep={prevStep}
                            theaters={props.theatres.data}
                            theater={theater}
                            setTheater={setTheater}
                            theaterTimeSlots={theaterTimeSlots}
                            setTheaterTimeSlots={setTheaterTimeSlots}
                            bookingDate={bookingDate}
                            slotsAvailability={slotsAvailability}
                            setSlotsAvailability={setSlotsAvailability}
                        />
                    }

                    {step === 3 && 
                        <Time 
                            nextStep={nextStep}
                            prevStep={prevStep}
                            theater={theater}
                            numPersons={numPersons}
                            setNumPersons={setNumPersons}
                            theaterTimeSlots={theaterTimeSlots}
                            timeSlot={timeSlot}
                            setTimeSlot={setTimeSlot}
                            pricing={pricing}
                            slotsAvailability={slotsAvailability}
                        />
                    }

                    {step === 4 &&
                        <Celebrations 
                            nextStep={nextStep}
                            prevStep={prevStep}
                            handleItemSelection={handleItemSelection}
                            decorationIds={decorationIds}
                            serviceMap={props.serviceMap}
                            firstName={firstName}
                            setFirstName={setFirstName}
                            secondName={secondName}
                            setSecondName={setSecondName}
                        />
                    }

                    {step === 5 &&
                        <Cakes 
                            nextStep={nextStep}
                            prevStep={prevStep}
                            handleItemSelection={handleItemSelection}
                            serviceMap={props.serviceMap}
                            cakeIds={cakeIds}
                            isEggless={isEggless}
                            setIsEggless={setIsEggless}
                        />
                    }

                    {step === 6 &&
                        <ExtraDecorations 
                            nextStep={nextStep}
                            prevStep={prevStep}
                            handleItemSelection={handleItemSelection}
                            serviceMap={props.serviceMap}
                            extraDecoIds={extraDecoIds}
                        />
                    }

                    {/* {step === 7 &&
                        <Flowers 
                            nextStep={nextStep}
                            prevStep={prevStep}
                            handleItemSelection={handleItemSelection}
                            serviceMap={props.serviceMap}
                            flowerIds={flowerIds}
                        />
                    }

                    {step === 8 &&
                        <Photography 
                            nextStep={nextStep}
                            prevStep={prevStep}
                            handleItemSelection={handleItemSelection}
                            serviceMap={props.serviceMap}
                            photoIds={photoIds}
                        />
                    } */}

                    {step === 7 &&
                        <CustomerDetailsFinalScreen 
                            nextStep={nextStep}
                            prevStep={prevStep}
                            pricing={pricing}
                            theater={theater}
                            theaters={props.theatres.data}

                            serviceMap={props.serviceMap}
                            decorationIds={decorationIds}
                            cakeIds={cakeIds}
                            extraDecoIds={extraDecoIds}
                            flowerIds={flowerIds}
                            photoIds={photoIds}
                            bookingDate={bookingDate}
                            numPersons={numPersons}
                            timeSlotId={timeSlot}
                            theaterTimeSlots={theaterTimeSlots}

                            name={name}
                            setName={setName}
                            email={email}
                            setEmail={setEmail}
                            mobile={mobile}
                            setMobile={setMobile}
                            firstName={firstName}
                            secondName={secondName}
                        />
                    }

                    </form>
                    </div>
                    </div>

                    <div className="col-md-3 col-sm-12">
                        <PaymentSummary 
                            pricing={pricing}
                            theater={theater}
                            businessDetails={props.businessDetails}

                            theaters={props.theatres.data}

                            serviceMap={props.serviceMap}
                            decorationIds={decorationIds}
                            cakeIds={cakeIds}
                            extraDecoIds={extraDecoIds}
                            flowerIds={flowerIds}
                            photoIds={photoIds}
                            bookingDate={bookingDate}
                            numPersons={numPersons}
                            timeSlotId={timeSlot}
                        />
                    </div>

                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default BaseModal;

