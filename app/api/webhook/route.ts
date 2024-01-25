import Stripe from "stripe";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

import { headers } from "next/headers";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return new NextResponse("Webhook Error: " + err.message, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  // Fulfill the purchase...
  // console.log(`🔔  Payment received!`);
  // console.log(`🔔  Payment received!`, session.metadata);
  // console.log('🔔  Payment received!', event.type);

  if (event.type === "checkout.session.completed") {
    const { fundraiserId, amount } = session.metadata!;
    const email = session.customer_details?.email;
    const name = session.customer_details?.name;
    const contact = session.customer_details?.phone;

    const supabase = createServerSupabaseClient();

    const { data: fundraiser } = await supabase
      .from("fundraisers")
      .select("*")
      .eq("id", fundraiserId)
      .single();

    if (!fundraiser) {
      return new NextResponse("Fundraiser not found", { status: 404 });
    }

    await supabase
      .from("fundraisers")
      .update({ amount: fundraiser.amount + parseInt(amount), contributors: fundraiser.contributors + 1 })
      .eq("id", fundraiser.id);

    if(fundraiser.amount + parseInt(amount) >= fundraiser.target){
      await supabase
        .from("fundraisers")
        .update({ status: "inactive" })
        .eq("id", fundraiser.id);
    }

    await supabase
      .from("contributors")
      .insert([{ fundraiser_id: fundraiser.id, name, email, contact, amount: parseInt(amount) }])
      
  }
  
  return new NextResponse("Webhook received", { status: 200 });
}
