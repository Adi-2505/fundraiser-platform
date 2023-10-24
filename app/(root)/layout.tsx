



import Navbar from '@/components/Navbar'





export default function homeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <>
      <Navbar />
      <div className='top-12 relative'>

        {children}
      </div>
    </>

  )
}
