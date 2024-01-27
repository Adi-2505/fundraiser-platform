import React from 'react'

import { getSession } from '@/lib/supabase-server'


const ManageFundraiserLayout = async ({children, params}:{children: React.ReactNode, params: {id: string}}) => {

  const session = await getSession()
  // console.log(params)

  if (!session) {
    return (
      <div>
        <h1>Unauthorized access</h1>
      </div>
    );
  }

  return (
    <div>{children}</div>
  )
}

export default ManageFundraiserLayout