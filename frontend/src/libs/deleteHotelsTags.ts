"use server";
const deleteHotelsTags = async (token: string, tag: string) => {
    const response = await fetch(
        `${process.env.BACKEND_URL}/api/v1/hotels/tags`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                tag: [tag],
            }),
        }
    );
    const data = await response.json();
    return data;
};

export default deleteHotelsTags;
