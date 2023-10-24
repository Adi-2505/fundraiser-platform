

import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { PiCubeFocusDuotone } from "react-icons/pi";

import { cookies } from "next/headers";

const Navbar = async () => {


  

  const supabase = createServerComponentClient({cookies});

  const {data : {session}} = await  supabase.auth.getSession()
  

  return (
    <div>
      <div className="fixed top-0 w-full h-12 border-b-[1px] border-gray-500">
        <div className="container  flex justify-between items-center h-full">
          <div className="text-xl font-bold flex items-center cursor-pointer">
            <div className="rounded-md bg-slate-400 p-1 mr-2">
              <PiCubeFocusDuotone color="white" size="1.5rem" />
            </div>
            <div>Fundraiser</div>
          </div>
          <div className="flex space-x-4 items-center">
            <div>
              <Link href={"/"}>Home</Link>
            </div>
            <div>
              <Link href={"/dashboard"}>Dashboard</Link>
            </div>

            {/* if session then profile else signin */}
            {session ? (
              <div>
                <Link href={"/profile"}>Profile</Link>
              </div>
            ) : (
              <div>
                <Button variant={"outline"} className="hover:bg-slate-900 hover:text-white border-[1px] border-slate-900 h-8">
                  <Link href={"/auth"}>Sign in</Link>
                </Button>
              </div>
            )}
            {/* <div><Link href={'/profile'}>Profile</Link></div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
