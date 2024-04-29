"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion"
import { HotelMock } from "@/interface";
import { FaAngleRight, FaGithubSquare } from "react-icons/fa";
import Link from "next/link";

export default function Banner() {
  const hotels: HotelMock[] = [
    {
      name: "Luxury Haven Hotel",
      address: "Downtown, Metropolis, 12345",
      quote: "FEEL HAVEN WIHOUT HAVE TO GO ONCE",
      image: "/img/hotel1.jpg",
      roomImage: "/img/room1.jpg"
    },
    {
      name: "Mountain View Lodge",
      address: "Hillside, Mountaintop, 67890",
      quote: "TRY SO HARD GOT SO FAR BUT IN THE END IT DOESN'T EVEN MATTER",
      image: "/img/hotel2.jpg",
      roomImage: "/img/room2.jpg",
    },
    {
      name: "Riverside Retreat",
      address: "Downtown, Coastal, 12312",
      quote: "SUN BURN AND SANDY TOES",
      image: "/img/hotel3.jpg",
      roomImage: "/img/room3.jpg",
    },
  ];
  const [index, setIndex] = useState(0);
  const timeOutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const controller = useAnimationControls();
  const { data: session } = useSession();

  useEffect(() => {
    clearTimeOut();
    timeOutRef.current = setTimeout(() => {
      setIndex((index + 1) % hotels.length);
    }, 4000);
    controller.set({ opacity: 0, x: -100 });
    controller.start({ opacity: 1, x: 0 });

    return () => {
      clearTimeOut();
    }
  }, [index]);

  const clearTimeOut = () => {
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
    }
  }
  const handleBannerClicked = () => {
    setIndex((index + 1) % hotels.length);
  }

  return (
    <div
      className="h-screen w-screen rel pl-[10rem] flex justify-start items-center"
      onClick={handleBannerClicked}
    >
      <div className="h-[40rem] w-[20rem] relative">
        <Link href="https://github.com/2110503TACEDT66/cedt-se-project-staysleep">
          <FaGithubSquare className="fixed z-10 m-2 bottom-0 left-0 h-10 w-10 fill-primary" />
        </Link>
        <div className="flex items-center text-nowrap m-2 absolute z-20 -rotate-90 origin-top-left top-[64%] -left-[10rem] text-primaryWhite">
          <div className="absolute w-[7rem] left-full rounded-md border-b-2"></div>
          🥐 CEDT-STAYSLEEP 🥐
          <div className="absolute w-[7rem] right-full rounded-md border-b-2"></div>
        </div>
        <Image src={hotels[index].roomImage} alt="cover" fill priority style={{ objectFit: "cover" }} className="!relative rounded-lg z-10" quality={10} />
      </div>
      <div>
        <motion.div
          animate={controller}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="w-fit pt-6 pl-[5rem] pr-10 bg-[rgba(20,20,30,0.7)] rounded-r-lg">
            <div className="font-extrabold text-primaryWhite text-nowrap text-ellipsis overflow-clip">{hotels[index].address}</div>
            <div className="max-w-[19ch] text-[5rem] font-extrabold text-primary text-nowrap text-ellipsis overflow-clip">{hotels[index].name}</div>
          </div>
        </motion.div>
        <div className="mt-5 ml-20 text-primaryWhite tracking-[0.5em] font-light">{hotels[index].quote}</div>
      </div>
      <Image src={hotels[index].image} alt="cover" fill priority className="object-cover -z-10 ml-[20rem]" quality={10} />
      <Link
        href="/hotel"
        className="text-primary border-[2px] border-transparent bg-secondary hover:bg-primary hover:text-secondary
        py-2 px-10 mx-8 my-12 z-30 absolute bottom-0 right-0 hover:border-secondary rounded-3xl"
      >
        View Hotel
        <FaAngleRight className="inline ml-2" />
      </Link>
    </div>
  );
}