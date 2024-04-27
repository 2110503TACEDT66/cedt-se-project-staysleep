"use client"

import createReply from "@/libs/createReply";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ReplyForm({ userID, rid, hid }: { userID: string, rid: string, hid: string}) {
  const router = useRouter();
  const session = useSession();
  const [message, setMessage] = useState("");
  const onClick = async () => {
    if (!message || !session.data?.user.token) return;
    const res = await createReply(session.data?.user.token, userID, rid, message);
    if(res.success) router.push(`/hotel/${hid}`);
    else alert("Reply failed");
  };

  return (
    <div className="flex flex-col justify-center">
      <textarea
        name="reply"
        className="px-2 py-3 my-6 h-[7rem] border-2 border-slate-400 rounded-lg"
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
