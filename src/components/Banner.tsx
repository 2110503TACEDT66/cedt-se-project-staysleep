"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function Banner() {
  const covers = ["/img/cover.jpg", "/img/cover1.jpg", "/img/cover2.jpg", "/img/cover3.jpg"];
  const [index, setIndex] = useState(0);
  const router = useRouter();

  const { data: session } = useSession();

  return (
    <div
      className="block px-5 m-0 w-screen h-[100vh] relative"
      onClick={() => {
        setIndex(index + 1);
      }}
    >
      <Image src={covers[index % 4]} alt="cover" fill={true} priority className="object-cover" />
      <div className="relative top-24 z-20 text-center text-white">
        <h1 className="text-4xl font-medium">Hotel Service Center</h1>
        <h3 className="text-xl font-serif">Booking Hotel With Us</h3>
      </div>
      <button
        className="bg-white text-cyan-600 border border-cyan-600 
            font-semibold py-2 px-2 mx-10 my-12 rounded z-30 absolute bottom-0 right-0
            hover:bg-cyan-600 hover:text-white hover:border-transparent"
        onClick={e => {
          e.stopPropagation();
          router.push("/hotel");
        }}
      >
        Select Hotel
      </button>
    </div>
  );
}
