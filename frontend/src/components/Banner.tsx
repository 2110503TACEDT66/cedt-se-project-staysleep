"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function Banner() {
  //const covers = ["/img/cover.jpg", "/img/cover1.jpg", "/img/cover2.jpg", "/img/cover3.jpg"];
  //const [index, setIndex] = useState(0);
  const router = useRouter();

  const { data: session } = useSession();

  return (
    <div className="block px-5 m-0 w-screen h-[100vh] relative">
      <Image src={"/img/cover1.jpg"} alt="cover" fill={true} priority className="object-cover" />
      <div className="relative top-24 z-20 text-center text-white">
        <h1 className="text-4xl font-medium">Hotel Service Center</h1>
        <h3 className="text-xl font-serif">Booking Hotel With Us</h3>
      </div>
      <button
        className=" text-amber-300 border border-amber-300 
            font-semibold py-2 px-2 mx-10 my-20 rounded-full z-30 absolute bottom-0 right-0
            hover:text-amber-500 hover:shadow-2xl hover:border-amber-500"
        onClick={e => {
          e.stopPropagation();
          router.push("/hotel");
        }}
      >‎ ‎ View Hotel ‎ ‎ </button>
    </div>
  );
}
