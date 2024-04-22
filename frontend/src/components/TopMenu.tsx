import TopMenuItem from './TopMenuItem';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Link from 'next/link';
import User from '@/db/model/User';

export default async function TopMenu() {
  const session = await getServerSession(authOptions)
  //console.log(session);
  return (
    <div className="fixed top-0 left-0 right-0 z-30 border-b border-gray-300 flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/img/logo.jpg"
            className="h-12 w-auto mr-4"
            alt="logo"
            width={0}
            height={0}
            sizes="100vh"
          />
        </Link>
        <div className='text-black font-medium'>StaySleep</div>
      </div>
      
      <div className="flex items-center space-x-4">
        <TopMenuItem title="Select Hotel" pageRef="/hotel" />
        <TopMenuItem title="Booking" pageRef="/bookings/manage" />
      </div>

      <div className="flex items-center w-30 font-thin font-sans text-md text-black">
        
        {session && session.user ? (
          <Link href="/api/auth/signout">
            <button className="hover:text-amber-500 mx-5">Sign-Out</button>
          </Link>
        ) : (
          <Link href="/api/auth/signin">
            <button className="hover:text-amber-500">Sign-in</button>
          </Link>
        )}

        {session ? "" : (
          <Link href="/register">
            <button className="hover:text-amber-500 mx-5">Register</button>
          </Link>
        )}  
      </div>
    </div>
  );
}
