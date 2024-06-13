import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const res = JSON.parse(payload);

  const sig = req.headers.get("Stripe-Signature");

  const dateTime = new Date(res?.created * 1000).toLocaleDateString();
  const timeString = new Date(res?.created * 1000).toLocaleTimeString();

  try {
    let event = stripe.webhooks.constructEvent(
      payload,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    // const response: any = await updateUserSubscription(
    //   // insert stuff which updates a stored user's (probably in Supabase) information
    // );
    console.log("Event: ", event.type);

    return NextResponse.json({ status: "success", event: event.type });
  } catch (error) {
    console.log(error);
  }
}
