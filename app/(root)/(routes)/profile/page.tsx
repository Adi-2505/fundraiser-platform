'use client'
import React, {useEffect, useState} from 'react'

import { Session, User, createClientComponentClient } from '@supabase/auth-helpers-nextjs'







const Profile = () => {

  const supabase = createClientComponentClient()

  const [user, setUser] = useState<User | null>()

  useEffect(() => {
    const getUser = async () => { 
      const {data : {user}} = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  

  return (
    <div>

      {user?.email}
    </div>
  )
}

export default Profile