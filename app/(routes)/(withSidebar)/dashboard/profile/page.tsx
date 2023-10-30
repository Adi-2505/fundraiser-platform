
'use client'

import React from 'react'




import { Button } from '@/components/ui/button'
import { useSupabase } from '@/provider/supabase-provider'


const ProfilePage = () => {

  const { supabase } = useSupabase()

  const onClick = async () => {
    try {

      const { error } = await supabase.auth.signOut()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      Profile page
      <Button variant={'destructive'} onClick={onClick}>Log Out</Button>
    </div>
  )
}

export default ProfilePage