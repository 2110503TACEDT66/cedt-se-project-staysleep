'use client'
import React, { useState, useEffect } from 'react';
import Card from "./Card";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { Rating, TextField } from '@mui/material';
import { hotelItem } from '@/interface';
import { reviewItem } from '@/interface';
<<<<<<< HEAD
import { useSession } from 'next-auth/react';
import getUserProfile from '@/libs/getUserProfile';
import Image from 'next/image';
=======
import { TbSearch } from 'react-icons/tb';
>>>>>>> 998cd829a6cb097ec5f456410739032defdd7af3

export default function HotelCatalog({userRole} : {userRole:string}) {
    const [search, setSearch] = useState('');
    const [rating, setRating] = useState(0);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [hotels, setHotels] = useState([]);
    const [tags, setTags] = useState([]);

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

 
                    <div className="tags-container flex flex-wrap justify-center gap-2 mt-5">
                        {/* button tag */}
                        {tags.map((tag, index) => (
                            <button
                                key={index}
                                className={`px-5 py-2 text-nowrap rounded-lg text-secondary bg-primary/70 hover:text-primary hover:bg-black hover:translate-y-[-3px] transition-all duration-250 ease-in-out shadow-sm hover:shadow-md ${selectedTags.includes(tag) ? 'bg-blue-500 text-white' : ''}`}
                                onClick={() => toggleTag(tag)}
                            >
                                {tag}
                            </button>
                        ))}
                        {
                            userRole ==='admin'?
                            
                            <div className='h-5 w-5 items-center'>
                                <Image src="/icon/addicon.png" alt="calendar icon" fill style={{ objectFit: "contain" }} className='!relative ' />
                            </div>
                            :null
                        }
                    </div>
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
                            <Card review={hotelItem.reviews} hotelName={hotelItem.name} imgSrc={hotelItem.picture} address={hotelItem.address} district={hotelItem.district} province={hotelItem.province} postalcode={hotelItem.postalcode} tel={hotelItem.tel} />
                        </Link>
                    ))
                }
            </div>
        </>
    );
}
