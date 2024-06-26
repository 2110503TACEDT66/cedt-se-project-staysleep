"use server";
export default async function addBooking(userId:string, bookingStart: string, bookingEnd: string, hotelId: string, roomId: string, token: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/hotels/${hotelId}/bookings/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ user:userId, bookingbegin: bookingStart, bookingend: bookingEnd, room: roomId}),
    });
  
    return await response.json();
  }