"use client";

import { motion } from "framer-motion";

interface GlowEffectProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  animate?: boolean;
}

export function GlowEffect({
  size = "md",
  className = "",
  animate = true,
}: GlowEffectProps) {
  const sizeClasses = {
    sm: "w-[400px] h-[300px]",
    md: "w-[600px] h-[400px]",
    lg: "w-[800px] h-[500px]",
  };

  return (
    <motion.div
      className={`glow-ambient ${sizeClasses[size]} ${className}`}
      initial={{ opacity: 0.3 }}
      animate={
        animate
          ? {
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.05, 1],
            }
          : undefined
      }
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
