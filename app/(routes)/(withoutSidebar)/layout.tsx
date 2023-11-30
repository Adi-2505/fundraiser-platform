import React from 'react' 
import { redirect } from 'next/navigation'

import { getSession } from '@/lib/supabase-server'


const layout = async ({ children }: { children: React.ReactNode }) => {


  const session = await getSession()

  if(!session){
    return redirect('/auth')
  }


  return (
    <div className='mx-60 mt-16'>
      {children}
    </div>
  )
}

export default layout