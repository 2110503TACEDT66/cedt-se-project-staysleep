"use client"
import deleteBooking from '@/libs/deleteBooking';
import { redirect } from 'next/navigation';
import { BookingDetail } from '@/interface';

export default function BookingDelete({token, bookingDetail, bid}:{token:string, bookingDetail:BookingDetail, bid:string}){
    const addBookingVal = async () => {
        const res = await deleteBooking(bid,token)
        console.log(res)
        if(!res.success){
            alert(res.message)
            return
        }
        window.location.href = "/bookings/manage"
        //alert(res)
    }

    return(
        <form action={addBookingVal}>
                    <table className="table-auto border-seperate border-spacing-2">
                        <tbody>
                            <tr>
                                <td>Hotel: </td>
                                <td>{bookingDetail.data.hotel.name}</td>
                            </tr>
                            <tr>
                                <td>Room: </td>
                                <td>{bookingDetail.data.room.roomNumber}</td>
                            </tr>
                            <tr>
                                <td>Booking Starts: </td>
                                <td>{bookingDetail.data.bookingbegin.substr(0, 10)}</td>
                            </tr>
                            <tr>
                                <td>Booking Ends: </td>
                                <td>{bookingDetail.data.bookingend.substr(0, 10)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='w-full flex justify-center items-center p-2'>
                        <button type="submit" className="bg-red-500 hover:bg-red-700 text-white p-2 rounded">Delete</button>
                    </div>
                </form>
    )
}