import getHotel from "./getHotel"
import getUserProfile from "./getUserProfile"

export default async function createReview(token:string, hid:string, message:string, star:number) {
    
    const response = await fetch(`https://hotel-reservation-api-phi.vercel.app/api/v1/hotels/${hid}/reviews`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            hotel: await getHotel(hid),
            user: await getUserProfile(token),
            message: message,
            star: star,
        }),
    })
    if(!response.ok){
        throw new Error("Failed to create review")
    }

    return await response.json()
}
