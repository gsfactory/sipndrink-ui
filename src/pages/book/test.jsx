
// import OneColLayout from "@/components/layouts/one_col/layout";
import api_client from "@/components/api/api_client";
// import SimpleCardImageTop from "@/components/cards/simple_card_image_top";
import Welcome from "@/components/booking_screens/welcome";
import { useEffect, useState } from "react";
import {getCurrentDate} from '@/components/utils/utils';

const Test = (props) => {
    console.log('modal', props.serviceMap);
    // console.log('booking data', props);
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

                    {/* {step === 1 && 
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
                    } */}
                    <h2>Hey there</h2>
    </form>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
        
    );
};

export async function getServerSideProps(ctx){
    const [theatres, services, serviceDetails] = await Promise.all([
        api_client.getTheatres(),
        api_client.getServices(),
        api_client.getServiceDetails(),
      ]);

    const serviceMap = {};
    for (let i=0; i<services.data.length; i++) {
        serviceMap[services.data[i].attributes.name] = [];
    }
    for (let i=0; i<serviceDetails.data.length; i++) {
        serviceMap[serviceDetails.data[i].attributes.service.data.attributes.name].push({
            id: serviceDetails.data[i].id,
            ...serviceDetails.data[i].attributes,
        });
    }

    // console.log(serviceMap);

    return {
        props:{
            theatres: theatres,
            serviceMap: serviceMap
        }
    }
}

export default Test;
