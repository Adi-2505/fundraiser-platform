

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import SupabaseProvider from '../provider/supabase-provider'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fundraiser App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {



  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseProvider>

          <Navbar />
          <div>

            {children}
          </div>
        </SupabaseProvider>

      </body>
    </html>
  )
}