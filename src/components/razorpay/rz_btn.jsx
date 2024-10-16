import React, { useState } from 'react';
import loadScript from './load_script'; // Assuming loadScript is in the same directory
import api_client from '../api/api_client';
import { useData } from '../../context/sip_context';
import { useRouter } from 'next/router';

function RazorpayButton(props) {
    // console.log('Razorpay', props);
    const router = useRouter();
    const { setData } = useData();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (! await props.isAllInputOk()) {
      console.log("There is some problem...");
      return;
    }
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }
    console.log("sdk loaded successfully, initiaint order");

    const data = await api_client.initiatePayment(props.booking.price_paid);
    console.log('booking res', data);

    const options = {
      key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Razorpay Dashboard
      currency: data?.data?.attributes.currency,
      amount: data?.data?.attributes.amount,
      order_id: data?.data?.attributes.pg_order_id,
      name: 'Sip n Screen',
      description: 'Life’s too short for ordinary parties! Roll the credits on dull celebrations and script your perfect.',
      // image: 'https://your-logo-url.com', // Optional: Your logo URL
      
      handler: async function (response) {
        // Handle successful payment here
        // console.log("Finalizing payment", response);
        await api_client.finalizePayment(response);

        // do the booking now
        // console.log('Paymend finalized...');
        const result = await api_client.startBooking(props.booking, props.services);
        // console.log('Booked', result);

        // update booking id in payment
        // console.log('Updating payment and booking...');
        await api_client.updatePayment(data.data.id, result.id);

        const resultData = {
          result: result,
          theater: props.theater,
          services: props.services,
          booking: props.booking,
          serviceMap: props.serviceMap,
          mobile: props.mobile,
          email: props.email,
          name: props.name
        };
        console.log('result data', resultData);
        setData(resultData);

        // console.log("Finalizing payment success");
        router.push('/thankyou');
      },
      prefill: {
        name: props.name,
        email: props.email,
        contact: props.mobile,
      },
      notes: {
        address: 'Your Company Address',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
        <input value="Proceed to pay Advance" type="button" name="complete" 
            className="btn" 
            disabled={false}
            onClick={handlePayment}
        />
  );
}

export default RazorpayButton;