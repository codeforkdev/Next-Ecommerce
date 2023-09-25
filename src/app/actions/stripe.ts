"use server";
import { round2 } from "@/lib/utils";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51NtBvRJ0QXEh5B3XR0TWd8w0wjyhsTWmXHwq6jRqAM2jEbtLVtUuxVbnmxqiVPptnZbWz7YPwgS6yajsAvt4wWBo00tnsxyRH5",
  { apiVersion: "2023-08-16" }
);

export const createCheckoutSession = async (
  cart: {
    name: string;
    price: number;
    image: string;
    count: number;
  }[]
) => {
  console.log("Create Checkout");
  const lineItems = cart.map((item) => ({
    price_data: {
      currency: "usd",
      unit_amount: round2(item.price) * 100,
      product_data: {
        name: item.name,
        images: [item.image],
      },
    },
    quantity: item.count,
  }));
  console.log(cart);
  const session = await stripe.checkout.sessions.create({
    success_url: "http://localhost:3000",
    cancel_url: "http://localhost:3000",
    mode: "payment",
    line_items: lineItems,
    shipping_address_collection: { allowed_countries: ["US"] },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "usd",
          },
          display_name: "Free shipping",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "usd",
          },
          display_name: "Next day air",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
  } satisfies Stripe.Checkout.SessionCreateParams);
  return session.url;
};
