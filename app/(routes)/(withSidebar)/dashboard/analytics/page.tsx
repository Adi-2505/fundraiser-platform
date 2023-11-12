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
        <Link
          href={`/dashboard/analytics/${fundraiser.id}`}
          key={index}
          className="relative group transition duration-300 ease-in-out transform"
        >
          <CardItem
            title={fundraiser.title}
            description={fundraiser.description}
            username={session?.user.user_metadata.full_name}
            content={fundraiser.content}
            amountRaised={fundraiser.amount}
            targetAmount={fundraiser.target}
            link={false}
          />
          <div className="absolute w-[360px] h-[500px] inset-0 bg-black opacity-0 hover:opacity-40 transition-opacity duration-300 text-white flex justify-center items-center rounded-md">
            <Button variant={'default'} className="text-xl text-white">Manage</Button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default DashboardPage;
