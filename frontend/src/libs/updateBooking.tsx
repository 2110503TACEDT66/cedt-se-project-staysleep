"use server";
export default async function updateBooking(bookingId: string, bookingStart: string, bookingEnd: string, token: string) {
  const response = await fetch(`${process.env.BACKEND_URL}/api/v1/bookings/${bookingId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ bookingbegin: bookingStart, bookingend: bookingEnd }),
  });

  return await response.json();
}