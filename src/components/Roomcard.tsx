import Image  from 'next/image';
import InteractiveCard from './InteractiveCard';

export default function Roomcard({ roomNumber, price, maxOccupant} : {roomNumber: string, price:string, maxOccupant:string}){

    return(
        <InteractiveCard contentName= {roomNumber}>
            {/* <div className = 'w-full h-[70%] relative rounded-t-lg'>
                <Image src = {imgSrc}
                alt = 'Product Picture'
                fill = {true}
                className = 'object-cover rounded-t-lg'/>
            </div> */}
            <div className = 'w-full h-[15%] p-[10px]'>{roomNumber}</div>
            <div className = 'w-full h-[15%] p-[10px]'>{price}</div>
            <div className = 'w-full h-[15%] p-[10px]'>{maxOccupant}</div>
        </InteractiveCard>
    );
}
