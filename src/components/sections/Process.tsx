"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container, Card } from "@/components/ui";
import { FadeUp } from "@/components/animations";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "Deep dive into your vision, audience, and objectives to establish the foundation.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Strategy",
    description: "Crafting a comprehensive roadmap that aligns design with business goals.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Creation",
    description: "Bringing concepts to life through meticulous design and development.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Refinement",
    description: "Iterating and polishing until every detail exceeds expectations.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll(".process-card");
      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.1,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-section bg-black-rich relative overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black-deep via-transparent to-black-deep opacity-50" />

      <Container className="relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-20 md:mb-32">
          <FadeUp>
            <span className="text-label text-amber-core mb-6 block">
              Our Process
            </span>
          </FadeUp>

          <FadeUp delay={0.2}>
            <h2
              className="text-white-pure mb-6"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 200,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              A refined approach to
              <br />
              <span className="text-amber-core">exceptional results</span>
            </h2>
          </FadeUp>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[1px] bg-white/5 -translate-y-1/2" />
          <motion.div
            className="hidden lg:block absolute top-1/2 left-0 h-[1px] bg-gradient-to-r from-amber-core to-amber-core/50 -translate-y-1/2"
            style={{ width: lineHeight }}
          />

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="process-card relative"
              >
                {/* Card */}
                <div className="glass-card glass-card-glow p-5 sm:p-6 md:p-8 h-full group hover:border-amber-core/30 transition-all duration-500">
                  {/* Number */}
                  <div className="flex items-center justify-between mb-5 sm:mb-6 md:mb-8">
                    <span className="text-4xl sm:text-5xl font-extralight text-amber-core/20 group-hover:text-amber-core/40 transition-colors duration-500">
                      {step.number}
                    </span>
                    <div className="text-amber-core/60 group-hover:text-amber-core transition-colors duration-500 [&>svg]:w-6 [&>svg]:h-6 sm:[&>svg]:w-8 sm:[&>svg]:h-8">
                      {step.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-light text-white-pure mb-3 sm:mb-4 group-hover:text-amber-core transition-colors duration-500">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-muted leading-relaxed">
                    {step.description}
                  </p>

                  {/* Hover Indicator */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-core/0 via-amber-core to-amber-core/0"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                {/* Connection Dot (Desktop) */}
                <div className="hidden lg:block absolute -bottom-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-amber-core/50" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
