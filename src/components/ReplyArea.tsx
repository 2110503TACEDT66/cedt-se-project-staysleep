"use client";
import canReply from "@/libs/canReply";
import ReplyForm from "./ReplyForm";
import ReplyList from "./ReplyList";

export default function ReplyArea({
  replyData,
  review,
  rid,
  userProfile,
}: {
  replyData: {}[];
  review: any;
  rid: string;
  userProfile: any;
}) {
  // console.log(userProfile);
  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col justify-center w-3/5">
        <ReplyList replyData={replyData} />
        {canReply(userProfile, review.hotel) ? (
          <ReplyForm userID={review.user._id} rid={rid} />
        ) : (
          <div className="text-center py-20 font-bold">You are not allow to reply a review in this hotel</div>
        )}
      </div>
    </div>
  );
}

// Invisible Character : >>⠀<<
