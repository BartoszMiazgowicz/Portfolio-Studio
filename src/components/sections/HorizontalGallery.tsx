"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const galleryItems = [
  {
    id: 1,
    title: "Architectural Vision",
    subtitle: "Crafting spaces that inspire",
    image: "/projects/project-1.png",
    color: "#D4A84C",
  },
  {
    id: 2,
    title: "Digital Excellence",
    subtitle: "Where innovation meets design",
    image: "/projects/project-2.png",
    color: "#E8B85A",
  },
  {
    id: 3,
    title: "Creative Strategy",
    subtitle: "Building brands that resonate",
    image: "/projects/project-3.png",
    color: "#B8862F",
  },
  {
    id: 4,
    title: "Future Forward",
    subtitle: "Pioneering tomorrow's experiences",
    image: "/projects/project-1.png",
    color: "#D4A84C",
  },
];

export function HorizontalGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !sliderRef.current) return;

    const ctx = gsap.context(() => {
      // Calculate the total scroll distance
      const panels = gsap.utils.toArray<HTMLElement>(".gallery-panel");
      const totalWidth = sliderRef.current!.scrollWidth - window.innerWidth;

      // Create the horizontal scroll animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });

      tl.to(sliderRef.current, {
        x: -totalWidth,
        ease: "none",
      });

      // Parallax effect for images inside panels
      panels.forEach((panel) => {
        const image = panel.querySelector(".gallery-image");
        if (image) {
          gsap.to(image, {
            x: "-20%",
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tl,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      className="relative bg-black-deep overflow-hidden"
    >
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-black-elevated z-50">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-amber-deep via-amber-core to-amber-bright"
          style={{ width: "0%" }}
        />
      </div>

      {/* Section header */}
      <div className="absolute top-8 left-8 z-20">
        <span className="text-label text-amber-core">Gallery</span>
      </div>

      {/* Slide counter */}
      <div className="absolute top-8 right-8 z-20">
        <span className="text-sm text-gray-muted">
          <span className="text-white-pure">01</span> / 04
        </span>
      </div>

      {/* Horizontal slider */}
      <div
        ref={sliderRef}
        className="flex h-screen items-center"
        style={{ width: `${galleryItems.length * 100}vw` }}
      >
        {galleryItems.map((item, index) => (
          <div
            key={item.id}
            className="gallery-panel relative w-screen h-screen flex items-center justify-center px-8"
          >
            {/* Background gradient */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: `radial-gradient(ellipse at center, ${item.color}20 0%, transparent 70%)`,
              }}
            />

            {/* Content */}
            <div className="relative flex items-center gap-16 max-w-7xl mx-auto">
              {/* Image */}
              <div className="relative w-[50vw] h-[60vh] overflow-hidden rounded-2xl">
                <div className="gallery-image absolute inset-0 w-[130%] h-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="60vw"
                  />
                </div>

                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-black-deep/50 to-transparent" />

                {/* Number indicator */}
                <div className="absolute bottom-8 left-8">
                  <span
                    className="text-[120px] font-extralight leading-none"
                    style={{ color: item.color, opacity: 0.3 }}
                  >
                    0{index + 1}
                  </span>
                </div>
              </div>

              {/* Text content */}
              <div className="flex-1 max-w-md">
                <motion.span
                  className="text-label text-amber-core block mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {item.subtitle}
                </motion.span>

                <motion.h3
                  className="text-4xl md:text-5xl font-light text-white-pure mb-6 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  {item.title}
                </motion.h3>

                <motion.div
                  className="w-16 h-[1px] mb-6"
                  style={{ backgroundColor: item.color }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />

                <motion.p
                  className="text-gray-muted text-body leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  Explore the intersection of aesthetics and functionality,
                  where every detail is meticulously crafted to create
                  extraordinary experiences.
                </motion.p>

                {/* View project link */}
                <motion.a
                  href="#"
                  className="inline-flex items-center gap-3 mt-8 text-white-pure hover:text-amber-core transition-colors duration-300 group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <span className="text-sm font-medium tracking-wide">
                    View Project
                  </span>
                  <svg
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </motion.a>
              </div>
            </div>

            {/* Decorative elements */}
            <div
              className="absolute bottom-16 right-16 w-32 h-32 border rounded-full opacity-10"
              style={{ borderColor: item.color }}
            />
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {galleryItems.map((_, index) => (
          <div
            key={index}
            className="w-2 h-2 rounded-full bg-white-pure/30 transition-all duration-300"
          />
        ))}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 right-8 z-20">
        <div className="flex items-center gap-2 text-gray-muted text-sm">
          <span>Scroll</span>
          <svg
            className="w-4 h-4 animate-pulse"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
