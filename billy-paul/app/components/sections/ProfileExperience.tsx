"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const roles = [
  {
    company: "Talabat",
    logo: "/SQlogos/talabat_com_logo.jpg",
    designSystem: true,
    title: "Senior Design System Designer — Consumer Platform",
    dates: "Sep 2025 – Present",
    location: "Dubai, UAE",
    bullets: [
      "Leading the consumer-platform design system for the Middle East's largest food-delivery super-app.",
      "Owning token architecture, component governance, and Figma library strategy across iOS, Android and Web.",
      "Building AI-assisted workflows to automate component generation, documentation, and linting.",
      "Driving adoption across 50+ designers and 200+ engineers across multiple product squads.",
    ],
  },
  {
    company: "J.P. Morgan Chase",
    logo: "/SQlogos/jpmorganchase_logo.jpeg",
    designSystem: true,
    title: "Lead Design System Designer — B2B Banking",
    dates: "Oct 2024 – Sep 2025",
    location: "London, UK",
    bullets: [
      "Led DS strategy for a global B2B banking platform serving institutional clients.",
      "Defined contribution models, semantic token layers, and multi-brand theming across the design system.",
      "Collaborated with engineering leads to align Figma components with React implementation.",
      "Ran design-system office hours and design reviews for senior product and engineering stakeholders.",
    ],
  },
  {
    company: "Sainsbury's Nectar",
    logo: "/SQlogos/sainsburys.jpeg",
    designSystem: true,
    title: "Senior UX Designer",
    dates: "Jun 2024 – Sep 2024",
    location: "London, UK",
    bullets: [
      "Delivered UX improvements for the Nectar loyalty app and web platform.",
      "Contributed to Sainsbury's design system component library and documentation standards.",
    ],
  },
  {
    company: "Huge Inc. (McDonald's & Ticketmaster)",
    logo: "/SQlogos/hugeinc_logo.jpeg",
    designSystem: true,
    title: "Lead Visual / UI Designer",
    dates: "Nov 2022 – Mar 2024",
    location: "London, UK",
    bullets: [
      "Lead designer on McDonald's global digital campaign creative — Webby Award nominated.",
      "Delivered end-to-end UI for Ticketmaster's redesigned fan experience platform.",
      "Built out high-fidelity design systems and component libraries for client hand-off.",
    ],
  },
  {
    company: "John Lewis & Partners",
    logo: "/SQlogos/johnlewisandpartners_logo.jpeg",
    title: "Senior UI Designer",
    dates: "Oct 2022 – Nov 2022",
    location: "London, UK",
    bullets: [
      "Contributed UI design to the John Lewis e-commerce redesign project.",
    ],
  },
  {
    company: "LSEG",
    logo: "/SQlogos/lonstx.jpeg",
    designSystem: true,
    title: "UI Design Lead — Design Systems",
    dates: "Nov 2021 – Sep 2022",
    location: "London, UK",
    bullets: [
      "Led HALO Design System — a global DS serving 100+ product teams across trading and data platforms.",
      "Owned Figma library taxonomy, strategy and delivery with stakeholder reporting at director level.",
      "Defined light and dark theme token structures, and contributed to the design-system governance model.",
    ],
  },
  {
    company: "Fresha",
    logo: "/SQlogos/fresha.jpeg",
    title: "Lead Product Designer",
    dates: "Oct 2021 – Nov 2021",
    location: "London, UK",
    bullets: [
      "Led product design for Fresha's booking and marketplace platform.",
    ],
  },
  {
    company: "BlackRock iShares (via UsTwo)",
    logo: "/SQlogos/blackrock_logo.jpeg",
    designSystem: true,
    title: "Senior Product Designer — Design Systems",
    dates: "May 2021 – Jul 2021",
    location: "London, UK",
    bullets: [
      "Contributed to iShares investor platform design system components and accessibility work.",
    ],
  },
  {
    company: "Morgan Stanley",
    logo: "/SQlogos/morgan_stanley_logo.jpeg",
    title: "Senior Visual Designer",
    dates: "Oct 2020 – May 2021",
    location: "London, UK",
    bullets: [
      "Delivered visual UI design across Morgan Stanley's wealth management digital products.",
      "Created high-fidelity design specs and interactive prototypes for dev hand-off.",
    ],
  },
  {
    company: "Tesco",
    logo: "/SQlogos/tesco_logo.png",
    designSystem: true,
    title: "Lead UI Designer",
    dates: "Nov 2019 – Aug 2020",
    location: "London, UK",
    bullets: [
      "Led UI design for Tesco's grocery and loyalty digital products.",
      "Contributed to Tesco's design system and Zeroheight documentation — award-winning.",
    ],
  },
  {
    company: "HSBC (via Publicis Digitas)",
    logo: "/SQlogos/hsbc.jpg",
    designSystem: true,
    title: "Lead UI Designer",
    dates: "Sep 2018 – Nov 2019",
    location: "London, UK",
    bullets: [
      "Led UI design governance for HSBC Kinetic, HSBC's digital-first banking app.",
      "Central member of the governance team that developed the UI design language and design patterns.",
      "Creativepool Silver Award winner for the HSBC Kinetic app design.",
    ],
  },
  {
    company: "Signal Noise / The Economist",
    logo: "/SQlogos/the_economist_logo.jpeg",
    designSystem: true,
    title: "Senior Product Designer",
    dates: "Apr 2018 – Aug 2018",
    location: "London, UK",
    bullets: [
      "Designed data visualisation products for The Economist's editorial and intelligence teams.",
    ],
  },
  {
    company: "Concentrix Tigerspike",
    logo: "/SQlogos/concentrix_logo.jpeg",
    designSystem: true,
    title: "UI Lead → Senior UI Architect",
    dates: "Sep 2015 – Mar 2018",
    location: "London · Singapore · Dubai",
    bullets: [
      "Progressed from UI Lead to Senior UI Architect across 3 global offices.",
      "Delivered digital products for Emirates, Sky News Arabia, Etisalat and DIFC.",
      "Established UI architecture standards and component systems across the agency.",
    ],
  },
  {
    company: "Emerging Property",
    logo: "/SQlogos/emerging-property-logo.png",
    title: "Senior UI/UX Designer",
    dates: "Mar 2014 – Sep 2015",
    location: "Dubai, UAE",
    bullets: [
      "Designed property investment and marketplace products for the Gulf real-estate market.",
    ],
  },
  {
    company: "IG / City Index",
    logo: "/SQlogos/iggroup_logo.jpeg",
    title: "Digital Designer",
    dates: "Apr 2012 – Mar 2014",
    location: "London, UK",
    bullets: [
      "Designed digital marketing, trading UI, and campaign materials for retail CFD platforms.",
    ],
  },
];

