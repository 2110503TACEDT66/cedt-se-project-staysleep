import Image from 'next/image';
import { reviewItem } from '@/interface';
import { hotelItem } from '@/interface';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { round, set } from 'node_modules/cypress/types/lodash';

export default function Card({hotelItem, visible, fetchaAddTag} : {hotelItem: hotelItem, visible: boolean,  fetchaAddTag: Function}) {
    const [addTagHotel,setAddTagHotel] = useState('');
    const session = useSession();
    const [tags, setTags] = useState(hotelItem.tags);
    if (!session || !session.data?.user.token) return null;

    let reviewStar = 0;
    hotelItem.reviews.map((reviewItem: reviewItem) => reviewStar += reviewItem.star);
    reviewStar = (reviewStar / hotelItem.reviews.length);
    if (isNaN(reviewStar)) reviewStar = 0;
    reviewStar = Math.round(reviewStar * 10) / 10;

    const fetchAddTagHotel = (tag: string) => {
        if(tag === '') return;
        fetch(`${process.env.BACKEND_URL}/api/v1/hotels/${hotelItem.id}/tags`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${session.data.user.token}`,
            },
            body: JSON.stringify({ tags: [tag] }),
        })
            .then((response) => response.json())
            .then((json) => {
                setTags(json.data.tags);
                setAddTagHotel('');
                console.log('Add tag hotel response:', json); // Log the response
                fetchaAddTag(tag);
            })
    }
    
    const fetchDeleteTagHotel = (tag: string) => {
        fetch(`${process.env.BACKEND_URL}/api/v1/hotels/${hotelItem.id}/tags`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${session.data.user.token}`,
            },
            body: JSON.stringify({ tag: [tag] }),
        })
            .then((response) => response.json())
            .then((json) => {
                setTags(json.data.tags);
                console.log('Delete tag hotel response:', json); // Log the response
        })
    }

    return (
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg p-5">
            <div className="">
                <Image src={hotelItem.picture} alt="Hotel Image" width={500} height={300} className="rounded-lg" />
            </div>
            <div className="md:w-2/3 md:ml-10 mt-10 md:mt-0 text-black ">
                <div>
                    <div className='text-2xl font-semibold mb-2 mt-4'>{hotelItem.name}</div>
                    <div className='text-left mt-4'>{hotelItem.address}</div>
                    <div className='text-left mt-4'>{hotelItem.district}, {hotelItem.province}, {hotelItem.postalcode}</div>
                    <div className='text-left mt-4 mb-4'>tel: {hotelItem.tel}</div>
                </div>
                <div className='flex flex-row gap-3'>
                    <div className="bg-[#f3f4f6] rounded-lg p-4 text-[#7881a9] w-[25%] shadow-lg h-fit">
                        <div className='text-lg'>{reviewStar} ⭐</div>
                        <div className='text-xs'>{hotelItem.reviews.length} reviews</div>
                    </div>
                    <div className='grid grid-cols-3 gap-3'>
                        {
                            tags.map((tag) => (
                                <div key={tag} className='flex flex-row' onClick={(e) => {e.preventDefault(); e.stopPropagation();}}>
                                    <div className={`bg-[#f3f4f6] ${visible? "rounded-l-lg":"rounded-lg"} px-5 py-2 h-10 shadow-lg`}>{tag}</div>
                                    {
                                        visible?
                                            <div
                                                className='flex flex-wrap justify-center px-2 py-2 h-10 bg-red-600/70 rounded-r-lg hover:bg-red-900 transition-all duration-250 ease-in-out shadow-sm hover:shadow-md'
                                                onClick={(e) => {fetchDeleteTagHotel(tag); e.stopPropagation(); e.preventDefault();}}
                                                >
                                                <Image src="/icon/deleicon.png" alt="calendar icon" width={12} height={12} style={{ objectFit: "contain" }} className='!relative' />
                                            </div>
                                        :
                                            null
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
                {
                    visible?
                    <div className=" justify-center mt-3 gap-2">
                        <input
                            style={{width: '15rem'}}
                            className="focus:outline-none bg-white/95 rounded-lg shadow-md p-2 w-80 mx-30"
                            type="text"
                            placeholder="Type to add tag..."
                            value={addTagHotel}
                            onChange={(e) => setAddTagHotel(e.target.value)}
                            onClick={(e) => {e.stopPropagation(); e.preventDefault();}}
                            onKeyPress={(e) => {e.key === 'Enter' && fetchAddTagHotel(addTagHotel)}}
                        />
                        <button onClick={(e) => {fetchAddTagHotel(addTagHotel); e.stopPropagation(); e.preventDefault();}} className='ml-10'>Add</button>
                    </div>
                    :null
                }
            </div>
        </div>
    );
}
