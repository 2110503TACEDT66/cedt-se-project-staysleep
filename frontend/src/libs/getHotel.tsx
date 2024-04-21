export default async function getHotel(id: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/hotels/${id}`, { cache: 'no-store' })
    if (!response.ok) {
        throw new Error("Failed to fetch hotel")
    }

    return await response.json()
}


// http://localhost:5000/api/v1/hotels/
// ${process.env.BACKEND_URL}/api/v1/hotels/