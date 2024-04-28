"use server";
const deleteHotelsTags = async (token: string, tag: string) => {
    const response = await fetch(
        `${process.env.BACKEND_URL}/api/v1/hotels/tags`
    );
    const data = await response.json();
    return data;
};

export default deleteHotelsTags;
