"use server";
'use server';

import { BookingItem } from "@/interface";

export default async function createReview(token: string, userID: string, hid: string, message: string, star: number, bookingID: BookingItem) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/hotels/${hid}/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            hotel: hid,
            user: userID,
            message: message,
            star: star,
            booking: bookingID,
        }),
    })
    if (!response.ok) {
        throw new Error("Failed to create review")
    }

    return await response.json()
}
