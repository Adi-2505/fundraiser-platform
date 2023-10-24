import React from 'react'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'


const layout = async ({children}: {children: React.ReactNode}) => {

  const supabase = createServerComponentClient({cookies})

  const {data : {session}} = await supabase.auth.getSession()

  if (!session) {
    redirect('/auth')
  }

  return (
    <div>

      {children}
    </div>
  )
}

export default layout