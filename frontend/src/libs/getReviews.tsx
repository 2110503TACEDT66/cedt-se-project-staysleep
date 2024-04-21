export default async function getReviews() {
    
    const response = await fetch("https://hotel-reservation-api-phi.vercel.app/api/v1/reviews",{cache: 'no-store'})
    if(!response.ok){
        throw new Error("Failed to fetch review")
    }

    return await response.json()
}

// https://vaccine-app-backend.vercel.app/api/v1/hospitals
// https://hotel-reservation-api-phi.vercel.app/api/v1/reviews
// http://localhost:5000/api/v1/reviews