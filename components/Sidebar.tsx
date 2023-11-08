
'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import qs from 'query-string'

import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

const Sidebar = () => {

  const path = usePathname();

  const router = useRouter();

  const handleFilter = (filterValue: string) => {
    const url = qs.stringifyUrl({
      url: '/explore',
      query: {
        filter: filterValue
      }
    })

    router.push(url)
  }





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
            <Button onClick={()=>handleFilter('health')}>Health</Button>
            <Button onClick={()=>handleFilter('NGO')}>NGO</Button>
            <Button onClick={()=>handleFilter('personal')}>Personal</Button>
          </div>
        )
      }

    </div>
  )
}

export default Sidebar