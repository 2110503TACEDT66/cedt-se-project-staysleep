import getHotels from "@/libs/getHotels";
import Hotelcatalog from "@/components/HotelCatalog";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/getUserProfile";

export default async function Hotel(){

    const hotels = await getHotels()
    console.log(hotels)
    var userRole = "";

    const session = await getServerSession(authOptions);
    if (session && session?.user){
        const user = await getUserProfile(session?.user?.token);
        userRole = user.data.role;
    }

    return(
        <main className="text-center p-5">
            <h1 className = "text-xl font-medium text-black">Choose Your Accommodation</h1>
            <Hotelcatalog userRole = {userRole}/>
        </main>
    )
}