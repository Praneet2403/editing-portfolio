import { landscapeVideos, portraitVideos } from "@/content/videos";
import { Tape } from "./Decor";
import { Reveal } from "./Reveal";
import { VideoCard } from "./VideoCard";

const tilts = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

function SectionTitle({ kicker, title, note, noteClassName = "" }: { kicker: string; title: string; note: string; noteClassName?: string }) {
  return (
    <Reveal className="flex items-end justify-between gap-4 px-4 sm:px-8">
      <div>
        <p className="font-mono text-[11px] tracking-[0.2em] text-ink/60 uppercase">{kicker}</p>
        <h2 className="heading mt-2 text-[12vw] sm:text-7xl lg:text-8xl">{title}</h2>
      </div>
      <p className={`font-hand max-w-32 shrink-0 pb-1 text-right text-lg leading-tight text-ink/70 sm:max-w-none sm:text-2xl ${noteClassName}`}>
        {note}
      </p>
    </Reveal>
  );
}

/** Portrait reels: swipeable polaroid row on phones, grid on desktop. */
function Reels() {
  return (
    <div>
      <SectionTitle kicker="Short-form · 9:16" title="The Reels" note="swipe →" noteClassName="lg:hidden" />

      <ul className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pt-6 pb-10 sm:px-8 lg:grid lg:grid-cols-4 lg:gap-10 lg:overflow-visible">
        {portraitVideos.map((v, i) => (
          <li key={v.id} className="w-[64vw] max-w-72 shrink-0 snap-center lg:w-auto lg:max-w-none">
            <Reveal delay={(i % 3) * 0.08}>
              <figure
                className={`relative bg-paper-light p-2 pb-3 shadow-[0_14px_30px_-12px_rgb(0_0_0/0.45)] transition-transform duration-300 hover:rotate-0 ${tilts[i % tilts.length]}`}
              >
                <Tape className={`-top-3 left-1/2 -translate-x-1/2 ${i % 2 ? "rotate-3" : "-rotate-2"}`} />
                <VideoCard video={v} index={i} />
                <figcaption className="font-hand mt-2 truncate px-1 text-xl leading-none">{v.title}</figcaption>
              </figure>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TimelineStrip({ seed }: { seed: number }) {
  const clips = [18, 9, 26, 12, 20, 15].map((w, i) => ((w + seed * 7 + i * 3) % 22) + 8);
  const colors = ["bg-[#7b6cff]", "bg-[#3fb3ff]", "bg-[#ff6a3d]", "bg-[#3ddc97]"];
  return (
    <div aria-hidden className="space-y-1 bg-[#1b1d22] px-2 py-2">
      {[0, 1].map((track) => (
        <div key={track} className="flex gap-0.5">
          {clips.map((w, i) => (
            <span
              key={i}
              className={`h-2 rounded-[2px] opacity-80 ${colors[(i + track + seed) % colors.length]}`}
              style={{ flexGrow: track ? clips[(i + 2) % clips.length] : w }}
            />
          ))}
        </div>
      ))}
      <span className="block h-1.5 rounded-[2px] bg-[#3ddc97]/30" />
    </div>
  );
}

/** Landscape edits framed like a program monitor with a timeline beneath. */
function LongForm() {
  return (
    <div className="mt-16 sm:mt-24">
      <SectionTitle kicker="Long-form · 16:9" title="The Cuts" note="YouTube, podcasts & films" />

      <ul className="mt-8 grid gap-8 px-4 sm:grid-cols-2 sm:gap-10 sm:px-8">
        {landscapeVideos.map((v, i) => (
          <li key={v.id}>
            <Reveal delay={(i % 2) * 0.1}>
              <figure className="overflow-hidden rounded-xl border-2 border-ink bg-ink shadow-[6px_6px_0_0_var(--color-ink)]">
                <div className="flex items-center justify-between gap-3 px-3 py-2 font-mono text-[10px] text-white/70 sm:text-[11px]">
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-accent" />
                    <span className="size-2 rounded-full bg-[#ffb547]" />
                    <span className="size-2 rounded-full bg-[#3ddc97]" />
                  </span>
                  <span className="truncate">Program: {v.title}</span>
                </div>
                <VideoCard video={v} index={i} />
                <TimelineStrip seed={i} />
              </figure>
              <figcaption className="mt-3 flex items-baseline justify-between px-1">
                <span className="heading text-base tracking-normal sm:text-lg">{v.title}</span>
                <span className="font-hand text-lg text-ink/70">{v.category}</span>
              </figcaption>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Work() {
  return (
    <section id="work" className="relative z-10 mx-auto max-w-7xl scroll-mt-6 py-16 sm:py-24">
      <Reels />
      {landscapeVideos.length > 0 && <LongForm />}
    </section>
  );
}
