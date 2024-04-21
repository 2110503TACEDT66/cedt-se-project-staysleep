import getReview from "./getReview"
import getUserProfile from "./getUserProfile"

export default async function createReply(token: string, userID: string, rid: string, message: string) {

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/replys`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            review: rid,
            user: userID,
            message: message,
        }),
    })
    if (!response.ok) {
        throw new Error("Failed to create reply")
    }

    return await response.json()
}
