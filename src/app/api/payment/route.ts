import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET(res: NextResponse) {
  console.log("payment endpoint");

  const stripe = new Stripe(
    "sk_test_51NtBvRJ0QXEh5B3XR0TWd8w0wjyhsTWmXHwq6jRqAM2jEbtLVtUuxVbnmxqiVPptnZbWz7YPwgS6yajsAvt4wWBo00tnsxyRH5",
    { apiVersion: "2023-08-16" }
  );

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: "usd",
    payment_method_types: ["card"],
  });

  return NextResponse.json({ client_secret: paymentIntent.client_secret });
}
