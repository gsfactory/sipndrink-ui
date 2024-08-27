import api_client from "../api/api_client";

function Theaters(props) {
    console.log('theaters', props);
    // const handleToggle = (id) => {
    //     // console.log('img toggled', id);
    //     // props.handleItemSelection(id, 'photography', false);
    // };

    const onNext = () => {
        if (!props.theater) {
            return;
        }
        props.nextStep();
    }
    const onTheaterSelect = async (theater) => {
        const timeslots = await api_client.getTimeslotsByTheatre(theater.id);

        props.setTheaterTimeSlots(timeslots.data);
        props.setTheater(theater);
        console.log('timeslots', timeslots.data);
    }

    return ( 
        <div className="form-step active">
            <h3>Choose Your Theater</h3>
            
            <div className="left-section">
                <div className="box-container row">
                 
                 {props.theaters.map(theater => (
                        <div className="col-md-4">
                            <div 
                                className={`box ${props.theater?.id === theater.id ? 'active' : ''}`} >

                                <img 
                                    onClick={() => props.setTheater(theater)}
                                    src={theater.attributes.photo.data[0].attributes.url.startsWith('/') ? `${process.env.NEXT_PUBLIC_API_URL}${theater.attributes.photo.data[0].attributes.url}` : theater.attributes.photo.data[0].attributes.url} />
                                <h3>{theater.attributes.name}</h3>
                                
                                <p>₹{theater.attributes.pricing_per_slot} for {theater.attributes.num_seats} or less people<br /> (Rs {theater.attributes.extra_seat_cost} per extra person)</p>
                                {/* <span className="active">0 slots available on <samp>18-08-2024</samp></span> */}
                                <a className="btn btn-next booknoe"
                                    // onClick={onTheaterSelect(theater)}
                                    onClick={(event) => onTheaterSelect(theater)}
                                >Book Now</a>
                                <span className="noper">{theater.attributes.min_num_people} - {theater.attributes.num_seats + theater.attributes.max_extra_seats} People</span>
                            </div>
                        </div>
                    ))}
                     
                <p className="note-detls">Note: Timing of the photography is according to the availability of the photographer.</p>     
                 </div>
            </div>
            <div className="btn-group">
                <a className="btn btn-prev" onClick={props.prevStep}>Previous</a>

                <a className="btn btn-next" 
                    onClick={onNext}>Next</a>
            </div>
        </div>
    );
}

export default Theaters;
