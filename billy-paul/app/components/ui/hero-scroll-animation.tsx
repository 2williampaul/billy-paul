'use client';

import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';
import React, { useRef, forwardRef, useImperativeHandle, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BlurredStagger } from './blurred-stagger-text';
import { WarpedGridBackground } from './warped-grid-background';
import { LogoCarousel } from './logo-carousel';

interface SectionProps {
  scrollYProgress: MotionValue<number>;
}

// Staggered text animation component
interface TextStaggerHoverProps {
  text: string;
  isActive: boolean;
  onHover: () => void;
  className?: string;
}

const TextStaggerHover: React.FC<TextStaggerHoverProps> = ({ text, isActive, onHover, className }) => {
  const characters = text.split('');
  
  return (
    <span
      className={`relative inline-block cursor-pointer ${className}`}
      onMouseEnter={onHover}
    >
      {characters.map((char, index) => (
        <span
          key={`${char}-${index}`}
          className="relative inline-block overflow-hidden"
        >
          {/* Inactive character (faded, slides up when active) */}
          <motion.span
            className="inline-block opacity-20"
            initial={{ y: '0%' }}
            animate={{ y: isActive ? '-110%' : '0%' }}
            transition={{
              delay: index * 0.025,
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>

          {/* Active character (full opacity, slides in from below) */}
          <motion.span
            className="absolute left-0 top-0 inline-block opacity-100"
            initial={{ y: '110%' }}
            animate={{ y: isActive ? '0%' : '110%' }}
            transition={{
              delay: index * 0.025,
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

const Section1: React.FC<SectionProps> = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

  return (
    <motion.section
      style={{ scale, rotate, backgroundColor: '#ffffff' }}
      className='sticky font-semibold top-0 h-screen flex flex-col items-center justify-center text-black'
    >
      <WarpedGridBackground />

      <div className='flex flex-col items-center justify-center space-y-8 px-8 relative z-10'>
        {/* Circular photo */}
        <div className='relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[448px] lg:h-[448px] rounded-full overflow-hidden'>
          <Image
            src="/Billy-Paul-Designer.webp"
            alt="Billy Paul"
            fill
            className="object-cover object-center"
            priority
            unoptimized
          />
        </div>
        
        {/* Headline with blurred stagger effect */}
        <div className="max-w-4xl mx-auto px-4 text-center">
          <BlurredStagger 
            text="Billy Paul is a Design System Designer|with a blend of strategy, craft and vibes" 
            emoji={
              <picture>
                <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/26a1/512.webp" type="image/webp" />
                <img 
                  src="https://fonts.gstatic.com/s/e/notoemoji/latest/26a1/512.gif" 
                  alt="⚡" 
                  width="32" 
                  height="32"
                  className="inline-block align-middle"
                />
              </picture>
            }
          />
        </div>
        
        {/* Logo carousel */}
        <div className="w-full max-w-6xl mx-auto px-8 mt-4" style={{ backgroundColor: '#ffffff' }}>
          <LogoCarousel />
        </div>
      </div>
    </motion.section>
  );
};

const SLIDES = [
  {
    id: "slide-1",
    title: "J.P. Morgan Chase",
    href: "/jpmc",
    imageUrl: "/SNAPS/100snap.jpg",
  },
  {
    id: "slide-2",
    title: "McDonald's",
    href: "/mcdonalds",
    imageUrl: "/SNAPS/101snap.jpg",
  },
  {
    id: "slide-3",
    title: "HSBC",
    href: "/hsbc",
    videoUrl: "/work-home/hsbc-kinetic-app.mp4",
  },
  {
    id: "slide-4",
    title: "Ticketmaster",
    href: "/ticketmaster",
    imageUrl: "/SNAPS/104snap.jpg",
  },
  {
    id: "slide-5",
    title: "BlackRock",
    href: "/blackrock",
    imageUrl: "/SNAPS/105snap.jpg",
  },
  {
    id: "slide-6",
    title: "Tesco",
    href: "/tesco",
    imageUrl: "/SNAPS/106snap.jpg",
  },
];

const Section2: React.FC<SectionProps> = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <motion.section
      style={{ scale, rotate }}
      className='relative h-screen bg-gradient-to-t to-[#1a1919] from-[#06060e] text-white'
    >
      <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>
      <article className='container mx-auto relative z-10 px-4 sm:px-6 h-full flex flex-col justify-center'>
        <div className='flex flex-col md:flex-row items-center justify-center md:justify-evenly gap-6 md:gap-12'>
          {/* Text list */}
          <div className='flex flex-col space-y-1 sm:space-y-2 md:space-y-4 flex-shrink-0'>
            {SLIDES.map((slide, index) => (
              <Link key={slide.id} href={slide.href}>
                <TextStaggerHover
                  text={slide.title}
                  isActive={activeSlide === index}
                  onHover={() => setActiveSlide(index)}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter whitespace-nowrap"
                />
              </Link>
            ))}
          </div>
          
          {/* Image/Video container */}
          <div className="hidden md:block relative w-full max-w-2xl h-[400px] lg:h-[500px] xl:h-[600px] overflow-hidden">
            {SLIDES.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out`}
                style={{
                  opacity: activeSlide === index ? 1 : 0,
                  clipPath: activeSlide === index 
                    ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' 
                    : 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'
                }}
              >
                {'videoUrl' in slide && slide.videoUrl ? (
                  <video
                    src={slide.videoUrl}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <img
                    src={slide.imageUrl}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </article>
    </motion.section>
  );
};

const HeroScrollAnimation = forwardRef<HTMLElement, {}>((props, ref) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  useImperativeHandle(ref, () => container.current as HTMLElement);

  return (
    <main ref={container} className='relative h-[200vh] bg-black' id="work">
      <Section1 scrollYProgress={scrollYProgress} />
      <Section2 scrollYProgress={scrollYProgress} />
      <footer className='group bg-[#06060e]'>
        <div className='bg-black text-white h-40 relative z-10 grid place-content-center text-2xl rounded-tr-full rounded-tl-full'></div>
      </footer>
    </main>
  );
});

HeroScrollAnimation.displayName = 'HeroScrollAnimation';

export default HeroScrollAnimation;
