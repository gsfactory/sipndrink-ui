import { useEffect, useState } from "react";
import api_client from "../api/api_client";
import MyImage from "../utils/image";

function Theaters(props) {
    console.log('theaters', props);
    const s3Basepath = 'https://s3.amazonaws.com/client.limelox.com/sipndrink';
    
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            let promises = [];
            for (let i=0; i<props.theaters.length; i++) {
                promises[i] = api_client.getTheatersSlotsAvailability(props.theaters[i].id, props.bookingDate);
            }
            const results = await Promise.all(promises);
            let theaterSlotDict = {};
            for (let i=0; i<props.theaters.length; i++) {
                theaterSlotDict[props.theaters[i].id] = results[i];
            }
            props.setSlotsAvailability(theaterSlotDict);
            console.log('result of promises', theaterSlotDict);
            // await api_client.getTheatersSlotsAvailability();
        }

        fetchData();
    }, [])

    const onNext = () => {
        if (!props.theater) {
            setError("Please select a theater first.");
            return;
        }
        setError("");
        props.nextStep();

    }

    const onTheaterSelect = async (theater) => {
        // console.log('Getting timeslots');
        
        setError("");
        try {
            const timeslots = await api_client.getTimeslotsByTheatre(theater.id);
            console.log("Got timeslots");

            props.setTheaterTimeSlots(timeslots.data);
            props.setTheater(theater);

            props.nextStep();
        } catch (error) {
            console.log('Error...');
            console.log(api_client.getErrorString(error));
        }
    }

    return ( 
        <div className="form-step active">
            <h3>Choose Your Theater</h3>
            
            <div className="left-section">
                <div className="box-container row">
                 {props.theaters.map(theater => (
                    <div className="col-lg-4 col-sm-6" key={theater.id}>
                        <div 
                            className={`box ${props.theater?.id === theater.id ? 'active' : props.slotsAvailability[theater.id]?.num_available === 0 ? 'inactive': ''}`} 
                            onClick={props.slotsAvailability[theater.id]?.num_available > 0 ? () => onTheaterSelect(theater) : undefined}
                            >

                            <MyImage 
                                src={
                                    theater.attributes.photo.data[0].attributes.url.startsWith('/') 
                                    ? 
                                    `${process.env.NEXT_PUBLIC_API_URL}${theater.attributes.photo.data[0].attributes.url}` 
                                    : 
                                    `${s3Basepath}/${theater.attributes.photo.data[0].attributes.hash}${theater.attributes.photo.data[0].attributes.ext}`
                                    } />
                            <h3>{theater.attributes.name}</h3>
                            
                            {theater.attributes.min_num_people == theater.attributes.num_seats ?
                                <p>₹{theater.attributes.pricing_per_slot} for {theater.attributes.num_seats}<br />&nbsp;</p>
                            :
                                <p>₹{theater.attributes.pricing_per_slot} for {theater.attributes.num_seats} or less people<br /> (Rs {theater.attributes.extra_seat_cost} per extra person)</p>
                            }

                            <span className={`${props.slotsAvailability[theater.id]?.num_available === 0 ? 'active' : ""}`} >
                                {props.slotsAvailability[theater.id]?.num_available} slots available on <samp>{props.bookingDate}</samp>
                            </span>

                            {props.slotsAvailability[theater.id]?.num_available > 0 ?
                                <a className="btn btn-next booknoe"
                                >Book Now</a>
                            :
                                <a className="btn btn-next booknoe text-muted bg-light disabled" aria-disabled="true">
                                    Unavailable
                                </a>
                            }
                            {theater.attributes.min_num_people == theater.attributes.num_seats ?
                            <span className="noper">{theater.attributes.num_seats} People</span>
                            :
                            <span className="noper">{theater.attributes.min_num_people} - {theater.attributes.num_seats + theater.attributes.max_extra_seats} People</span>
                            }
                            

                        </div>
                    </div>
                    ))}
                     
                 </div>
            </div>
            <div className="btn-group">
                <a className="btn btn-prev" onClick={props.prevStep}>Previous</a>

                {error && 
                <div className="text-danger">
                        Please select a theater
                    </div>
}
                <a className="btn btn-next" 
                    onClick={onNext}>Next</a>
            </div>
        </div>
    );
}

export default Theaters;
