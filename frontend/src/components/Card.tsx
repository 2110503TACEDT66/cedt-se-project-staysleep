import Image from 'next/image';
import { reviewItem } from '@/interface';
import { hotelItem } from '@/interface';

export default function Card({hotelItem} : {hotelItem: hotelItem}) {
    let reviewStar = 0;
    hotelItem.reviews.map((reviewItem: reviewItem) => reviewStar += reviewItem.star);
    reviewStar = (reviewStar / hotelItem.reviews.length);
    if (isNaN(reviewStar)) reviewStar = 0;
    reviewStar = Math.round(reviewStar * 10) / 10;

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
                            hotelItem.tags.map((tag) => (
                                <div key={tag} className="bg-[#f3f4f6] rounded-lg px-5 py-2 h-10 shadow-lg ">
                                    {tag}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
