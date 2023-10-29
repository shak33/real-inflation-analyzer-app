import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'

const inter = Nunito({ subsets: ['latin'] })

import ReactQueryProvider from '../providers/ReactQueryProvider';

import { Navbar } from '@/components/Navbar';
import { Toaster } from "@/components/ui/toaster"

import { getCurrentUser } from '@/actions/users/getCurrentUser';

import { RegisterModal } from '@/components/modals/RegisterModal';
import { LoginModal } from '@/components/modals/LoginModal';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const response = await getCurrentUser();

  return (
    <ReactQueryProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar
            currentUser={response?.data}
          />
          <div className="flex flex-row flex-wrap w-full m-auto max-w-[1168px] p-8">
            {children}
          </div>
          <RegisterModal />
          <LoginModal />
          <Toaster />
        </body>
      </html>
    </ReactQueryProvider>
  )
}
