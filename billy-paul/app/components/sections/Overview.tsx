"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TestimonialsCarousel } from "../ui/testimonials-carousel";
import { DottedSurface } from "../ui/dotted-surface";

export default function Overview() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="about"
      ref={ref}
      className="relative z-10 bg-black overflow-hidden"
    >
      {/* Content - Two column layout */}
      <div className="max-w-[1184px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-20 pt-[80px] sm:pt-[100px] md:pt-[150px] pb-[40px]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left column - About content */}
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8">
              About
            </h2>
            <div className="space-y-6 text-base sm:text-lg text-white/90 leading-relaxed">
              <p>
                I love crafting design systems that operate at scale, creating visual interactive experiences, and fostering collaboration. I have been delivering value for global-scale clients for over 13 years across London, New York, Singapore and Dubai. I am from North London.
              </p>
              <p>
                Fun fact: I built my own Sprinter Campervan during lockdown from my driveway/garage. The entire design-build process and camper trips I used it for were an absolute delight.
              </p>
              <p>
                I recently started to learn to play the drums and also surf, which are both super fun. I love Archery and am a certified Archery GB Level 1 Coach.
              </p>
              <p className="pt-4">
                <em>Contact me</em> →{" "}
                <a
                  href="https://www.linkedin.com/in/billypaul"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white transition-colors"
                >
                  Linkedin
                </a>
                {" • "}
                <a
                  href="https://www.designmentor.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white transition-colors"
                >
                  Design Mentor
                </a>
              </p>
            </div>
          </motion.div>
          
          {/* Right column - Testimonials */}
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <TestimonialsCarousel align="left" />
          </motion.div>
        </div>
      </div>
      
      {/* Dotted surface background - appears below content */}
      <div className="relative h-[300px]">
        <DottedSurface />
      </div>
    </section>
  );
}
