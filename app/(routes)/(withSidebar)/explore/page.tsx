"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import CardItem from "@/components/Cards/CardItem";

// import { getFundraisers } from "@/lib/supabase-server";
import { useSupabase } from "@/providers/supabase-provider";

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
	donors: Number;
	users: {
		full_name: string | null;
		avatar_url: string | null;
	} | null;
};

const ExplorePage = () => {
	// const data = await getFundraisers();
	const [data, setData] = useState<fundraiserTypes[] | null>();
	const [page, setPage] = useState<number>(1);
	const [isLoading, setIsLoading] = useState(false);

	const { supabase } = useSupabase();
	// const router = useRouter();
	const params = useSearchParams();

	const getData = async (page: number) => {
		let query = supabase
			.from("fundraisers")
			.select(
				`
      *,
      users (
        full_name,
        avatar_url
      )
    `
			)
			.filter("status", "eq", "active")
			.range((page - 1) * 6, page * 6 - 1);

		if (params.getAll("categories").length > 0) {
			query = query.in("category", params.getAll("categories"));
		}

		if (params.getAll("search").length > 0) {
			query = query.eq("users.full_name", params.getAll("search"));
		}

		const { data: fundraisers } = await query;

		return fundraisers;
	};

	const fetchMoreData = async () => {
		setIsLoading(true);
		const nextPage = page + 1;
		try {
			const newFundraisers = await getData(nextPage);
			setData([...data!, ...newFundraisers!]);
			setPage(nextPage);
		} catch (error) {
			console.log("FETCH_MORE_DATA: ", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getData(1).then((initialFundraisers) => {
			setData(initialFundraisers);
		});
	}, [params]);

	useEffect(() => {
		const handleScroll = () => {
			const { scrollTop, clientHeight, scrollHeight } =
				document.documentElement;
			if (scrollTop + clientHeight >= scrollHeight - 5 && !isLoading) {
				fetchMoreData();
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [data]);

	if (!data) {
		return (
			<div className="text-2xl font-bold flex flex-row justify-center items-center h-screen">
				Loading...
			</div>
		);
	}

	return (
		<div className="flex flex-row flex-wrap gap-10">
			{isLoading && (
				<div className="text-2xl font-bold flex flex-row justify-center items-center h-screen">
					Loading...
				</div>
			)}
			{data?.map(
				(fundraiser, index) =>
					// <Link href={`/fundraiser/${fundraiser.id}`} key={index}>
					fundraiser.users && (
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
							contributors={fundraiser.donors}
						/>
					)
			)}
		</div>
	);
};

export default ExplorePage;
