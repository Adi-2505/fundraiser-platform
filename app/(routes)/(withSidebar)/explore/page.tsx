"use client";

import React, { useEffect, useState } from "react";
import CardItem from "@/components/Cards/CardItem";
import Link from "next/link";
// import { getFundraisers } from "@/lib/supabase-server";
import { useSupabase } from "@/provider/supabase-provider";

// import { FundraisersRow } from "@/types/database.types";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

// Explicitly define the type of the fetched fundraiser data object
type fundraiserTypes = {
  amount: number;
  category: string | null;
  content: string;
  created_at: string;
  description: string;
  id: string;
  target: number;
  title: string;
  updated_at: string;
  user: string;
  users: {
    full_name: string | null;
  } | null;
};

const ExplorePage = () => {
  // const data = await getFundraisers();
  const [data, setData] = useState<fundraiserTypes[] | null>();
  const { supabase } = useSupabase();

  const router = useRouter();

  const query = useSearchParams();

  useEffect(() => {
    if (query.get("filter")) {
      const getData = async () => {
        const { data: fundraisers } = await supabase
          .from("fundraisers")
          .select(
            `
            *,
            users (
              full_name
            )
          `
          )
          .filter("category", "eq", query.get("filter"));

        setData(fundraisers);
        // console.log(fundraisers)
      };

      getData();
    } else {
      const getData = async () => {
        const { data: fundraisers } = await supabase.from("fundraisers")
          .select(`
            *,
            users (
              full_name
            )
          `);

        setData(fundraisers);
      };
      getData();
    }

    // getData()
  }, [query.get("filter")]);

  const handleClick = (id: string) => {
    router.push(`/fundraiser/${id}`);
  }

  

  if (!data) {
    return (
      <div className="text-2xl font-bold flex flex-row justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-row flex-wrap gap-10">
      {data?.map((fundraiser, index) => (
        // <Link href={`/fundraiser/${fundraiser.id}`} key={index}>
        <div key={index} onClick={()=>handleClick(fundraiser.id)}>
          <CardItem
            key={index}
            title={fundraiser.title}
            description={fundraiser.description}
            username={fundraiser.users?.full_name}
            content={fundraiser.content}
            amountRaised={fundraiser.amount}
            button
            value={((fundraiser.amount ?? 0) / (fundraiser.target ?? 1)) * 100}
            id={fundraiser.id}
       
          />
        </div>
      ))}
    </div>
  );
};

export default ExplorePage;
