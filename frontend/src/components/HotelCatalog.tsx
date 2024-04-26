'use client'
import React, { useState, useEffect } from 'react';
import Card from "./Card";
import Link from "next/link";
import { Rating } from '@mui/material';
import { hotelItem } from '@/interface';
import { reviewItem } from '@/interface';
import Image from 'next/image';
import { TbSearch } from 'react-icons/tb';
import { useSession } from 'next-auth/react';

export default function HotelCatalog({userRole} : {userRole:string}) {
    const [search, setSearch] = useState('');
    const [rating, setRating] = useState(0);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [hotels, setHotels] = useState([]);
    const [tags, setTags] = useState([]);
    const [visible,setVisible] = useState(false);
    const [addtag,setAddtag] = useState('');
    
    const session = useSession();
    if (!session || !session.data?.user.token) return null;

    useEffect(() => {
        fetchData(search);
        fetchTags();
    }, [search]);

    const fetchData = (value: string) => {
        fetch(`${process.env.BACKEND_URL}/api/v1/hotels?search=${encodeURIComponent(value)}`)
            .then((response) => response.json())
            .then((json) => {
                setHotels(json.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const fetchTags = () => {
        fetch(`${process.env.BACKEND_URL}/api/v1/hotels/tags`)
            .then((response) => response.json())
            .then((json) => {
                console.log('Tags data:', json); // Log the response
                if (Array.isArray(json.data.tags)) {
                    setTags(json.data.tags); // Extract tags array
                } else {
                    console.error('Tags data is not an array:', json.data);
                }
            })
            .catch((error) => {
                console.error('Error fetching tags:', error);
            });
    };
    
    const fetchDeleteTag = (tag: string) => {
        fetch(`${process.env.BACKEND_URL}/api/v1/hotels/tags`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${session.data.user.token}`,
                },
                body: JSON.stringify({
                    tag: [tag]
                })}
            ).then((response) => response.json())
            .then((json) => {console.log('Tags data:', json, 'Delete tag:', tag); })// Log the response
            .then(() => fetchTags());
    }
    
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
            .then((json) => {console.log('Tags data:', json, 'Add tag:', tag); setAddtag(""); })// Log the response
            .then(() => fetchTags());
    }

    const toggleTag = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };


    return (
        <>
            <div className='w-full flex flex-col justify-center items-center'>
                <div className="text-black max-w-lg p-4 bg-white rounded-lg shadow-md flex flex-row items-center z-10">
                    <TbSearch className="inline-block h-5 w-5 mr-2 fill-primary" />
                    <input
                        className="w-full focus:outline-none"
                        type="text"
                        placeholder="Type to search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className='w-[40rem] p-5 rounded-md bg-white/95 -translate-y-5 z-0'>
                    <div className="tags-container mt-5">
                        {/* Rating */}
                        <Rating
                            name="simple-controlled"
                            value={rating}
                            onChange={(e, newValue) => setRating(newValue !== null ? newValue : 0)}
                        />
                    </div>

 
                    <div className="tags-container flex flex-wrap justify-center gap-2 mt-2 ">
                        {/* button tag */}
                        {tags.map((tag, index) => (
                            <div
                                key={index}
                                className={`flex flex-wrap`}
                            >
                                <div
                                    className={`flex flex-wrap gap-1 px-5 py-2 text-nowrap ${userRole === 'admin' && visible? 'rounded-l-lg': 'rounded-lg hover:translate-y-[-3px] hover:text-primary hover:bg-black hover:shadow-md'}  text-secondary bg-primary/70  transition-all duration-250 ease-in-out shadow-sm ${selectedTags.includes(tag) ? 'bg-black text-yellow-400' : ''}`}
                                    onClick={() => {visible? "":toggleTag(tag)}}
                                >{tag}</div>
                                {
                                    userRole ==='admin' && visible?
                                        <div
                                            className='flex flex-wrap justify-center px-2 bg-red-600/70 rounded-r-lg hover:bg-red-900 transition-all duration-250 ease-in-out shadow-sm hover:shadow-md'
                                            onClick={() => fetchDeleteTag(tag)}
                                            >
                                            <Image src="/icon/deleicon.png" alt="calendar icon" width={12} height={12} style={{ objectFit: "contain" }} className='!relative' />
                                        </div>
                                    :
                                        null
                                }
                            </div>
                        ))}
                        {
                            userRole ==='admin'?
                            
                            <div className='h-5 w-5 items-center' onClick={() => {
                                setVisible(!visible);
                            }}>
                                <Image src={`${!visible? "/icon/gearicon.png":"/icon/addicon.png"}`} alt="calendar icon" fill style={{ objectFit: "contain" }} className={`!relative mt-3 ml-1 rotate-45 `}/>
                            </div>
                            :null
                        }
                    </div>
                    {
                            visible?
                            <div className=" justify-center mt-3 gap-2">
                                <input
                                    className="focus:outline-none bg-white/95 rounded-lg shadow-md p-2 w-80 mx-30"
                                    type="text"
                                    placeholder="Type to add tag..."
                                    value={addtag}
                                    onChange={(e) => setAddtag(e.target.value)}
                                    onKeyPress={(e) => {e.key === 'Enter' && fetchaAddTag(addtag)}}
                                />
                                <button onClick={() => fetchaAddTag(addtag)} className='ml-10'>Add</button>
                            </div>
                            :null
                    }
                </div>
            </div>

            <div style={{ margin: "20px", display: "flex", flexDirection: "column", flexWrap: "wrap", justifyContent: "space-around", alignContent: "space-around", color: "black" }}>
                {hotels
                    .filter((hotelItem: hotelItem) => {
                        // Filter by searching
                        const lowercaseSearch = search.toLowerCase();
                        return lowercaseSearch === '' ? hotelItem : hotelItem.name.toLowerCase().includes(lowercaseSearch);
                    })
                    .filter((hotelItem: hotelItem) => {
                        // Filter by selected rating
                        if (rating === 0) return true;
                        let reviewStar = 0;
                        hotelItem.reviews.forEach((reviewItem: reviewItem) => reviewStar += reviewItem.star);
                        reviewStar = (reviewStar / hotelItem.reviews.length);
                        if (isNaN(reviewStar)) reviewStar = 0;
                        return reviewStar >= rating;
                    })
                    .filter((hotelItem: hotelItem) => {
                        // Filter by selected tags
                        if (selectedTags.length === 0) return true;
                        return selectedTags.every((tag) => hotelItem.tags.includes(tag));
                    })
                    .map((hotelItem: hotelItem) => (
                        <Link href={`/hotel/${hotelItem.id}`} className="mt-5" key={hotelItem.id}>
                            <Card hotelItem={hotelItem} visible={visible} fetchaAddTag={fetchaAddTag}/>
                        </Link>
                    ))
                }
            </div>
        </>
    );
}
