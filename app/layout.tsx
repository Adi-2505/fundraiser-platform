

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import SupabaseProvider from '../providers/supabase-provider'
import SupabaseSessionProvider from '@/providers/supabase-session-provider'

import DonateModel from '@/providers/donate-modal-provider'
import ShareModal from '@/providers/share-modal-provider'
import LoginModal from '@/providers/login-modal-provider'

import { Toaster } from '@/components/ui/toaster'


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
          <SupabaseSessionProvider>
            <Navbar />
            <div>
              <DonateModel />
              <ShareModal />
              <LoginModal />
              {children}
              <Toaster />
            </div>
          </SupabaseSessionProvider>
        </SupabaseProvider>

      </body>
    </html>
  )
}