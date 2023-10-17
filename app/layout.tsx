import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

import ReactQueryProvider from '../providers/ReactQueryProvider'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ReactQueryProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="flex w-full m-auto max-w-[768px]">
            {children}
          </div>
        </body>
      </html>
    </ReactQueryProvider>
  )
}
