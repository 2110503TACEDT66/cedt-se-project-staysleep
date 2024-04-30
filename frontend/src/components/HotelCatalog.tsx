'use client'
import React, { useState, useEffect } from 'react';
import Card from "./Card";
import Link from "next/link";
import { Rating } from '@mui/material';
import { hotelItem } from '@/interface';
import { reviewItem } from '@/interface';
import Image from 'next/image';
import { TbMoodCry, TbSearch } from 'react-icons/tb';
import { useSession } from 'next-auth/react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SettingsIcon from '@mui/icons-material/Settings';
import getHotels from '@/libs/getHotels';
import getHotelsTags from '@/libs/getHotelsTags';
import deleteHotelsTags from '@/libs/deleteHotelsTags';
import createHotelsTags from '@/libs/createHotelsTags';
import { GiIsland } from "react-icons/gi";
import { set } from 'node_modules/cypress/types/lodash';

export default function HotelCatalog({ userRole }: { userRole: string }) {
    const [search, setSearch] = useState('');
    const [rating, setRating] = useState(0);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [hotels, setHotels] = useState([]);
    const [tags, setTags] = useState([]);
    const [visible, setVisible] = useState(false);
    const [addtag, setAddtag] = useState('');
    const [error, setError] = useState(false);

    const [hotels_filtered, setHotels_filtered] = useState([]);

    const session = useSession();
    if (!session || !session.data?.user.token) return null;

    useEffect(() => {
        fetchData(search);
        fetchTags();
    }, [search]);

    useEffect(() => {
        setHotels_filtered(hotels
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
        );
    }, [hotels, search, rating, selectedTags]);

    const fetchData = async (value: string) => {
        await getHotels(value)
            .then((res) => {
                setHotels(res.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const fetchTags = async () => {
        await getHotelsTags()
            .then((res) => {
                console.log('Tags data:', res); // Log the response
                if (Array.isArray(res.data.tags)) {
                    setTags(res.data.tags); // Extract tags array
                } else {
                    console.error('Tags data is not an array:', res.data);
                }
            })
            .catch((error) => {
                console.error('Error fetching tags:', error);
            });
    };

    const fetchDeleteTag = async (tag: string) => {
        await deleteHotelsTags(session.data.user.token, tag)
            .then((res) => { console.log('Tags data:', res, 'Delete tag:', tag); })// Log the response
            .then(() => fetchTags());
    }

    const fetchaAddTag = async (tag: string) => {
        if (tag === "") return setError(true);
        await createHotelsTags(session.data.user.token, tag)
            .then((res) => { console.log('Tags data:', res, 'Add tag:', tag); setAddtag(""); setVisible(false); })// Log the response
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
        <div className='z-0'>
            <div className='w-full flex flex-col justify-center items-center relative z-20'>
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


                    <div className="tags-container flex flex-row items-center flex-wrap justify-center gap-2 mt-2 ">
                        {/* button tag */}
                        {tags.map((tag, index) => (
                            <div
                                key={index}
                                className={`flex flex-wrap`}
                            >
                                <div
                                    className={`flex flex-wrap gap-1 px-5 py-2 text-nowrap ${userRole === 'admin' && visible ? 'rounded-l-lg' : 'rounded-lg hover:translate-y-[-3px] hover:text-primary hover:bg-black hover:shadow-md'} transition-all duration-250 ease-in-out shadow-sm ${selectedTags.includes(tag) ? 'bg-neutral-950 text-amber-400' : 'bg-primary/70 text-secondary'}`}
                                    onClick={() => { visible ? "" : toggleTag(tag) }}
                                >
                                    {tag}
                                </div>
                                {
                                    userRole === 'admin' && visible ?
                                        <div
                                            className='flex flex-wrap justify-center px-2 bg-red-600/70 rounded-r-lg hover:bg-red-900 transition-all duration-250 ease-in-out shadow-sm hover:shadow-md'
                                            onClick={() => fetchDeleteTag(tag)}
                                        >
                                            <Image src="/icon/deleicon.png" alt="Edit icon" width={12} height={12} style={{ objectFit: "contain" }} className='!relative' />
                                        </div>
                                        :
                                        null
                                }
                            </div>

                        ))}
                        {
                            userRole === 'admin' ?

                                <div className='h-5 w-5 ' onClick={() => {
                                    setVisible(!visible);
                                }}>
                                    {
                                        !visible ? <SettingsIcon className="items-center" color="action" /> : <HighlightOffIcon color="action" />
                                    }

                                    {/* <Image src={`${!visible? "/icon/gearicon.png":"/icon/addicon.png"}`} alt="Edit icon" fill style={{ objectFit: "contain" }} className={`!relative mt-3 ml-1 rotate-45 `}/> */}
                                </div>
                                : null
                        }
                    </div>
                    {
                        visible ?
                            <div>
                                <div className="justify-center mt-3 gap-2">
                                    <input
                                        className={`focus:outline-none bg-white/95 rounded-lg shadow-md p-2 w-80 mx-30 text-gray-600 ${error ? "border border-red-300" : null}`}
                                        type="text"
                                        placeholder="Type to add tag..."
                                        value={addtag}
                                        onChange={(e) => { setAddtag(e.target.value); setError(false); }}
                                        onKeyPress={(e) => { e.key === 'Enter' && fetchaAddTag(addtag) }}
                                    />
                                    <button onClick={() => fetchaAddTag(addtag)} className='ml-10 text-black'>Add</button>
                                </div>
                                {
                                    error ?
                                        <span className='text-red-600'>Please fill the tag</span>
                                        : null
                                }
                            </div>
                            : null
                    }
                </div>
            </div>

            <div className='relative pb-[7rem] z-0'>
                <div className='w-[95%] min-h-[50vh] h-full absolute -top-[7rem] left-1/2 -translate-x-1/2 bg-[url(/img/bg2.png)] -z-10 rounded-3xl bg-[length:1500px] bg-repeat'></div>
                <div className='' style={{ margin: "20px", display: "flex", flexDirection: "column", flexWrap: "wrap", justifyContent: "space-around", alignContent: "space-around", color: "black" }}>
                    {hotels_filtered.length === 0
                        ? <div className="text-[7rem] font-extrabold text-primaryWhite">
                            <GiIsland className="inline-block mb-2 h-[10rem] w-[10rem]" />
                            <div className='text-sm'>No hotel found</div>
                        </div>
                        : hotels_filtered.map((hotelItem: hotelItem) => (
                            <Link href={`/hotel/${hotelItem.id}`} className="mt-5 w-[55%]" key={hotelItem.id}>
                                <Card hotelItem={hotelItem} />
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
