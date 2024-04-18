import { BookingItem } from "@/interface";
import getReviewByBooking from "@/libs/getReviewByBooking";
import Link from "next/link";

const BookingCard = async ({ bookingItem }: { bookingItem: BookingItem }) => {

  const review = await getReviewByBooking(bookingItem._id);

  return (
    <div className="bg-gray-100 rounded-lg p-4 my-4" key={bookingItem._id}>
      <div className="text-xl font-semibold mb-2">Name: {bookingItem.user?.name}</div>
      <div className="text-sm mb-2">Hotel: {bookingItem.hotel?.name}</div>
      <div className="text-sm mb-2">Room: {bookingItem.room?.roomNumber}</div>
      <div className="text-sm mb-2">Begin: {new Date(bookingItem.bookingbegin).toLocaleDateString()}</div>
      <div className="text-sm mb-4">End: {new Date(bookingItem.bookingend).toLocaleDateString()}</div>
      <div className="flex flex-row space-x-2">
        {
          new Date(bookingItem.bookingend).getTime() < new Date().getTime()
            ?
            <Link href={review ? `/hotel/${bookingItem.hotel._id}#${review._id}` : `/hotel/${bookingItem.hotel._id}/add-review/${bookingItem._id}`}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Review</button>
            </Link>
            :
            <>
              <Link href={`/bookings/${bookingItem._id}`}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
              </Link>
              <Link href={`/bookings/${bookingItem._id}/delete`}>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
              </Link>
            </>
        }
      </div>
    </div>
  );
}

export default BookingCard;