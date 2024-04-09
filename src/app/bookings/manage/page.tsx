import { getServerSession } from "next-auth";
import getBookings from "@/libs/getBookings";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { BookingItem } from "@/interface";
import Link from 'next/link'

export default async function MyBooking(){
    const session = await getServerSession(authOptions)
    if(!session || !session.user.token) return null

    const bookings = await getBookings(session.user.token)

    return(
        <div className="container mx-auto px-4 py-8 text-black">
            {
                bookings.data.length === 0 ? (
                    <div className="text-2xl text-center my-5">No bookings</div>
                ) : (
                    bookings.data.map((bookingItem: BookingItem) => (
                        <div className="bg-gray-100 rounded-lg p-4 my-4" key={bookingItem._id}> 
                            <div className="text-xl font-semibold mb-2">Name: {bookingItem.user?.name}</div>
                            <div className="text-sm mb-2">Hotel: {bookingItem.hotel?.name}</div>
                            <div className="text-sm mb-2">Room: {bookingItem.room?.roomNumber}</div>
                            <div className="text-sm mb-2">Begin: {new Date(bookingItem.bookingbegin).toLocaleDateString()}</div>
                            <div className="text-sm mb-4">End: {new Date(bookingItem.bookingend).toLocaleDateString()}</div>
                            <div className="flex flex-row space-x-2">
                                <Link href={`/bookings/${bookingItem._id}`}>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
                                </Link>
                                <Link href={`/bookings/${bookingItem._id}/delete`}>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                                </Link>
                            </div>
                        </div>
                    ))
                )
            }
        </div>
    )
}
