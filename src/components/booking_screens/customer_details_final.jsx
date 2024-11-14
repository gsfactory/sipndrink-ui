import { useState } from 'react';
import RazorpayButton from '../razorpay/rz_btn';
import api_client from '../api/api_client';

function CustomerDetailsFinalScreen(props) {
    // console.log('final screen', props);
    const [error, setError] = useState("");
    const [policyError, setPolicyError] = useState("");

    const [isChecked, setIsChecked] = useState(false);
    const [coupon, setCoupon] = useState("");

    const booking = {
        "date": props.bookingDate,
        "extra_seat": props.numPersons > props.theater.attributes.num_seats ? props.numPersons - props.theater.attributes.num_seats : 0,
        "total_price": props.pricing,
        "price_paid": props.theater.attributes.partial_payment_amount,
        "customer_email": props.email,
        "customer_phone": props.mobile,
        "customer_name": props.name,
        "theatre": props.theater.id,
        "timeslot": props.timeSlotId,
        "total_seats_booked": props.numPersons,
        "first_name": props.firstName,
        "second_name": props.secondName,
        "discount": props.discount,
    };
  
    const services=[...props.decorationIds, ...props.cakeIds, ...props.flowerIds, ...props.extraDecoIds, ...props.photoIds];

    const handleCoupon = (event) => {
        setCoupon(event.target.value);
    }
    const fetchCouponDetail = async () => {
        setError("");

        console.log('checking coupon', coupon);
        if (!coupon) {
            return;
        }
        const res = await api_client.getCoupon(coupon);
        if (res?.data?.length > 0) {
            console.log('discount of ', res.data[0].attributes.discount);
            props.handleCoupon(res.data[0].attributes.discount);
        } else {
            setError('Invalid coupon code');
        }
    }
    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const isAllInputOk = async () => {
        if (!props.mobile || !props.name || !props.email) {
            setError("Please fill all details name/number/email");
            return false;
        }

        if (!isChecked) {
            setPolicyError("You need to accept the policy");
            return false;
        }
        return true;
    }

    return (  
        <div className="form-step addonssec active">
        <h3><span> Enter your details to proceed further</span></h3>
       
       <div className="com_form"> <div className="input-group">
            <div className="input-box">
                <input  name="fname" type="text" placeholder="Full Name" 
                    value={props.name}
                    onChange={(event) => props.setName(event.target.value)}/>
            </div>
        </div>
        <div className="input-group">
            <div className="input-box">
                <input id="twitter" name="twitter" type="tel" placeholder="Whatsapp Number " 
                    value={props.mobile}
                    onChange={(event) => props.setMobile(event.target.value)}/>
            </div>
        </div>
        <div className="input-group">
            <div className="input-box">
                <input id="github" name="email" type="email" placeholder="Email" 
                    value={props.email}
                    onChange={(event) => props.setEmail(event.target.value)}/>
            </div>
        </div>
        <div className="applynote">
            <p>We collect an advance amount of ₹ {props.theater.attributes.partial_payment_amount} to book the slot. Remaining bill will be collected at the time of check-out.</p>
            <div className="input-group">
                <div className="input-box">
                    <input id="github" name="coupon" type="text" placeholder="Enter Coupon Code" onChange={handleCoupon} />
                    <input type="button" value="APPLY" name="apply" onClick={fetchCouponDetail} />
                </div>
                {error && 
                    <div className="text-danger">
                        {error}
                    </div>
                }
            </div>
        </div>
        <div className="applynote">
            <div className="input-group">
                <div className="row align-items-center">
                    <div className='col-auto'>
                        <input
                            type="checkbox"
                            name='acceptPolicy'
                            checked={isChecked} // Controlled component
                            onChange={handleCheckboxChange}
                        />
                    </div>
                    <div className='col' style={{ marginLeft: '-20px' }}>
                        <p className="mb-0">
                        I accept the 
                        <a href="/privacy-policy" target="_blank" className="text-primary"> Terms and conditions and Privacy Policy </a> of Sip n Screen
                        </p>
                    </div>
                </div>
                {policyError && 
                    <div className="text-danger">
                        {policyError}
                    </div>
                }
            </div>
        </div>
    </div>
        <div className="btn-group">
            <a className="btn btn-prev"
                onClick={props.prevStep}>Previous</a>

            <RazorpayButton 
                booking={booking}
                services={services}
                isAllInputOk={isAllInputOk}
                theater={props.theater}
                serviceMap={props.serviceMap}
                mobile={props.mobile}
                email={props.email}
                name={props.name}
            />
            {/* <input value="Proceed to pay Advance" type="button" name="complete" 
                className="btn" 
                disabled={false}
                onClick={initiateBooking}
            /> */}
        </div>
    </div>
    );
}

export default CustomerDetailsFinalScreen;