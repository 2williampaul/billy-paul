"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BlurredStagger } from "../ui/blurred-stagger-text";

const metrics = [
  { value: "15+", label: "Years delivering" },
  { value: "17", label: "Global brands" },
  { value: "$B", label: "Products transacted" },
  { value: "10", label: "Scale Design Systems" },
];

const awards = [
  {
    label: "Webby Award — Best UX",
    project: "HSBC Kinetic App",
    body: "Apps & Software / Mobile · 2021",
    href: "https://winners.webbyawards.com/2021/apps-and-software/mobile-ott-app-features/best-user-experience/183404/hsbc-kinetic",
  },
  {
    label: "Creativepool Silver — Application & Digital",
    project: "McDonald's Omnichannel Experience",
    body: "Creativepool Annual 2024 · via Huge Inc.",
    href: "https://creativepool.com/huge/projects/an-industry-leading-omnichannel-experience-for-mcdonalds",
  },
  {
    label: "Creativepool Bronze — Effectiveness",
    project: "McDonald's Omnichannel Experience",
    body: "Creativepool Annual 2024 · via Huge Inc.",
    href: "https://creativepool.com/annual/2024/winners/#Effectiveness",
  },
  {
    label: "Zeroheight — Best Governance & Accessibility",
    project: "Tesco Digital Design System",
    body: "Zeroheight Design System Awards 2025",
    qualifier: "Contributed foundational DS work; system won awards post-engagement.",
    href: "https://zeroheight.com/blog/celebrating-the-2025-design-system-awards-winners/",
  },
];

function StatItem({
  value,
  label,
  index,
  scrollYProgress,
}: {
  value: string;
  label: string;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const entryStart = 0.05 + index * 0.10;
  const entryEnd   = entryStart + 0.06;

  const exitStart  = isMobile ? 0.72 + index * 0.02 : 0.50 + index * 0.05;
  const exitRange  = isMobile ? 0.018 : (index === 0 ? 0.05 : 0.016);
  const exitEnd    = exitStart + exitRange;

  const opacity = useTransform(
    scrollYProgress,
    [entryStart, entryEnd, exitStart, exitEnd],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [entryStart, entryEnd, exitStart, exitEnd],
    [60, 0, 0, -50]
  );

  return (
    <motion.div style={{ opacity, y }} className="pl-8">
      <div className="text-6xl md:text-7xl font-black tracking-tight text-white leading-none">
        {value}
      </div>
      <div className="text-xs font-semibold uppercase tracking-widest text-white/35 mt-2">
        {label}
      </div>
    </motion.div>
  );
}

function AwardCard({
  award,
  index,
  scrollYProgress,
}: {
  award: typeof awards[0];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const entryStart = 0.30 + index * 0.07;
  const entryEnd   = entryStart + 0.07;

  const opacity = useTransform(scrollYProgress, [entryStart, entryEnd], [0, 1]);
  const y       = useTransform(scrollYProgress, [entryStart, entryEnd], [28, 0]);

  return (
    <motion.a
      href={award.href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ opacity, y }}
      className="flex flex-col gap-0.5 border border-white/10 rounded-xl px-4 py-3 transition-colors duration-300"
      whileHover={{
        borderColor: "rgba(43,108,183,0.8)",
        boxShadow: "0 0 0 1px rgba(43,108,183,0.4), 0 0 24px rgba(43,108,183,0.25)",
      }}
    >
      <span className="text-xs font-bold tracking-widest uppercase text-[#2B6CB7]">
        {award.label}
      </span>
      <span className="text-sm font-semibold text-white">{award.project}</span>
      <span className="text-xs text-white/40">{award.body}</span>
      {"qualifier" in award && award.qualifier && (
        <span className="text-xs text-white/25 italic mt-0.5">{award.qualifier}</span>
      )}
    </motion.a>
  );
}

export default function ProfileAbout() {
  const sectionRef = useRef<HTMLElement>(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Right column drifts at double speed for dramatic parallax
  const columnY = useTransform(scrollYProgress, [0, 1], ["36%", "-36%"]);

  return (
    <section ref={sectionRef} id="about" className="bg-black text-white py-24 md:py-32">
      <div className="max-w-[1184px] mx-auto px-6 md:px-12">

        {/* Eyebrow */}
        <p className="text-xs tracking-[0.25em] uppercase text-white/40 font-semibold mb-4">
          02 — About Me
        </p>

        {/* Heading */}
        <div ref={ref} className="mb-16 max-w-3xl">
          <BlurredStagger
            text="From London, to Libraries and Systems as AI Infrastructure"
            triggered={inView}
            className="text-2xl md:text-5xl font-medium tracking-tight text-white leading-tight text-left block w-full"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 lg:items-stretch">

          {/* Left — bio + awards, normal scroll speed */}
          <motion.div
            className="lg:w-3/5 flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="space-y-5 text-base leading-relaxed text-white/75 mb-8">
              <p>
                From crafting brand-new Design Systems or evolving more mature systems, to thinking through product discovery, from UI animation to AI automation, to communicating complex financial data, I have a proven history of working with global clients successfully impacting the lives of millions and transacting in the billions.
              </p>
              <p>
                I'm actively integrating AI tooling — from component generation to developing design tokens and foundational elements, and steering governance backlog or contribution management. I can deliver comprehensive Design Systems and set its strategic direction to become an AI infrastructure that the company depends on to scale with automation.
              </p>
              <p>
                Londoner — now Dubai-based. I enjoy leading teams to new heights. Certified Archery GB Level 1 Coach. Learning drums. Inevitably, getting into Padel.
              </p>
            </div>

            <div className="space-y-3">
              {awards.map((a, i) => (
                <AwardCard
                  key={a.href}
                  award={a}
                  index={i}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          </motion.div>

          {/* Right — parallax stats, spread top-to-bottom */}
          <div className="lg:w-2/5 relative flex flex-col">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" />
            <motion.div
              style={{ y: columnY }}
              className="flex flex-col justify-between flex-1 py-2 gap-10 lg:gap-0"
            >
              {metrics.map((m, i) => (
                <StatItem
                  key={m.label}
                  value={m.value}
                  label={m.label}
                  index={i}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
