"use client";

import { motion } from "motion/react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  rotate?: number;
};

export function Reveal({ children, className, delay = 0, y = 28, rotate = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, rotate: rotate * 2 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Pops in like a sticker being slapped on the page. */
export function Sticker({ children, className, delay = 0, rotate = -4 }: Omit<RevealProps, "y">) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.6, rotate: rotate - 14 }}
      whileInView={{ opacity: 1, scale: 1, rotate }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ type: "spring", stiffness: 260, damping: 16, delay }}
    >
      {children}
    </motion.div>
  );
}
