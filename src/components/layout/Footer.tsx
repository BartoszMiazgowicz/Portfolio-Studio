"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui";

const footerLinks = {
  navigation: [
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  social: [
    { label: "Twitter", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "Dribbble", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-black-deep border-t border-white/5">
      {/* Gradient Line */}
      <div className="h-px bg-gradient-to-r from-transparent via-amber-core/50 to-transparent" />

      <Container>
        <div className="py-10 sm:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
            {/* Brand */}
            <div className="col-span-2">
              <a href="#" className="text-white-pure text-xl sm:text-2xl font-medium mb-3 sm:mb-4 block">
                Studio<span className="text-amber-core">.</span>
              </a>
              <p className="text-gray-muted text-xs sm:text-sm max-w-sm mb-4 sm:mb-6">
                A premium creative studio crafting digital experiences that
                transcend expectations. Based in Warsaw, working globally.
              </p>
              <a
                href="mailto:hello@studio.com"
                className="text-amber-core hover:text-amber-bright transition-colors text-sm"
              >
                hello@studio.com
              </a>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-white-pure text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                Navigation
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                {footerLinks.navigation.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-muted hover:text-white-pure transition-colors text-xs sm:text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-white-pure text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                Connect
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                {footerLinks.social.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-muted hover:text-white-pure transition-colors text-xs sm:text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-4 sm:py-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-gray-muted text-xs sm:text-sm order-2 md:order-1">
            &copy; {new Date().getFullYear()} Studio. All rights reserved.
          </p>
          <div className="flex gap-4 sm:gap-6 order-1 md:order-2">
            <a
              href="#"
              className="text-gray-muted hover:text-white-pure transition-colors text-xs sm:text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-muted hover:text-white-pure transition-colors text-xs sm:text-sm"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
