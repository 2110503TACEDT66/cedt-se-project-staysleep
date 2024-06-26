"use server";
export default async function getRoom(id: string) {

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/rooms/${id}`, { cache: 'no-store' })
    if (!response.ok) {
        throw new Error("Failed to fetch room")
    }

    return await response.json()
}

// https://vaccine-app-backend.vercel.app/api/v1/hospitals
// ${process.env.BACKEND_URL}/api/v1/reviews/:id
// http://localhost:5000/api/v1/reviews/:id
