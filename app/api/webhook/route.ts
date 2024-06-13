import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest, res: NextResponse) {
  const payload = await req.text();
  const response = JSON.parse(payload);

  const sig = req.headers.get("Stripe-Signature");

  const dateTime = new Date(response?.created * 1000).toLocaleDateString();
  const timeString = new Date(response?.created * 1000).toLocaleTimeString();

  try {
    let event = stripe.webhooks.constructEvent(
      payload,
      sig!,
      process.env.TESTING_STRIPE_WEBHOOK_SECRET!
    );
    console.log(
      "here we can do some stuff like add subscribed=true subscription_slot=0 to the user"
    );
    return NextResponse.json({ status: "success", event: event.type });
  } catch (error) {
    console.log(error);
  }
}
