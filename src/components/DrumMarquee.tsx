"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { Glyphs } from "./Decor";

/*
 * Words travelling across the inside wall of a drum (the effect in the reference):
 * letters at the edges of the strip are near and tall, they shrink and foreshorten as they
 * slide to the middle (behind the cut-out), then grow again on the other side.
 * The drum's curvature is independent of how long the text is, so each letter is
 * positioned per frame along a virtual cylinder with CSS 3D.
 */

type Piece = { key: string; kind: "char" | "glyph" | "gap"; text?: string };

function buildSequence(): Piece[] {
  const seq: Piece[] = [];
  site.marquee.forEach((word, w) => {
    word
      .toUpperCase()
      .split("")
      .forEach((ch, c) => seq.push(ch === " " ? { key: `${w}-s${c}`, kind: "gap" } : { key: `${w}-${c}`, kind: "char", text: ch }));
    seq.push({ key: `${w}-g0`, kind: "gap" });
    seq.push({ key: `${w}-glyph`, kind: "glyph" });
    seq.push({ key: `${w}-g1`, kind: "gap" });
  });
  return seq;
}

const SEQUENCE = buildSequence();
const MAX_ANGLE = (84 * Math.PI) / 180; // beyond this a letter is edge-on and hidden

type Layout = {
  fontSize: number;
  radius: number;
  perspective: number;
  speed: number; // arc px per second
  length: number; // full strip length
  items: (Piece & { pos: number })[];
};

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function DrumMarquee() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [layout, setLayout] = useState<Layout | null>(null);

  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    const meter = measureRef.current;
    if (!wrap || !meter) return;
    const W = wrap.clientWidth;
    const H = wrap.clientHeight;
    const fontSize = Math.round(Math.min(H * 0.5, W * 0.22));
    meter.style.fontSize = `${fontSize}px`;
    const widths = Array.from(meter.children).map((el) => (el as HTMLElement).getBoundingClientRect().width);
    const seqWidth = widths.reduce((a, b) => a + b, 0);

    const radius = W * 0.6;
    const visibleArc = 2 * MAX_ANGLE * radius;
    const repeats = Math.max(1, Math.ceil((visibleArc + fontSize * 2) / seqWidth));

    const items: Layout["items"] = [];
    let pos = 0;
    for (let r = 0; r < repeats; r++) {
      SEQUENCE.forEach((p, i) => {
        if (p.kind !== "gap") items.push({ ...p, key: `${r}-${p.key}`, pos: pos + widths[i] / 2 });
        pos += widths[i];
      });
    }
    itemRefs.current = [];
    // Edge letters drift at roughly a third of the strip width per second, like the reference.
    setLayout({ fontSize, radius, perspective: radius * 1.25, speed: W * 0.32, length: pos, items });
  }, []);

  useIsoLayoutEffect(() => {
    let cancelled = false;
    document.fonts.ready.then(() => !cancelled && measure());
    let lastW = 0;
    const ro = new ResizeObserver(([entry]) => {
      // Mobile browsers resize the viewport height while scrolling; only re-measure on width changes.
      const w = Math.round(entry.contentRect.width);
      if (w !== lastW) {
        lastW = w;
        measure();
      }
    });
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => {
      cancelled = true;
      ro.disconnect();
    };
  }, [measure]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!layout || !wrap) return;
    const { radius, speed, length, items } = layout;
    let offset = 0;
    let last = 0;
    let raf = 0;

    const place = () => {
      for (let i = 0; i < items.length; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;
        // Arc position relative to the back-centre of the drum, wrapped around the strip.
        let a = (items[i].pos - offset) % length;
        if (a < 0) a += length;
        a -= length / 2;
        const theta = a / radius;
        if (Math.abs(theta) > MAX_ANGLE) {
          el.style.visibility = "hidden";
          continue;
        }
        el.style.visibility = "visible";
        el.style.transform = `rotateY(${(-theta).toFixed(4)}rad) translateZ(${(-radius).toFixed(1)}px) translate(-50%, -50%)`;
      }
    };

    const tick = (now: number) => {
      if (last) offset += (speed * Math.min(now - last, 64)) / 1000;
      last = now;
      place();
      raf = requestAnimationFrame(tick);
    };

    place();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Only animate while the strip is on screen.
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      if (entry.isIntersecting) {
        last = 0;
        raf = requestAnimationFrame(tick);
      }
    });
    io.observe(wrap);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [layout]);

  return (
    <div ref={wrapRef} aria-hidden className="absolute inset-0 overflow-hidden">
      {/* Hidden ruler: one child per sequence piece, same font as the drum. */}
      <div ref={measureRef} className="heading invisible absolute top-0 left-0 flex whitespace-pre">
        {SEQUENCE.map((p) =>
          p.kind === "char" ? (
            <span key={p.key}>{p.text}</span>
          ) : p.kind === "glyph" ? (
            <span key={p.key} className="flex items-center">
              <Glyphs className="h-[0.62em]" />
            </span>
          ) : (
            <span key={p.key} className="inline-block w-[0.3em]" />
          ),
        )}
      </div>

      {layout && (
        <div className="absolute inset-0" style={{ perspective: `${layout.perspective}px` }}>
          <div
            className="absolute top-1/2 left-1/2"
            style={{ transformStyle: "preserve-3d", transform: "rotateZ(-4deg) rotateX(-12deg)" }}
          >
            {layout.items.map((it, i) => (
              <span
                key={it.key}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className="heading invisible absolute top-0 left-0 block text-[#ededea] will-change-transform"
                style={{
                  fontSize: layout.fontSize,
                  lineHeight: 1,
                  transformOrigin: "0 0",
                  backfaceVisibility: "hidden",
                }}
              >
                {it.kind === "char" ? it.text : <Glyphs className="h-[0.62em]" />}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
