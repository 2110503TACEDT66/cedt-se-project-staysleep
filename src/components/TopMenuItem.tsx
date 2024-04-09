import styles from './topmenu.module.css'
import Link from 'next/link';

export default function TopMenuItem({title, pageRef} : {title:string, pageRef:string}){
    return (
        <Link href = {pageRef} className = "w-30 text-center mx-auto font-sans text-sm text-gray-500">
            {title}
        </Link>
    );
}