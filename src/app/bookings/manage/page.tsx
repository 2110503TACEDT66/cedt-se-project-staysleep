import { getServerSession } from "next-auth";
import getBookings from "@/libs/getBookings";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { BookingItem } from "@/interface";
import Link from 'next/link'
import BookingCard from "@/components/BookingCard";

export default async function MyBooking() {
    const session = await getServerSession(authOptions)
    if (!session || !session.user.token) return null

    const bookings = await getBookings(session.user.token)

    return (
        <div className="container mx-auto px-4 py-8 text-black">
            {
                bookings.data.length === 0 ? (
                    <div className="text-2xl text-center my-5">No bookings</div>
                ) : (
                    bookings.data.map((bookingItem: BookingItem) => (
                        <BookingCard key={bookingItem._id} bookingItem={bookingItem} />
                    ))
                )
            }
        </div>
    )
}
