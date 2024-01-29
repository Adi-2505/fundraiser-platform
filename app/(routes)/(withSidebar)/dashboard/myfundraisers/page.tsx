import React from "react";
import Link from "next/link";

import { getFundraisersByUserId, getSession } from "@/lib/supabase-server";

import CardItem from "@/components/Cards/CardItem";
import { Button } from "@/components/ui/button";

const DashboardPage = async () => {
  const session = await getSession();
  const userId = session?.user.id;

  const fundraisers = await getFundraisersByUserId(userId as string);

  // console.log(fundraisers)

  return (
    <div className="flex flex-row flex-wrap gap-8">
      {/* managing the fundraisers */}
      {/* show all the funndraisers by the user */}
      {fundraisers?.map((fundraiser, index) => (
        <div
          className="relative group transition duration-300 ease-in-out transform"
          key={index}
        >
          <CardItem
            title={fundraiser.title}
            username={session?.user.user_metadata.full_name}
            amountRaised={fundraiser.amount}
            targetAmount={fundraiser.target}
            link={false}
            fundraiserImageUrl={fundraiser.image_url!}
            avatarUrl={session?.user.user_metadata.avatar_url!}
            contributers={fundraiser.donors}
          />
          <Link href={`/dashboard/myfundraisers/${fundraiser.id}`}>
            <div className="absolute w-[360px] inset-0 bg-black opacity-0 hover:opacity-40 transition-opacity duration-300 text-white flex justify-center items-center rounded-md">
              <Button variant={"default"} className="text-xl text-white">
                Manage
              </Button>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default DashboardPage;
