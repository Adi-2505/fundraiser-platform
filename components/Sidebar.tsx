"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import qs from "query-string";

import { useRouter } from "next/navigation";
import { Checkbox } from "./ui/checkbox";
import { GanttChartSquare, PackagePlus, UserCircle } from "lucide-react";

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
      link: "/dashboard/analytics",
      icon: <GanttChartSquare size="1.5rem" />,
    },
    {
      name: "Profile",
      link: "/dashboard/profile",
      icon: <UserCircle size='1.5rem'/>,
    },
    {
      name: "Start Fundraiser",
      link: "/dashboard/create",
      icon: <PackagePlus size='1.5rem'/>,
    },
  ];

  const path = usePathname();

  const router = useRouter();

  const [selectedFilters, setSelectedFilters] = React.useState<string[]>([]);

  const handleFilter = (filterValue: string) => {
    let updatedFilters: string[] = [];

    if (filterValue !== 'clear') {
      // If the filterValue is not 'clear', toggle its selection in the array
      if (selectedFilters.includes(filterValue)) {
        // Remove the filter value if already selected
        updatedFilters = selectedFilters.filter((value) => value !== filterValue);
      } else {
        // Add the filter value if not selected
        updatedFilters = [...selectedFilters, filterValue];
      }
    } else {
      // If the filterValue is 'clear', reset the selectedFilters array
      updatedFilters = [];
    }

    const query = updatedFilters.length > 0 ? { filter: updatedFilters.join(',') } : {};
    const url = qs.stringifyUrl({
      url: '/explore',
      query,
    });

    router.push(url);
    setSelectedFilters(updatedFilters);
  };

  return (
    <div className="w-[270px] bg-white h-[1000px] ">
      {path.startsWith("/dashboard") ? (
        <>
          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform flex flex-col  ">
            <div className="flex justify-between items-center px-4 py-3 border-b-[2px]">
              <h2 className="text-lg font-semibold">Actions</h2>
            </div>
            <div className="p-5 mt-10 flex flex-col gap-4">
              {dashboardLinks.map((item, index) => (
                <Link href={item.link} key={index}>
                  <div className="flex flex-row items-center gap-2 cursor-pointer bg-slate-300 rounded-md hover:bg-slate-500 p-3">
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
                    <Checkbox onChange={() => handleFilter(category)}/>
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
