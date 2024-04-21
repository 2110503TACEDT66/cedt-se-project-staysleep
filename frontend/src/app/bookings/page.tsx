import { getServerSession } from "next-auth";
import getUserProfile from "@/libs/getUserProfile";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BookingForm from "@/components/BookingForm";

export default async function Bookings(){

    const session = await getServerSession(authOptions)
    if(!session || !session.user.token) return null
    const profile = await getUserProfile(session.user.token)
    
    return (
        <main className="w-[100%] flex flex-col items-center space-y-4 text-black">
            <div className="text-xl font-medium m-5">
                New Reservations 
            </div>
            <div className="bg-slate-100 rounded-lg space-y-5 w-fit px-10 py-5 flex flex-col items-center">
                <BookingForm userId={profile.data.id} token={session.user?.token}/>
            </div>
        </main>
    )
}