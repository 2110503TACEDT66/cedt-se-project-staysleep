"use client"
import { useState } from 'react';
import addBooking from '@/libs/addBooking';
import { useSearchParams } from 'next/navigation'
import { redirect } from 'next/navigation';

export default function BookingForm({ userId, token }: { userId: string, token: string }) {
    const urlParams = useSearchParams();
    const hid = urlParams.get("hid") || '';
    const rid = urlParams.get("rid") || '';
    const hotelName = urlParams.get("hotelName");
    const roomNumber = urlParams.get("roomNumber");

    const today = new Date().toISOString().substr(0, 10);
    const [bookingStart, setBookingStart] = useState(today);
    const [bookingEnd, setBookingEnd] = useState(today);
    const bookingEndMax = new Date(new Date(bookingStart).getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().substr(0, 10);

    const addBookingVal = async () => {
        if (bookingEnd < bookingStart) {
            alert("Booking end date cannot be before booking start date");
            return;
        }
        const res = await addBooking(userId, bookingStart, bookingEnd, hid, rid, token);
        console.log(res);
        if (!res.success) {
            alert(res.message);
            return;
        }
        window.location.href = "/bookings/manage"
    };

    return (
        <form action={addBookingVal} className="w-full max-w-md mx-auto">
            <table className="table-auto border-separate border-spacing-2 w-full">
                <tbody>
                    <tr>
                        <td className="font-semibold">Hotel:</td>
                        <td>{hotelName}</td>
                    </tr>
                    <tr>
                        <td className="font-semibold">Room:</td>
                        <td>{roomNumber}</td>
                    </tr>
                    <tr>
                        <td className="font-semibold">Booking Starts:</td>
                        <td>
                            <input type="date" required name="bookingStart" id="bookingStart" min={today} value={bookingStart} onChange={(event) => setBookingStart(event.target.value)} className="w-full border rounded p-2" />
                        </td>
                    </tr>
                    <tr>
                        <td className="font-semibold">Booking Ends:</td>
                        <td>
                            <input type="date" required name="bookingEnd" id="bookingEnd" value={bookingEnd} min={bookingStart} max={bookingEndMax} onChange={(event) => setBookingEnd(event.target.value)} className="w-full border rounded p-2" />
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="w-full flex justify-center items-center mt-4">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">Book</button>
            </div>
        </form>
    );
}
