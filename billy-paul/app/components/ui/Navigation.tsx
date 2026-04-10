"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Work", href: "#work" },
  { name: "About", href: "#about" },
  { name: "History", href: "#history" },
  { name: "Snaps", href: "#snaps" },
];

export default function Navigation({ forceGlass = false }: { forceGlass?: boolean }) {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map((item) => item.href.substring(1));
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileOpen(false);
  };

  const glassActive = forceGlass || isScrolled;

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          glassActive ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-[1184px] mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20">
            <motion.a href="#home" onClick={(e) => handleClick(e, "#home")} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Logo />
            </motion.a>

            {/* Desktop nav */}
            <ul className="hidden md:flex items-center gap-4 sm:gap-6 lg:gap-8">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <li key={item.name}>
                    <motion.a
                      href={item.href}
                      onClick={(e) => handleClick(e, item.href)}
                      className={`text-sm font-semibold transition-colors relative ${
                        isActive ? "text-black" : "text-black/60"
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.name}
                      {isActive && (
                        <motion.div
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black"
                          layoutId="activeSection"
                          initial={false}
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </motion.a>
                  </li>
                );
              })}
            </ul>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-[5px] p-2"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <span className="w-6 h-0.5 bg-black block rounded-full" />
              <span className="w-6 h-0.5 bg-black block rounded-full" />
              <span className="w-4 h-0.5 bg-black block rounded-full" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-72 bg-white z-50 flex flex-col justify-end pb-16 px-8 shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
            >
              {/* Close button */}
              <button
                className="absolute top-6 right-6 text-black/40 hover:text-black text-2xl leading-none"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>

              <ul className="flex flex-col gap-8">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        onClick={(e) => handleClick(e, item.href)}
                        className={`text-2xl font-semibold transition-colors ${
                          isActive ? "text-black" : "text-black/40"
                        }`}
                      >
                        {item.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
