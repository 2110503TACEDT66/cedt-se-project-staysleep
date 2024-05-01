"use client";
import getHotel from "@/libs/getHotel";
import Image from "next/image";
import Link from "next/link";
import { reviewItem, roomItem, singleHotelJson } from "@/interface";
import getUserProfile from "@/libs/getUserProfile";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import ReviewItem from "@/components/ReviewItem";
import { redirect } from "next/navigation";
import Card from "@/components/Card";
import { BiSolidCommentDetail } from "react-icons/bi";

export default function HospitalDetailPage({ params }: { params: { hid: string } }) {
  const session = useSession();
  if (!session || !session.data?.user.token) redirect("/api/auth/signin");

  const [hotelDetail, setHotelDetail] = useState<singleHotelJson | null>(null);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const hotelDetail = await getHotel(params.hid);
      console.log(hotelDetail.data);
      setHotelDetail(hotelDetail);

      const user = await getUserProfile(session.data.user.token);
      setUser(user);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const reviewId = window.location.href.split("#")[1];
    console.log(reviewId);
    if (reviewId) {
      const reviewElement = document.getElementById(reviewId);
      if (reviewElement) {
        reviewElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [user != null, hotelDetail != null]);

  if (!user || !hotelDetail)
    return (
      <div className="flex justify-center p-52">
        <CircularProgress size="10rem" />
      </div>
    );

  console.log(hotelDetail.data)

  let reviewsNumber = hotelDetail.data.reviews.length;
  let reviewStar = 0;
  hotelDetail.data.reviews.map((reviewItem: reviewItem) => (reviewStar += reviewItem.star));
  reviewStar = reviewStar / hotelDetail.data.reviews.length;
  if (isNaN(reviewStar)) reviewStar = 0;
  reviewStar = Math.round(reviewStar * 10) / 10;

  return (
    <main className="flex flex-col  container mx-auto px-5 py-10 pt-[7rem]">
      <div className = "flex w-[100%] justify-center " >
        <Card  hotelItem={hotelDetail.data} />
      </div>
      
      {/* <div className="flex flex-col md:flex-row justify-center bg-white rounded-lg shadow-lg p-5">
        <div className="md:w-1/3">
          <Image src={hotelDetail.data.picture} alt="Hotel Image" width={500} height={300} className="rounded-lg" />
        </div>
        <div className="md:w-2/3 md:ml-10 mt-5 md:mt-0 text-black">
          <h2 className="text-2xl font-semibold mb-2 mt-4">{hotelDetail.data.name}</h2>
          <div className="text-lg mb-2">
            Address: {hotelDetail.data.address}, {hotelDetail.data.district}, {hotelDetail.data.province},{" "}
            {hotelDetail.data.postalcode}
          </div>
          <div className="text-lg mb-4">Tel: {hotelDetail.data.tel}</div>
          <div className='flex flex-row gap-3'>
            <div className="bg-[#f3f4f6] rounded-lg p-4 text-[#7881a9] flex flex-col items-center w-[20%] h-fit">
                <div className='text-lg'>{reviewStar} ⭐</div>
                <div className='text-xs'>{reviewsNumber} reviews</div>
            </div>
            <div className='grid grid-cols-6 gap-3'>
              {
                hotelDetail.data.tags.map((tag) => (
                  <div key={tag} className="bg-[#f3f4f6] text-center rounded-lg px-5 py-2 h-10 shadow-lg ">
                      {tag}
                  </div>
                ))
              }
          </div>
        </div>
        </div>
      </div> */}
      <div className="mt-8 text-black">
        
        <div className="w-[100%] mt-8 flex flew-row flex-wrap justify-around items-start text-black  ">
          {hotelDetail.data.rooms && hotelDetail.data.rooms.length > 0 ? (
            hotelDetail.data.rooms.map((room: roomItem) => (
              // <div key={room._id} className=" ">
                <div key={room._id} className="bg-white rounded-lg grow-0 md:w-1/4 mb-8 shadow-lg p-6 mx-1">
                  <Image src={room.picture} alt="Room Image" width={500} height={300} className="rounded-lg" />
                  <h4 className="text-lg font-semibold mb-4 mt-3">{room.roomNumber}</h4>
                  <p className="text-gray-600 mb-4">Price: ${room.price} / night</p>
                  <p className="text-gray-600 mb-4">Max Occupancy: {room.maxOccupant}</p>
                  <Link
                    href={`/bookings?rid=${room._id}&roomNumber=${room.roomNumber}&hid=${params.hid}&hotelName=${hotelDetail.data.name}`}
                  >
                    <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm">
                      Make Booking
                    </button>
                  </Link>
                </div>
              // </div>
            ))
          ) : (
            <p>No rooms available</p>
          )}
        </div>
      </div>
      <div>
        <div className="flex justify-center ">

        <div className="mt-8 text-black w-[80%]" data-test-id="review">
            {hotelDetail.data.reviews && hotelDetail.data.reviews.length > 0 ? (
              hotelDetail.data.reviews.map((review: reviewItem) => (
                <ReviewItem review={review} user={user} token={session.data.user.token} booking={review.booking} />
              ))
            ) : (
              <div className="w-full p-6 bg-secondary flex justify-center rounded-lg">
                <div className="text-[7rem] font-extrabold text-primaryWhite">
                  <BiSolidCommentDetail className="inline-block mb-2 h-[10rem] w-[10rem] fill-primary" />
                  <div className='text-sm text-center'>No reviews available</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
