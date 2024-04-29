import Image from 'next/image'
import { useEffect, useRef } from 'react';

const ParallaxBanner = () => {
  const sky = useRef<HTMLImageElement | null>(null);
  const sun = useRef<HTMLImageElement | null>(null);
  const cloud = useRef<HTMLImageElement | null>(null);
  const mountain = useRef<HTMLImageElement | null>(null);
  const mountain_after = useRef<HTMLImageElement | null>(null);
  const birds = useRef<HTMLImageElement | null>(null);

  const sun2 = useRef<HTMLImageElement | null>(null);
  const cloud2 = useRef<HTMLImageElement | null>(null);
  const mountain2 = useRef<HTMLImageElement | null>(null);
  const birds2 = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const scrollHandler = () => {
      const value = window.scrollY;
      sun.current!.style.top = `${Math.min(value * 0.4, 50)}px`;
      // sky.current!.style.top = `${-Math.min(value * 0.4, 500)}px`;
      cloud.current!.style.top = `${-Math.min(value * 0.55, 120)}px`;
      mountain.current!.style.top = `${-(Math.min(value * 1, 350))}px`;
      mountain_after.current!.style.top = `${-(Math.min(value * 1, 320))}px`;
      birds.current!.style.top = `-${Math.min(value * 1.5, 400)}px`;
    }

    const mouseMoveHandler = (e: MouseEvent) => {
      const x = e.clientX / 50;
      const y = e.clientY / 50;

      sun2.current!.style.transform = `translate(${x}px, ${y}px)`;
      birds2.current!.style.transform = `translate(${-x / 4}px, ${-y / 4}px)`;
      cloud2.current!.style.transform = `translate(${x / 2}px, ${y / 2}px)`;
      mountain2.current!.style.transform = `translate(${-x / 1.5}px, ${-y / 1.5}px)`;
    }

    window.addEventListener('scroll', scrollHandler);
    window.addEventListener('mousemove', mouseMoveHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('mousemove', mouseMoveHandler);
    };
  }, []);

  return (
    <div className="w-screen h-[23rem] fixed top-0 left-0 z-0 scroll-smooth">
      <Image ref={sky} src="/img/topCover/sky.png" alt="hotel" fill style={{ objectFit: "cover" }} className='transition-all duration-500' />
      <div ref={sun2} className='absolute w-screen h-[23rem]'>
        <Image ref={sun} src="/img/topCover/sun.png" alt="hotel" fill style={{ objectFit: "cover" }} className='transition-all duration-500 translate-y-[30px]' />
      </div>
      <div ref={cloud2} className='absolute w-screen h-[23rem]'>
        <Image ref={cloud} src="/img/topCover/cloud.png" alt="hotel" fill style={{ objectFit: "cover" }} className='transition-all duration-500 translate-y-[-80px] scale-110' />
      </div>
      <div ref={mountain2} className='absolute w-screen h-[23rem]'>
        <Image ref={mountain} src="/img/topCover/mountain.png" alt="hotel" fill style={{ objectFit: "cover" }} className='transition-all duration-500 translate-y-[180px] scale-110' />
      </div>
      <div ref={birds2} className='absolute w-screen h-[23rem]'>
        <Image ref={birds} src="/img/topCover/birds.png" alt="hotel" fill style={{ objectFit: "cover" }} className='transition-all duration-500 translate-y-[100px]' />
      </div>
      <div ref={mountain_after} className="w-screen h-[15rem] absolute bg-black transition-all duration-500 translate-y-[500px]"></div>
    </div>
  );
}

export default ParallaxBanner;