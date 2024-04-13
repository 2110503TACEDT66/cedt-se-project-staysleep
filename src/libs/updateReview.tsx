export default async function updateReview(id:string, token:string, message:string, star:number) {
    
    const response = await fetch(`https://hotel-reservation-api-phi.vercel.app/api/v1/reviews/${id}`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            message: message, 
            star: star}),
    })
    if(!response.ok){
        throw new Error("Failed to update review")
    }

    return await response.json()
}

// https://vaccine-app-backend.vercel.app/api/v1/hospitals
// https://hotel-reservation-api-phi.vercel.app/api/v1/reviews/:id
// http://localhost:5000/api/v1/reviews/:id
