import Image from 'next/image';
import { reviewItem } from '@/interface';
import { hotelItem } from '@/interface';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import SettingsIcon from '@mui/icons-material/Settings';

export default function Card({hotelItem} : {hotelItem: hotelItem}) {
    const router = useRouter()
    const session = useSession();
    if (!session || !session.data?.user.token) return null;

    let reviewStar = 0;
    hotelItem.reviews.map((reviewItem: reviewItem) => reviewStar += reviewItem.star);
    reviewStar = (reviewStar / hotelItem.reviews.length);
    if (isNaN(reviewStar)) reviewStar = 0;
    reviewStar = Math.round(reviewStar * 10) / 10;

    return (
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg p-5 my-2 w-full">
            <div>
                <Image src={hotelItem.picture} alt="Hotel Image" width={500} height={300}  className="rounded-lg object-cover" />
            </div>
            <div className="md:w-2/3 md:ml-10 mt-10 md:mt-0 text-black ">
                <div className='text-2xl font-semibold mb-2 mt-4'>{hotelItem.name}</div>
                <div className='flex flex-row flex-wrap items-center'>
                    <div className=' w-[65%]'>
                            
                        <div className='text-left mt-4'>{hotelItem.address}</div>
                        <div className='text-left mt-4'>{hotelItem.district}, {hotelItem.province}, {hotelItem.postalcode}</div>
                        <div className='text-left mt-4 mb-4'>tel: {hotelItem.tel}</div>
                    </div>
                    <div className='w-[35%] flex justify-center items-center'>
                        <div className="bg-[#f3f4f6] rounded-lg p-4 text-[#7881a9] w-24 shadow-lg h-fit text-center">
                                <div className='text-lg'>{reviewStar} ⭐</div>
                                <div className='text-xs'>{hotelItem.reviews.length} reviews</div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-wrap flex-row gap-3'>
                    {
                        hotelItem.tags.map((tag) => (
                            <div key={tag+hotelItem.id} className=" w-fit bg-[#f3f4f6] rounded-lg px-5 py-2 h-10 shadow-lg text-center">
                                {tag}
                            </div>
                        ))
                    }
                </div>
                {
                    session.data.user.role === 'admin'?
                        <div onClick={(e) => {e.preventDefault(); e.stopPropagation; router.push(`/hotel/${hotelItem.id}/edit`) }} className='flex flex-row gap-3 mt-4 justify-end'>
                            <SettingsIcon className="items-center" color = "action"/>
                        </div>
                    : null
                }
            </div>
        </div>
    );
}