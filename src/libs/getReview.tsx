export default async function getReview(id:string) {
    
    const response = await fetch(`https://hotel-reservation-api-phi.vercel.app/api/v1/reviews/${id}`,{cache: 'no-store'})
    if(!response.ok){
        throw new Error("Failed to fetch reviews")
    }

    return await response.json()
}

// https://vaccine-app-backend.vercel.app/api/v1/hospitals
// https://hotel-reservation-api-phi.vercel.app/api/v1/reviews/:id
// http://localhost:5000/api/v1/reviews/:id
