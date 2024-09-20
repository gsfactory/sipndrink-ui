function PaymentSummary(props) {
  console.log('paymentsummary', props.theater);
  const extra_seats = props.theater != null && props.numPersons > props.theater.attributes.num_seats ? props.numPersons-props.theater.attributes.num_seats : 0;
    return ( 
        <div className="rigrt-boxwelcome">
            <h3>{props.businessDetails.attributes.name}</h3>
            <ul>
                <li><i className="fa fa-phone"></i> +91 {props.businessDetails.attributes.mobile}</li>
                <li><i className="fa fa-map-marker"></i>
                  {/* {props.businessDetails.attributes.address} */}
                  <a href="https://shorturl.at/PYwPw" className="text-primary" target="_blank">
                    Hyderabad - 49
                  </a>
                </li>
                <li><i className="fa fa-video-camera"></i>
                {props.theater ? props.theater.attributes.name : "Select a Theater"}
                </li>
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
                      return <li key={key}><i className="fa fa-certificate" aria-hidden="true"></i> {val.name}</li>
                    }
                  });
                })}
            </ul>
            <div className="total_pp"><h6>Total: {props.pricing}</h6></div>
        </div>
    );
}

export default PaymentSummary;