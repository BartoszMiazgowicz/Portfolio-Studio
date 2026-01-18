"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui";
import { FadeUp, ImageReveal } from "@/components/animations";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Luminary Residence",
    subtitle: "Interior Architecture",
    category: "Spatial Design",
    year: "2024",
    image: "/projects/project-1.png",
    description: "A harmonious blend of contemporary design and timeless elegance.",
  },
  {
    id: 2,
    title: "Artisan Collection",
    subtitle: "Product Photography",
    category: "Visual Identity",
    year: "2024",
    image: "/projects/project-2.png",
    description: "Capturing the essence of craftsmanship through light and form.",
  },
  {
    id: 3,
    title: "Horizon Penthouse",
    subtitle: "Luxury Living Space",
    category: "Interior Design",
    year: "2024",
    image: "/projects/project-3.png",
    description: "Where architectural vision meets unparalleled sophistication.",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.1]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor-hover
      data-cursor-text="VIEW"
    >
      {/* Main Card */}
      <div className="relative overflow-hidden rounded-2xl bg-black-surface cursor-pointer">
        {/* Image Container */}
        <div
          ref={imageRef}
          className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden"
        >
          <ImageReveal
            direction={index % 2 === 0 ? "left" : "right"}
            delay={index * 0.1}
            className="absolute inset-0"
          >
            <div className="absolute inset-0">
              <motion.div
                className="absolute inset-0"
                style={{ scale: imageScale }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-all duration-700"
                  style={{
                    filter: isHovered ? "brightness(1.1)" : "brightness(0.9)",
                  }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </motion.div>
            </div>
          </ImageReveal>

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black-deep via-transparent to-transparent opacity-80" />
          <div
            className="absolute inset-0 bg-gradient-to-t from-amber-core/20 via-transparent to-transparent opacity-0 transition-opacity duration-500"
            style={{ opacity: isHovered ? 0.6 : 0 }}
          />

          {/* Hover Glow Border */}
          <div
            className="absolute inset-0 rounded-2xl transition-all duration-500"
            style={{
              boxShadow: isHovered
                ? "inset 0 0 0 1px rgba(212, 168, 76, 0.3), 0 0 60px -12px rgba(212, 168, 76, 0.4)"
                : "inset 0 0 0 1px rgba(255, 255, 255, 0.05)",
            }}
          />

          {/* Project Number */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6">
            <span
              className="text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] text-white/40 font-light"
              style={{ writingMode: "vertical-rl" }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Year Badge */}
          <div className="absolute top-4 sm:top-6 right-4 sm:right-6">
            <span className="text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] text-white/50 font-light">
              {project.year}
            </span>
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
            {/* Category */}
            <motion.span
              className="text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-amber-core/80 font-medium mb-2 sm:mb-3 block"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {project.category}
            </motion.span>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-white-pure mb-1 sm:mb-2 leading-tight">
              {project.title}
            </h3>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-white/50 font-light mb-3 sm:mb-4">
              {project.subtitle}
            </p>

            {/* View Project Link */}
            <div className="flex items-center gap-3 overflow-hidden">
              <motion.div
                className="flex items-center gap-2 text-amber-core text-sm font-medium"
                animate={{ x: isHovered ? 0 : -10, opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <span>View Project</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </motion.div>
            </div>

            {/* Bottom Line */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-core to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isHovered ? 1 : 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="py-section bg-black-deep relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-amber-core/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-amber-core/5 rounded-full blur-[120px]" />
      </div>

      <Container className="relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-20 md:mb-32">
          <FadeUp>
            <span className="text-label text-amber-core mb-6 block">
              Selected Work
            </span>
          </FadeUp>

          <FadeUp delay={0.2}>
            <h2
              className="text-white-pure mb-6"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 200,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              Projects that
              <br />
              <span className="text-amber-core">define excellence</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.4}>
            <p className="text-white-soft/60 max-w-xl mx-auto text-lg font-light">
              A curated collection of our most distinguished work,
              where vision meets meticulous execution.
            </p>
          </FadeUp>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <FadeUp delay={0.2}>
          <div className="flex justify-center mt-10 sm:mt-16 md:mt-24">
            <motion.button
              className="group flex items-center gap-4 text-white-soft hover:text-amber-core transition-colors duration-300"
              whileHover={{ x: 5 }}
            >
              <span className="text-sm tracking-[0.2em] uppercase font-light">
                View All Projects
              </span>
              <div className="w-12 h-[1px] bg-current transition-all duration-300 group-hover:w-16" />
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.button>
          </div>
        </FadeUp>
      </Container>
    </section>
  );
}
