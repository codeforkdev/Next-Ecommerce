"use client";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect } from "react";

const stripePromise = loadStripe(
  "pk_test_51NtBvRJ0QXEh5B3X3KWQ7eTPjQLAiceIWVYff9w4gXNADw5sQBPbKkkSKMFnnpRTc0xH8IOob5lwPGtlPJWTvG8I00ut6jOJzF"
);
export default function Page() {
  let options = {};
  useEffect(() => {
    fetch("/api/payment")
      .then((res) => res.json())
      .then((data) => {
        options = data;
        console.log(data);
      });
  }, []);

  return (
    <div>
      <div id="payment-element"></div>
      {options?.client_secret ? (
        <Elements stripe={stripePromise} options={options}></Elements>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}
