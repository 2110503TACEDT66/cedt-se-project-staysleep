'use client'
import getHotel from "@/libs/getHotel";
import Image from "next/image";
import Link from "next/link";
import { hotelItem, hotelJson, reviewItem, roomItem, singleHotelJson } from "@/interface";
import getUserProfile from "@/libs/getUserProfile";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default async function HospitalDetailPage({ params }: { params: { hid: string } }) {
    const session = useSession();
    if (!session || !session.data?.user.token) return null;

    /*const [hotelDetail, setHotelDetail] = useState<singleHotelJson | null>(null);
    if (!hotelDetail) return null;

    useEffect(() => {
        const fetchData = async () => {
          const hotelDetail = await getHotel(params.hid);
          setHotelDetail(hotelDetail);
        };
    
        fetchData();
      });*/

    const hotelDetail = await getHotel(params.hid);
    console.log(hotelDetail.data)
    

    let reviewsNumber = hotelDetail.data.reviews.length;
    let reviewStar = 0;
    hotelDetail.data.reviews.map((reviewItem:reviewItem) => reviewStar += reviewItem.star);
    reviewStar = (reviewStar/hotelDetail.data.reviews.length);
    if (isNaN(reviewStar)) reviewStar = 0;
    reviewStar = Math.round(reviewStar * 10) / 10;

    const user = getUserProfile(session.data.user.token);

    return (
        <main className="container mx-auto px-5 py-10">
            <div className="flex flex-col md:flex-row justify-center bg-white rounded-lg shadow-lg p-5">
                <div className="md:w-1/3">
                    <Image
                        src={hotelDetail.data.picture}
                        alt="Hotel Image"
                        width={500}
                        height={300}
                        className="rounded-lg"
                    />
                </div>
                <div className="md:w-2/3 md:ml-10 mt-5 md:mt-0 text-black">
                    <h2 className="text-2xl font-semibold mb-2 mt-4">{hotelDetail.data.name}</h2>
                    <div className="text-lg mb-2">Address: {hotelDetail.data.address}, {hotelDetail.data.district}, {hotelDetail.data.province}, {hotelDetail.data.postalcode}</div>
                    <div className="text-lg mb-4">Tel: {hotelDetail.data.tel}</div>
                </div>
            </div>
            <div className="mt-8 text-black">
                <h3 className="text-2xl mb-4">Rooms:</h3>
                <div className="mt-8 flex flex-wrap justify-around items-start text-black">
                    {hotelDetail.data.rooms && hotelDetail.data.rooms.length > 0 ? (
                        hotelDetail.data.rooms.map((room: roomItem) => (
                            <div key={room._id} className="flex-grow w-full md:w-1/3 mb-8">
                                <div className="bg-white rounded-lg shadow-lg p-6">
                                    <Image
                                        src={room.picture}
                                        alt="Room Image"
                                        width={500}
                                        height={300}
                                        className="rounded-lg"
                                    />
                                    <h4 className="text-lg font-semibold mb-4 mt-3">{room.roomNumber}</h4>
                                    <p className="text-gray-600 mb-4">Price: ${room.price} / night</p>
                                    <p className="text-gray-600 mb-4">Max Occupancy: {room.maxOccupant}</p>
                                    <Link href={`/bookings?rid=${room._id}&roomNumber=${room.roomNumber}&hid=${params.hid}&hotelName=${hotelDetail.data.name}`}>
                                        <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm">Make Booking</button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No rooms available</p>
                    )}
                </div>
            </div>
            <div>
                <div className="flex">
                    <div className = 'w-auto h-[15%] p-[10px] pt-11 mr-20'>
                        <div className='bg-zinc-600 rounded-3xl w-44 p-10 py-16 text-white text-3xl flex justify-center'>
                            <>{reviewStar} ⭐</>
                        </div>
                        <p className="ml-12 mt-2 text-[#78819a]">
                            {reviewsNumber} reviews
                        </p>
                    </div>
                    <div className="mt-8 text-black">
                        {hotelDetail.data.reviews && hotelDetail.data.reviews.length > 0 ? (
                            hotelDetail.data.reviews.map((review: reviewItem) => (
                                <div key={review._id} className="w-full max-width: 100% mb-8">
                                    <div className="bg-white rounded-lg shadow-lg p-6 w-full">
                                        <div className="flex justify-between">
                                            <h4 className="text-lg font-semibold mb-4 mt-3 mr-10">{review.user}</h4>
                                            <div className="text-[#78819a] mb-4 ml-8 text-3xl">{review.star} ⭐</div>
                                        </div>
                                        <div className="flex">
                                            <div>
                                                <div className="mb-5 mt-5 ml-5 flex">
                                                    <Image src="/icon/bedicon.png" alt="bed icon" fill style={{ objectFit: "contain" }} className="!relative !h-[1.5rem] !w-fit" />
                                                    <div className="ml-2 text-sm text-[#78819a]">Room</div>
                                                </div>
                                                <div className="mb-5 ml-5 flex">
                                                    <Image src="/icon/calendaricon.png" alt="calendar icon" fill style={{ objectFit: "contain" }} className="!relative !h-[1.5rem] !w-fit" />
                                                    <div className="ml-3 text-sm text-[#78819a]">Booking Date</div>
                                                </div>
                                            </div>
                                            <div className="text-black mb-4 mt-3 mx-24">
                                                {review.message}
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="text-sm text-[#78819a] mt-8 ml-1">
                                                Reviewed: {new Date(review.createdAt).toLocaleDateString()}
                                            </div>
                                            <Link href={``} className=" mr-5 mt-2">
                                                <Image src="/icon/replyicon.png" alt="reply icon" fill style={{ objectFit: "contain" }} className="!relative !h-[2.5rem] !w-fit" />
                                            </Link >
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No reviews available</p>
                        )}
                    </div>
                </div>               
            </div>
        </main>
    );
}
