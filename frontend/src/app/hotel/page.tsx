import getHotels from "@/libs/getHotels";
import Hotelcatalog from "@/components/HotelCatalog";

export default async function Hotel() {

    const hotels = await getHotels()
    console.log(hotels)

    return (
        <main className="text-center p-5 pt-[7rem]">
            <h1 className="text-xl font-medium text-primaryWhite">Choose Your Accommodation</h1>
            <Hotelcatalog />
        </main>
    )
}