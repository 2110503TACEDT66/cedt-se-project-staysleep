"use client"

import createReply from "@/libs/createReply";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { set } from "node_modules/cypress/types/lodash";
import { useState } from "react";

export default function ReplyForm({ userID, rid, hid }: { userID: string, rid: string, hid: string}) {
  const router = useRouter();
  const session = useSession();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const onClick = async () => {
    if (message.trim() == "" || !session.data?.user.token) {
      setError(true); 
      setMessage("");
      return;
    }
    const res = await createReply(session.data?.user.token, userID, rid, message);
    if(res.success) {
      setError(false);
      router.push(`/hotel/${hid}`);
    }
    else alert("Reply failed");
  };

  return (
    <div className="flex flex-col justify-center">
      <textarea
        name="reply"
        className={`text-black px-2 py-3 mt-6 mb-3 h-[7rem] rounded-lg ${error? "border border-red-500":""}`}
        placeholder={`${error? "Please write your reply":"Write your reply"}`}
        value={message}
        onChange={(e) => { setMessage(e.target.value); setError(false) }}
      />
      <span className="text-red-500 text-sm text-center mb-2">{error? "Please write your reply":""}</span>
      <button
        className="w-fit px-4 py-2 flex justify-center items-center m-auto bg-[#7880a8] hover:bg-slate-700 text-white font-bold rounded"
        onClick={onClick}
      >
        Submit
      </button>
    </div>

  );
}
