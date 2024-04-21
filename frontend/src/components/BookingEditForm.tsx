"use client"
import { useState } from 'react';
import updateBooking from '@/libs/updateBooking';
import { redirect } from 'next/navigation';
import { BookingDetail } from '@/interface';

export default function BookingEditForm({token, bookingDetail, bid}:{token:string, bookingDetail:BookingDetail, bid:string}){
    const today = new Date().toISOString().substr(0, 10);
    const startDate = bookingDetail.data.bookingbegin.substr(0, 10);
    const endDate = bookingDetail.data.bookingend.substr(0, 10);
    const [bookingStart, setBookingStart] = useState(startDate);
    const [bookingEnd, setBookingEnd] = useState(endDate);
    const [bookingId, setBookingId] = useState(bid);
    const bookingEndMax = new Date(new Date(bookingStart).getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().substr(0, 10);
    const addBookingVal = async () => {
        //console.log(token)
        if(bookingEnd < bookingStart){
            alert("Booking end date cannot be before booking start date")
            return
        }
        const res = await updateBooking(bid, bookingStart, bookingEnd, token)
        console.log(res)
        if(!res.success){
            alert(res.message)
            return
        }
        window.location.href = "/bookings/manage"
        //alert(res)
    }

    return(
        <form action={addBookingVal} className="w-full max-w-md mx-auto">
                    <table className="table-auto border-separate border-spacing-2 w-full">
                        <tbody>
                            <tr>
                                <td className="font-semibold">Hotel: </td>
                                <td>{bookingDetail.data.hotel.name}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold">Room: </td>
                                <td>{bookingDetail.data.room.roomNumber}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold">Booking Starts: </td>
                                <td><input type="date" required name="bookingStart" id="bookingStart" min={today} value={bookingStart} onChange={(event)=>{setBookingStart(event.target.value)}} className='w-full'></input></td>
                            </tr>
                            <tr>
                                <td className="font-semibold">Booking Ends: </td>
                                <td><input type="date" required name="bookingEnd" id="bookingEnd" min={bookingStart} max={bookingEndMax} value={bookingEnd} onChange={(event)=>{setBookingEnd(event.target.value)}} className='w-full'></input></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="w-full flex justify-center items-center mt-4">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">Save</button>
                    </div>
        </form>
    )
}