import TopMenuItem from './TopMenuItem';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Link from 'next/link';
import UserDropDown from './UserDropDown';

export default async function TopMenu() {
  const session = await getServerSession(authOptions)

  return (
    <div className="max-w-[100vw] w-full h-[6rem] bg-gradient-to-b from-[rgba(20,20,23,0.8)] to-[rgba(20,20,23,0)] fixed top-0 left-0 z-30 flex items-start justify-between">
      <div className="w-full relative flex px-4 py-3 justify-between items-center">
        <Link href="/" className='flex items-center'>
          <Image src="/img/logo.jpg" className="!h-[4.4rem] !w-fit mr-4 !relative rounded-full" alt="logo" fill style={{ objectFit: "contain" }} />
          <div className="text-white text-lg tracking-[0.35em] font-bold">STAYSLEEP</div>
        </Link>

        <div className="flex gap-3">
          <TopMenuItem title="Home" pageRef="/" active />
          <TopMenuItem title="Hotels" pageRef="/hotel" />
          <TopMenuItem title="Booking" pageRef="/bookings/manage" />
          <TopMenuItem title="About" pageRef="#" />
        </div>
        <div className="flex items-center gap-3">
          {session?.user ? (
            <UserDropDown session={session} />
          ) : (
            <>
              <Link href="/auth/signin">
                <div className="px-4 py-2 text-nowrap bg-secondary rounded-lg flex items-center font-bold text-primary hover:bg-black border border-primaryWhite hover:border-none">
                  Sign-In
                </div>
              </Link>
              <Link href="/auth/register">
                <div className="px-4 py-2 hover:bg-black/30 rounded-md text-nowrap flex items-center font-bold text-primaryWhite">
                  Register
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}