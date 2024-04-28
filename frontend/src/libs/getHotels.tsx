"use server";
export default async function getHotels(search?: string) {

    // await new Promise ((resolve)=>setTimeout(resolve, 2000))

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/hotels?search=${encodeURIComponent(search ?? "")}`, { cache: 'no-store' })
    if (!response.ok) {
        throw new Error("Failed to fetch hotels")
    }

    return await response.json()
}
