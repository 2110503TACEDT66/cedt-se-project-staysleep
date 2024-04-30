"use client"

export default function ReplyList({ replyData }: { replyData: {}[] }) {
  console.log(replyData);
  return (
    replyData ?
      Array.from(replyData).map((reply: any) =>
        <div key={reply._id} className="my-2 bg-white rounded-lg shadow-xl">
          <div className="py-4 px-4 flex flex-col">
            <div className="font-bold text-lg text-black">
              Hotel staff
            </div>
            <p className="break-words text-black">
              {reply.message}
            </p>
            <div className="text-sm text-[#78819a] mt-10">Replied: {new Date(reply.createdAt).toLocaleDateString()}</div>
          </div>
        </div>
      )
      : <></>
  );
}
