import gsap from 'gsap';
import { useEffect, useState } from 'react';
import { heroVideo, smallHeroVideo } from '../utils';
import { useGSAP } from '@gsap/react';

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo);

  const handleVideoSrcSet = () => {
    if (window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo);
    } else {
      setVideoSrc(heroVideo);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleVideoSrcSet);

    return () => {
      window.removeEventListener('resize', handleVideoSrcSet);
    };
  }, []);

  useGSAP(() => {
    gsap.to('#hero', { opacity: 1, delay: 2 });
    gsap.to('.hero-title', { opacity: 1, delay: 1.5, duration: 1 }); 
    gsap.to('#cta', {opacity:1, y: -50 , delay:2 })
  }, []);

  return (
    <section id="hero" className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full flex-center flex-col">
        <p className="hero-title z-10">iPhone 15 Pro</p>
        <div className="md:w-10/12 w-9/12 z-0">
          <video className="pointer-events-none" autoPlay muted playsInline key={videoSrc}>
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>

      <div
        id="cta"
        className='flex flex-col items-center opacity-0 translate-y-20'>
          <a href="#hightlights" className='btn'>Buy</a>
          <p className='font-normal text-xl'>From $199/month or $999</p>
      </div>
    </section>
  );
};

export default Hero;
