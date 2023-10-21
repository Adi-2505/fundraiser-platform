'use client'

import React, { useState } from 'react'
import axios from 'axios'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'



import { FcGoogle } from 'react-icons/fc'


import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

import { Database } from '@/lib/database.types'




const Auth = () => {

  const router = useRouter()
  const supabase = createClientComponentClient<Database>()

  

  const handleSignIn = async () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
    })
    
    router.refresh()
  }
  

  return (

    <div >
      <div>
        <Card className="w-[350px] shadow-lg">
          <CardHeader className='text-center'>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>Sign in with google account to start creating Fundraisers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='text-center my-5'>
              <Label htmlFor="">Sign in with google</Label>
            </div>
            <div className='mb-5'>
              <Button className='w-full border-slate-300 hover:shadow-md shadow-sm' variant={'outline'}
                onClick={handleSignIn}
              >
                <FcGoogle size={25} />

              </Button>
            </div>
            <Separator className='bg-black mb-5' />
            <CardFooter className='text-sm'>
              Already have an account?
              <div className='mx-3'>
                <span className='hover:underline hover:cursor-pointer text-blue-500'>
                  Log in
                </span>

              </div>

            </CardFooter>
          </CardContent>

        </Card>

      </div>

    </div>
  )
}

export default Auth