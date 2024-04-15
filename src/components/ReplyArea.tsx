"use client"
import ReplyForm from "./ReplyForm";
import ReplyList from "./ReplyList";

export default function ReplyArea({ replyData, review, rid, role }: { replyData: {}[], review: any, rid: string, role: string }) {
  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col justify-center w-3/5">
        <ReplyList replyData={replyData} />
        {role === "admin" ?
          <ReplyForm userID={review.user._id} rid={rid} />
          : null
        }
      </div>
    </div>
  );
}
