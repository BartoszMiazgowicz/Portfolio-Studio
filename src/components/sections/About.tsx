"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container, Button } from "@/components/ui";
import { FadeUp } from "@/components/animations";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "150+", label: "Projects Delivered" },
  { value: "50+", label: "Global Clients" },
  { value: "10+", label: "Years of Excellence" },
  { value: "15", label: "Industry Awards" },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.2, 1]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stats counter animation
      const statValues = sectionRef.current?.querySelectorAll(".stat-value");
      statValues?.forEach((stat) => {
        const target = stat.textContent || "0";
        const numericValue = parseInt(target.replace(/\D/g, ""));
        const suffix = target.replace(/[0-9]/g, "");

        gsap.fromTo(
          stat,
          { textContent: "0" + suffix },
          {
            textContent: numericValue + suffix,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: stat,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-section bg-black-deep relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-core/5 rounded-full blur-[150px]" />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <FadeUp>
              <div
                ref={imageRef}
                className="relative"
              >
                {/* Glow Effect */}
                <div className="absolute -inset-8 bg-gradient-to-r from-amber-core/10 via-amber-core/5 to-transparent rounded-3xl blur-3xl" />

                {/* Main Image */}
                <motion.div
                  className="relative aspect-[4/5] rounded-2xl overflow-hidden"
                  style={{ y: imageY }}
                >
                  <motion.div
                    className="absolute inset-0"
                    style={{ scale: imageScale }}
                  >
                    <Image
                      src="/projects/project-3.png"
                      alt="Studio Interior"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </motion.div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black-deep/60 via-transparent to-transparent" />

                  {/* Border Glow */}
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
                </motion.div>

                {/* Floating Badge */}
                <motion.div
                  className="absolute -bottom-4 sm:-bottom-6 right-2 sm:-right-6 md:-right-10 glass-card p-4 sm:p-6 rounded-xl"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div className="text-amber-core text-2xl sm:text-4xl font-extralight mb-1">2014</div>
                  <div className="text-gray-muted text-[10px] sm:text-xs tracking-wider">Est.</div>
                </motion.div>
              </div>
            </FadeUp>
          </div>

          {/* Content Side */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <FadeUp>
              <span className="text-label text-amber-core mb-6 block">
                About Studio
              </span>
            </FadeUp>

            <FadeUp delay={0.2}>
              <h2
                className="text-white-pure mb-8"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 200,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                }}
              >
                Crafting digital excellence
                <br />
                <span className="text-amber-core">through vision and precision</span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.4}>
              <p className="text-white-soft/70 text-lg font-light leading-relaxed mb-6">
                We are a collective of designers, developers, and strategists
                united by a singular pursuit — creating digital experiences that
                leave lasting impressions. Our work spans industries, from luxury
                brands to innovative startups.
              </p>
            </FadeUp>

            <FadeUp delay={0.6}>
              <p className="text-white-soft/60 text-base font-light leading-relaxed mb-12">
                Every project is an opportunity to push boundaries, challenge
                conventions, and deliver work that stands the test of time. We
                believe in the transformative power of thoughtful design and
                meticulous execution.
              </p>
            </FadeUp>

            {/* Stats */}
            <FadeUp delay={0.8}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 py-6 sm:py-8 border-y border-white/5">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="text-center md:text-left">
                    <div className="stat-value text-2xl sm:text-3xl md:text-4xl font-extralight text-amber-core mb-1 sm:mb-2">
                      {stat.value}
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-muted tracking-wider uppercase">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={1}>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Work With Us</Button>
                <Button variant="secondary">Our Story</Button>
              </div>
            </FadeUp>
          </div>
        </div>
      </Container>
    </section>
  );
}
