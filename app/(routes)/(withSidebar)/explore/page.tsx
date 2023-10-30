import React from "react";
import CardItem from "@/components/Cards/CardItem";
import Link from "next/link";
import { getFundraisers } from "@/lib/supabase-server";

const ExplorePage = async () => {
  const data = await getFundraisers();

  return (
    <div className="flex flex-row flex-wrap gap-10">
      {data?.fundraisers?.map((card, index) => (
        <Link href={`/fundraiser/${index}`} key={index}>
          <CardItem
            title={data.fundraisers?.[index].title}
            description={data?.fundraisers?.[index].description}
            username={data?.user?.[index].users?.full_name}
            content={data?.fundraisers?.[index].content}
          />
        </Link>
      ))}
    </div>
  );
};

export default ExplorePage;
