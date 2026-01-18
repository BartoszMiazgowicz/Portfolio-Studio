"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button, MagneticButton, GlowEffect } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Video parallax on scroll
      gsap.to(videoRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Overlay darkens on scroll
      gsap.to(overlayRef.current, {
        opacity: 0.7,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Content fades out on scroll
      gsap.to(".hero-content", {
        yPercent: -20,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "50% top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Staggered text animation
  const letterAnimation = {
    hidden: { y: 100, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.03,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  };

  const line1 = "We craft digital";
  const line2 = "experiences that";
  const line3 = "transcend";

  return (
    <section
      ref={sectionRef}
      className="relative h-[120vh] w-full overflow-hidden"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-[120%] object-cover scale-110"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/40"
      />

      {/* Gradient Fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-black-rich via-transparent to-black-rich/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-black-rich/50 via-transparent to-transparent" />

      {/* Side Gradients for cinematic feel */}
      <div className="absolute inset-0 bg-gradient-to-r from-black-rich/40 via-transparent to-black-rich/40" />

      {/* Content */}
      <div className="hero-content relative z-10 flex flex-col items-center justify-center h-screen text-center px-4 sm:px-6">
        {/* Ambient Glow */}
        <GlowEffect
          size="lg"
          className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60"
        />

        {/* Label */}
        <motion.div
          className="overflow-hidden mb-6 sm:mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.span
            className="block text-[10px] sm:text-label text-amber-core tracking-[0.15em] sm:tracking-[0.08em] uppercase font-medium"
            initial={{ y: 30 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
          >
            Premium Creative Studio
          </motion.span>
        </motion.div>

        {/* Headline with character animation */}
        <h1
          ref={headlineRef}
          className="text-white-pure max-w-5xl mb-6 sm:mb-8 leading-[0.95]"
          style={{
            fontSize: "clamp(2rem, 8vw, 7rem)",
            fontWeight: 200,
            letterSpacing: "-0.03em",
          }}
        >
          {/* Line 1 */}
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
            >
              {line1}
            </motion.span>
          </span>

          {/* Line 2 */}
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
            >
              {line2}
            </motion.span>
          </span>

          {/* Line 3 - Highlighted */}
          <span className="block overflow-hidden">
            <motion.span
              className="block text-amber-core"
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
              style={{
                textShadow: "0 0 80px rgba(212, 168, 76, 0.5)",
              }}
            >
              {line3}
            </motion.span>
          </span>
        </h1>

        {/* Subheadline */}
        <motion.p
          className="text-white-soft/70 max-w-xl mb-8 sm:mb-12 text-base sm:text-lg md:text-xl font-light leading-relaxed px-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          We design and build world-class digital experiences
          for visionary brands and ambitious startups.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center w-full sm:w-auto px-4 sm:px-0"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
        >
          <MagneticButton variant="primary" className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 text-sm sm:text-base" strength={0.35}>
            Start a Project
          </MagneticButton>
          <MagneticButton variant="secondary" className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 text-sm sm:text-base" strength={0.35}>
            Explore Work
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
      >
        <div className="flex flex-col items-center gap-2 sm:gap-3">
          <span className="text-[9px] sm:text-[10px] text-white-soft/50 tracking-[0.2em] sm:tracking-[0.3em] uppercase">
            Scroll
          </span>
          <motion.div
            className="w-[1px] h-8 sm:h-12 bg-gradient-to-b from-amber-core to-transparent"
            animate={{ scaleY: [1, 0.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Corner Accents - hidden on mobile */}
      <div className="hidden sm:block absolute top-6 sm:top-8 left-6 sm:left-8 w-12 sm:w-16 h-12 sm:h-16 border-l border-t border-white/10 z-20" />
      <div className="hidden sm:block absolute top-6 sm:top-8 right-6 sm:right-8 w-12 sm:w-16 h-12 sm:h-16 border-r border-t border-white/10 z-20" />
      <div className="hidden sm:block absolute bottom-6 sm:bottom-8 left-6 sm:left-8 w-12 sm:w-16 h-12 sm:h-16 border-l border-b border-white/10 z-20" />
      <div className="hidden sm:block absolute bottom-6 sm:bottom-8 right-6 sm:right-8 w-12 sm:w-16 h-12 sm:h-16 border-r border-b border-white/10 z-20" />
    </section>
  );
}
