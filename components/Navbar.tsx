import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { PiCubeFocusDuotone } from "react-icons/pi";
import { getSession } from "@/lib/supabase-server";

const Navbar = async () => {
  const session = await getSession();
  const user = session?.user;

  return (
    <div>
      <div className="fixed w-full h-12 border-b-[1px] border-gray-500 bg-white z-50 top-0 overflow-hidden">
        <div className="container  flex justify-between items-center h-full">
          <Link href={"/"}>
            <div className="text-xl font-bold flex items-center cursor-pointer">
              <div className="rounded-md bg-slate-400 p-1 mr-2">
                <PiCubeFocusDuotone color="white" size="1.5rem" />
              </div>
              <div>Fundraiser</div>
            </div>
          </Link>
          <div className="flex space-x-4 items-center">
            <div>
              <Link href={"/explore"}>Explore</Link>
            </div>
            {user ? (
              <div>
                <Link href={"/dashboard/analytics"}>Dashboard</Link>
              </div>
            ) : (
              <div>
                <Button
                  variant={"outline"}
                  className="hover:bg-slate-900 hover:text-white border-[1px] border-slate-900 h-8"
                >
                  <Link href={"/auth"}>Sign in</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
