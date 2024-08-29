import Welcome from "@/components/booking_screens/welcome";
import { useEffect, useState } from 'react';
import {getCurrentDate} from '@/components/utils/utils';

function BookModal(props) {
    // serviceMap={props.serviceMap}
    // theatres={theatres}
    const [step, setStep] = useState(1);
    const [basePrice, setBasePrice] = useState(0);//props.data.pricing_per_slot);
    const [pricing, setPricing] = useState(0);//props.data.pricing_per_slot);

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
        let totalPrice = basePrice;
        
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
        <div id="myModal" className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>
            <div className="modal-body">
              <div className="welcomearea">
                <div className="row">
                  <div className="col-md-8">
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
                        <><h2>Screen2</h2></>
                    }

                    {step === 3 && 
                        <><h2>Screen3</h2></>
                    }
                    {/* <h2>Hey there</h2> */}

                    </form>
                    </div>
                    </div>

                    <div className="col-md-4">
                        <div className="rigrt-boxwelcome">
                        <h3>Sip N Screen</h3>
                        <ul><li><i className="fa fa-phone"></i> +91 1234567890</li>
                            <li><i className="fa fa-map-marker"></i> Hyderabad, Lorem Ipsum is simply dummy text.</li>
                            <li><i className="fa fa-video-camera"></i> Couple Theater</li>
                            <li><i></i></li>
                        </ul>
                        <h3>Add-ons</h3>
                        <ul><li><i className="fa fa-certificate" aria-hidden="true"></i> Fog Effect</li></ul>
                        <div className="total_pp"><h6>Total: 00000</h6></div>
                        </div>
                    </div>

                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
     );
}

export default BookModal;