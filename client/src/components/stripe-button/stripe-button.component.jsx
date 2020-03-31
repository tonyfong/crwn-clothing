import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from 'axios';

import "./stripe-button.style.scss";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_sPGJ2KEJtI2MDB452J5dOzuV00ZYQiKEFe";
  const onToken = token => {
    // console.log(token);
    alert("Sending payment info to Stripe ...");
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token
      }
    }).then(response=> {
        alert('Payment accepted. Thanks for your order.');
    }).catch(error=> {
      console.log('Payment error: ', JSON.parse(error));
      alert('Payment failed. Please check your payment information.')
    });
  };
  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      shippingAddress
      billingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;