"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { whatsappLink } from "@/content/site";

/** Bottom booking bar on phones, shown once the visitor scrolls past the hero. */
export function MobileCta() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const nearEnd = y + window.innerHeight > document.documentElement.scrollHeight - 500;
    setShow(y > 520 && !nearEnd);
  });

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-50 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
        >
          <div className="flex items-center gap-2 rounded-full bg-ink p-1.5 pl-5 text-paper-light shadow-[0_12px_30px_-8px_rgb(0_0_0/0.6)]">
            <span className="flex-1 text-sm">
              Reels from <b className="text-[#ff6a3d]">₹700</b>
            </span>
            <a href="#rates" className="rounded-full px-3 py-2.5 text-sm text-white/70">
              Rates
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="heading rounded-full bg-accent px-4 py-3 text-xs tracking-normal text-white active:scale-95"
            >
              Book an edit
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
