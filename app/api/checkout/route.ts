

import { stripe } from "@/lib/stripe";
import { getFundraiserById } from "@/lib/supabase-server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id, amount, name } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "Missing id." }, { status: 400 });
  }

  if (!amount) {
    return NextResponse.json({ error: "Missing amount." }, { status: 400 });
  }

  if (!name) {
    return NextResponse.json({ error: "Missing name." }, { status: 400 });
  }

  // Retrieve the fundraiser from your database using the ID
  const fundraiser = await getFundraiserById(id as string);

  if (!fundraiser) {
    return NextResponse.json(
      { error: "Fundraiser not found." },
      { status: 404 }
    );
  }

  try {
    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: fundraiser.title,
              metadata: {
                category: fundraiser.category,
              }
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },

      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/fundraiser/${fundraiser.id}?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/fundraiser/${fundraiser.id}?success=0`,
      metadata: {
        fundraiserId: fundraiser.id,
        name,
        amount
      },
      currency: "inr",
    });

    // Redirect to the Stripe checkout page
    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }

}
