import { Button } from "@material-ui/core";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../../stateProvider";
import "./buyPage.css";

function BuyPage() {
  const [{ userItem }] = useStateValue();
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const paypalRef = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: userItem.name,
                amount: {
                  currency_code: "USD",
                  value: userItem.price,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setPaidFor(true);
        },
        onError: (err) => {
          setError(err);
        },
      })
      .render(paypalRef.current);
  }, [userItem]);

  if (paidFor) {
    return (
      <div className="paypal_Confirm">
        <h1>Your recipe on your way!</h1>
        <Link to="/">
          <Button>Home</Button>
        </Link>
      </div>
    );
  }
  return (
    <div>
      <div className="product_info">
        {error && <div>Uh oh, an error occurred! {error.message}</div>}
        <h1>
          {userItem?.name} for USD{userItem?.price}
        </h1>
        <div className="product_image">
          <img src={userItem?.image} alt="" />
        </div>
        <div className="paypal_button" ref={paypalRef} />
      </div>
    </div>
  );
}

export default BuyPage;
