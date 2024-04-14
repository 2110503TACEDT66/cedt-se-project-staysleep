"use client"

import createReply from "@/libs/createReply";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function ReplyForm({ userID, rid }: { userID: string, rid: string }) {
  const session = useSession();
  const [message, setMessage] = useState("");
  const onClick = async () => {
    if (!message || !session.data?.user.token) return;
    const res = await createReply(session.data?.user.token, userID, rid, message);
    if(res.success) console.log("Reply successful");
    else console.log("Reply failed");
  };

  return (
    <div className="w-full px-4 flex flex-col">
      <textarea
        name="reply"
        className="px-2 py-3 my-8 h-[7rem] border-2 border-slate-400 rounded-lg"
        placeholder="Write your reply"
        onChange={(e) => { setMessage(e.target.value) }}
      />
      <button
        className="w-fit px-4 py-2 flex justify-center items-center m-auto bg-[#7880a8] hover:bg-slate-700 text-white font-bold rounded"
        onClick={onClick}
      >
        Submit
      </button>
    </div>

  );
}