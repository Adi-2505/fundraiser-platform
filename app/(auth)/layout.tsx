import { redirect } from "next/navigation"

import { getSession } from "@/lib/supabase-server"



export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getSession()

  if(session){
    return redirect('/dashboard/analytics')
  }

  return (
    <div className="h-screen w-full flex items-center justify-center" >
      {children}
    </div>
    
  )
}