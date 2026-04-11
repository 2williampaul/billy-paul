'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const LOGOS = [
  { src: '/brands/Morgan+Stanley.png', alt: 'Morgan Stanley' },
  { src: '/brands/JPM.png', alt: 'JP Morgan' },
  { src: "/brands/Mcdonald's.png", alt: 'McDonalds' },
  { src: '/brands/HSBC.png', alt: 'HSBC' },
  { src: '/brands/BlackRock.png', alt: 'BlackRock' },
  { src: '/brands/Tesco.png', alt: 'Tesco' },
  { src: '/brands/talabat.png', alt: 'Talabat' },
  { src: '/brands/Huge+inc.png', alt: 'Huge Inc' },
  { src: '/brands/emirates.png', alt: 'Emirates' },
  { src: '/brands/Digitas.png', alt: 'Digitas' },
  { src: '/brands/skynews-arabia.png', alt: 'Sky News Arabia' },
  { src: '/brands/UsTwo.png', alt: 'UsTwo' },
  { src: '/brands/the+economist.png', alt: 'The Economist' },
  { src: '/brands/Sainsburys-logo.png', alt: 'Sainsburys' },
];

export function LogoCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroll = scrollRef.current;
    if (!scroll) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.3;
    let animationId: number | undefined;

    const animate = () => {
      scrollPosition += scrollSpeed;
      const isMobile = window.innerWidth < 768;
      if (isMobile) return; // no carousel on mobile
      const logoWidth = 148;
      const singleSetWidth = LOGOS.length * logoWidth;
      if (scrollPosition >= singleSetWidth) {
        scrollPosition = scrollPosition - singleSetWidth;
      }
      scroll.style.transform = `translateX(-${scrollPosition}px)`;
      animationId = requestAnimationFrame(animate);
    };

    const timeoutId = setTimeout(() => {
      animate();
    }, 6000);

    return () => {
      clearTimeout(timeoutId);
      if (animationId !== undefined) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* Mobile: single column, selected logos only */}
      {(() => {
        const mobileLogos = LOGOS.filter(l =>
          ['Morgan Stanley','JP Morgan',"McDonalds",'HSBC','BlackRock','Huge Inc','Emirates','Digitas'].includes(l.alt)
        );
        return (
          <div className="md:hidden flex flex-col gap-5 w-full mt-2">
            {mobileLogos.map((logo, index) => (
              <motion.div
                key={logo.alt}
                className="flex items-center justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={160}
                  height={60}
                  className="object-contain h-[60px] w-auto max-w-[160px] opacity-70"
                  unoptimized
                />
              </motion.div>
            ))}
          </div>
        );
      })()}

      {/* Desktop: scrolling carousel */}
      <div
        ref={containerRef}
        className="hidden md:block relative w-full h-12 overflow-hidden mt-6"
        style={{ backgroundColor: '#ffffff' }}
      >
        <div
          ref={scrollRef}
          className="flex items-center gap-[38.4px] h-full"
          style={{ willChange: 'transform' }}
        >
          {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, index) => (
            <motion.div
              key={`${logo.alt}-${index}`}
              className="flex-shrink-0 h-12 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: (index % LOGOS.length) * 0.05 }}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={100}
                height={40}
                className="object-contain h-full w-auto max-w-[120px] opacity-100"
                unoptimized
              />
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
