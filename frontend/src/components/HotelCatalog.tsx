'use client'
import React, { useState, useEffect } from 'react';
import Card from "./Card";
import Link from "next/link";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

export default function HotelCatalog() {
    const [search, setSearch] = useState('');
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        fetchData(search);
    }, [search]);

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
            <Form>
                <InputGroup className='my-3 text-black'>
                    <Form.Control
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder='Search hotels'
                        value={search}
                    />
                </InputGroup>
            </Form>
            <h2 className="text-black">Explore {hotels.length} hotels in our list</h2>
            <div style={{ margin: "20px", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", alignContent: "space-around", color: "black" }}>
                {hotels
                    .filter((hotelItem) => {
                        return search.toLowerCase() === ''
                        ? hotelItem
                        : hotelItem.name.toLowerCase().includes(search);
                    })
                    .map((hotelItem) => (
                        <Link href={`/hotel/${hotelItem.id}`} className="w-1/5" key={hotelItem.id}>
                        <Card review={hotelItem.reviews} hotelName={hotelItem.name} imgSrc={hotelItem.picture} />
                        </Link>
                    ))
                }
            </div>
        </>
    );
}
