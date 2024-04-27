"use client";
import { BookingDetail, BookingItem, hotelItem } from "@/interface";
import createReview from "@/libs/createReview";
import getBooking from "@/libs/getBooking";
import getHotel from "@/libs/getHotel";
import getUserProfile from "@/libs/getUserProfile";
import { Alert, CircularProgress, Slider } from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { set } from "node_modules/cypress/types/lodash";
import { Suspense, useEffect, useState } from "react";

const ReviewPage = ({ params }: { params: { hid: string; bid: string } }) => {
  const session = useSession();
  if (!session || !session.data?.user.token) return null;

  // range [1.0, 5.0]
  const [rating, setRating] = useState(3.0);
  const [hotelDetail, setHotelDetail] = useState<hotelItem | null>(null);
  const [bookingDetail, setBookingDetail] = useState<BookingItem | null>(null);

  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const hotelDetail = await getHotel(params.hid);
      if (!hotelDetail) return null;
      setHotelDetail(hotelDetail.data);

      const bookingDetail: BookingDetail = await getBooking(params.bid, session!.data.user.token);
      if (!bookingDetail) return null;
      setBookingDetail(bookingDetail.data);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = new FormData(e.currentTarget).get("review") as string;

     // Check if the review is empty
    if (message.trim() === "") {
      alert("Please add some text.");
      return; 
    }

    setPending(true);
    const profile = await getUserProfile(session.data.user.token);

    const response = await createReview(session.data.user.token, profile.data._id, params.hid, message, rating, bookingDetail!);
    setPending(false);
    if (response) {
      setSuccess(true);
      setTimeout(() => {
        router.push(`/hotel/${params.hid}`);
      }, 1000);
    }
  };

  return (
    <main className="w-full h-full py-16 px-6 flex flex-col items-center">
      <div className="w-full h-[20rem] flex flex-col md:flex-row justify-center bg-white rounded-lg shadow-xl p-5">
        {!hotelDetail ? (
          <CircularProgress />
        ) : (
          <>
            <div className="md:w-1/3 !relative">
              <Image
                src={hotelDetail.picture}
                alt="Hotel Image"
                fill
                style={{ objectFit: "contain" }}
                className="rounded-lg"
              />
            </div>
            <div className="md:w-2/3 md:ml-10 mt-5 md:mt-0 text-black">
              <h2 className="text-2xl font-semibold mb-2 mt-4">{hotelDetail.name}</h2>
              <div className="text-lg mb-2">
                Address: {hotelDetail.address}, {hotelDetail.district}, {hotelDetail.province}, {hotelDetail.postalcode}
              </div>
              <div className="text-lg mb-4">Tel: {hotelDetail.tel}</div>
            </div>
          </>
        )}
      </div>
      <div className="w-[80%] flex gap-6 justify-center mt-20 px-[3rem] py-[4rem] bg-white rounded-md">
        {!bookingDetail ? (
          <CircularProgress />
        ) : (
          <>
            <div className="w-fit flex flex-col text-slate-500">
              <span className="font-bold text-2xl mb-5 text-black">{bookingDetail.user.name}</span>
              <span className="flex gap-2 text-nowrap mb-3">
                <Image
                  src="/icon/bedicon.png"
                  alt="bed icon"
                  fill
                  style={{ objectFit: "contain" }}
                  className="!relative !h-[1.5rem] !w-fit"
                />
                Room : {bookingDetail.room.roomNumber}
              </span>
              <span className="flex gap-2 text-nowrap">
                <Image
                  src="/icon/calendaricon.png"
                  alt="bed icon"
                  fill
                  style={{ objectFit: "contain" }}
                  className="!relative !h-[1.5rem] !w-fit"
                />
                {new Date(bookingDetail.bookingbegin).toLocaleDateString()} -{" "}
                {new Date(bookingDetail.bookingend).toLocaleDateString()}
              </span>
            </div>
            <div className="w-full flex flex-col justify-center items-center">
              <form action={""} onSubmit={handleSubmit} className="w-full px-4 flex flex-col">
                <div className="mb-2 text-center text-2xl text-[#7880a8] font-bold">{rating}</div>
                <input
                  type="range"
                  className="w-[50rem] slider"
                  value={rating * 10}
                  max={50}
                  min={10}
                  onChange={e => {
                    setRating(Number(e.target.value) / 10);
                  }}
                />
                <textarea
                  name="review"
                  className="px-2 py-3 my-8 h-[7rem] border-2 border-slate-400 rounded-lg text-black"
                  placeholder="Describe your experience"
                />
                <button className="w-fit px-4 py-2 flex justify-center items-center m-auto bg-[#7880a8] hover:bg-slate-700 text-white font-bold rounded">
                  Submit
                  {pending && <CircularProgress size={"1rem"} className="ml-4" />}
                </button>
              </form>
            </div>
          </>
        )}
      </div>
      {success && (
        <Alert severity="success" className="mt-5 ml-auto">
          Your review has been submitted successfully.
        </Alert>
      )}
    </main>
  );
};

export default ReviewPage;
