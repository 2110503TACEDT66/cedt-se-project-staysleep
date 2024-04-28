"use server";
export default async function deleteReview(reviewId: string, token: string) {
  const response = await fetch(`${process.env.BACKEND_URL}/api/v1/reviews/${reviewId}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    }
  });

  return await response.json();
}