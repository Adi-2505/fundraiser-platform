"use client";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import Image from "next/image";

import { useSupabase } from "@/providers/supabase-provider";
import { useSupabaseSession } from "@/providers/supabase-session-provider";

import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";

const ProfilePage = () => {
	const [userData, setUserData] = useState<User>();

	const [fundraisersCount, setFundraisersCount] = useState<Number | null>(0);

	const { supabase } = useSupabase();
	const router = useRouter();

	const onClick = async () => {
		try {
			const { error } = await supabase.auth.signOut();
			router.refresh();
		} catch (error) {
			console.log(error);
		}
	};

	const session = useSupabaseSession();

	useEffect(() => {
		if (session) {
			// console.log(session);
			setUserData(session.user ?? undefined);
			// console.log(session.user);
			const getData = async () => {
				const { data, count } = await supabase
					.from("fundraisers")
					.select("*", {count: 'exact', head: true})
					.eq("user", session.user?.id);
          console.log(data);
          setFundraisersCount(count);
			};
      getData();
		}
	}, [session]);

	if (!userData) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<div className="p-16">
				<div className="p-8 bg-white shadow mt-24">
					<div className="grid grid-cols-1 md:grid-cols-3">
						<div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
							<div>
								<p className="font-bold text-gray-700 text-xl">{fundraisersCount?.toString()}</p>
								<p className="text-gray-400">Fundraiseres</p>
							</div>
						</div>
						<div className="relative">
							<div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
								<Image
									src={userData.user_metadata.avatar_url}
									alt="photo"
									width={200}
									height={200}
									className="rounded-full"
								/>
							</div>
						</div>
					</div>
					<div className="mt-20 text-center border-b pb-12">
						<h1 className="text-4xl font-medium text-gray-700">
							{userData.user_metadata.full_name}
						</h1>
						<p className="mt-2">{userData.email}</p>
					</div>
					<div className="mt-12 flex flex-row justify-center w-full">
						<Button variant={"destructive"} onClick={onClick} className="w-32">
							Log out
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
