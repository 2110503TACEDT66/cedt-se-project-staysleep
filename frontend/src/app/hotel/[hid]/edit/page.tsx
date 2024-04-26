"use client"
import { singleHotelJson } from "@/interface";
import getHotel from "@/libs/getHotel";
import { CircularProgress, Input } from "@mui/material";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaPaperPlane } from "react-icons/fa";

export default function EditPage({ params }: { params: { hid: string } }) {
    const session = useSession();
    if (!session || !session.data?.user.token) redirect("/api/auth/signin");
    const router = useRouter()

    const [hotelDetail, setHotelDetail] = useState<singleHotelJson | null>(null);

    const fetchData = async () => {
        const hotelDetail = await getHotel(params.hid);
        setHotelDetail(hotelDetail);
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!hotelDetail)
        return (
            <div className="flex justify-center p-52">
                <CircularProgress size="10rem" />
            </div>
    );
      
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const response = fetch(`${process.env.BACKEND_URL}/api/v1/hotels/${hotelDetail.data.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${session.data.user.token}`,
            },
            body: JSON.stringify({
                name: data.get("Name") as string? data.get("Name") as string : hotelDetail.data.name,
                address: data.get("Address") as string? data.get("Address") as string : hotelDetail.data.address,
                district: data.get("District") as string? data.get("District") as string : hotelDetail.data.district,
                province: data.get("Province") as string? data.get("Province") as string : hotelDetail.data.province,
                postalcode: data.get("Postalcode") as string? data.get("Postalcode") as string : hotelDetail.data.postalcode,
                tel: data.get("Tel") as string? data.get("Tel") as string : hotelDetail.data.tel
            })
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            router.push("/hotel")
        })
    };
    
    return (
        <main className="container mx-auto px-5 py-10 pt-[7rem]">
            <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg p-5">
                <div className="">
                    <Image src={hotelDetail.data.picture} alt="Hotel Image" width={500} height={300} className="rounded-lg" />
                </div>
                <form id="form" onSubmit={async (e) => { handleSubmit(e); }} className="w-[50%] justify-items-end ml-[10%]">
                    <div className="flex flex-col gap-3">
                        <div className="relative">
                            <label htmlFor="Name" className="text-primaryWhite absolute -translate-x-full translate-y-[50%]">Hotel name: </label>
                            <input
                                type="text"
                                name="Name"
                                placeholder={hotelDetail.data.name}
                                className="w-full max-w-full ml-2 px-5 py-3 bg-[rgba(217,217,217,0.1)] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary text-black"
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="Address" className="text-primaryWhite absolute -translate-x-full translate-y-[50%]">Address: </label>
                            <input
                                type="text"
                                name="Address"
                                placeholder={hotelDetail.data.address}
                                className="w-full max-w-full ml-2 px-5 py-3 bg-[rgba(217,217,217,0.1)] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary text-black"
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="District" className="text-primaryWhite absolute -translate-x-full translate-y-[50%]">District: </label>
                            <input
                                type="text"
                                name="District"
                                placeholder={hotelDetail.data.district}
                                className="w-full max-w-full ml-2 px-5 py-3 bg-[rgba(217,217,217,0.1)] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary text-black"
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="Province" className="text-primaryWhite absolute -translate-x-full translate-y-[50%]">Province: </label>
                            <input
                                type="text"
                                name="Province"
                                placeholder={hotelDetail.data.province}
                                className="w-full max-w-full ml-2 px-5 py-3 bg-[rgba(217,217,217,0.1)] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary text-black"
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="Postalcode" className="text-primaryWhite absolute -translate-x-full translate-y-[50%]">Postalcode: </label>
                            <input
                                type="text"
                                name="Postalcode"
                                placeholder={hotelDetail.data.postalcode}
                                className="w-full max-w-full ml-2 px-5 py-3 bg-[rgba(217,217,217,0.1)] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary text-black"
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="Tel" className="text-primaryWhite absolute -translate-x-full translate-y-[50%]">Tel: </label>
                            <input
                                type="text"
                                name="Tel"
                                placeholder={hotelDetail.data.tel}
                                className="w-full max-w-full ml-2 px-5 py-3 bg-[rgba(217,217,217,0.1)] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary text-black"
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="Picture" className="text-primaryWhite absolute -translate-x-full translate-y-[50%]">Picture: </label>
                            <input
                                type="text"
                                name="Picture"
                                placeholder={hotelDetail.data.picture}
                                className="w-full max-w-full ml-2 px-5 py-3 bg-[rgba(217,217,217,0.1)] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary text-black"
                            />
                        </div>
                        <div className="md:w-2/3 md:ml-10 mt-10 md:mt-0 text-black">
                            <div className='flex flex-row gap-3'>
                                <div className='grid grid-cols-3 gap-3'>
                                    {
                                        hotelDetail.data.tags.map((tag) => (
                                            <div key={tag} className="bg-[#f3f4f6] rounded-lg px-5 py-2 h-10 shadow-lg ">
                                                {tag}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="ml-auto mr-auto mt-4 px-4 py-2 text-nowrap bg-secondary rounded-lg flex items-center font-bold text-primary hover:bg-black border border-primaryWhite hover:border-none" type="submit">
                        Login <FaPaperPlane className="ml-2" />
                    </button>
                </form>
            </div>
        </main>
    );
  }
  