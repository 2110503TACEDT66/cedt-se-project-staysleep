'use client'
import React, { useState, useEffect } from 'react';
import Card from "./Card";
import Link from "next/link";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { FaSearch } from "react-icons/fa";

export default function HotelCatalog() {
    const [search, setSearch] = useState('');
    const [hotels, setHotels] = useState([]);

    useEffect(() => {fetchData(search)}, [search]);

    const fetchData = (value) => {
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
            <div className="text-black  max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md flex items-center">
                <FaSearch className=" mr-2" />
                <input
                    className="w-full focus:outline-none"
                    type="text"
                    placeholder="Type to search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div style={{ margin: "20px", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", alignContent: "space-around", color: "black" }}>
                {hotels
                    .filter((hotelItem) => {
                        const lowercaseSearch = search.toLowerCase();
                        return lowercaseSearch === '' ? hotelItem : hotelItem.name.toLowerCase().includes(lowercaseSearch);
                    })
                    .map((hotelItem) => (
                        <Link href={`/hotel/${hotelItem.id}`} className="w-[100%] sm:w-[30%] lg:w-[25%] p-2 sm:p-4 lg:p-8 " key={hotelItem.id}>
                        <Card review={hotelItem.reviews} hotelName={hotelItem.name} imgSrc={hotelItem.picture} />
                        </Link>
                    ))
                }
            </div>
        </>
    );
}
