import { BookingItem, BookingItemForReview, replyItem, reviewItem, roomItem } from "@/interface";
import deleteReview from "@/libs/deleteReview";
import getRoom from "@/libs/getRoom";
import updateReview from "@/libs/updateReview";
import { CircularProgress } from "@mui/material";
import { use } from "chai";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { KingBed, CalendarMonth } from "@mui/icons-material";

const ReviewItem = ({ review, user, token, booking }: { review: reviewItem, user: any, token: string, booking: BookingItemForReview }) => {
  // hanle edit review
  const [isEditing, setIsEditing] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [rating, setRating] = useState(review.star);

  const [pending, setPending] = useState(false);
  const [deletePending, setDeletePending] = useState(false);
  const [room, setRoom] = useState<roomItem | null>(null);

  // handle edit review
  const handleEdit = () => {
    if (!isEditing) {
      textAreaRef.current?.removeAttribute("disabled");
      textAreaRef.current?.focus();
      textAreaRef.current?.classList.add("border-2", "rounded-sm");
    } else {
      textAreaRef.current?.setAttribute("disabled", "true");
      textAreaRef.current?.classList.remove("border-2", "rounded-sm");
    }
    setIsEditing(!isEditing);
  }
  const handleSaveEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    // save edit review
    e.preventDefault();
    setPending(true);

    const response = await updateReview(review._id, token, textAreaRef.current!.value, rating);
    if (response) {
      setTimeout(() => {
        setPending(false);
        handleEdit();
        window.location.reload();
      }, 1200);
    }
  }
  // delete review
  const handleDelete = async () => {
    setDeletePending(true);
    const response = await deleteReview(review._id, token);

    setTimeout(() => {
      if (response) {
        setDeletePending(false);
        window.location.reload();
      }
    }, 1200);
  }

  //getRoom
  useEffect(() => {
    const fetchRoom = async () => {
      const roomData = await getRoom(booking.room);
      //console.log(roomData.data)
      setRoom(roomData.data);
    }
    fetchRoom();
  }, [])

  return (
    <div id={review.id} key={review._id} data-test-id={review.message} className="w-full max-width: 100% mb-12">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full">
        <div className="flex justify-between">
          <h4 data-test-id = "name" className="text-xl font-semibold mb-4 mt-3 mr-10">{review.user.name}</h4>
          <div className="text-[#78819a] mb-4 ml-8 text-3xl">{rating} ⭐</div>
        </div>
        <div className="flex w-full">
          <div className="">
            <div className="mb-5 mt-5 ml-5 flex items-center">
              {/* <Image src="/icon/bedicon.png" alt="bed icon" fill style={{ objectFit: "contain" }} className="!relative !h-[1.5rem] !w-fit" /> */}
              <KingBed sx={{ fontSize: 35, color:"#949292"}}/>
              <div className="ml-3 text-sm text-[#78819a]">Room: {room?.roomNumber}</div>
            </div>
            <div className="mb-5 ml-5 flex">
              {/* <Image src="/icon/calendaricon.png" alt="calendar icon" fill style={{ objectFit: "contain" }} className="!relative !h-[1.5rem] !w-fit" /> */}
              <CalendarMonth  sx={{fontSize: 35, color:"#949292"}}/>
              <div className="ml-3 text-sm text-[#78819a]">
                {dayjs(booking.bookingbegin).format('DD/MM/YYYY')} - {dayjs(booking.bookingend).format('DD/MM/YYYY')}
                {/*{dayjs(booking.bookingbegin).diff(dayjs(booking.bookingend), 'day')} days*/}
              </div>
            </div>
          </div>
          {/* {review.message} */}
          <form action={""} onSubmit={handleSaveEdit} className="w-full mx-20 relative">
            <input type="range" className="!w-[30rem] absolute top-[-3rem] right-[2rem] slider" value={rating * 10} max={50} min={10} onChange={(e) => { setRating(Number(e.target.value) / 10) }} hidden={!isEditing} />
            <textarea ref={textAreaRef} name="review-message" className="w-full h-full text-black pb-4 pt-3 px-2 bg-transparent resize-none border-slate-700" disabled >
              {review.message}
            </textarea>
            <button className="absolute bottom-2 right-2 bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded" hidden={!isEditing}>
              Save
              {pending && <CircularProgress size={"1rem"} className="ml-4" />}
            </button>
          </form>
        </div>
        <div className="flex justify-between">
          <div className="text-sm text-[#78819a] mt-8 ml-1">
            Reviewed: {new Date(review.createdAt).toLocaleDateString()}
          </div>
          <div className="flex justify-between items-center mt-2">
            {
              (user.data._id === review.user._id) ?
                <button className="" onClick={handleEdit}>
                  <Image src="/icon/editicon.png" alt="edit icon" fill style={{ objectFit: "contain" }} className="!relative !h-[2.3rem] !w-fit" />
                </button> : null
            }
            {
              (user.data.role === "admin" || user.data._id === review.user._id) ?
                <button className="ml-5" onClick={handleDelete}>
                  <Image src="/icon/deleteicon.png" alt="delete icon" fill style={{ objectFit: "contain" }} className="!relative !h-[2.5rem] !w-fit" />
                </button> : null
            }
            {deletePending && <CircularProgress size={"1rem"} className="ml-4" />}
            {
              (user.data.role === "staff" || user.data.role === "admin") ?
                <Link href={`/hotel/${review.hotel}/review/${review.id}`} className="ml-6">
                  <Image src="/icon/replyicon.png" alt="reply icon" fill style={{ objectFit: "contain" }} className="!relative !h-[2.5rem] !w-fit" />
                </Link >
                : null
            }
          </div>
        </div>
      </div>
      {
        review.replys.map((replyItem: replyItem) => (
          <div key={replyItem._id} data-test-id = {replyItem.message} className="bg-white rounded-lg shadow-lg p-6 mt-5 ml-10">
            <div className="font-bold text-lg">
              Hotel staff
            </div>
            <div className="text-black mb-4 mt-3 mr-24 w-[50vw] break-words">
              
              {replyItem.message}
            </div>
            <div className="flex justify-between">
              <div className="text-sm text-[#78819a] mt-8 ml-1">
                Replied: {new Date(replyItem.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default ReviewItem;