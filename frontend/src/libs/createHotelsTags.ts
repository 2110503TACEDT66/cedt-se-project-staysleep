"use server";
const createHotelsTags = async (token: string, tag: string) => {
    const response = await fetch(
        `${process.env.BACKEND_URL}/api/v1/hotels/tags`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                tags: [tag],
            }),
        }
    );
    const data = await response.json();
    return data;
};

export default createHotelsTags;
