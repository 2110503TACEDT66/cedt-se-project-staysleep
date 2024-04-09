import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import TopMenu from '@/components/TopMenu'
import { getServerSession } from 'next-auth'
import { AuthOptions } from 'next-auth'
import NextAuthProvider from '@/providers/NextAuthProvider'
import { authOptions } from './api/auth/[...nextauth]/route'
// import ReduxProvider from '@/redux/ReduxProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hotel Service Center',
  description: 'Booking Hotel With Us',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <ReduxProvider> */}
        <NextAuthProvider session={session}> 
        <TopMenu/>
        {children}
        </NextAuthProvider>
        {/* </ReduxProvider> */}
      </body>
    </html>
  )
}
