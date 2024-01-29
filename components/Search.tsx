"use client";

import React from "react";
import {useRouter} from "next/navigation";

const Search = () => {

  const searchRef = React.useRef<HTMLInputElement>(null);

  const router = useRouter();

  const searchFundraisers = () => {
    const searchQuery = searchRef.current?.value;
    if (searchQuery) {
      router.push(`/explore?search=${searchQuery}`);
    }
  };


	return (
		<div>
			<div className="flex items-center">
				<label htmlFor="voice-search" className="sr-only">
					Search
				</label>
				<input
					type="text"
					id="voice-search"
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Search by name"
					required
					ref={searchRef}
				/>
				<button
					type="submit"
					className="inline-flex items-center p-2 ms-2 text-sm font-medium text-white bg-blue-700 rounded-sm border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					onClick={searchFundraisers}
				>
					<svg
						className="w-4 h-4"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 20 20"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default Search;
