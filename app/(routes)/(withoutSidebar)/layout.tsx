import React from 'react'



const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='mx-72 mt-16'>
      {children}
    </div>
  )
}

export default layout