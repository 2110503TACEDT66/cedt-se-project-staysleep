import TopMenuItem from './TopMenuItem';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Link from 'next/link';
import getUserProfile from '@/libs/getUserProfile';

export default async function TopMenu() {
  const session = await getServerSession(authOptions)
  console.log(session?.user)
  console.log(session); 

  if(session && session?.user ){
    const userProfile = await getUserProfile(session?.user?.token);
    session.user.name = userProfile.data.name;
    
  }

  return (
    <div className="bg-white fixed top-0 left-0 right-0 z-30 border-b border-gray-300 flex items-center justify-between">
      <div className="flex items-center ">
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
        
        {session ? (
          <Link href="/api/auth/signout" className='flex flex-row'>
            <div className = "text-md">{session.user.name}</div>
            <button className="hover:text-amber-500 mx-3 text-black border border-black hover:text-amber-500 hover:shadow-2xl hover:border-amber-500 rounded-full ">‎   ‎ LOGOUT      ‎     ‎</button>
          </Link>
        ) : (
          <Link href="/login" >
            <button className="hover:text-amber-500 " >Login</button>
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
