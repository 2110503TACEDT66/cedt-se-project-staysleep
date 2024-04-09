export default async function getHotel(id:string) {    
    const response = await fetch(`https://hotel-reservation-api-phi.vercel.app/api/v1/hotels/${id}`,{cache: 'no-store'})
    if(!response.ok){
        throw new Error("Failed to fetch hotel")
    }

    return await response.json()
}


// http://localhost:5000/api/v1/hotels/
// https://hotel-reservation-api-phi.vercel.app/api/v1/hotels/