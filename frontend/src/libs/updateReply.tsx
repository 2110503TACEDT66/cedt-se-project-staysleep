export default async function updateReply(id:string, token:string, message:string, rid:string) {
    
    const response = await fetch(`https://hotel-reservation-api-phi.vercel.app/api/v1/replys/${id}`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            message: message,
            createdAt: Date.now,
        }),
    })
    if(!response.ok){
        throw new Error("Failed to update reply")
    }

    return await response.json()
}
