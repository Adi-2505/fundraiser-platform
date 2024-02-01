"use client";
import React from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";

import qs from "query-string";

import { Checkbox } from "./ui/checkbox";
import { GanttChartSquare, PackagePlus, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
	const categories = [
		"health",
		"education",
		"sports",
		"animals",
		"environment",
		// Add more categories as needed
	];

	const dashboardLinks = [
		{
			name: "Manage Fundraisers",
			link: "/dashboard/myfundraisers",
			icon: <GanttChartSquare size="1.5rem" />,
		},
		{
			name: "Profile",
			link: "/dashboard/profile",
			icon: <UserCircle size="1.5rem" />,
		},
		{
			name: "Start Fundraiser",
			link: "/dashboard/create",
			icon: <PackagePlus size="1.5rem" />,
		},
	];

	const path = usePathname();

	const router = useRouter();

	const [filters, setFilters] = React.useState<string[]>([]);

	// function for handling filter
	const handleFilter = (category: string) => {
		let updatedFilters: string[] = [];
		if (filters.includes(category)) {
			updatedFilters = filters.filter((item) => item !== category);
		} else {
			updatedFilters = [...filters, category];
		}

		setFilters(updatedFilters);

		const query = qs.stringify({ categories: updatedFilters });

		router.push(`/explore${query.length ? `?${query}` : ""}`);
	};

	return (
		<div className="w-[270px] bg-white h-[1000px] ">
			{path.startsWith("/dashboard") ? (
				<>
					<div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform flex flex-col  ">
						<div className="flex justify-between items-center px-4 py-3 border-b-[2px]">
							<h2 className="text-lg font-semibold">Actions</h2>
						</div>
						<div className="mt-10 flex flex-col">
							{dashboardLinks.map((item, index) => (
								<Link href={item.link} key={index}>
									<div
										className={cn(
											"flex flex-row items-center gap-2 cursor-pointer hover:bg-slate-300 p-3 w-full border-b-[1px] border-t-[1px] border-gray-200 transition-colors",
											path === item.link ? "bg-slate-300" : ""
										)}
									>
										{item.icon}
										<div>{item.name}</div>
									</div>
								</Link>
							))}
						</div>
					</div>
				</>
			) : (
				<div
					className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform `}
				>
					<div className="flex justify-between items-center px-4 py-3 border-b-[2px]">
						<h2 className="text-lg font-semibold">Categories</h2>
					</div>
					<div className="p-4">
						<ul>
							{categories.map((category, index) => (
								<li key={index} className={`py-2 cursor-pointer`}>
									<div className="flex flex-row items-center gap-2">
										<Checkbox onCheckedChange={() => handleFilter(category)} />
										<div>{category}</div>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
			)}
		</div>
	);
};

export default Sidebar;
