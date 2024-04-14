import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ReplyForm from "@/components/ReplyForm";
import getHotel from "@/libs/getHotel";
import getReview from "@/libs/getReview";
import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function ReviewPage({ params }: { params: { hid: string, rid: string } }) {
    const session = await getServerSession(authOptions);

    let userProfile = null;
    if (session) userProfile = await getUserProfile(session?.user.token);

    const reviewRes = await getReview(params.rid);
    const review = reviewRes.data;
    console.log(reviewRes);

    const hotelRes = await getHotel(review.hotel);
    const hotel = hotelRes.data;
    // console.log(reviewRes.data1[2].hotel);
    // const review = {
    //     userID: "mockID",
    //     user: { name: "UserName" },
    //     booking: {
    //         room: { roomNumber: "123" },
    //         bookingbegin: new Date(Date.now()), bookingend: new Date(Date.now())
    //     },
    //     message: "YapYapYapYapYapYapYapYapYapYapYapYapYapYapYapYapYapYapYapYapYapYapYapYapYapYapYapYapYapYapYapYapYapYapYapYapYapYapYapYapYapYapYapYapYapYapYapYapYapYap",
    //     star: 5,
    //     reply: [
    //         {
    //             message: "Yap1"
    //         },
    //         {
    //             message: "Yap2"
    //         }
    //     ]
    // }

    return (
        <main>
            {
                userProfile ?
                    reviewRes.success ?
                        <>
                            <div className="flex justify-center w-full">
                                <div className="w-2/3 my-4 h-fit justify-center bg-white rounded-lg shadow-xl">
                                    <div className="flex flex-row mx-8 py-8">
                                        <div className="w-fit mr-4">
                                            <h1 className="font-bold text-2xl mb-2 text-black">
                                                {review.user.name}
                                            </h1>
                                            <span className="flex gap-2 text-nowrap mb-3">
                                                <Image
                                                    src="/icon/bedicon.png"
                                                    alt="bed icon"
                                                    fill
                                                    className="!relative !h-[1.5rem] !w-fit object-contain"
                                                />
                                                Hotel : {hotel.name}
                                            </span>
                                            <div className="text-sm text-[#78819a] mt-10">Reviewed at {new Date(review.createdAt).toLocaleDateString()}</div>
                                        </div>
                                        <div className="w-[80%] px-20"><p className="break-words my-2">{review.message}</p></div>
                                        <div className="w-fit text-right text-[#7881a9] text-2xl text-nowrap">4.54 ⭐</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center w-full">
                                <div className="flex flex-row object-center w-2/5">
                                    <ReplyForm userID={review.user._id} rid={params.rid} />
                                </div>
                            </div>
                        </>
                        : <>Review with id {params.rid} not found</>
                    : <>Not authorized to access this route</>
            }
        </main >
    );
}

/*
    Booking Data
    <span className="flex gap-2 text-nowrap">
        <Image
            src="/icon/calendaricon.png"
            alt="calendar icon"
            fill
            className="!relative !h-[1.5rem] !w-fit object-contain"
        />
        {new Date(review.booking.bookingbegin).toLocaleDateString()} - {new Date(review.booking.bookingend).toLocaleDateString()}
    </span>
*/
