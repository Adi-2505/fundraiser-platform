"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import CardItem from "@/components/Cards/CardItem";

// import { getFundraisers } from "@/lib/supabase-server";
import { useSupabase } from "@/providers/supabase-provider";

// import { FundraisersRow } from "@/types/database.types";


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
  slug: string;
  image_url: string | null;
  users: {
    full_name: string | null;
    avatar_url: string | null;
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
        const { data: fundraisers, error } = await supabase
          .from("fundraisers")
          .select(`*,
            users (
              full_name,
              avatar_url
            )
          
          `)
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
              full_name,
              avatar_url
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
            username={fundraiser.users?.full_name}
            amountRaised={fundraiser.amount}
            button
            targetAmount={fundraiser.target}
            id={fundraiser.id}
            link
            slug={fundraiser.slug}
            avatarUrl={fundraiser.users?.avatar_url!}
            fundraiserImageUrl={fundraiser.image_url!}
          />
        
      ))}
    </div>
  );
};

export default ExplorePage;
