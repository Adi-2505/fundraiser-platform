'use client'
import React from 'react'
import { Button } from "@/components/ui/button";

import {useRouter} from "next/navigation";
import axios from "axios";



export default function Home() {

  const router = useRouter()

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
