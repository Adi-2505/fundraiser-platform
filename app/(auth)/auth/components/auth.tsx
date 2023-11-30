'use client'

import React from 'react'



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

import { FcGoogle } from 'react-icons/fc'

import { useSupabase } from '@/providers/supabase-provider'


const Auth = () => {

  const { supabase } = useSupabase()

  const onClick = async () => {
    try{

      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options:{
          redirectTo : 'https://fundraiser-platform.vercel.app' + "/api/auth/callback" 
        }
      })
      // console.log(data)
    }catch(error){
      console.log(error)
    }
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
                onClick={onClick}
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