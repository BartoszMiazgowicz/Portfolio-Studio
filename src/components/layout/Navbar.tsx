"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, MagneticButton } from "@/components/ui";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? "bg-black-deep/80 backdrop-blur-2xl"
            : "bg-transparent"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 2.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Bottom border with glow */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: isScrolled ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="h-full bg-gradient-to-r from-transparent via-amber-core/20 to-transparent" />
        </motion.div>

        <div className="container-main">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <motion.a
              href="#"
              className="relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-xl lg:text-2xl font-light tracking-tight text-white-pure">
                Studio
                <motion.span
                  className="text-amber-core"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  .
                </motion.span>
              </span>
              {/* Hover glow */}
              <div className="absolute -inset-4 bg-amber-core/0 group-hover:bg-amber-core/5 rounded-full blur-xl transition-all duration-500" />
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="relative px-5 py-2 text-sm tracking-wide"
                  onHoverStart={() => setActiveLink(link.label)}
                  onHoverEnd={() => setActiveLink(null)}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <span
                    className={`relative z-10 transition-colors duration-300 ${
                      activeLink === link.label
                        ? "text-amber-core"
                        : "text-white-soft/70 hover:text-white-pure"
                    }`}
                  >
                    {link.label}
                  </span>

                  {/* Underline */}
                  <motion.div
                    className="absolute bottom-0 left-1/2 h-[1px] bg-amber-core"
                    initial={{ width: 0, x: "-50%" }}
                    animate={{
                      width: activeLink === link.label ? "50%" : 0,
                      x: "-50%",
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />

                  {/* Hover background */}
                  <motion.div
                    className="absolute inset-0 bg-amber-core/5 rounded-full"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: activeLink === link.label ? 1 : 0,
                      scale: activeLink === link.label ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <MagneticButton variant="primary" className="px-6 py-3 text-sm">
                Start Project
              </MagneticButton>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden relative w-10 h-10 flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative w-6 h-5 flex flex-col justify-between">
                <motion.span
                  className="w-full h-[1px] bg-white-pure origin-left"
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 0 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-full h-[1px] bg-white-pure"
                  animate={{
                    opacity: isMobileMenuOpen ? 0 : 1,
                    x: isMobileMenuOpen ? 20 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-full h-[1px] bg-white-pure origin-left"
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? 0 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Background */}
            <motion.div
              className="absolute inset-0 bg-black-deep/98 backdrop-blur-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-core/10 rounded-full blur-[150px]" />

            {/* Content */}
            <div className="relative flex flex-col items-center justify-center h-full gap-8 p-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="text-white-pure text-4xl font-extralight tracking-tight hover:text-amber-core transition-colors duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-8"
              >
                <Button variant="primary" className="px-10 py-4 text-base">
                  Start Project
                </Button>
              </motion.div>

              {/* Contact info */}
              <motion.div
                className="absolute bottom-12 left-0 right-0 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <a
                  href="mailto:hello@studio.com"
                  className="text-sm text-gray-muted hover:text-amber-core transition-colors"
                >
                  hello@studio.com
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
