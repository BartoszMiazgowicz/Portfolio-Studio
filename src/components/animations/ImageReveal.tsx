"use client";

import { useRef, useEffect, ReactNode } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ImageRevealProps {
  children: ReactNode;
  direction?: "left" | "right" | "up" | "down" | "center";
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export function ImageReveal({
  children,
  direction = "left",
  delay = 0,
  duration = 1.2,
  className = "",
  once = true,
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once, margin: "-100px" });
  const controls = useAnimation();

  const getInitialClipPath = () => {
    switch (direction) {
      case "left":
        return "inset(0 100% 0 0)";
      case "right":
        return "inset(0 0 0 100%)";
      case "up":
        return "inset(100% 0 0 0)";
      case "down":
        return "inset(0 0 100% 0)";
      case "center":
        return "inset(50% 50% 50% 50%)";
      default:
        return "inset(0 100% 0 0)";
    }
  };

  const getFinalClipPath = () => "inset(0 0% 0 0)";

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {
          clipPath: getInitialClipPath(),
        },
        visible: {
          clipPath: getFinalClipPath(),
          transition: {
            duration,
            delay,
            ease: [0.77, 0, 0.175, 1], // Custom easeInOutQuart
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// GSAP-based image reveal for more control
interface GSAPImageRevealProps {
  children: ReactNode;
  direction?: "left" | "right" | "up" | "down";
  className?: string;
}

export function GSAPImageReveal({
  children,
  direction = "left",
  className = "",
}: GSAPImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !overlayRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(overlayRef.current, {
        [direction === "left" || direction === "right" ? "scaleX" : "scaleY"]: 1,
        transformOrigin:
          direction === "left"
            ? "left center"
            : direction === "right"
            ? "right center"
            : direction === "up"
            ? "center top"
            : "center bottom",
      });

      gsap.set(imageRef.current, {
        scale: 1.4,
      });

      // Create timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      });

      // Animate overlay
      tl.to(overlayRef.current, {
        [direction === "left" || direction === "right" ? "scaleX" : "scaleY"]: 0,
        duration: 1.2,
        ease: "power4.inOut",
      });

      // Animate image scale
      tl.to(
        imageRef.current,
        {
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
        },
        "-=0.8"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [direction]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Reveal overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black-rich z-10"
        style={{
          transformOrigin:
            direction === "left"
              ? "right center"
              : direction === "right"
              ? "left center"
              : direction === "up"
              ? "center bottom"
              : "center top",
        }}
      />
      {/* Image container */}
      <div ref={imageRef} className="w-full h-full">
        {children}
      </div>
    </div>
  );
}

// Mask reveal with gradient edge
interface MaskRevealProps {
  children: ReactNode;
  className?: string;
}

export function MaskReveal({ children, className = "" }: MaskRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{
          clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
        }}
        animate={
          isInView
            ? {
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              }
            : {}
        }
        transition={{
          duration: 1.2,
          ease: [0.77, 0, 0.175, 1],
        }}
      >
        <motion.div
          initial={{ scale: 1.2, x: "-10%" }}
          animate={isInView ? { scale: 1, x: "0%" } : {}}
          transition={{
            duration: 1.4,
            ease: [0.77, 0, 0.175, 1],
          }}
        >
          {children}
        </motion.div>
      </motion.div>

      {/* Gradient edge effect */}
      <motion.div
        className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-amber-core/20 to-transparent pointer-events-none"
        initial={{ left: "-100%" }}
        animate={isInView ? { left: "100%" } : {}}
        transition={{
          duration: 1.2,
          ease: [0.77, 0, 0.175, 1],
        }}
      />
    </div>
  );
}
