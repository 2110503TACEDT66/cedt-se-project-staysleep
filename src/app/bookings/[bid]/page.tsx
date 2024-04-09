import { getServerSession } from "next-auth";
import getUserProfile from "@/libs/getUserProfile";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BookingEditForm from "@/components/BookingEditForm";
import getBooking from "@/libs/getBooking";

export default async function BookingDetailPage({params} : { params: {bid: string}}){

    const session = await getServerSession(authOptions)
    if(!session || !session.user.token) return null
    const profile = await getUserProfile(session.user.token)

    const bookingDetail = await getBooking(params.bid, session.user.token)
    
    return (
        <main className="w-[100%] flex flex-col items-center space-y-4 text-black">
            <div className="text-xl font-medium m-5">
                Edit Booking
            </div>
            <div className="bg-slate-100 rounded-lg space-y-5 w-fit px-10 py-5 flex flex-col items-center">
                <BookingEditForm token={session.user?.token} bookingDetail={bookingDetail} bid={params.bid}/>
            </div>
        </main>
    )
}