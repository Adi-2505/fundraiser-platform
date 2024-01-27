

import React from "react";
import Link from "next/link";

import { getSession } from "@/lib/supabase-server";

import SidebarToggleButton from "./SidebarToggleButton";

import { Button } from "@/components/ui/button";
import { Sprout } from "lucide-react";





const Navbar = async () => {
  
  const session = await getSession();
  const user = session?.user;
 

  return (
    <div>
      <div className="fixed w-full h-12 border-b-[1px] border-gray-500 bg-white z-50 top-0 overflow-hidden">
        <div className="container  flex justify-between items-center h-full">
          <div className="flex flex-row gap-2 justify-center items-center">
          <div className="sm:hidden cursor-pointer" >
            <SidebarToggleButton />
          </div>
          <Link href={"/"}>
            <div className="text-xl font-bold flex items-center cursor-pointer">
              <div className="rounded-md bg-slate-400 p-1 mr-2">
                {/* <PiCubeFocusDuotone color="white" size="1.5rem" /> */}
                <Sprout color="white" size="1.5rem" />
              </div>
              <div>Fundraiser</div>
            </div>
          </Link>
          </div>
          <div className="flex space-x-4 items-center">
            <div>
              <Link href={"/explore"}><Button variant={"ghost"} className="h-6 text-sm bg-slate-300 hover:bg-slate-400">Explore</Button></Link>
            </div>
            {user ? (
              <div>
                <Link href={"/dashboard/myfundraisers"}>
                  <Button variant={"default"} className="h-6 text-sm bg-green-300 text-black hover:bg-green-400">Dashboard</Button>
                </Link>
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
