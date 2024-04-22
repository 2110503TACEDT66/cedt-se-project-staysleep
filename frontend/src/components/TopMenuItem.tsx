import Link from 'next/link';

export default function TopMenuItem({title, pageRef} : {title:string, pageRef:string}){
    return (
        <Link href = {pageRef} className = "bg-white w-30 font-thin text-center mx-auto font-sans text-md text-black">
            <button className="hover:text-amber-500"
            >{title}</button>
        </Link>
    );
}