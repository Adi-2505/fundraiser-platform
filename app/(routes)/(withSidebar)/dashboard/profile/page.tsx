
'use client'

import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { useSupabase } from '@/providers/supabase-provider'
import { useSupabaseSession } from '@/providers/supabase-session-provider'


import { Button } from '@/components/ui/button'
import { User } from '@supabase/supabase-js'


const ProfilePage = () => {

  const [userData, setUserData] = useState<User>()

  const { supabase } = useSupabase()
  const router = useRouter()

  const onClick = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  const session = useSupabaseSession()

  useEffect(() => {
    if (session) {
      // console.log(session);
      setUserData(session.user ?? undefined);
    }
  }, [session]);

  if(!userData){
    return <div>Loading...</div>
  }
 

  return (
    <div>
      <div>Email: {userData.email}</div>
      <div>Name: {userData.user_metadata.full_name}</div>
      <div>
        <Image src={userData.user_metadata.avatar_url} alt="photo" width={50} height={50}/>
      </div>
      <Button variant={'destructive'} onClick={onClick}>Log Out</Button>
    </div>
  )
}

export default ProfilePage