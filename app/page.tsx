import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { FaArrowRight } from "react-icons/fa6";

const LandingPage = () => {
	return (
		<div className="mt-24 w-full flex flex-row justify-center">
			<div className="text-3xl">
				Explore, create and donat to the causes you care about
				<div className="w-full flex flex-row items-center justify-center">
					<Link href="/explore">
						<Button className="mt-4 gap-2">
							Explore
							<div >
								<FaArrowRight />
							</div>
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
