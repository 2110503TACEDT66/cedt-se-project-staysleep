'use server';
const updateHotel = async (
    token: string,
    hotelId: string,
    name: string,
    address: string,
    distric: string,
    province: string,
    postalcode: string,
    tel: string,
    picture: string,
    tags: string[]
) => {
    const response = await fetch(
        `${process.env.BACKEND_URL}/api/v1/hotels/${hotelId}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: name,
                address: address,
                district: distric,
                province: province,
                postalcode: postalcode,
                tel: tel,
                picture: picture,
                tags: tags,
            }),
        }
    );
    const data = await response.json();
    return data;
};

export default updateHotel;
