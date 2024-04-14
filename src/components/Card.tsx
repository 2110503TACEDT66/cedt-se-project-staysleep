import Image  from 'next/image';
import InteractiveCard from './InteractiveCard';
import { reviewItem } from '@/interface';

export default async function Card({ review, hotelName, imgSrc} : {review:reviewItem[], hotelName: string, imgSrc:string}){
    let reviewStar = 0;
    review.map((reviewItem:reviewItem) => reviewStar += reviewItem.star);
    reviewStar = (reviewStar/review.length);
    if (isNaN(reviewStar)) reviewStar = 0;
    reviewStar = Math.round(reviewStar * 10) / 10;

    return(
        <InteractiveCard contentName= {hotelName}>
            <div className = 'w-full h-[70%] relative rounded-t-lg'>
                <Image src = {imgSrc}
                alt = 'Product Picture'
                fill = {true}
                className = 'object-cover rounded-t-lg'/>
            </div>
            <div className = 'w-full h-[15%] p-[10px] flex items-center pt-11'>
                <div className='flex-1'>{hotelName}</div>
                <div className='bg-[#f3f4f6] rounded-lg width-full p-4 ml-2 text-[#7881a9]'>
                    <div className='text-lg'>{reviewStar} ⭐</div>
                    <div className='text-xs'>{review.length} reviews</div>
                </div>
            </div>
        </InteractiveCard>
    );
}
