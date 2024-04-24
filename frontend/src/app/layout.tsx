import './globals.css'
import '../styles/slider.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import TopMenu from '@/components/TopMenu'
import { getServerSession } from 'next-auth'
import { AuthOptions } from 'next-auth'
import NextAuthProvider from '@/providers/NextAuthProvider'
import { authOptions } from './api/auth/[...nextauth]/route'
import Head from 'next/head'
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
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </Head>
      <body className={inter.className}>
        <NextAuthProvider session={session}>
          <TopMenu />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
