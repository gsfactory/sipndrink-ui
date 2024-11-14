import log from '../utils/log';

function Time(props) {
    log.debug('Here are my logs debug', props);
    // console.log('time', );

    const desc = props.theater.attributes.description.split("\n");
    const availableSlotId = props.theaterTimeSlots.find(item => props.slotsAvailability[props.theater.id]['availability'][item.id])?.id;
    console.log("availableSlotId", availableSlotId);

    const s3Basepath = 'https://s3.amazonaws.com/client.limelox.com/sipndrink';
    const startNumber = props.theater.attributes.min_num_people == props.theater.attributes.num_seats ? props.theater.attributes.num_seats : 1;
    console.log('startNumber', startNumber);
    
    const max_seats = props.theater.attributes.max_extra_seats + props.theater.attributes.num_seats;
    return ( 
        <div className="form-step active">
            <h3>Times & Members</h3>
            <div className="slider_area bookslot">
                <div className="row">
                    <div className="col-md-6">
                        <div className="content-details">
                            <img
                                src={props.theater.attributes.photo.data[0].attributes.url.startsWith('/') ? `${process.env.NEXT_PUBLIC_API_URL}${props.theater.attributes.photo.data[0].attributes.url}` : 
                                `${s3Basepath}/${props.theater.attributes.photo.data[0].attributes.hash}${props.theater.attributes.photo.data[0].attributes.ext}`
                                } 
                            />
                            <h2>{props.theater.attributes.name}</h2>
                            <ul>
                                {
                                    // desc.map((item, index) => {
                                    //     return <li key={index}>
                                    //         {item}
                                    //     </li>
                                    // })
                                    desc.map((item, index) => (
                                        <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                                      ))
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="input-group">
                            <label>Book your slot</label>
                            <select 
                                value={availableSlotId}
                                onChange={(e) => props.setTimeSlot(e.target.value)}
                            >
                                {props.theaterTimeSlots.map((item) => (
                                    <option 
                                    key={item.id} 
                                    value={item.id} 
                                    disabled={!props.slotsAvailability[props.theater.id]['availability'][item.id]} // Disable if not available
                                  >
                                    {`${item.attributes.start_time.slice(0, 5)} - ${item.attributes.end_time.slice(0, 5)} `}
                                    <span className={props.slotsAvailability[props.theater.id]['availability'][item.id] === true ? "text-success" : "text-danger"}>
                                      {props.slotsAvailability[props.theater.id]['availability'][item.id] === true ? "" : "unavailable"}
                                    </span>
                                  </option>
                                    ))}
                            </select>
                        </div>
                        <div className="input-group">
                            <label>No. of person</label>

                            <select 
                                value={props.numPersons || 2}
                                onChange={(e) => props.setNumPersons(e.target.value)}>
                                {Array.from({ length: max_seats - startNumber + 1 }, (_, i) => (
                                <option key={i + startNumber} value={i + startNumber}>
                                    {i + startNumber}
                                </option>
                                ))}
                            </select>
                        </div>
                        <div className="price_area"><h1>₹ {props.pricing}</h1>
                            <p>*inclusive of all taxes</p>
                        </div>
                    </div>
                    
                    {/* <div className="col-md-6">
                        <div className="price_area"><h1>₹ 2599</h1>
                        <p>*inclusive of all taxes</p></div>
                    </div> */}
                </div>
            </div>
            <div className="btn-group">
                <a className="btn btn-prev"
                    onClick={props.prevStep}>Previous</a>
                <a className="btn btn-next" 
                    onClick={props.nextStep}>Next</a>
            </div>
        </div>
    );
}

export default Time;