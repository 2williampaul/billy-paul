"use client";

import * as React from "react";
import { motion } from "framer-motion";

interface BlurredStaggerProps {
  text: string;
  emoji?: React.ReactNode;
  className?: string;
  triggered?: boolean; // if provided, animation waits until true
}

export const BlurredStagger = ({
  text = "we love hextaui.com ❤️",
  emoji,
  className,
  triggered,
}: BlurredStaggerProps) => {
  const shouldAnimate = triggered === undefined ? true : triggered;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.015,
      },
    },
  };

  const letterAnimation = {
    hidden: { opacity: 0, filter: "blur(10px)" },
    show:   { opacity: 1, filter: "blur(0px)" },
  };

  const emojiAnimation = {
    hidden: { opacity: 0, filter: "blur(10px)" },
    show:   { opacity: 1, filter: "blur(0px)" },
  };

  // Track global char index for consistent stagger across words
  let charIndex = 0;

  // Split on | (line-break marker) first, then by word within each segment
  const segments = text.split("|");

  return (
    <>
      <motion.h1
        variants={container}
        initial="hidden"
        animate={shouldAnimate ? "show" : "hidden"}
        className={className ?? "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight leading-[120%] text-center break-words inline"}
      >
        {segments.map((segment, segIndex) => (
          <React.Fragment key={segIndex}>
            {segIndex > 0 && (
              <>
                <br className="hidden md:block" />
                <span className="md:hidden">{"\u00A0"}</span>
              </>
            )}
            {segment.split(" ").map((word, wordIndex) => {
              const wordEl = (
                <span key={wordIndex} className="inline-block whitespace-nowrap">
                  {word.split("").map((char) => {
                    const idx = charIndex++;
                    return (
                      <motion.span
                        key={idx}
                        variants={letterAnimation}
                        transition={{ duration: 0.3 }}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                </span>
              );
              // Add a space after each word except the last in a segment
              const isLastWord = wordIndex === segment.split(" ").length - 1;
              charIndex++; // account for the space character in stagger timing
              return (
                <React.Fragment key={`w-${wordIndex}`}>
                  {wordEl}
                  {!isLastWord && " "}
                </React.Fragment>
              );
            })}
          </React.Fragment>
        ))}
        {emoji && (
          <motion.span
            variants={emojiAnimation}
            transition={{ duration: 0.3 }}
            className="inline-block ml-1 align-middle"
          >
            {emoji}
          </motion.span>
        )}
      </motion.h1>
    </>
  );
};
