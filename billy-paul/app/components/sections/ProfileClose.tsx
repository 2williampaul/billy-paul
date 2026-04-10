"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TestimonialsCarousel } from "../ui/testimonials-carousel";
import { DottedSurface } from "../ui/dotted-surface";
import { Button } from "../ui/neon-button";

const education = [
  {
    degree: "BA (Hons) Information Graphic Design — First Class",
    school: "London College of Communication",
    parent: "University of the Arts London",
    year: "2009",
  },
];

const personal = [
  { label: "Sport", value: "Certified Archery GB Level 1 Coach" },
  { label: "Music", value: "Learning to play drums" },
  { label: "Leisure", value: "Boxing, football, surfing and padel" },
  { label: "Travel", value: "Built a Sprinter Campervan during lockdown" },
];

export default function ProfileClose() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="bg-black text-white">
      {/* Recommendations */}
      <div className="max-w-[1184px] mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-20">
        <motion.p
          ref={ref}
          className="text-xs tracking-[0.25em] uppercase text-white/30 font-semibold mb-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          04 — Recommendations
        </motion.p>
        <motion.h2
          className="text-4xl md:text-6xl font-medium tracking-tight text-white mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          What People Say
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <TestimonialsCarousel align="left" />
        </motion.div>
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href="https://www.linkedin.com/in/williampauldesigner/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2B6CB7] text-sm font-semibold hover:underline"
          >
            View 15 more on LinkedIn →
          </a>
        </motion.div>
      </div>

      {/* Education + Personal */}
      <div className="max-w-[1184px] mx-auto px-6 md:px-12 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-white/10 pt-16">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-xs tracking-[0.25em] uppercase text-white/30 font-semibold mb-8">
              Education
            </h3>
            <div className="space-y-6">
              {education.map((e) => (
                <div key={e.degree}>
                  <p className="text-white font-bold text-lg leading-tight">{e.degree}</p>
                  <p className="text-white/50 text-sm mt-1">{e.school}</p>
                  {e.parent && <p className="text-white/30 text-xs mt-0.5">{e.parent}</p>}
                  <p className="text-white/30 text-xs mt-0.5">{e.year}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Personal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-xs tracking-[0.25em] uppercase text-white/30 font-semibold mb-8">
              Personal
            </h3>
            <div className="space-y-4">
              {personal.map((p) => (
                <div key={p.label} className="flex gap-4">
                  <span className="text-white/30 text-sm w-16 flex-shrink-0 font-medium pt-0.5">
                    {p.label}
                  </span>
                  <span className="text-white/70 text-sm leading-relaxed">{p.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-[1184px] mx-auto px-6 md:px-12 pb-24">
        <motion.div
          className="flex items-center gap-4 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a href="/BillyPaul-CV-2026.pdf" download="BillyPaul-CV-2026.pdf">
            <Button className="text-white">Download PDF CV</Button>
          </a>
          <a
            href="https://www.linkedin.com/in/williampauldesigner/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="text-white">LinkedIn</Button>
          </a>
          <a
            href="https://www.designed.org/mentors/williampaul"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="text-white">Design Mentor</Button>
          </a>
        </motion.div>
      </div>

      {/* Dotted surface */}
      <div className="relative h-[300px]">
        <DottedSurface />
      </div>
    </section>
  );
}
