import Moment from "react-moment";

function PaymentSummary(props) {
  const item = props.theaterTimeSlots ? props.theaterTimeSlots.find(element => element.id == props.timeSlotId) : null;

  const extra_seats = props.theater != null && props.numPersons > props.theater.attributes.num_seats ? props.numPersons-props.theater.attributes.num_seats : 0;
    return ( 
        <div className="rigrt-boxwelcome">
            <h3>{props.businessDetails.attributes.name}</h3>
            <ul>
                <li><i className="fa fa-phone"></i> +91 {props.businessDetails.attributes.mobile}</li>
                <li><i className="fa fa-map-marker"></i>
                  <a href="https://shorturl.at/PYwPw" className="text-primary" target="_blank">
                    Hyderabad - 49
                  </a>
                </li>

                <li><i className="fa fa-video-camera"></i>
                {props.theater ? props.theater.attributes.name : "Select a Theater"}
                </li>
                <li>
                  Booking at:&nbsp; 
                    <Moment format="DD MMM YYYY">
                      {props.bookingDate}
                    </Moment>
                </li>
                {item && 
                <li>
                Time: {item.attributes.start_time.slice(0, 5)} - {item.attributes.end_time.slice(0, 5)}
                </li>
                }

                {props.theater ? 
                <li>
                    <i className="fa fa-certificate" aria-hidden="true"></i> Total-Seats: {props.numPersons}
                </li>
                :
                <li>
                    <i className="fa fa-certificate" aria-hidden="true"></i> Total-Seats: 0
                </li>
                }
                <li><i></i></li>
            </ul>
            <h3>Add-ons</h3>
            <div className="small">
            <ul>
              <li><i className="fa fa-certificate" aria-hidden="true"></i> Discount: {props.discount}</li>
              <li><i className="fa fa-certificate" aria-hidden="true"></i> Extra-Seats: {extra_seats}</li>

              {props.serviceMap['decorations'].map((cake) => {
                if (props.decorationIds.includes(cake.id)) {
                  return <li key={cake.id}><i className="fa fa-certificate" aria-hidden="true"></i> {cake.name}</li>
                }
              })}
              {props.serviceMap['cake'].map((cake) => {
                if (props.cakeIds.includes(cake.id)) {
                  return <li key={cake.id}><i className="fa fa-certificate" aria-hidden="true"></i> {cake.name}</li>
                }
              })}
              {props.serviceMap['extra-decorations'].map((cake) => {
                if (props.extraDecoIds.includes(cake.id)) {
                  return <li key={cake.id}><i className="fa fa-certificate" aria-hidden="true"></i> {cake.name}</li>
                }
              })}
              {props.serviceMap['flowers'].map((cake) => {
                if (props.flowerIds.includes(cake.id)) {
                  return <li key={cake.id}><i className="fa fa-certificate" aria-hidden="true"></i> {cake.name}</li>
                }
              })}
              {props.serviceMap['photography'].map((cake) => {
                if (props.photoIds.includes(cake.id)) {
                  return <li key={cake.id}><i className="fa fa-certificate" aria-hidden="true"></i> {cake.name}</li>
                }
              })}
            </ul>
            </div>
            <div className="total_pp"><h6>Total: {props.pricing}</h6></div>
        </div>
    );
}

export default PaymentSummary;