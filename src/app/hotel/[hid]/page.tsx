import getHotel from "@/libs/getHotel";
import Image from "next/image";
import Link from "next/link";
import { roomItem } from "@/interface";

export default async function HospitalDetailPage({ params }: { params: { hid: string } }) {
    const hotelDetail = await getHotel(params.hid);
    console.log(hotelDetail.data)
    return (
        <main className="container mx-auto px-5 py-10">
            <div className="flex flex-col md:flex-row justify-center bg-white rounded-lg shadow-lg p-5">
                <div className="md:w-1/3">
                    <Image
                        src={hotelDetail.data.picture}
                        alt="Hotel Image"
                        width={500}
                        height={300}
                        className="rounded-lg"
                    />
                </div>
                <div className="md:w-2/3 md:ml-10 mt-5 md:mt-0 text-black">
                    <h2 className="text-2xl font-semibold mb-2 mt-4">{hotelDetail.data.name}</h2>
                    <div className="text-lg mb-2">Address: {hotelDetail.data.address}, {hotelDetail.data.district}, {hotelDetail.data.province}, {hotelDetail.data.postalcode}</div>
                    <div className="text-lg mb-4">Tel: {hotelDetail.data.tel}</div>
                </div>
            </div>
            <div className="mt-8 text-black">
                <h3 className="text-2xl mb-4">Rooms:</h3>
                <div className="mt-8 flex flex-wrap justify-around items-start text-black">
                    {hotelDetail.data.rooms && hotelDetail.data.rooms.length > 0 ? (
                        hotelDetail.data.rooms.map((room: roomItem) => (
                            <div key={room._id} className="flex-grow w-full md:w-1/3 mb-8">
                                <div className="bg-white rounded-lg shadow-lg p-6">
                                    <Image
                                        src={room.picture}
                                        alt="Room Image"
                                        width={500}
                                        height={300}
                                        className="rounded-lg"
                                    />
                                    <h4 className="text-lg font-semibold mb-4 mt-3">{room.roomNumber}</h4>
                                    <p className="text-gray-600 mb-4">Price: ${room.price} / night</p>
                                    <p className="text-gray-600 mb-4">Max Occupancy: {room.maxOccupant}</p>
                                    <Link href={`/bookings?rid=${room._id}&roomNumber=${room.roomNumber}&hid=${params.hid}&hotelName=${hotelDetail.data.name}`}>
                                        <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm">Make Booking</button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No rooms available</p>
                    )}
                </div>
            </div>
        </main>
    );
}
