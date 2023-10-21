'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Database } from "@/lib/database.types";
import { Session, User, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {useRouter} from "next/navigation";
import axios from "axios";
import { useEffect } from "react";


export default function Home() {

  const [user, setUser] = useState<User>()

  const supabase = createClientComponentClient<Database>()

  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      // Fetch the current user from Supabase auth state
      const { data: {session} } = await supabase.auth.getSession();

      

      setUser(session?.user);
      if(session){

        console.log(session.user)
      }else{
        console.log('no session')
      }
    };

    fetchUser();
  }, []);

  const handleSignOut = async () => {
    await axios.post('/api/auth/signout')
    router.refresh()
  }


  return ( // (AUTH not required)
    <>
    This is a landing page
    <div className='text-green-600 text-2xl'>Hello world</div>
    <Button variant={'outline'} onClick={handleSignOut}> Sign out</Button>
    </>
  )
}
