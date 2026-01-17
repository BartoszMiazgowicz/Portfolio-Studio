"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger);

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLQuoteElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [60, 0, 0, -60]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the quote text word by word
      const words = textRef.current?.querySelectorAll(".word");
      if (words) {
        gsap.fromTo(
          words,
          { opacity: 0.2 },
          {
            opacity: 1,
            duration: 0.5,
            stagger: 0.05,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "center center",
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const quoteText = "We believe in the power of restraint. Every pixel, every interaction, every moment is intentional — crafted to evoke emotion and inspire action.";
  const words = quoteText.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative py-section bg-black-rich overflow-hidden"
    >
      {/* Ambient Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px]"
          style={{
            background: "radial-gradient(ellipse at center, rgba(212, 168, 76, 0.06) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <Container className="relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          style={{ opacity, y }}
        >
          {/* Label */}
          <motion.span
            className="text-label text-amber-core mb-12 block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Our Philosophy
          </motion.span>

          {/* Quote */}
          <blockquote
            ref={textRef}
            className="mb-12"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              fontWeight: 200,
              lineHeight: 1.4,
              letterSpacing: "-0.01em",
            }}
          >
            <span className="text-amber-core text-5xl leading-none">&ldquo;</span>
            {words.map((word, index) => (
              <span
                key={index}
                className="word inline-block text-white-pure mr-[0.3em]"
              >
                {word}
              </span>
            ))}
            <span className="text-amber-core text-5xl leading-none">&rdquo;</span>
          </blockquote>

          {/* Attribution */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <p className="text-gray-muted text-sm tracking-[0.2em] uppercase">
              — Design Principle
            </p>
          </motion.div>

          {/* Decorative Line */}
          <motion.div
            className="mt-16 mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 200 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="h-[1px] bg-gradient-to-r from-transparent via-amber-core to-transparent" />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
