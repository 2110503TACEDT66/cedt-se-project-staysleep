"use client"
import { singleHotelJson } from "@/interface";
import getHotel from "@/libs/getHotel";
import { CircularProgress, Input } from "@mui/material";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

export default function EditPage({ params }: { params: { hid: string } }) {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [addtag,setAddtag] = useState('');

    const session = useSession();
    if (!session || !session.data?.user.token) redirect("/api/auth/signin");
    const router = useRouter()

    const [hotelDetail, setHotelDetail] = useState<singleHotelJson | null>(null);

    const fetchData = async () => {
        const hotelDetail = await getHotel(params.hid);
        setHotelDetail(hotelDetail);
        fetchTags(hotelDetail);
    };

    const fetchTags = (hotelDetail:singleHotelJson) => {
        if(!hotelDetail) return console.error('Hotel detail is not loaded yet');
        fetch(`${process.env.BACKEND_URL}/api/v1/hotels/tags`)
            .then((response) => response.json())
            .then((json) => {
                console.log('Tags data:', json); // Log the response
                if (Array.isArray(json.data.tags)) {
                    setTags(json.data.tags.filter((tag:string) => !hotelDetail.data.tags.includes(tag)));
                    setSelectedTags(hotelDetail.data.tags);
                } else {
                    console.error('Tags data is not an array:', json.data);
                }
            })
            .catch((error) => {
                console.error('Error fetching tags:', error);
            });
    };

    const fetchaAddTag = (tag: string) => {
        if (tag === "") return;
        fetch(`${process.env.BACKEND_URL}/api/v1/hotels/tags`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${session.data.user.token}`,
                },
                body: JSON.stringify({
                    tags: [tag]
                })}
            ).then((response) => response.json())
            .then((json) => {console.log('Tags data:', json, 'Add tag:', tag); setAddtag("");})// Log the response
            .then(() => {
                hotelDetail?.data.tags.push(tag);
                if (hotelDetail) {
                    fetchTags(hotelDetail);
                }
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (!hotelDetail)
        return (
            <div className="flex justify-center p-52">
                <CircularProgress size="10rem" />
            </div>
    );

    const toggleTag = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
            hotelDetail.data.tags = hotelDetail.data.tags.filter((selectedTag) => selectedTag !== tag);
            setTags([...tags, tag]);
            setHotelDetail(hotelDetail);
        } else {
            setSelectedTags([...selectedTags, tag]);
            hotelDetail.data.tags.push(tag)
            setHotelDetail(hotelDetail);
        }
    };
      
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
                tel: data.get("Tel") as string? data.get("Tel") as string : hotelDetail.data.tel,
                picture: data.get("Picture") as string? data.get("Picture") as string : hotelDetail.data.picture,
                tags: hotelDetail.data.tags
            })
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            router.push("/hotel")
        })
    };
    
    return (
        <main className="container mx-auto px-5 py-10 pt-[7rem] justify-self-center">
            <div className="flex flex-col justify-center items-center h-full">
                    <div className="tags-container flex flex-col text-center justify-center mx-[25%] w-[50%] bg-[rgba(44,44,44,0.8)] mb-3 p-4 rounded-md ">
                        <div className="flex flex-wrap gap-2 justify-center">
                            {tags.map((tag, index) => (
                                !selectedTags.includes(tag)?
                                <div
                                    key={index}
                                    className={`flex flex-wrap`}
                                >
                                    <div
                                        className={`flex flex-wrap gap-1 px-5 py-2  text-nowrap rounded-lg hover:font-bold hover:translate-y-[-3px] hover:text-primary hover:bg-black hover:shadow-md'}  text-secondary bg-primary/70  transition-all duration-250 ease-in-out shadow-sm `}
                                        onClick={() => { toggleTag(tag)}}
                                    >
                                        {tag}
                                    </div>
                                </div>
                                : null
                            ))}
                        </div>
                        <div className="justify-self-center mt-3  w-[100%] ">
                            <input
                                className="focus:outline-none bg-[rgba(55,55,55,0.8)] rounded-lg shadow-md p-2 w-80 mx-30 text-orange-100"
                                type="text"
                                placeholder="Type to add tag..."
                                value={addtag}
                                onChange={(e) => setAddtag(e.target.value)}
                                onKeyPress={(e) => {e.key === 'Enter' && fetchaAddTag(addtag)}}
                            />
                            <button onClick={() => fetchaAddTag(addtag)} className='ml-10 text-zinc-100'>Add</button>
                        </div>
                    </div>
            <div className="flex flex-col md:flex-row bg-[rgba(44,44,44,0.8)] justify-center rounded-lg shadow-lg p-5 w-[70%]">
                <form id="form" onSubmit={async (e) => { handleSubmit(e); }} className="w-[80%] justify-items-end ml-[5%]">
                    <div className="flex flex-col gap-3">
                        <div className="relative">
                            <label htmlFor="Name" className="text-zinc-400 absolute -translate-x-full translate-y-[50%]">Hotel name: </label>
                            <input
                                type="text"
                                name="Name"
                                placeholder={hotelDetail.data.name}
                                className="w-full max-w-full ml-2 px-5 py-3 bg-[rgba(217,217,217,0.1)] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary text-white"
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="Address" className="text-zinc-400 absolute -translate-x-full translate-y-[50%]">Address: </label>
                            <input
                                type="text"
                                name="Address"
                                placeholder={hotelDetail.data.address}
                                className="w-full max-w-full ml-2 px-5 py-3 bg-[rgba(217,217,217,0.1)] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary text-white"
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="District" className="text-zinc-400 absolute -translate-x-full translate-y-[50%]">District: </label>
                            <input
                                type="text"
                                name="District"
                                placeholder={hotelDetail.data.district}
                                className="w-full max-w-full ml-2 px-5 py-3 bg-[rgba(217,217,217,0.1)] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary text-white"
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="Province" className="text-zinc-400 absolute -translate-x-full translate-y-[50%]">Province: </label>
                            <input
                                type="text"
                                name="Province"
                                placeholder={hotelDetail.data.province}
                                className="w-full max-w-full ml-2 px-5 py-3 bg-[rgba(217,217,217,0.1)] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary text-white"
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="Postalcode" className="text-zinc-400 absolute -translate-x-full translate-y-[50%]">Postalcode: </label>
                            <input
                                type="text"
                                name="Postalcode"
                                placeholder={hotelDetail.data.postalcode}
                                className="w-full max-w-full ml-2 px-5 py-3 bg-[rgba(217,217,217,0.1)] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary text-white"
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="Tel" className="text-zinc-400 absolute -translate-x-full translate-y-[50%]">Tel: </label>
                            <input
                                type="text"
                                name="Tel"
                                placeholder={hotelDetail.data.tel}
                                className="w-full max-w-full ml-2 px-5 py-3 bg-[rgba(217,217,217,0.1)] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary text-white"
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="Picture" className="text-zinc-400 absolute -translate-x-full translate-y-[50%]">Picture: </label>
                            <input
                                type="text"
                                name="Picture"
                                placeholder={hotelDetail.data.picture}
                                className="w-full max-w-full ml-2 px-5 py-3 bg-[rgba(217,217,217,0.1)] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary text-white"
                            />
                        </div>
                        <div className="w-[100%] md:ml-10 mt-10 md:mt-0 text-black">
                            <div className='flex flex-row gap-3'>
                                <div className='flex flex-wrap gap-3'>
                                    {
                                        hotelDetail.data.tags.map((tag) => (
                                            <div key={tag} className="bg-[#f3f4f6] rounded-lg px-5 py-2 h-10 shadow-lg" onClick={() => {toggleTag(tag)}}>
                                                {tag}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="ml-auto mr-auto mt-4 px-4 py-2 text-nowrap bg-secondary rounded-lg flex items-center font-bold text-primary hover:bg-black border border-primaryWhite hover:border-none" type="submit">
                        Update <FaPaperPlane className="ml-2" />
                    </button>
                </form>
            </div>
            </div>
        </main>
    );
  }
  