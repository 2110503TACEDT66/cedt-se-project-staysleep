"use client";
import Hotelcatalog from "@/components/HotelCatalog";
import { redirect } from "next/navigation";
import ParallaxBanner from "@/components/ParallaxBanner";
import { useSession } from "next-auth/react";

export default function Hotel() {
    const session = useSession();
    if (!session || !session?.data?.user.role) return redirect("/api/auth/signin");

    return (
        <main className="text-center p-5 pt-[20rem] bg-black z-0">
            <ParallaxBanner />
            <h1 className="text-xl font-medium text-primaryWhite">Choose Your Accommodation</h1>
            <Hotelcatalog userRole={session.data.user.role} />
        </main>
    )
}