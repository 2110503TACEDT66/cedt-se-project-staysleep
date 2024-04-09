export default async function deleteBooking(bookingId:string, token: string) {
    const response = await fetch(`https://hotel-reservation-api-phi.vercel.app/api/v1/bookings/${bookingId}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      }
    });
  
    return await response.json();
  }