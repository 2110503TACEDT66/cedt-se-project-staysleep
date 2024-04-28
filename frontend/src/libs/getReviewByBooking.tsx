"use server";
import { reviewItem } from "@/interface"

export default async function getReviewByBooking(id: string): Promise<reviewItem | null> {
  const response = await fetch(`${process.env.BACKEND_URL}/api/v1/bookings/${id}/reviews`, { cache: 'no-store' })
  if (!response.ok) {
    return null
  }

  return await response.json().then((data) => data.data)
}

// https://vaccine-app-backend.vercel.app/api/v1/hospitals
// ${process.env.BACKEND_URL}/api/v1/reviews/:id
// http://localhost:5000/api/v1/reviews/:id
