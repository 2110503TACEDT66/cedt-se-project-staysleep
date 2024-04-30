import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ReplyArea from "@/components/ReplyArea";
import getHotel from "@/libs/getHotel";
import getReview from "@/libs/getReview";
import getRoom from "@/libs/getRoom";
import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { KingBed, CalendarMonth} from '@mui/icons-material';

export default async function ReviewPage({ params }: { params: { hid: string; rid: string } }) {
  const session = await getServerSession(authOptions);

  let userProfileRes = null;
  if (session) userProfileRes = await getUserProfile(session?.user.token);
  const userProfile = userProfileRes.data;

  const reviewRes = await getReview(params.rid);
  const review = reviewRes.data;
  // console.log(reviewRes);

  const hotelRes = await getHotel(review.hotel);
  const hotel = hotelRes.data;

  const roomRes = await getRoom(review.booking.room);
  const room = roomRes.data;

  return (
    <main className="pt-[7rem]">
      {reviewRes.success ? (
        <>
          <div className="flex justify-center">
            <div className="w-2/3 my-4 h-fit justify-center bg-white rounded-lg shadow-xl">
              <div className="flex flex-col mx-8 py-8">
                <div className="flex justify-between font-bold text-2xl mb-2 text-black">
                  {review.user.name}
                  <div className="w-fit text-right text-[#7881a9] text-2xl text-nowrap">{review.star} ⭐</div>
                </div>
                <div className="flex flex-row">
                {/* <h1 ></h1> */}
                <div className="w-fit mr-4">
                  
                  <span className="flex items-center gap-2 text-nowrap mb-3 text-[#7b7b7b]">
                    {/* <Image
                      src="/icon/bedicon.png"
                      alt="bed icon"
                      fill
                      className="!relative !h-[1.5rem] !w-fit object-contain"
                    /> */}
                    <KingBed sx={{ fontSize: 35, color:"#949292"}}/>
                    Hotel : {hotel.name}<br />Room : {room.roomNumber}
                  </span>
                  <span className="flex gap-2 items-center text-nowrap text-[#78819a]">
                    {/* <Image
                      src="/icon/calendaricon.png"
                      alt="calendar icon"
                      fill
                      className="!relative !h-[1.5rem] !w-fit object-contain"
                    /> */}
                    
                    <CalendarMonth  sx={{fontSize: 35, color:"#949292"}}/>
                    {new Date(review.booking.bookingbegin).toLocaleDateString()} - {new Date(review.booking.bookingend).toLocaleDateString()}
                  </span>
                  <div className="text-sm text-[#78819a] mt-10">
                    Reviewed: {new Date(review.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="w-[80%] px-20">
                  <p className="break-words my-2 text-black">{review.message}</p>
                </div>
                
                </div>
                
              </div>
            </div>
          </div>
          <ReplyArea replyData={review.replys} review={review} rid={params.rid} userProfile={userProfile} hid={params.hid}/>
        </>
      ) : (
        <>Review with id {params.rid} not found</>
      )}
    </main>
  );
}
