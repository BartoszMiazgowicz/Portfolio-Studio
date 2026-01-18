"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container, Button, MagneticButton, GlowEffect } from "@/components/ui";
import { FadeUp } from "@/components/animations";

export function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="py-section bg-black-rich relative overflow-hidden"
    >
      {/* Multiple Glow Layers */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px]"
          style={{
            background: "radial-gradient(ellipse at center, rgba(212, 168, 76, 0.12) 0%, transparent 60%)",
            filter: "blur(100px)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px]"
          style={{
            background: "radial-gradient(ellipse at center, rgba(212, 168, 76, 0.2) 0%, transparent 50%)",
            filter: "blur(60px)",
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <Container className="relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          style={{ scale, opacity }}
        >
          {/* Icon */}
          <FadeUp>
            <motion.div
              className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-8 sm:mb-10 rounded-full bg-gradient-to-br from-amber-core/20 to-amber-deep/10 flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
              style={{
                boxShadow: "0 0 60px rgba(212, 168, 76, 0.3), inset 0 0 30px rgba(212, 168, 76, 0.1)",
              }}
            >
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10 text-amber-core"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </motion.div>
          </FadeUp>

          {/* Headline */}
          <FadeUp delay={0.2}>
            <h2
              className="text-white-pure mb-6"
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 200,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              Ready to create something
              <br />
              <span
                className="text-amber-core"
                style={{ textShadow: "0 0 60px rgba(212, 168, 76, 0.5)" }}
              >
                extraordinary?
              </span>
            </h2>
          </FadeUp>

          {/* Subtext */}
          <FadeUp delay={0.4}>
            <p className="text-white-soft/60 text-base sm:text-lg md:text-xl font-light mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
              Let&apos;s collaborate to bring your vision to life. We&apos;re
              ready to transform ideas into immersive digital experiences that
              captivate and inspire.
            </p>
          </FadeUp>

          {/* CTA Buttons */}
          <FadeUp delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full px-4 sm:px-0">
              <MagneticButton variant="primary" className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 text-sm sm:text-base" strength={0.3}>
                Start Your Project
              </MagneticButton>
              <MagneticButton variant="secondary" className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 text-sm sm:text-base" strength={0.3}>
                Schedule a Call
              </MagneticButton>
            </div>
          </FadeUp>

          {/* Contact Info */}
          <FadeUp delay={0.8}>
            <div className="mt-10 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-muted">
              <a
                href="mailto:hello@studio.com"
                className="hover:text-amber-core transition-colors duration-300"
              >
                hello@studio.com
              </a>
              <span className="hidden sm:block w-1 h-1 rounded-full bg-gray-muted" />
              <span>Warsaw, Poland</span>
              <span className="hidden sm:block w-1 h-1 rounded-full bg-gray-muted" />
              <span>Available Worldwide</span>
            </div>
          </FadeUp>

          {/* Decorative Line */}
          <FadeUp delay={1}>
            <div className="mt-12 sm:mt-20">
              <motion.div
                className="h-[1px] bg-gradient-to-r from-transparent via-amber-core to-transparent mx-auto"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ maxWidth: 400 }}
              />
            </div>
          </FadeUp>
        </motion.div>
      </Container>
    </section>
  );
}
