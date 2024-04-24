import Link from 'next/link';

export default function TopMenuItem({ title, pageRef, active }: { title: string, pageRef: string, active?: boolean }) {
    return (
        <Link href={pageRef} className={active ? "text-primary font-bold" : "text-primaryWhite font-light"}>
            <div className='px-4 py-2 hover:bg-black/30 rounded-md'>
                {title}
            </div>
        </Link >
    );
}