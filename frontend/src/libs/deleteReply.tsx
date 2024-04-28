"use server";
export default async function deleteReply(replyId: string, token: string) {
  const response = await fetch(`${process.env.BACKEND_URL}/api/v1/replys/${replyId}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    }
  });

  return await response.json();
}