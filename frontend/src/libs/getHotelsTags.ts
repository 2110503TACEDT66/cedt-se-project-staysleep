"use server";
const getHotelsTags = async () => {
    const response = await fetch(
        `${process.env.BACKEND_URL}/api/v1/hotels/tags`
    );
    const data = await response.json();
    return data;
};

export default getHotelsTags;
