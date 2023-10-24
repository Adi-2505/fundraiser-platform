'use client'
import React from 'react'
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import axios from "axios";

import Sidebar from "@/components/Sidebar";
import CardItem from "@/components/Cards/CardItem";

export default function Home() {

  const router = useRouter()

  // Sign out logic
  const handleSignOut = async () => {
    await axios.post('/api/auth/signout')
    router.refresh()
  }

  const cards = [1,2,3,4,5,6,7,8,9,10]

  return ( // (AUTH not required)
    <>
    <div className='flex flex-row'>
      
      <div className='fixed overflow-hidden z-40 left-0'>
        <Sidebar />
      </div>
      <div className='ml-72'>
        <div className='grid grid-cols-6 gap-6 p-3'>
          {cards.map((card) => (
            <CardItem title={`Card ${card}`} />
          ))}
        </div>
      </div>
    </div>
    </>
  )
}
