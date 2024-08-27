function PaymentSummary(props) {
  console.log('ps', props.theater);
  const extra_seats = props.theater != null && props.numPersons > props.theater.attributes.num_seats ? props.numPersons-props.theater.attributes.num_seats : 0;
    return ( 
        <div className="rigrt-boxwelcome">
            <h3>Sip N Screen</h3>
            <ul><li><i className="fa fa-phone"></i> +91 1234567890</li>
                <li><i className="fa fa-map-marker"></i> Hyderabad, Lorem Ipsum is simply dummy text.</li>
                <li><i className="fa fa-video-camera"></i>
                {props.theater ? props.theater.attributes.name : "Select a Theater"}
                </li>
                <li><i className="fa fa-certificate" aria-hidden="true"></i> Total-Seats: {props.numPersons}</li>
                <li><i></i></li>
            </ul>
            <h3>Add-ons</h3>
            <ul>
              <li><i className="fa fa-certificate" aria-hidden="true"></i> Extra-Seats: {extra_seats}</li>

                {Object.entries(props.serviceMap).map(([key, value]) => {
                  return value.map((val) => {
                    let desigPropsRef = props.decorationIds;
                    if (key === 'cake') {
                      desigPropsRef = props.cakeIds;
                    } else if (key === 'extra-decorations') {
                      desigPropsRef = props.extraDecoIds;
                    } else if (key === 'flowers') {
                      desigPropsRef = props.flowerIds;
                    } else if (key === 'photography') {
                      desigPropsRef = props.photoIds;
                    }

                    if (desigPropsRef.includes(val.id)) {
                      return <li><i className="fa fa-certificate" aria-hidden="true"></i> {val.name}</li>
                    }
                  });
                })}
            </ul>
            <div className="total_pp"><h6>Total: {props.pricing}</h6></div>
        </div>
    );
}

export default PaymentSummary;