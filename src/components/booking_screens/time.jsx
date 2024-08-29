function Time(props) {
    console.log('time', props);
    const max_seats = props.theater.attributes.max_extra_seats + props.theater.attributes.num_seats;
    return ( 
        <div className="form-step active">
            <h3>Times & Members</h3>
            <div className="slider_area bookslot">
                <div className="row">
                    <div className="col-md-6">
                        <div className="content-details">
                            <img
                                src={props.theater.attributes.photo.data[0].attributes.url.startsWith('/') ? `${process.env.NEXT_PUBLIC_API_URL}${props.theater.attributes.photo.data[0].attributes.url}` : props.theater.attributes.photo.data[0].attributes.url} 
                            />
                            <h2>{props.theater.attributes.name}</h2>
                            <ul>
                            <li>₹{props.theater.attributes.pricing_per_slot} for {props.theater.attributes.num_seats} or less people<br /> (Rs {props.theater.attributes.extra_seat_cost} per extra person)</li>
                                <li> Mega 150 inch enhanced 4k Video. Powerful 1000W Dolby atmos sound system (In-wall speakers). Ideal for family and friends.</li>
                                <li> Food & Beverages can be ordered at the theatre.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="input-group">
                            <label>Book your slot</label>
                            {/* <input type="time" name="start-date[]" id="start-date"/> */}
                            {/* theaterTimeSlots */}
                            <select 
                                value={props.timeSlot || ""}
                                onChange={(e) => props.setTimeSlot(e.target.value)}
                            >
                                {props.theaterTimeSlots.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {`${item.attributes.start_time.slice(0, 5)} - ${item.attributes.end_time.slice(0, 5)}`}
                                    </option>
                                    ))}
                            </select>
                        </div>
                        <div className="input-group">
                            <label>No. of person</label>

                            <select 
                                value={props.numPersons || 2}
                                onChange={(e) => props.setNumPersons(e.target.value)}>
                                {Array.from({ length: max_seats }, (_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                                ))}
                            </select>

                            {/* <select name="noperson" id="noperson">
                                <option value="volvo">1</option>
                                <option value="saab">2</option>
                                <option value="opel">3</option>
                                <option value="audi">4</option>
                            </select> */}
                        </div>
                        <div className="price_area"><h1>₹ 2599</h1>
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