

import { stripe } from "@/lib/stripe";
import { getFundraiserById, getFundraiserBySlug } from "@/lib/supabase-server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { slug, amount } = await req.json();

  if (!slug) {
    return NextResponse.json({ error: "Missing id." }, { status: 400 });
  }

  if (!amount) {
    return NextResponse.json({ error: "Missing amount." }, { status: 400 });
  }

 

  // Retrieve the fundraiser from your database using the ID
  const fundraiser = await getFundraiserBySlug(slug);

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
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/fundraiser/${fundraiser.slug}?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/fundraiser/${fundraiser.slug}?success=false`,
      metadata: {
        fundraiserId: fundraiser.id,
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
