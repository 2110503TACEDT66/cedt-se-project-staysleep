import Image from 'next/image';
import { reviewItem } from '@/interface';

export default function Card({ review, hotelName, imgSrc, address, district, province, postalcode, tel }: { review: reviewItem[], hotelName: string, imgSrc: string, address: string, district: string, province: string, postalcode: string, tel: string }) {
    let reviewStar = 0;
    review.map((reviewItem: reviewItem) => reviewStar += reviewItem.star);
    reviewStar = (reviewStar / review.length);
    if (isNaN(reviewStar)) reviewStar = 0;
    reviewStar = Math.round(reviewStar * 10) / 10;

    return (
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg p-5">
            <div className="">
                <Image src={imgSrc} alt="Hotel Image" width={500} height={300} className="rounded-lg" />
            </div>
            <div className="md:w-2/3 md:ml-10 mt-10 md:mt-0 text-black ">
                <div>
                    <div className='text-2xl font-semibold mb-2 mt-4'>{hotelName}</div>
                    <div className='text-left mt-4'>{address}</div>
                    <div className='text-left mt-4'>{district}, {province}, {postalcode}</div>
                    <div className='text-left mt-4 mb-4'>tel: {tel}</div>
                </div>
                <div className="bg-[#f3f4f6] rounded-lg p-4 text-[#7881a9] w-[25%]">
                    <div className='text-lg'>{reviewStar} ⭐</div>
                    <div className='text-xs'>{review.length} reviews</div>
                </div>
            </div>
        </div>
    );
}
