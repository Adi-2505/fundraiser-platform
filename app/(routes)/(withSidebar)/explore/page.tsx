import React from "react";
import CardItem from "@/components/Cards/CardItem";
import Link from "next/link";
import { getFundraisers } from "@/lib/supabase-server";

const ExplorePage = async () => {
  const data = await getFundraisers();

  return (
    <div className="flex flex-row flex-wrap gap-10">
      {data?.fundraisers?.map((fundraiser, index) => (
        <Link href={`/fundraiser/${fundraiser?.id}`} key={index}>
          <CardItem
            title={data.fundraisers?.[index].title}
            description={data?.fundraisers?.[index].description}
            username={data?.user?.[index].users?.full_name}
            content={data?.fundraisers?.[index].content}
            amountRaised={data?.fundraisers?.[index].amount}
            button
            value={
              ((data?.fundraisers?.[index].amount ?? 0) /
                (data?.fundraisers?.[index].target ?? 1)) *
              100
            }
          />
        </Link>
      ))}
    </div>
  );
};

export default ExplorePage;
