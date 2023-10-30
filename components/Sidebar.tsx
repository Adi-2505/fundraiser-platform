
'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'



const Sidebar = () => {

  const path = usePathname();

  return (
    <div className='w-[270px] bg-white border-r-[1px] border-black h-[1000px]'>

      {
        path.startsWith('/dashboard') ? (
          <div className='p-8 flex flex-col space-y-5'>

            <Link href={'/dashboard/analytics'}>
              Manage Fundraisers
            </Link>


            <Link href={'/dashboard/profile'}>Profile</Link>


            <Link href={'/dashboard/create'}>Start Fundraiser</Link>

          </div>
        ) : (
          <div className='p-8 flex flex-col space-y-5'>
            Catagories
          </div>
        )
      }

    </div>
  )
}

export default Sidebar