function CompanyLogo({ src, name }: { src: string | null; name: string }) {
  if (src) {
    return (
      <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center">
        <Image
          src={src}
          alt={name}
          width={80}
          height={80}
          className="object-contain max-h-[80px] w-auto rounded-lg"
          unoptimized
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      </div>
    );
  }
  return (
    <div className="flex-shrink-0 w-20 h-20 rounded-lg bg-black/8 flex items-center justify-center">
      <span className="text-lg font-bold text-black/30">{name[0]}</span>
    </div>
  );
}

function RoleCard({ role, index }: { role: typeof roles[0]; index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <motion.div
      ref={ref}
      className="border-t border-black/8 pt-6 pb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3) }}
    >
      <div className="flex items-start gap-10">
        {/* Logo */}
        <CompanyLogo src={role.logo} name={role.company} />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
            <div>
              <h3 className="text-lg font-bold tracking-tight text-black leading-tight">
                {role.company}
              </h3>
              <p className="text-sm font-medium text-black/55 mt-0.5">{role.title}</p>
            </div>
            <div className="sm:text-right flex-shrink-0 sm:pl-4">
              <p className="text-xs font-medium text-black/35">{role.dates}</p>
              <p className="text-xs text-black/25 mt-0.5">{role.location}</p>
            </div>
          </div>
          <ul className="space-y-1.5">
            {role.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2.5 text-black/55 text-sm leading-relaxed">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-[#2B6CB7] flex-shrink-0" />
                {b}
              </li>
            ))}
          </ul>
          {role.designSystem && (
            <div className="mt-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-[#2B6CB7]/10 text-[#2B6CB7] border border-[#2B6CB7]/20">
                Design System
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProfileExperience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="history" className="bg-white text-black py-20 md:py-28">
      <div className="max-w-[1184px] mx-auto px-6 md:px-12">
        <motion.p
          ref={ref}
          className="text-xs tracking-[0.25em] uppercase text-black/40 font-semibold mb-3"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          03 — Experience
        </motion.p>
        <motion.h2
          className="text-3xl md:text-5xl font-medium tracking-tight text-black mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Work History
        </motion.h2>

        <div>
          {roles.map((role, i) => (
            <RoleCard key={role.company + role.dates} role={role} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
