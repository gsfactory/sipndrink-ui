import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import loadScript from './load_script'; // Assuming loadScript is in the same directory
import api_client from '../api/api_client';

function RazorpayButton(props) {
    console.log('Razorpay', props);
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    // Replace this with your backend's order creation API
    const result = await api_client.startBooking(props.booking, props.services);
    console.log('booking res', result);

    const data = {
        id: 1,
        amount: 100
    };

    const options = {
      key: 'YOUR_RAZORPAY_KEY', // Enter the Key ID generated from the Razorpay Dashboard
      amount: data.amount.toString(), // Amount is in currency subunits, like paise
      currency: 'INR',
      name: 'Your Company Name',
      description: 'Test Transaction',
      image: 'https://your-logo-url.com', // Optional: Your logo URL
      order_id: data.id, // The order ID from the backend
      handler: function (response) {
        // Handle successful payment here
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: 'Your Name',
        email: 'your-email@example.com',
        contact: '9999999999',
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
    <Button colorScheme="teal" onClick={handlePayment} isLoading={loading} width="100%">
      Pay Now
    </Button>
  );
}

export default RazorpayButton;