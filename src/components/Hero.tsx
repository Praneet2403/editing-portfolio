"use client";

import { motion } from "motion/react";
import { site } from "@/content/site";
import { Avatar, Glyphs } from "./Decor";

const ease = [0.22, 1, 0.36, 1] as const;

function Letters({ text, delay }: { text: string; delay: number }) {
  return (
    <>
      {text.split("").map((ch, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.04em]">
          <motion.span
            className="inline-block"
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: delay + i * 0.05, ease }}
          >
            {ch}
          </motion.span>
        </span>
      ))}
    </>
  );
}

export function Hero() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-4 pt-10 pb-16 sm:px-8 sm:pt-16 sm:pb-24">
      {/* Title block — sized against viewport width so it always fills the line */}
      <div className="mx-auto w-fit">
        <motion.div
          className="heading flex justify-between text-[2.9vw] tracking-normal sm:text-[1.6vw] lg:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span>{site.roles.join(" / ")}</span>
          <span>{site.year}</span>
        </motion.div>

        <h1 className="heading mt-[0.6vw] flex items-center text-[11.7vw] sm:text-[11vw] xl:text-[9rem]">
          <span className="sr-only">{site.name} — Portfolio</span>
          <span aria-hidden className="flex items-center">
            <Letters text="PORTF" delay={0.15} />
            <motion.span
              className="relative mx-[0.02em] inline-block w-[0.94em] -translate-y-[0.1em]"
              initial={{ scale: 0, rotate: -40 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.55 }}
            >
              <Avatar variant="head" priority sizes="(min-width: 1280px) 120px, 11vw" className="h-auto w-full sticker-white" />
            </motion.span>
            <Letters text="LIO" delay={0.45} />
          </span>
        </h1>

        {/* Signature with hand-drawn arrow */}
        <div className="relative ml-[46%] mt-1 flex items-start gap-1 sm:mt-2">
          <motion.svg
            viewBox="0 0 40 50"
            className="h-9 w-7 shrink-0 sm:h-12 sm:w-9"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 0.6, delay: 1.1, ease: "easeInOut" }}
          >
            <path d="M30 4 C 8 10, 4 30, 16 44" />
            <path d="M7 37 L16 44 L20 34" />
          </motion.svg>
          <motion.span
            className="font-hand mt-4 whitespace-nowrap text-2xl sm:mt-6 sm:text-4xl"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.2, delay: 1.6, ease: "easeInOut" }}
          >
            {site.name}
          </motion.span>
        </div>
      </div>

      <motion.div
        className="mt-10 flex flex-col items-center gap-6 text-center sm:mt-14"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.9, ease }}
      >
        <Glyphs className="h-6 sm:h-8" />
        <p className="max-w-sm text-balance text-base font-medium text-ink/75 sm:max-w-md sm:text-lg">
          {site.tagline}
        </p>
        <div className="flex gap-3">
          <a
            href="#work"
            className="heading rounded-full bg-ink px-5 py-3 text-xs tracking-normal text-paper-light transition-transform active:scale-95 sm:text-sm"
          >
            See our work
          </a>
          <a
            href="#rates"
            className="heading rounded-full border-2 border-ink px-5 py-3 text-xs tracking-normal transition-transform active:scale-95 sm:text-sm"
          >
            Rates
          </a>
        </div>
      </motion.div>
    </section>
  );
}
