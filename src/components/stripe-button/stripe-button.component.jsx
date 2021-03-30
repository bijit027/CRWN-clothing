import React from 'react';
import StripeCheckout from 'react-stripe-checkout';


const StripeCheckoutButton = ({price})=>{
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51ITcfYFE1P1qwGR9NnNbPQzzJ4rbXOqoBBEEpRDKRSEIe8xRunYmHfJz79r6B0RcLqiUi5Y5fGkNPJt4zlZawo3u00i5J45xpH';



  const  onToken = token=>{
        console.log(token);
        alert('Payment Successful')
    }


    return(
        <StripeCheckout
        
        label="Pay Now"
        name="CRWN Clothing Ltd."
        billingAddress
        shippingAddress
        image='https://svgshare.com/i/CUz.svg'
        description={`Your total is $${price}`}
        amount={priceForStripe}
        panelLabel="Pay Now"
        token={onToken}
        stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;