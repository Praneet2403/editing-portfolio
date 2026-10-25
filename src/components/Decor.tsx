import Image from "next/image";
import { site } from "@/content/site";

/** ✸ ✦ ♣ — the three-glyph mark from the reference layout. */
export function Glyphs({ className = "h-7", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <div className={`flex items-center gap-[0.28em] ${className}`} aria-hidden>
      <svg viewBox="0 0 24 24" className="h-full w-auto" fill={color}>
        <path d="M12 0l2.2 7.6L21 3l-4.6 6.8L24 12l-7.6 2.2L21 21l-6.8-4.6L12 24l-2.2-7.6L3 21l4.6-6.8L0 12l7.6-2.2L3 3l6.8 4.6z" />
      </svg>
      <svg viewBox="0 0 24 24" className="h-full w-auto" fill={color}>
        <path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z" />
      </svg>
      <svg viewBox="0 0 24 24" className="h-full w-auto" fill={color}>
        <circle cx="12" cy="6.5" r="5.5" />
        <circle cx="6" cy="13.5" r="5.5" />
        <circle cx="18" cy="13.5" r="5.5" />
        <path d="M10.5 13h3l1.5 11h-6z" />
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Torn paper edge
// Deterministic so server and client render the same edge.

const TEAR_W = 1000;
const TEAR_H = 60;
const TEAR_STEPS = 240;

function mulberry(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Smooth 1D value noise in [-1, 1] with knots every `span` units. */
function valueNoise(seed: number, span: number) {
  const r = mulberry(seed);
  const knots = Array.from({ length: Math.ceil(TEAR_W / span) + 2 }, () => r() * 2 - 1);
  return (x: number) => {
    const t = x / span;
    const i = Math.floor(t);
    const f = t - i;
    const s = f * f * (3 - 2 * f);
    return knots[i] * (1 - s) + knots[i + 1] * s;
  };
}

/**
 * Edge profile measured as depth from the band (0 = band edge, 60 = far side of the strip).
 * `black` is where the black paper ends, `fiber` where the white torn rim of the paper ends.
 */
function tearProfile(seed: number) {
  const big = valueNoise(seed, 210);
  const mid = valueNoise(seed + 11, 48);
  const thickN = valueNoise(seed + 23, 36);
  const fine = mulberry(seed + 37);
  const black: number[] = [];
  const fiber: number[] = [];
  for (let i = 0; i <= TEAR_STEPS; i++) {
    const x = (i / TEAR_STEPS) * TEAR_W;
    const b = 24 + 13 * big(x) + 5 * mid(x) + 2.4 * (fine() - 0.5);
    const thick = 4.5 + 3.5 * thickN(x) + 2.2 * fine();
    black.push(Math.max(2, Math.min(TEAR_H - 14, b)));
    fiber.push(Math.max(2, Math.min(TEAR_H - 1, b + thick)));
  }
  return { black, fiber };
}

const xAt = (i: number) => (i / TEAR_STEPS) * TEAR_W;

/** Polygon from the band edge (depth 0) out to a profile line, in SVG units for the given side. */
function polygon(depths: number[], side: "top" | "bottom") {
  const y = (d: number) => (side === "top" ? TEAR_H - d : d);
  const edge = side === "top" ? TEAR_H : 0;
  const pts = [`0,${edge}`, ...depths.map((d, i) => `${xAt(i).toFixed(1)},${y(d).toFixed(1)}`), `${TEAR_W},${edge}`];
  return pts.join(" ");
}

/**
 * CSS clip-path that keeps whatever sits on the band above the bottom tear line,
 * so the paper below appears to overlap it. Apply to an element whose bottom edge
 * is `var(--tear-h)` below the band's bottom edge.
 */
export function bottomTearClip(seed: number) {
  const { black } = tearProfile(seed);
  const pts = black
    .map((d, i) => `${((xAt(i) / TEAR_W) * 100).toFixed(2)}% calc(100% - var(--tear-h) + var(--tear-h) * ${(d / TEAR_H).toFixed(3)})`)
    .reverse();
  return `polygon(0 0, 100% 0, ${pts.join(", ")})`;
}

/** Torn edge of a black strip. Place inside a `relative` section; `side` is the edge it sits on. */
export function TornEdge({ side = "top", seed = 3 }: { side?: "top" | "bottom"; seed?: number }) {
  const { black, fiber } = tearProfile(seed);
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${TEAR_W} ${TEAR_H}`}
      preserveAspectRatio="none"
      className={`pointer-events-none absolute left-0 h-(--tear-h) w-full ${side === "top" ? "bottom-full translate-y-px" : "top-full -translate-y-px"}`}
    >
      <polygon points={polygon(fiber, side)} fill="#fbfaf7" />
      <polygon points={polygon(black, side)} fill="var(--color-ink)" />
    </svg>
  );
}

// ---------------------------------------------------------------------------

type AvatarVariant = keyof typeof site.avatar;

export function Avatar({
  variant = "cutout",
  className,
  priority,
  sizes,
}: {
  variant?: AvatarVariant;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const img = site.avatar[variant];
  return (
    <Image
      src={img.src}
      alt={`${site.name} avatar`}
      width={img.width}
      height={img.height}
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}

/** Strip of masking tape. */
export function Tape({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`absolute h-6 w-20 bg-tape/80 shadow-sm backdrop-blur-[1px] [clip-path:polygon(3%_0,97%_6%,100%_100%,0_94%)] ${className}`}
    />
  );
}
