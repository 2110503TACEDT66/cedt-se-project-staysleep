'use client'
import React, { useState, useEffect } from 'react';
import Card from "./Card";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { Rating } from '@mui/material';
import { hotelItem } from '@/interface';
import { reviewItem } from '@/interface';

export default function HotelCatalog() {
    const [search, setSearch] = useState('');
    const [rating, setRating] = useState(0);
    const [hotels, setHotels] = useState([]);
    console.log(rating);
    useEffect(() => {fetchData(search)}, [search]);

    const fetchData = (value:string) => {
        fetch(`${process.env.BACKEND_URL}/api/v1/hotels?search=${encodeURIComponent(value)}`)
            .then((response) => response.json())
            .then((json) => {
                setHotels(json.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    return (
        <>  
            <div className="text-black  max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md flex flex-column items-center">
                <FaSearch className=" mr-2" />
                <input
                    className="w-full focus:outline-none"
                    type="text"
                    placeholder="Type to search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(e, newValue) => setRating(newValue !== null ? newValue : 0)}
                />
            </div>

            <div style={{ margin: "20px", display: "flex", flexDirection: "column", flexWrap: "wrap", justifyContent: "space-around", alignContent: "space-around", color: "black" }}>
                {hotels
                    .filter((hotelItem: hotelItem) => {
                        const lowercaseSearch = search.toLowerCase();
                        return lowercaseSearch === '' ? hotelItem : hotelItem.name.toLowerCase().includes(lowercaseSearch);
                    })
                    .filter((hotelItem: hotelItem) => {
                        if (rating === 0) return true;
                        let reviewStar = 0;
                        hotelItem.reviews.forEach((reviewItem: reviewItem) => reviewStar += reviewItem.star);
                        reviewStar = (reviewStar / hotelItem.reviews.length);
                        if (isNaN(reviewStar)) reviewStar = 0;
                        return reviewStar >= rating;
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
