"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}

export function Marquee({
  children,
  speed = 50,
  direction = "left",
  pauseOnHover = true,
  className = "",
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Add scroll-based speed variation
  const scrollVelocity = useSpring(
    useTransform(scrollY, [0, 1000], [0, direction === "left" ? -20 : 20]),
    { damping: 50, stiffness: 400 }
  );

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
    >
      <motion.div
        className={`flex whitespace-nowrap ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
        style={{
          x: scrollVelocity,
        }}
      >
        <div
          className="flex animate-marquee"
          style={{
            animationDirection: direction === "left" ? "normal" : "reverse",
            animationDuration: `${speed}s`,
          }}
        >
          {children}
          {children}
        </div>
        <div
          className="flex animate-marquee"
          style={{
            animationDirection: direction === "left" ? "normal" : "reverse",
            animationDuration: `${speed}s`,
          }}
          aria-hidden="true"
        >
          {children}
          {children}
        </div>
      </motion.div>
    </div>
  );
}

// Pre-built marquee with styled text for portfolio
interface TextMarqueeProps {
  items?: string[];
  className?: string;
  speed?: number;
}

export function TextMarquee({
  items = ["DESIGN", "DEVELOPMENT", "STRATEGY", "BRANDING", "EXPERIENCE"],
  className = "",
  speed = 30,
}: TextMarqueeProps) {
  return (
    <div className={`relative py-12 ${className}`}>
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black-rich to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black-rich to-transparent z-10" />

      <Marquee speed={speed} direction="left">
        <div className="flex items-center gap-8 px-4">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-8">
              <span className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight text-white-pure/10 hover:text-amber-core/30 transition-colors duration-500 cursor-default select-none">
                {item}
              </span>
              <span className="text-amber-core text-2xl md:text-3xl">*</span>
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
}

// Reverse direction marquee for visual interest
export function TextMarqueeReverse({
  items = ["CREATIVE", "INNOVATION", "DIGITAL", "MOTION", "VISUAL"],
  className = "",
  speed = 35,
}: TextMarqueeProps) {
  return (
    <div className={`relative py-8 ${className}`}>
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black-rich to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black-rich to-transparent z-10" />

      <Marquee speed={speed} direction="right">
        <div className="flex items-center gap-8 px-4">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-8">
              <span className="text-3xl md:text-4xl lg:text-5xl font-light tracking-widest text-gray-muted/20 hover:text-amber-core/20 transition-colors duration-500 cursor-default select-none uppercase">
                {item}
              </span>
              <span className="text-amber-core/50 text-lg">+</span>
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
}
