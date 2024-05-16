import React, { useState } from 'react';

const Payment = () => {
  const [paymentAmount, setPaymentAmount] = useState(100); // Set default payment amount
  const [orderId, setOrderId] = useState(null); // State to store order ID

  // Function to handle payment
  const handlePayment = async () => {
    // Make API call to your server to create a new order
    const response = await fetch('/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: paymentAmount }), // Send payment amount to server
    });
    const data = await response.json();
    setOrderId(data.orderId); // Set the received order ID

    // Load Razorpay script once order ID is received
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      const options = {
        key: 'YOUR_RAZORPAY_KEY', // Your Razorpay API key
        amount: paymentAmount,
        currency: 'INR',
        name: 'Your Company Name',
        description: 'Payment for Purchase',
        order_id: orderId,
        handler: (response) => {
          // Handle successful payment
          alert('Payment successful!');
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
        },
        theme: {
          color: '#F37254',
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open(); // Open Razorpay checkout form
    };
    document.body.appendChild(script);
  };

  return (
    <div>
      <h2>Payment Screen</h2>
      <input
        type="number"
        value={paymentAmount}
        onChange={(e) => setPaymentAmount(e.target.value)}
      />
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default Payment;
