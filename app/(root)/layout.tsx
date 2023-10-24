
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'


export default function homeLayout({
  children,
}: {
  children: React.ReactNode
}) {

 
  
  return (
    <>
      <Navbar />
      
      <div className='flex flex-row mt-12'>
        {/* Side bar */}
        
        <div>
          {children}
        </div>
      </div>
    </>

  )
}
