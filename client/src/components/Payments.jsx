import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

class Payments extends React.Component {
  render() {
    return (
      <StripeCheckout
        name="teamster-io"
        description="$5 for 5 Survey Credits"
        amount={500}
        token={token => console.log(token)}
        stripeKey={process.env.STRIPE_KEY}
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default Payments;
