"use client";

import React, { useEffect, useState } from "react";
import CardItem from "@/components/Cards/CardItem";

// import { getFundraisers } from "@/lib/supabase-server";
import { useSupabase } from "@/providers/supabase-provider";

// import { FundraisersRow } from "@/types/database.types";
import { useSearchParams } from "next/navigation";


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
          `)
          .filter("status", "eq", "active");
        console.log(fundraisers);
        setData(fundraisers);
      };
      getData();
    }

    // getData()
  }, [query.get("filter")]);

  

  if (!data) {
    return (
      <div className="text-2xl font-bold flex flex-row justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-row flex-wrap gap-10">
      {data?.map((fundraiser, index) => (
        // <Link href={`/fundraiser/${fundraiser.id}`} key={index}>
        
          <CardItem
            key={index}
            title={fundraiser.title}
            description={fundraiser.description}
            username={fundraiser.users?.full_name}
            content={fundraiser.content}
            amountRaised={fundraiser.amount}
            button
            targetAmount={fundraiser.target}
            id={fundraiser.id}
            link
          />
        
      ))}
    </div>
  );
};

export default ExplorePage;
